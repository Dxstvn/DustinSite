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
import {
  colors,
  baseStyles,
  fontStack,
  siteUrl,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RecentResult {
  metric: string;
  clientName: string;
}

interface ReferralRequestEmailProps {
  clientFirstName: string;
  projectName: string;
  specificResult: string;
  recentResults: RecentResult[];
  portfolioUrl: string;
  senderName: string;
  recipientCompany?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReferralRequestEmail({
  clientFirstName,
  projectName,
  specificResult,
  recentResults,
  portfolioUrl,
  senderName,
  recipientCompany,
}: ReferralRequestEmailProps) {
  return (
    <EmailLayout
      preview={`${clientFirstName}, a quick favor — and a thank you.`}
      footerVariant="minimal"
    >
      {/* Personal Salutation — no hero image */}
      <Heading style={salutation}>{clientFirstName},</Heading>

      {/* Appreciation */}
      <Text style={baseStyles.bodyText}>
        I wanted to take a moment to say thank you. Working on{" "}
        {projectName} with{recipientCompany ? ` the ${recipientCompany} team` : " you"} has been
        one of our favorite projects this year. Seeing {specificResult} —
        that&apos;s the kind of result that reminds us why we do this work.
      </Text>

      {/* The Ask */}
      <Text style={askIntro}>I have a favor to ask:</Text>

      <Text style={baseStyles.bodyText}>
        If you know anyone — a founder, a marketing lead, another agency —
        who&apos;s wrestling with their web presence, SEO, or social strategy,
        I&apos;d love an introduction. Nothing formal. Just a &ldquo;hey, you
        should talk to Dustin&rdquo; goes a long way. I&apos;ve put together a
        quick summary below that&apos;s easy to forward.
      </Text>

      <Hr style={baseStyles.hr} />

      {/* Forwardable Block */}
      <Section style={forwardableCard}>
        {/* Wordmark + Tagline */}
        <Text style={cardWordmark}>jaspire</Text>
        <Text style={cardTagline}>Premium Digital Agency</Text>

        <div style={cardSpacer} />

        {/* Services */}
        <Text style={cardServicesIntro}>We help brands grow through:</Text>
        <Text style={serviceLine}>
          <span style={dotBlue}>&#9679;</span> Web Development
        </Text>
        <Text style={serviceLine}>
          <span style={dotGreen}>&#9679;</span> SEO
        </Text>
        <Text style={serviceLine}>
          <span style={dotOrange}>&#9679;</span> Social Media
        </Text>

        <div style={cardSpacer} />

        {/* Recent Results */}
        <Text style={resultsLabel}>Recent results:</Text>
        {recentResults.map((result, i) => (
          <Text key={i} style={resultLine}>
            <span style={resultMetric}>{result.metric}</span>
            <span style={resultClient}> — {result.clientName}</span>
          </Text>
        ))}

        <div style={cardSpacer} />

        {/* CTA in card */}
        <EmailButton href={portfolioUrl}>See Our Work</EmailButton>

        <Text style={cardEmail}>
          <Link href="mailto:hello@jaspire.co" style={purpleLink}>
            hello@jaspire.co
          </Link>
        </Text>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Closing */}
      <Text style={baseStyles.bodyText}>
        No pressure, of course. And if there&apos;s anything we can help with on
        the {projectName} side — whether it&apos;s a refresh, new pages, or
        ongoing optimization — we&apos;re always here.
      </Text>

      <Text style={thankYouLine}>
        Thanks, {clientFirstName}.
      </Text>
      <Text style={signature}>&mdash; {senderName}</Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ReferralRequestEmail.PreviewProps = {
  clientFirstName: "Elena",
  projectName: "Meridian Ventures",
  specificResult:
    "organic traffic jump 142% and founder inbounds nearly double",
  recentResults: [
    { metric: "+142% organic traffic", clientName: "Meridian Ventures" },
    { metric: "3x lead conversion", clientName: "Noma Health" },
    { metric: "47% lower CAC", clientName: "Terrace Collective" },
  ],
  portfolioUrl: `${siteUrl}/portfolio`,
  senderName: "Dustin",
  recipientCompany: "Meridian",
} satisfies ReferralRequestEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const salutation: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 16px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const askIntro: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 12px",
  lineHeight: "1.5",
};

const forwardableCard: React.CSSProperties = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "12px",
  padding: "32px",
  margin: "16px 0",
};

const cardWordmark: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: colors.textPrimary,
  letterSpacing: "-0.02em",
  margin: "0 0 4px",
  lineHeight: "1",
  fontFamily: fontStack,
};

const cardTagline: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  margin: "0",
  lineHeight: "1.4",
};

const cardSpacer: React.CSSProperties = {
  height: "20px",
};

const cardServicesIntro: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0 0 8px",
  lineHeight: "1.4",
};

const serviceLine: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "0 0 4px",
  lineHeight: "1.7",
};

const dotBlue: React.CSSProperties = {
  color: colors.accentBlue,
  marginRight: "8px",
};

const dotGreen: React.CSSProperties = {
  color: colors.accentGreen,
  marginRight: "8px",
};

const dotOrange: React.CSSProperties = {
  color: colors.accentOrange,
  marginRight: "8px",
};

const resultsLabel: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 8px",
  lineHeight: "1.4",
};

const resultLine: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "0 0 4px",
  lineHeight: "1.6",
};

const resultMetric: React.CSSProperties = {
  fontWeight: "700",
};

const resultClient: React.CSSProperties = {
  color: colors.textTertiary,
};

const cardEmail: React.CSSProperties = {
  fontSize: "14px",
  textAlign: "center",
  margin: "0",
  lineHeight: "1.4",
};

const purpleLink: React.CSSProperties = {
  color: colors.brandPurple,
  textDecoration: "none",
};

const thankYouLine: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0 0 4px",
  lineHeight: "1.5",
};

const signature: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0",
  lineHeight: "1.4",
};
