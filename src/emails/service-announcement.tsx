import {
  Heading,
  Hr,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { EmailButton } from "./_shared/email-button";
import { MonoLabel } from "./_shared/mono-label";
import { DarkCard } from "./_shared/dark-card";
import {
  colors,
  baseStyles,
  fontStack,
  monoStack,
  siteUrl,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  authorName: string;
  company: string;
}

interface ServiceAnnouncementEmailProps {
  serviceName: string;
  valueProposition: string;
  painPoints: string[];
  description: string;
  includedFeatures: string[];
  qualifiers: string[];
  testimonial?: Testimonial;
  bookingUrl: string;
  monthlyCapacity?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ServiceAnnouncementEmail({
  serviceName,
  valueProposition,
  painPoints,
  description,
  includedFeatures,
  qualifiers,
  testimonial,
  bookingUrl,
  monthlyCapacity,
}: ServiceAnnouncementEmailProps) {
  return (
    <EmailLayout
      preview={`Introducing ${serviceName} — ${valueProposition}`}
      headerLabel="New Service"
    >
      {/* Announcement Hero — Dark Card */}
      <DarkCard>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr>
            <td style={accentLineCell}>
              <div style={accentLine} />
            </td>
            <td style={heroContentCell}>
              <Text style={introducingLabel}>INTRODUCING</Text>
              <Heading style={serviceNameHeading}>{serviceName}.</Heading>
              <Text style={valuePropText}>{valueProposition}</Text>
            </td>
          </tr>
        </table>
      </DarkCard>

      {/* The Problem */}
      <Section style={contentSection}>
        <MonoLabel>THE PROBLEM</MonoLabel>
        <Text style={problemIntro}>We kept hearing the same thing:</Text>
        {painPoints.map((point, i) => (
          <div key={i} style={blockquoteWrapper}>
            <Text style={blockquoteText}>&ldquo;{point}&rdquo;</Text>
          </div>
        ))}
      </Section>

      <Hr style={baseStyles.hr} />

      {/* The Solution */}
      <Section style={contentSection}>
        <MonoLabel>THE SOLUTION</MonoLabel>
        <Text style={baseStyles.bodyText}>{description}</Text>
      </Section>

      {/* What's Included */}
      <Section style={includedBox}>
        <Text style={includedHeading}>What&apos;s included:</Text>
        {includedFeatures.map((feature, i) => (
          <Text key={i} style={featureItem}>
            <span style={checkmark}>&#10003;</span> {feature}
          </Text>
        ))}
      </Section>

      {/* Who It's For */}
      <Section style={contentSection}>
        <MonoLabel>WHO IT&apos;S FOR</MonoLabel>
        <Text style={qualifierIntro}>This is for you if:</Text>
        {qualifiers.map((qualifier, i) => (
          <Text key={i} style={qualifierItem}>
            &bull; {qualifier}
          </Text>
        ))}
      </Section>

      {/* Testimonial */}
      {testimonial && (
        <DarkCard>
          <Text style={quoteText}>
            &ldquo;{testimonial.quote}&rdquo;
          </Text>
          <Text style={authorAttribution}>
            {testimonial.authorName}, {testimonial.company}
          </Text>
        </DarkCard>
      )}

      {/* CTA */}
      <EmailButton href={bookingUrl}>Book a Discovery Call</EmailButton>

      {/* Scarcity Note */}
      {monthlyCapacity && (
        <Text style={scarcityNote}>
          Limited availability — we take on {monthlyCapacity} new clients per
          month.
        </Text>
      )}
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ServiceAnnouncementEmail.PreviewProps = {
  serviceName: "Growth Engine",
  valueProposition:
    "A done-for-you SEO and content system that turns your website into a lead generation machine.",
  painPoints: [
    "We publish blog posts but nobody reads them. Our organic traffic has been flat for a year.",
    "We know we need SEO but don't have the bandwidth or expertise in-house. Every agency just sends us spreadsheets.",
    "We're paying for ads to get traffic that we should be getting for free. It's not sustainable.",
  ],
  description:
    "Growth Engine is our end-to-end organic growth service. We handle everything — from technical SEO audits and keyword strategy to content production and link building. You get a dedicated strategist, monthly content drops, and a dashboard that shows exactly what's working. No spreadsheets. No guesswork. Just compounding organic traffic.",
  includedFeatures: [
    "Full technical SEO audit and ongoing optimization",
    "Keyword strategy mapped to your buyer journey",
    "4 long-form articles per month (2,000+ words each)",
    "Internal linking architecture and content clustering",
    "Monthly performance report with plain-English insights",
    "Quarterly strategy refresh based on what's working",
  ],
  qualifiers: [
    "You have a product or service with a proven market — you just need more people to find it.",
    "You're tired of paying for traffic that disappears the moment you stop spending.",
    "You want a partner who executes, not a consultant who advises.",
  ],
  testimonial: {
    quote:
      "Within 6 months, our organic traffic outpaced our paid spend. Growth Engine paid for itself in the first quarter.",
    authorName: "David Park",
    company: "Noma Health",
  },
  bookingUrl: "https://cal.com/jaspire/discovery",
  monthlyCapacity: 4,
} satisfies ServiceAnnouncementEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const accentLineCell: React.CSSProperties = {
  width: "20px",
  verticalAlign: "top",
  paddingTop: "4px",
};

const accentLine: React.CSSProperties = {
  width: "3px",
  height: "60px",
  background: `linear-gradient(180deg, ${colors.brandPurple} 0%, ${colors.accentBlue} 100%)`,
  borderRadius: "2px",
};

const heroContentCell: React.CSSProperties = {
  verticalAlign: "top",
  paddingLeft: "16px",
};

const introducingLabel: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600",
  color: colors.textMutedOnDark,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  margin: "0 0 12px",
  lineHeight: "1",
};

const serviceNameHeading: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "700",
  color: colors.textOnDark,
  lineHeight: "1.15",
  margin: "0 0 12px",
  fontFamily: fontStack,
};

const valuePropText: React.CSSProperties = {
  fontSize: "16px",
  color: colors.textMutedOnDark,
  lineHeight: "1.6",
  margin: "0",
};

const contentSection: React.CSSProperties = {
  marginTop: "32px",
};

const problemIntro: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 16px",
  lineHeight: "1.5",
};

const blockquoteWrapper: React.CSSProperties = {
  borderLeft: `2px solid ${colors.borderWarm}`,
  paddingLeft: "16px",
  margin: "0 0 16px",
};

const blockquoteText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  lineHeight: "1.6",
  margin: "0",
  fontStyle: "italic",
};

const includedBox: React.CSSProperties = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const includedHeading: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 16px",
  lineHeight: "1.4",
};

const featureItem: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textPrimary,
  lineHeight: "2.0",
  margin: "0",
};

const checkmark: React.CSSProperties = {
  color: colors.brandPurple,
  fontWeight: "700",
  marginRight: "8px",
};

const qualifierIntro: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 12px",
  lineHeight: "1.5",
};

const qualifierItem: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  lineHeight: "1.7",
  margin: "0 0 8px",
  paddingLeft: "4px",
};

const quoteText: React.CSSProperties = {
  fontSize: "16px",
  fontStyle: "italic",
  color: colors.textOnDark,
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const authorAttribution: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textMutedOnDark,
  margin: "0",
  lineHeight: "1.4",
};

const scarcityNote: React.CSSProperties = {
  fontSize: "13px",
  fontStyle: "italic",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
