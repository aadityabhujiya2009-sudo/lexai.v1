import { LegalPlaceholder } from "@/components/legal-placeholder";

// Draft, pending legal review.
export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy"
      description="This page explains how LexAI handles information. It does not promise full confidentiality, attorney-client privilege, or any special legal protection."
      sections={[
        {
          heading: "What LexAI is",
          body: "LexAI is a website-only tool that provides general legal information about Indian law for education and preparation. It is not legal advice, a lawyer, or a law firm.",
        },
        {
          heading: "Messages and the Gemini API",
          body: "Messages you submit are sent to Google’s Gemini API so it can generate a response. LexAI does not store conversation history. Messages remain in the current browser session and are lost when you refresh or start a new chat. Google handles the request under its own service terms and privacy practices.",
        },
        {
          heading: "Terms acceptance cookie",
          body: "When you agree to the current terms, LexAI sets a first-party, httpOnly cookie named lexai_terms_acceptance. It records the accepted terms version and timestamp so the server can enforce acceptance. It is not used to store conversation content. If the terms version changes, the current cookie is no longer accepted and you will be asked again.",
        },
        {
          heading: "Rate limiting and logs",
          body: "LexAI uses a short-lived in-memory rate limiter keyed by Netlify’s platform-provided client IP. Application logs contain only sanitized request status, error category, and timing; conversation content and the client IP are not written to those logs.",
        },
        {
          heading: "Your responsibilities",
          body: "Do not submit information you do not want to send to a third-party AI service. Avoid unnecessary personal, confidential, financial, health, or other sensitive information. Identify the relevant Indian state, union territory, or other context and verify important information with a qualified Indian lawyer.",
        },
        {
          heading: "Accuracy and changes",
          body: "AI-generated information may be incomplete, incorrect, or out of date. Indian law can change, including the criminal-law framework that changed in 2024. LexAI may update this privacy notice as the service changes or legal review requires it.",
        },
        {
          heading: "Contact",
          body: "Privacy questions can be sent to [LexAI contact email to be added]. This contact detail is a placeholder for legal review.",
        },
      ]}
    />
  );
}
