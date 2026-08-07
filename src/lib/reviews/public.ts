import { getSupabaseAdminClient } from "../supabase/server";
import { formatPublicName } from "./format";
import type { ReviewListResult, ReviewPublic, ReviewSummary } from "./types";

type ReviewRow = {
  id: string;
  full_name: string;
  display_full_name: boolean;
  public_name: string;
  service_id: string;
  service_title: string;
  rating: number;
  comment: string;
  verification_status: "unverified" | "verified";
  featured: boolean;
  owner_reply: string | null;
  created_at: string;
};

const emptySummary: ReviewSummary = {
  verifiedCount: 0,
  verifiedAverage: null,
};

function toPublicReview(row: ReviewRow): ReviewPublic {
  return {
    id: row.id,
    publicName: formatPublicName(row.full_name, row.display_full_name),
    serviceId: row.service_id,
    serviceTitle: row.service_title,
    rating: row.rating,
    comment: row.comment,
    verificationStatus: row.verification_status,
    featured: row.featured,
    ownerReply: row.owner_reply,
    createdAt: row.created_at,
  };
}

async function getVerifiedSummary(): Promise<ReviewSummary> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return emptySummary;

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("visibility_status", "published")
    .eq("verification_status", "verified");

  if (error || !data) return emptySummary;

  const ratings = data
    .map((review) => Number(review.rating))
    .filter((rating) => Number.isFinite(rating));

  if (ratings.length < 3) {
    return {
      verifiedCount: ratings.length,
      verifiedAverage: null,
    };
  }

  const total = ratings.reduce((sum, rating) => sum + rating, 0);

  return {
    verifiedCount: ratings.length,
    verifiedAverage: Math.round((total / ratings.length) * 10) / 10,
  };
}

export async function getPublicReviews({
  cursor,
  featuredOnly = false,
  limit = 9,
  verifiedOnly = false,
}: {
  cursor?: string | null;
  featuredOnly?: boolean;
  limit?: number;
  verifiedOnly?: boolean;
} = {}): Promise<ReviewListResult> {
  const supabase = getSupabaseAdminClient();
  const summary = await getVerifiedSummary();

  if (!supabase) {
    return {
      reviews: [],
      summary,
      nextCursor: null,
      unavailable: true,
    };
  }

  let query = supabase
    .from("reviews")
    .select(
      "id, full_name, display_full_name, public_name, service_id, service_title, rating, comment, verification_status, featured, owner_reply, created_at",
    )
    .eq("visibility_status", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit + 1);

  if (verifiedOnly) {
    query = query.eq("verification_status", "verified");
  }

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error || !data) {
    return {
      reviews: [],
      summary,
      nextCursor: null,
      unavailable: true,
    };
  }

  const rows = data as ReviewRow[];
  const visibleRows = rows.slice(0, limit);
  const nextCursor = rows.length > limit ? visibleRows.at(-1)?.created_at ?? null : null;

  return {
    reviews: visibleRows.map(toPublicReview),
    summary,
    nextCursor,
    unavailable: false,
  };
}
