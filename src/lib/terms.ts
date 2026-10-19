export const CURRENT_TERMS_VERSION = "2026-10-v1";
export const TERMS_ACCEPTANCE_COOKIE = "lexai_terms_acceptance";

export function createTermsAcceptanceValue(acceptedAt: number) {
  return `${CURRENT_TERMS_VERSION}.${acceptedAt}`;
}

export function hasCurrentTermsAcceptance(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [version, timestampValue] = value.split(".");
  const timestamp = Number(timestampValue);

  return (
    version === CURRENT_TERMS_VERSION &&
    Number.isSafeInteger(timestamp) &&
    timestamp > 0 &&
    timestamp <= Date.now() + 5 * 60 * 1000
  );
}

export function getCookieValue(cookieHeader: string | null, name: string) {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie?.slice(name.length + 1);
}
