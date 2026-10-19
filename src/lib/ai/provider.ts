/** Provider-neutral boundary for the server-side legal-information assistant. */
export type LegalInformationRole = "user" | "assistant";

export type LegalInformationMessage = {
  role: LegalInformationRole;
  content: string;
};

export type LegalInformationRequest = {
  messages: readonly LegalInformationMessage[];
};

export type LegalInformationResponse = {
  text: string;
};

export interface LegalInformationProvider {
  getInformation(request: LegalInformationRequest): Promise<LegalInformationResponse>;
}

export type LegalInformationProviderErrorKind =
  | "rate_limit"
  | "timeout"
  | "unavailable"
  | "empty_response"
  | "unknown";

export class LegalInformationProviderError extends Error {
  readonly kind: LegalInformationProviderErrorKind;
  readonly status?: number;

  constructor(kind: LegalInformationProviderErrorKind, status?: number) {
    super(kind);
    this.name = "LegalInformationProviderError";
    this.kind = kind;
    this.status = status;
  }
}
