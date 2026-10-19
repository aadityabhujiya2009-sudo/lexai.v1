import { ApiError, GoogleGenAI } from "@google/genai";

import {
  LegalInformationProviderError,
  type LegalInformationProvider,
  type LegalInformationRequest,
  type LegalInformationResponse,
} from "@/lib/ai/provider";
import { LEGAL_INFORMATION_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

export const GEMINI_MODEL = "gemini-3.5-flash-lite";

const REQUEST_TIMEOUT_MS = 30_000;

export class GeminiLegalInformationProvider implements LegalInformationProvider {
  private readonly client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: REQUEST_TIMEOUT_MS,
        retryOptions: { attempts: 1 },
      },
    });
  }

  async getInformation(request: LegalInformationRequest): Promise<LegalInformationResponse> {
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    try {
      const timeout = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          reject(new LegalInformationProviderError("timeout"));
        }, REQUEST_TIMEOUT_MS);
      });
      const contents = request.messages.map(({ role, content }) => ({
        role: role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: content }],
      }));

      const response = await Promise.race([
        this.client.models.generateContent({
          model: GEMINI_MODEL,
          contents,
          config: { systemInstruction: LEGAL_INFORMATION_SYSTEM_PROMPT },
        }),
        timeout,
      ]);
      const text = response.text?.trim();

      if (!text) {
        throw new LegalInformationProviderError("empty_response");
      }

      return { text };
    } catch (error) {
      if (error instanceof LegalInformationProviderError) {
        throw error;
      }

      if (error instanceof ApiError) {
        if (error.status === 429) {
          throw new LegalInformationProviderError("rate_limit", error.status);
        }

        if (error.status === 408 || error.status === 504) {
          throw new LegalInformationProviderError("timeout", error.status);
        }

        throw new LegalInformationProviderError("unavailable", error.status);
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new LegalInformationProviderError("timeout");
      }

      throw new LegalInformationProviderError("unknown");
    } finally {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    }
  }
}
