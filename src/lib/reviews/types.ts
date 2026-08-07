export type ReviewVisibilityStatus = "published" | "hidden" | "quarantined";
export type ReviewVerificationStatus = "unverified" | "verified";

export type ReviewPublic = {
  id: string;
  publicName: string;
  serviceId: string;
  serviceTitle: string;
  rating: number;
  comment: string;
  verificationStatus: ReviewVerificationStatus;
  featured: boolean;
  ownerReply: string | null;
  createdAt: string;
};

export type ReviewSummary = {
  verifiedCount: number;
  verifiedAverage: number | null;
};

export type ReviewListResult = {
  reviews: ReviewPublic[];
  summary: ReviewSummary;
  nextCursor: string | null;
  unavailable: boolean;
};

export type AdminReview = ReviewPublic & {
  fullName: string;
  displayFullName: boolean;
  phone: string | null;
  phonePurgeAt: string | null;
  visibilityStatus: ReviewVisibilityStatus;
  source: string;
  consentTextVersion: string;
  consentAcceptedAt: string;
  updatedAt: string;
};

