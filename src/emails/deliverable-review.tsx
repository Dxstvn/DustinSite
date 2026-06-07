import {
  Heading,
  Hr,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { EmailButton } from "./_shared/email-button";
import { MonoLabel } from "./_shared/mono-label";
import { StatusBadge } from "./_shared/status-badge";
import {
  colors,
  baseStyles,
  fontStack,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DeliverableType = "design" | "website" | "content" | "audit" | "strategy";
type ReviewType = "approval" | "feedback" | "fyi";

interface DeliverableReviewProps {
  projectName: string;
  deliverableName: string;
  deliverableType: DeliverableType;
  description: string;
  version: string;
  isRevision: boolean;
  reviewDeadline: string;
  reviewType: ReviewType;
  reviewers: string[];
  previewImageUrl?: string;
  reviewFocusPoints: string[];
  feedbackMethod: string;
  reviewUrl: string;
  downloadUrl?: string;
  nextMilestone: string;
  nextMilestoneDate: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const deliverableTypeLabel: Record<DeliverableType, string> = {
  design: "design",
  website: "website",
  content: "content",
  audit: "audit",
  strategy: "strategy",
};

const reviewTypeLabel: Record<ReviewType, string> = {
  approval: "Approval Required",
  feedback: "Feedback Requested",
  fyi: "For Your Information",
};

function isUrgentDeadline(deadline: string): boolean {
  // Simple heuristic: check if deadline string contains indicators of urgency
  // In production, this would compare actual dates
  return deadline.toLowerCase().includes("tomorrow") || deadline.includes("24h");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DeliverableReview({
  projectName,
  deliverableName,
  deliverableType,
  description,
  version,
  isRevision,
  reviewDeadline,
  reviewType,
  reviewers,
  previewImageUrl,
  reviewFocusPoints,
  feedbackMethod,
  reviewUrl,
  downloadUrl,
  nextMilestone,
  nextMilestoneDate,
}: DeliverableReviewProps) {
  const urgent = isUrgentDeadline(reviewDeadline);

  return (
    <EmailLayout
      preview={`${deliverableName} is ready for your review — ${projectName}`}
      headerLabel="Review Request"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>
        Your {deliverableTypeLabel[deliverableType]} is ready for review.
      </Heading>
      <Text style={baseStyles.subheading}>
        {isRevision
          ? `We've incorporated your feedback and ${deliverableName} is ready for another look.`
          : `${deliverableName} for ${projectName} is ready for your review.`}
      </Text>

      {/* Deliverable Preview Card */}
      <Section style={previewCard}>
        {previewImageUrl && (
          <Img
            src={previewImageUrl}
            alt={deliverableName}
            width="536"
            style={previewImage}
          />
        )}
        <div style={previewCardContent}>
          <Text style={previewTitle}>{deliverableName}</Text>
          <Text style={previewDescription}>{description}</Text>
          <div style={{ marginTop: "12px" }}>
            <StatusBadge
              status={isRevision ? "revision-requested" : "needs-review"}
              label={isRevision ? `v${version} — Revision` : `v${version}`}
            />
          </div>
        </div>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Review Details Table */}
      <Section style={sectionBlock}>
        <MonoLabel>REVIEW DETAILS</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={detailsTable}
        >
          <tr style={tableRow}>
            <td style={tableLabelCell}>Deliverable</td>
            <td style={tableValueCell}>{deliverableName}</td>
          </tr>
          <tr style={tableRow}>
            <td style={tableLabelCell}>Version</td>
            <td style={tableValueCell}>{version}</td>
          </tr>
          <tr style={tableRow}>
            <td style={tableLabelCell}>Review Deadline</td>
            <td
              style={{
                ...tableValueCell,
                color: urgent ? colors.accentRed : colors.textPrimary,
                fontWeight: urgent ? "600" : "400",
              }}
            >
              {reviewDeadline}
              {urgent && " \u26A0"}
            </td>
          </tr>
          <tr style={tableRow}>
            <td style={tableLabelCell}>Review Type</td>
            <td style={tableValueCell}>{reviewTypeLabel[reviewType]}</td>
          </tr>
          <tr style={tableRow}>
            <td style={tableLabelCell}>Reviewers</td>
            <td style={tableValueCell}>{reviewers.join(", ")}</td>
          </tr>
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* What to Look For */}
      <Section style={sectionBlock}>
        <MonoLabel>WHAT TO LOOK FOR</MonoLabel>
        {reviewFocusPoints.map((point, i) => (
          <table
            key={i}
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ marginBottom: "10px" }}
          >
            <tr>
              <td style={focusNumberCell}>
                <Text style={focusNumber}>{i + 1}</Text>
              </td>
              <td style={focusTextCell}>
                <Text style={focusText}>{point}</Text>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      {/* How to provide feedback */}
      <Text style={feedbackNote}>{feedbackMethod}</Text>

      {/* Primary CTA */}
      <EmailButton href={reviewUrl}>Review {deliverableName}</EmailButton>

      {/* Secondary CTA */}
      {downloadUrl && (
        <EmailButton href={downloadUrl} variant="secondary">
          Download Files
        </EmailButton>
      )}

      {/* Timeline context */}
      <Text style={timelineContext}>
        Next milestone: {nextMilestone} &mdash; {nextMilestoneDate}. Your
        timely review helps us stay on track.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

DeliverableReview.PreviewProps = {
  projectName: "Meridian Ventures — Website Redesign",
  deliverableName: "Homepage Design Comp",
  deliverableType: "design",
  description:
    "High-fidelity homepage design including hero section, services overview, portfolio grid, testimonials, and footer. Desktop and mobile responsive layouts included.",
  version: "2.1",
  isRevision: true,
  reviewDeadline: "Mar 19, 2026",
  reviewType: "approval",
  reviewers: ["Sarah Chen", "David Park"],
  previewImageUrl:
    "https://placehold.co/536x300/f0ede8/525252?text=Homepage+Design+v2.1",
  reviewFocusPoints: [
    "Hero section — does the headline and imagery align with your brand voice?",
    "Services layout — are the three service tiers clearly differentiated?",
    "Portfolio grid — do the hover interactions feel polished and intuitive?",
    "Mobile responsiveness — does the layout flow naturally on smaller screens?",
  ],
  feedbackMethod:
    "Leave comments directly on the design file, or reply to this email with your notes.",
  reviewUrl: "https://figma.com/file/abc123/meridian-homepage-v2",
  downloadUrl: "https://jaspire.co/dashboard/proj_mer_2026/files/homepage-v2.zip",
  nextMilestone: "Development Kickoff",
  nextMilestoneDate: "Mar 24, 2026",
} satisfies DeliverableReviewProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const previewCard: React.CSSProperties = {
  backgroundColor: colors.surfaceWarm,
  border: `1px solid ${colors.borderWarm}`,
  borderRadius: "12px",
  overflow: "hidden",
  margin: "16px 0",
};

const previewImage: React.CSSProperties = {
  width: "100%",
  display: "block",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const previewCardContent: React.CSSProperties = {
  padding: "20px 24px",
};

const previewTitle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: colors.textPrimary,
  fontFamily: fontStack,
  margin: "0 0 8px",
  lineHeight: "1.3",
};

const previewDescription: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const detailsTable: React.CSSProperties = {
  margin: "0",
};

const tableRow: React.CSSProperties = {
  borderBottom: `1px solid ${colors.borderLight}`,
};

const tableLabelCell: React.CSSProperties = {
  padding: "10px 0",
  color: colors.textTertiary,
  fontSize: "13px",
  width: "140px",
  verticalAlign: "top" as const,
};

const tableValueCell: React.CSSProperties = {
  padding: "10px 0",
  color: colors.textPrimary,
  fontSize: "14px",
  verticalAlign: "top" as const,
};

const focusNumberCell: React.CSSProperties = {
  width: "28px",
  verticalAlign: "top" as const,
};

const focusNumber: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: colors.brandPurple,
  margin: "0",
  lineHeight: "1.65",
};

const focusTextCell: React.CSSProperties = {
  verticalAlign: "top" as const,
};

const focusText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const feedbackNote: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  lineHeight: "1.6",
  margin: "16px 0 0",
  fontStyle: "italic",
};

const timelineContext: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
