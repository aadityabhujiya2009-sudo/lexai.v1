/**
 * Provider boundary for the future server-side legal-information assistant.
 * Keep provider-specific SDKs and credentials outside this interface.
 */
export type LegalInformationRequest = {
  prompt: string;
  context?: string;
};

export type LegalInformationResponse = {
  text: string;
  disclaimer: string;
};

export interface LegalInformationProvider {
  getInformation(request: LegalInformationRequest): Promise<LegalInformationResponse>;
}
