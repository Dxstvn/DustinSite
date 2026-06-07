import {
  Heading,
  Hr,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { EmailButton } from "./_shared/email-button";
import { MonoLabel } from "./_shared/mono-label";
import { InsetBox } from "./_shared/inset-box";
import {
  colors,
  baseStyles,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeedbackItem {
  summary: string;
  action: string;
  timeline: string;
}

interface FeedbackAcknowledgmentProps {
  projectName: string;
  clientName: string;
  deliverableName: string;
  feedbackItems: FeedbackItem[];
  scopeImpactNote?: string;
  nextSteps: string[];
  timelineUrl?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeedbackAcknowledgment({
  projectName,
  clientName,
  deliverableName,
  feedbackItems,
  scopeImpactNote,
  nextSteps,
  timelineUrl,
}: FeedbackAcknowledgmentProps) {
  return (
    <EmailLayout
      preview={`Feedback received for ${deliverableName} — here's what happens next.`}
      headerLabel="Feedback Received"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>Thank you for your feedback.</Heading>
      <Text style={baseStyles.subheading}>
        Here&apos;s what we heard and what happens next.
      </Text>

      <Text style={baseStyles.bodyText}>
        We&apos;ve reviewed your feedback on{" "}
        <strong style={{ color: colors.textPrimary }}>{deliverableName}</strong>{" "}
        for {projectName}. Below is our summary and action plan.
      </Text>

      {/* Feedback Summary */}
      <Section style={sectionBlock}>
        <MonoLabel>YOUR FEEDBACK</MonoLabel>
        <InsetBox>
          {feedbackItems.map((item, i) => (
            <Text key={i} style={feedbackSummaryItem}>
              <span style={feedbackNumber}>{i + 1}.</span> {item.summary}
            </Text>
          ))}
        </InsetBox>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Action Plan Table */}
      <Section style={sectionBlock}>
        <MonoLabel>ACTION PLAN</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={actionTable}
        >
          {/* Header */}
          <tr>
            <td style={tableHeaderCell}>Feedback Point</td>
            <td style={tableHeaderCell}>Action</td>
            <td style={{ ...tableHeaderCell, width: "90px" }}>Timeline</td>
          </tr>
          {/* Rows */}
          {feedbackItems.map((item, i) => (
            <tr key={i}>
              <td style={tableDataCell}>{item.summary}</td>
              <td style={tableDataCell}>{item.action}</td>
              <td style={{ ...tableDataCell, width: "90px", whiteSpace: "nowrap" }}>
                {item.timeline}
              </td>
            </tr>
          ))}
        </table>
      </Section>

      {/* Impact Assessment (only if present) */}
      {scopeImpactNote && (
        <>
          <Hr style={baseStyles.hr} />
          <Section style={sectionBlock}>
            <MonoLabel>IMPACT ASSESSMENT</MonoLabel>
            <InsetBox accent="orange">
              <Text style={impactText}>{scopeImpactNote}</Text>
            </InsetBox>
          </Section>
        </>
      )}

      <Hr style={baseStyles.hr} />

      {/* What Happens Next */}
      <Section style={sectionBlock}>
        <MonoLabel>WHAT HAPPENS NEXT</MonoLabel>
        {nextSteps.map((step, i) => (
          <table
            key={i}
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ marginBottom: "8px" }}
          >
            <tr>
              <td style={bulletCell}>
                <span style={{ color: colors.brandPurple, fontSize: "14px" }}>
                  &#8226;
                </span>
              </td>
              <td>
                <Text style={stepText}>{step}</Text>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      {/* CTA */}
      {timelineUrl && (
        <EmailButton href={timelineUrl} variant="secondary">
          View Project Timeline
        </EmailButton>
      )}

      {/* Muted sign-off */}
      <Text style={mutedNote}>
        We&apos;ll keep you posted as we work through these updates. Reply to
        this email with any questions.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

FeedbackAcknowledgment.PreviewProps = {
  projectName: "Meridian Ventures — Website Redesign",
  clientName: "Sarah Chen",
  deliverableName: "Homepage Design Comp v2.1",
  feedbackItems: [
    {
      summary: "Hero headline feels too generic — needs more brand personality",
      action:
        "Rewrite hero copy with 3 options reflecting Meridian's bold positioning",
      timeline: "2 days",
    },
    {
      summary: "Portfolio grid needs larger thumbnails on desktop",
      action: "Increase grid card size from 3-column to 2-column layout on desktop",
      timeline: "1 day",
    },
    {
      summary: "Add client logos to the social proof section",
      action:
        "Integrate 6 client logos in a horizontal scrolling bar below the hero",
      timeline: "1 day",
    },
    {
      summary: "Footer CTA should match the homepage hero energy",
      action: "Redesign footer CTA with dark background and animated button",
      timeline: "2 days",
    },
  ],
  scopeImpactNote:
    "Adding the client logo carousel is outside the original scope but we can absorb it within the current sprint. No timeline or budget impact. We'll include it as part of the hero section updates.",
  nextSteps: [
    "Hero copy revisions delivered by Wednesday Mar 18",
    "Updated design comp shared for async review by Friday Mar 20",
    "15-minute walkthrough call scheduled for Monday Mar 23",
    "Development begins once design is approved",
  ],
  timelineUrl: "https://jaspire.co/dashboard/proj_mer_2026/timeline",
} satisfies FeedbackAcknowledgmentProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const feedbackSummaryItem: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const feedbackNumber: React.CSSProperties = {
  fontWeight: "700",
  color: colors.textPrimary,
};

const actionTable: React.CSSProperties = {
  margin: "0",
  borderCollapse: "collapse" as const,
};

const tableHeaderCell: React.CSSProperties = {
  padding: "10px 8px 10px 0",
  fontSize: "11px",
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  borderBottom: `2px solid ${colors.borderWarm}`,
  verticalAlign: "bottom" as const,
};

const tableDataCell: React.CSSProperties = {
  padding: "12px 8px 12px 0",
  fontSize: "13px",
  color: colors.textSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: "top" as const,
  lineHeight: "1.5",
};

const impactText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const bulletCell: React.CSSProperties = {
  width: "16px",
  verticalAlign: "top" as const,
  paddingTop: "1px",
};

const stepText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const mutedNote: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
