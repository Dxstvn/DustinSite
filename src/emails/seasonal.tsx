import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { EmailFooter } from "./_shared/email-footer";
import { MetricCard } from "./_shared/metric-card";
import { MonoLabel } from "./_shared/mono-label";
import {
  colors,
  baseStyles,
  fontStack,
  containerMaxWidth,
  containerRadius,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Season = "new-year" | "summer" | "thanksgiving" | "holiday";

interface YearInReview {
  metrics: { value: string; label: string }[];
}

interface SeasonalEmailProps {
  season: Season;
  year: number;
  heroImageUrl: string;
  personalMessage: string;
  senderName: string;
  senderTitle: string;
  yearInReview?: YearInReview;
}

// ---------------------------------------------------------------------------
// Season Config
// ---------------------------------------------------------------------------

const seasonConfig: Record<Season, { previewPrefix: string }> = {
  "new-year": { previewPrefix: "Happy New Year" },
  summer: { previewPrefix: "Happy Summer" },
  thanksgiving: { previewPrefix: "Happy Thanksgiving" },
  holiday: { previewPrefix: "Happy Holidays" },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SeasonalEmail({
  season,
  year,
  heroImageUrl,
  personalMessage,
  senderName,
  senderTitle,
  yearInReview,
}: SeasonalEmailProps) {
  const config = seasonConfig[season];

  return (
    <Html>
      <Head />
      <Preview>
        {config.previewPrefix} from Jaspire — wishing you a wonderful {String(year)}.
      </Preview>
      <Body style={baseStyles.body}>
        <Container style={container}>
          {/* Hero Image — the centerpiece */}
          <Img
            src={heroImageUrl}
            alt={`${config.previewPrefix} from Jaspire`}
            width="600"
            height="400"
            style={heroImage}
          />

          {/* Centered Wordmark */}
          <Text style={wordmark}>jaspire</Text>

          {/* Generous Whitespace */}
          <div style={spacer32} />

          {/* Personal Message */}
          <Section style={messageSection}>
            <Text style={messageText}>{personalMessage}</Text>
          </Section>

          {/* Generous Whitespace */}
          <div style={spacer32} />

          {/* Signature */}
          <Text style={signatureName}>&mdash; {senderName}</Text>
          <Text style={signatureTitle}>{senderTitle}</Text>

          {/* Year in Review (Dec/Jan only) */}
          {yearInReview && (
            <Section style={yearReviewSection}>
              <MonoLabel>OUR YEAR IN NUMBERS</MonoLabel>
              <div style={yearReviewSpacer} />
              {/* Render metrics in rows of 2 */}
              <MetricCard
                metrics={yearInReview.metrics.slice(0, 2)}
              />
              {yearInReview.metrics.length > 2 && (
                <>
                  <div style={metricRowGap} />
                  <MetricCard
                    metrics={yearInReview.metrics.slice(2, 4)}
                  />
                </>
              )}
            </Section>
          )}

          {/* Minimal Footer */}
          <EmailFooter variant="minimal" />
        </Container>
      </Body>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

SeasonalEmail.PreviewProps = {
  season: "new-year",
  year: 2026,
  heroImageUrl:
    "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&h=800&fit=crop",
  personalMessage:
    "As we step into 2026, I wanted to take a moment to thank you — for your trust, your partnership, and the work we've built together. Last year pushed us to think bigger, move faster, and care more deeply about the craft. Every project reminded us why we do this. Here's to another year of building things that matter. We're grateful to have you in our corner.",
  senderName: "Dustin Jasmin",
  senderTitle: "Founder & Creative Director, Jaspire",
  yearInReview: {
    metrics: [
      { value: "47", label: "Projects Delivered" },
      { value: "18", label: "New Partnerships" },
      { value: "+312%", label: "Avg. Client Traffic Growth" },
      { value: "99.8%", label: "Uptime Across All Sites" },
    ],
  },
} satisfies SeasonalEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const container: React.CSSProperties = {
  backgroundColor: colors.containerBg,
  borderRadius: containerRadius,
  maxWidth: containerMaxWidth,
  margin: "0 auto",
  padding: "0",
  overflow: "hidden",
};

const heroImage: React.CSSProperties = {
  width: "100%",
  display: "block",
  objectFit: "cover",
};

const wordmark: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: colors.textPrimary,
  letterSpacing: "-0.02em",
  textAlign: "center",
  margin: "24px 0 0",
  lineHeight: "1",
  fontFamily: fontStack,
};

const spacer32: React.CSSProperties = {
  height: "32px",
};

const messageSection: React.CSSProperties = {
  maxWidth: "440px",
  margin: "0 auto",
  padding: "0 32px",
};

const messageText: React.CSSProperties = {
  fontSize: "16px",
  color: colors.textPrimary,
  lineHeight: "1.7",
  textAlign: "center",
  margin: "0",
  fontFamily: fontStack,
};

const signatureName: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: colors.textPrimary,
  textAlign: "center",
  margin: "0 0 4px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const signatureTitle: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.4",
};

const yearReviewSection: React.CSSProperties = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "8px",
  padding: "28px 24px",
  margin: "40px 32px 32px",
};

const yearReviewSpacer: React.CSSProperties = {
  height: "8px",
};

const metricRowGap: React.CSSProperties = {
  height: "20px",
};
