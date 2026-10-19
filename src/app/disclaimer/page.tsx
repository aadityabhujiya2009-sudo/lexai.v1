import { LegalPlaceholder } from "@/components/legal-placeholder";

// Draft, pending legal review.
export default function DisclaimerPage() {
  return (
    <LegalPlaceholder
      title="Disclaimer"
      description="LexAI gives general legal information about Indian law only, not legal advice. It is not a lawyer or law firm, and it does not guarantee outcomes."
      sections={[
        {
          heading: "Use for orientation only",
          body: "A response may not reflect the law that applies to your facts, may omit important context, and may contain errors. Indian law can change and information may be incomplete or out of date.",
        },
        {
          heading: "India-only scope",
          body: "LexAI’s first-launch scope is general information about Indian law only. If you ask about another country, LexAI should say that the question is outside its scope. Tell the assistant the relevant Indian state or union territory when it matters.",
        },
        {
          heading: "Speak with a lawyer",
          body: "For urgent, serious, or high-stakes matters, contact a qualified Indian lawyer. Do not treat a LexAI response as a legal opinion or a promise about what will happen.",
        },
      ]}
    />
  );
}
