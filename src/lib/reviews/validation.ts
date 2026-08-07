import { createHmac, randomUUID } from "node:crypto";
import { getReviewServiceOption } from "./service-options";
import { formatPublicName } from "./format";

export type ReviewSubmission = {
  fullName: string;
  displayFullName: boolean;
  publicName: string;
  phone: string;
  phoneHmac: string;
  ipHmac: string;
  serviceId: string;
  serviceTitle: string;
  rating: number;
  comment: string;
  idempotencyHmac: string;
  shouldQuarantine: boolean;
};

export type ReviewValidationResult =
  | { ok: true; submission: ReviewSubmission }
  | { ok: false; errors: Record<string, string> };

const hmacSecret = import.meta.env.REVIEW_HMAC_SECRET;

function hmac(value: string): string {
  const secret = hmacSecret || "TODO_REVIEW_HMAC_SECRET_LOCAL_ONLY";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "").trim();
}

function normalizePlainText(value: string): string {
  return value.replace(/\r/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function containsHtml(value: string): boolean {
  return /<[^>]+>/.test(value);
}

function containsUrl(value: string): boolean {
  return /(?:https?:\/\/|www\.|[a-z0-9-]+\.(?:com|net|org|info|ru|xyz|top)\b)/i.test(
    value,
  );
}

function hasRepeatedNoise(value: string): boolean {
  return /(.)\1{7,}/.test(value) || /\b([a-zçğıöşü]{3,})\b(?:\s+\1){3,}/i.test(value);
}

function hasBannedSignal(value: string): boolean {
  return /\b(casino|bahis|bonus|crypto|loan|escort|viagra)\b/i.test(value);
}

function parseBoolean(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true" || value === "1";
}

export function createIdempotencyValue(): string {
  return randomUUID();
}

export function validateReviewFormData(
  formData: FormData,
  request: Request,
): ReviewValidationResult {
  const errors: Record<string, string> = {};
  const honeypot = String(formData.get("company_website") || "");
  const fullName = normalizePlainText(String(formData.get("fullName") || ""));
  const phone = normalizePhone(String(formData.get("phone") || ""));
  const serviceId = String(formData.get("serviceId") || "").trim();
  const rating = Number(formData.get("rating"));
  const comment = normalizePlainText(String(formData.get("comment") || ""));
  const displayFullName = parseBoolean(formData.get("displayFullName"));
  const idempotencyKey = String(formData.get("idempotencyKey") || "").trim();
  const service = getReviewServiceOption(serviceId);

  if (honeypot) errors.form = "Gönderim güvenlik kontrolünden geçemedi.";
  if (fullName.length < 3 || fullName.length > 80) {
    errors.fullName = "Ad soyad 3-80 karakter arasında olmalı.";
  }
  if (containsHtml(fullName)) {
    errors.fullName = "Ad soyad alanında HTML kullanılmamalı.";
  }
  if (phone.length < 10 || phone.length > 16) {
    errors.phone = "Telefon numarasını kontrol edin.";
  }
  if (!service) {
    errors.serviceId = "Lütfen hizmet türünü seçin.";
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Lütfen 1 ile 5 arasında yıldız seçin.";
  }
  if (comment.length < 20 || comment.length > 700) {
    errors.comment = "Yorum 20-700 karakter arasında olmalı.";
  }
  if (containsHtml(comment)) {
    errors.comment = "Yorumda HTML etiketi kullanılmamalı.";
  }
  if (idempotencyKey.length < 16 || idempotencyKey.length > 80) {
    errors.form = "Gönderim anahtarı geçersiz. Sayfayı yenileyip tekrar deneyin.";
  }

  if (Object.keys(errors).length > 0 || !service) {
    return { ok: false, errors };
  }

  const ip = getClientIp(request);
  const shouldQuarantine =
    containsUrl(comment) || hasRepeatedNoise(comment) || hasBannedSignal(comment);

  return {
    ok: true,
    submission: {
      fullName,
      displayFullName,
      publicName: formatPublicName(fullName, displayFullName),
      phone,
      phoneHmac: hmac(`phone:${phone}`),
      ipHmac: hmac(`ip:${ip}`),
      serviceId,
      serviceTitle: service.title,
      rating,
      comment,
      idempotencyHmac: hmac(`idempotency:${idempotencyKey}`),
      shouldQuarantine,
    },
  };
}
