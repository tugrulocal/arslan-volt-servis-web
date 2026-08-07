export function formatPublicName(
  fullName: string,
  displayFullName: boolean,
): string {
  const normalizedName = fullName.replace(/\s+/g, " ").trim();
  if (!normalizedName) return "Müşteri";
  if (displayFullName) return normalizedName;

  const parts = normalizedName.split(" ");
  const maskedParts = parts
    .filter(Boolean)
    .map((part) => {
      const firstLetter = part.slice(0, 1).toLocaleUpperCase("tr-TR");
      return firstLetter ? `${firstLetter}****` : "****";
    });

  return maskedParts.join(" ") || "Müşteri";
}

export function formatReviewDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
