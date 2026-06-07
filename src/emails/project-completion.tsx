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
import { MetricCard } from "./_shared/metric-card";
import { InsetBox } from "./_shared/inset-box";
import {
  colors,
  baseStyles,
  fontStack,
  monoStack,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Metric {
  value: string;
  label: string;
}

interface ProjectCompletionEmailProps {
  clientFirstName: string;
  projectTitle: string;
  liveUrl?: string;
  metrics: Metric[];
  deliverables: string[];
  supportPeriod: string;
  teamLeadName: string;
  teamLeadEmail: string;
  reviewUrl: string;
  projectUrl: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProjectCompletionEmail({
  clientFirstName,
  projectTitle,
  liveUrl,
  metrics,
  deliverables,
  supportPeriod,
  teamLeadName,
  teamLeadEmail,
  reviewUrl,
  projectUrl,
}: ProjectCompletionEmailProps) {
  return (
    <EmailLayout
      preview={`${projectTitle} is live — here are your results.`}
      headerLabel="Completed"
    >
      {/* Heading */}
      <Heading style={heroHeading}>Delivered.</Heading>
      <Text style={baseStyles.subheading}>
        {clientFirstName}, {projectTitle} is complete and live. Here's a
        snapshot of what we built together.
      </Text>

      {/* Dark Card — Results */}
      <DarkCard>
        <Text style={darkSectionLabel}>RESULTS</Text>
        <MetricCard metrics={metrics} dark />
        {liveUrl && (
          <Text style={liveUrlText}>
            Live at{" "}
            <Link href={liveUrl} style={liveUrlLink}>
              {liveUrl.replace(/^https?:\/\//, "")}
            </Link>
          </Text>
        )}
      </DarkCard>

      {/* Deliverables */}
      <Section style={deliverablesSection}>
        <MonoLabel>DELIVERABLES</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          {deliverables.map((item, i) => (
            <tr key={i}>
              <td style={checkCell}>
                <Text style={greenCheck}>&#10003;</Text>
              </td>
              <td style={deliverableTextCell}>
                <Text style={deliverableItem}>{item}</Text>
              </td>
            </tr>
          ))}
        </table>
      </Section>

      {/* What's Next */}
      <Section style={nextSection}>
        <MonoLabel>WHAT'S NEXT</MonoLabel>
        <Text style={baseStyles.bodyText}>
          Your project includes <strong>{supportPeriod}</strong> of post-launch
          support — bug fixes, performance monitoring, and minor adjustments are
          all covered.
        </Text>
        <Text style={baseStyles.bodyText}>
          Beyond that, we'd love to keep the momentum going. Whether it's SEO
          optimization, content strategy, or scaling into new channels — we're
          here when you're ready.
        </Text>
      </Section>

      {/* Testimonial Request */}
      <InsetBox accent="purple">
        <Text style={testimonialText}>
          <strong>One last thing</strong> — if you're happy with the work, a
          brief testimonial would mean the world to us. It takes 30 seconds.
        </Text>
        <EmailButton href={reviewUrl} variant="secondary">
          Leave a Review
        </EmailButton>
      </InsetBox>

      {/* Primary CTA */}
      <EmailButton href={projectUrl}>View Your Project</EmailButton>

      {/* Closing */}
      <Hr style={baseStyles.hr} />
      <Text style={closingText}>
        It's been a pleasure working with you, {clientFirstName}. If you ever
        need anything, don't hesitate to reach{" "}
        <Link href={`mailto:${teamLeadEmail}`} style={baseStyles.link}>
          {teamLeadName}
        </Link>{" "}
        directly.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ProjectCompletionEmail.PreviewProps = {
  clientFirstName: "Sarah",
  projectTitle: "Meridian Ventures Website Redesign",
  liveUrl: "https://meridianventures.com",
  metrics: [
    { value: "98", label: "Lighthouse Score" },
    { value: "2.1s", label: "Load Time" },
    { value: "15", label: "Pages Delivered" },
  ],
  deliverables: [
    "Custom Next.js website with CMS integration",
    "Responsive design across all breakpoints",
    "SEO technical optimization & sitemap",
    "Analytics dashboard (GA4 + custom events)",
    "Content migration from legacy WordPress site",
    "Performance optimization (images, lazy loading, caching)",
  ],
  supportPeriod: "30 days",
  teamLeadName: "Dustin Jasmin",
  teamLeadEmail: "dustin@jaspire.co",
  reviewUrl: "https://jaspire.co/review/proj_mer_2026",
  projectUrl: "https://jaspire.co/dashboard/proj_mer_2026",
} satisfies ProjectCompletionEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const heroHeading = {
  fontSize: "32px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  lineHeight: "1.2",
  margin: "0 0 8px",
};

const darkSectionLabel = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600" as const,
  color: colors.textTertiaryOnDark,
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  margin: "0 0 16px",
  lineHeight: "1",
};

const liveUrlText = {
  fontSize: "14px",
  color: colors.textMutedOnDark,
  margin: "16px 0 0",
  textAlign: "center" as const,
  lineHeight: "1.6",
};

const liveUrlLink = {
  color: "#a78bfa",
  textDecoration: "none" as const,
  fontWeight: "500" as const,
};

const deliverablesSection = {
  margin: "32px 0 0",
};

const checkCell = {
  width: "24px",
  verticalAlign: "top" as const,
  paddingTop: "2px",
};

const greenCheck = {
  fontSize: "14px",
  color: colors.accentGreen,
  fontWeight: "700" as const,
  margin: "4px 0",
  lineHeight: "1.5",
};

const deliverableTextCell = {
  verticalAlign: "top" as const,
};

const deliverableItem = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "4px 0",
  lineHeight: "1.5",
};

const nextSection = {
  margin: "32px 0 0",
};

const testimonialText = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const closingText = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};
