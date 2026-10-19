import { LegalPlaceholder } from "@/components/legal-placeholder";

// Draft, pending legal review.
export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms"
      description="These terms set out the basic rules for using LexAI."
      sections={[
        {
          heading: "Nature of the service",
          body: "LexAI is a website-only tool that provides general legal information about Indian law for education and preparation. Its first-launch scope is India only. It does not provide legal information about other countries as though Indian law applied there.",
        },
        {
          heading: "No legal advice or attorney-client relationship",
          body: "LexAI is not a lawyer or law firm. Its responses are not legal advice, a legal opinion, or a substitute for advice from a qualified Indian lawyer. Using LexAI does not create an attorney-client relationship or any other professional relationship.",
        },
        {
          heading: "User responsibilities",
          body: "You must be at least 18 years old to use the assistant and must use it lawfully. You are responsible for the information you provide, for identifying the relevant Indian state or union territory, and for verifying important information with a qualified lawyer. Do not submit information you do not want to send to a third-party AI service.",
        },
        {
          heading: "AI limitations and changing law",
          body: "AI-generated responses can be wrong, incomplete, uncertain, or out of date. Indian law can change; for example, the BNS, BNSS, and BSA came into force on 1 July 2024 and replaced the IPC, CrPC, and Indian Evidence Act in the relevant areas. LexAI does not guarantee accuracy, completeness, or any legal outcome.",
        },
        {
          heading: "Data handling and third-party provider",
          body: "Messages are sent to Google’s Gemini API to generate responses. LexAI does not store conversation history. See the Privacy page for information about the terms-acceptance cookie, rate limiting, logs, and Google’s role as a third-party service provider.",
        },
        {
          heading: "Limitation of liability",
          body: "To the fullest extent permitted by applicable law, LexAI and its operators will not be responsible for losses, harm, or decisions arising from your use of, or reliance on, the service or its responses. Nothing in these terms limits responsibility that cannot legally be limited.",
        },
        {
          heading: "Governing law and courts",
          body: "These draft terms are intended to be governed by the laws of India. Court location and exclusive jurisdiction: [to be completed by lawyer]. This placeholder must be completed before launch.",
        },
        {
          heading: "Changes to these terms",
          body: "LexAI may update these terms as the service or legal requirements change. Each version will have a version identifier. If the current version changes, you will need to review and accept the updated terms before using the assistant again.",
        },
        {
          heading: "Contact",
          body: "Questions about these terms can be sent to [LexAI contact email to be added]. This contact detail is a placeholder for legal review.",
        },
      ]}
    />
  );
}
