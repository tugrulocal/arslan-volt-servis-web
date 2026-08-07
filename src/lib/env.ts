export function pickEnv(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => Boolean(value));
}

export function normalizeSupabaseUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;

  return value.replace(/\/rest\/v1\/?$/, "");
}
