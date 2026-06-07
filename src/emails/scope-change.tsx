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
import { MetricCard } from "./_shared/metric-card";
import {
  colors,
  baseStyles,
  innerRadius,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Change {
  item: string;
  original: string;
  updated: string;
  isNew: boolean;
}

interface Option {
  name: string;
  description: string;
  timelineImpact: string;
  budgetImpact: string;
}

interface ScopeChangeProps {
  projectName: string;
  clientName: string;
  currentPhase: 1 | 2 | 3 | 4;
  context: string;
  changes: Change[];
  timelineImpact: string;
  budgetImpact: string;
  qualityImpact?: string;
  recommendation: string;
  options?: Option[];
  approvalDeadline: string;
  approveUrl: string;
  bookingUrl?: string;
  pmName: string;
  pmTitle: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScopeChange({
  projectName,
  clientName,
  currentPhase,
  context,
  changes,
  timelineImpact,
  budgetImpact,
  qualityImpact,
  recommendation,
  options,
  approvalDeadline,
  approveUrl,
  bookingUrl,
  pmName,
  pmTitle,
}: ScopeChangeProps) {
  const metrics = [
    { value: timelineImpact, label: "Timeline Impact" },
    { value: budgetImpact, label: "Budget Impact" },
  ];
  if (qualityImpact) {
    metrics.push({ value: qualityImpact, label: "Quality Impact" });
  }

  return (
    <EmailLayout
      preview={`Scope update for ${projectName} — review required by ${approvalDeadline}`}
      headerLabel="Scope Change"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>Project scope update.</Heading>
      <Text style={baseStyles.subheading}>
        A scope change has been identified for {projectName}. Here&apos;s what&apos;s
        changing, the impact, and our recommendation.
      </Text>

      {/* Context */}
      <Text style={baseStyles.bodyText}>{context}</Text>

      <Hr style={baseStyles.hr} />

      {/* What's Changing */}
      <Section style={sectionBlock}>
        <MonoLabel>WHAT&apos;S CHANGING</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={changeTable}
        >
          {/* Header */}
          <tr>
            <td style={changeHeaderCell}>Item</td>
            <td style={changeHeaderOriginal}>Original Scope</td>
            <td style={changeHeaderUpdated}>Updated Scope</td>
          </tr>
          {/* Rows */}
          {changes.map((change, i) => (
            <tr key={i}>
              <td style={changeItemCell}>
                {change.item}
                {change.isNew && (
                  <span style={newBadge}> NEW</span>
                )}
              </td>
              <td style={changeOriginalCell}>
                {change.isNew ? "\u2014" : change.original}
              </td>
              <td style={changeUpdatedCell}>{change.updated}</td>
            </tr>
          ))}
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Impact Assessment */}
      <Section style={sectionBlock}>
        <MonoLabel>IMPACT ASSESSMENT</MonoLabel>
        <MetricCard metrics={metrics} />
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Recommended Path */}
      <Section style={sectionBlock}>
        <MonoLabel>RECOMMENDED PATH</MonoLabel>
        <InsetBox accent="purple">
          <Text style={recommendationText}>{recommendation}</Text>
        </InsetBox>
      </Section>

      {/* Options (if present) */}
      {options && options.length > 0 && (
        <>
          <Hr style={baseStyles.hr} />
          <Section style={sectionBlock}>
            <MonoLabel>OPTIONS</MonoLabel>
            {options.map((option, i) => (
              <Section key={i} style={optionCard}>
                <Text style={optionName}>
                  <span style={optionNumber}>{i + 1}.</span> {option.name}
                </Text>
                <Text style={optionDescription}>{option.description}</Text>
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{ marginTop: "8px" }}
                >
                  <tr>
                    <td style={optionImpactCell}>
                      <Text style={optionImpactLabel}>Timeline</Text>
                      <Text style={optionImpactValue}>
                        {option.timelineImpact}
                      </Text>
                    </td>
                    <td style={optionImpactCell}>
                      <Text style={optionImpactLabel}>Budget</Text>
                      <Text style={optionImpactValue}>
                        {option.budgetImpact}
                      </Text>
                    </td>
                  </tr>
                </table>
              </Section>
            ))}
          </Section>
        </>
      )}

      {/* CTAs */}
      <EmailButton href={approveUrl}>Approve Scope Update</EmailButton>
      {bookingUrl && (
        <EmailButton href={bookingUrl} variant="secondary">
          Discuss This Further
        </EmailButton>
      )}

      {/* Muted closing */}
      <Text style={mutedClosing}>
        This scope update requires your approval to proceed. If we don&apos;t
        hear back by {approvalDeadline}, we&apos;ll continue with the original
        scope.
      </Text>

      {/* Sign-off */}
      <Hr style={baseStyles.hr} />
      <Text style={signOff}>
        <strong style={{ color: colors.textPrimary }}>{pmName}</strong>
        <br />
        {pmTitle}, Jaspire
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ScopeChange.PreviewProps = {
  projectName: "Meridian Ventures — Website Redesign",
  clientName: "Sarah Chen",
  currentPhase: 3,
  context:
    "During development, we identified that the portfolio section needs a more sophisticated filtering system than originally scoped. Additionally, your team requested a client portal feature during our last check-in. Here's how these changes affect the project.",
  changes: [
    {
      item: "Portfolio Filtering",
      original: "Static category tabs",
      updated: "Dynamic multi-filter with search, animated transitions",
      isNew: false,
    },
    {
      item: "Client Portal",
      original: "",
      updated:
        "Authenticated portal with project status, file downloads, and messaging",
      isNew: true,
    },
    {
      item: "Launch Date",
      original: "April 15, 2026",
      updated: "April 29, 2026",
      isNew: false,
    },
  ],
  timelineImpact: "+2 weeks",
  budgetImpact: "+$4,200",
  qualityImpact: "Enhanced",
  recommendation:
    "We recommend proceeding with both additions. The portfolio filtering upgrade is a natural evolution of the design and the client portal will significantly improve your post-launch client experience. The timeline extension is minimal and the investment delivers strong long-term value.",
  options: [
    {
      name: "Full Scope Addition",
      description:
        "Add both the advanced portfolio filtering and client portal. This is our recommended approach.",
      timelineImpact: "+2 weeks",
      budgetImpact: "+$4,200",
    },
    {
      name: "Portfolio Only",
      description:
        "Upgrade portfolio filtering now, defer client portal to a Phase 2 project.",
      timelineImpact: "+3 days",
      budgetImpact: "+$1,200",
    },
    {
      name: "Original Scope",
      description:
        "Continue with the original plan. Portfolio stays as static tabs, no client portal.",
      timelineImpact: "No change",
      budgetImpact: "No change",
    },
  ],
  approvalDeadline: "March 21, 2026",
  approveUrl: "https://jaspire.co/dashboard/proj_mer_2026/scope/sc_003/approve",
  bookingUrl: "https://cal.com/jaspire/30min",
  pmName: "Dustin Jasmin",
  pmTitle: "Creative Director",
} satisfies ScopeChangeProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const changeTable: React.CSSProperties = {
  margin: "0",
  borderCollapse: "collapse" as const,
};

const changeHeaderCell: React.CSSProperties = {
  padding: "10px 8px 10px 0",
  fontSize: "11px",
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  borderBottom: `2px solid ${colors.borderWarm}`,
  verticalAlign: "bottom" as const,
  width: "30%",
};

const changeHeaderOriginal: React.CSSProperties = {
  ...changeHeaderCell,
  width: "35%",
  backgroundColor: colors.surfaceWarm,
  padding: "10px 8px",
  borderTopLeftRadius: innerRadius,
};

const changeHeaderUpdated: React.CSSProperties = {
  ...changeHeaderCell,
  width: "35%",
  padding: "10px 8px",
};

const changeItemCell: React.CSSProperties = {
  padding: "12px 8px 12px 0",
  fontSize: "13px",
  fontWeight: "600",
  color: colors.textPrimary,
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: "top" as const,
  lineHeight: "1.5",
};

const changeOriginalCell: React.CSSProperties = {
  padding: "12px 8px",
  fontSize: "13px",
  color: colors.textSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: "top" as const,
  lineHeight: "1.5",
  backgroundColor: colors.surfaceWarm,
};

const changeUpdatedCell: React.CSSProperties = {
  padding: "12px 8px",
  fontSize: "13px",
  color: colors.textPrimary,
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: "top" as const,
  lineHeight: "1.5",
  fontWeight: "500",
};

const newBadge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: "700",
  color: colors.brandPurple,
  backgroundColor: colors.badgePurpleBg,
  padding: "2px 6px",
  borderRadius: "4px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  verticalAlign: "middle",
  marginLeft: "6px",
};

const recommendationText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const optionCard: React.CSSProperties = {
  border: `1px solid ${colors.borderLight}`,
  borderRadius: innerRadius,
  padding: "20px",
  margin: "0 0 12px",
};

const optionNumber: React.CSSProperties = {
  fontWeight: "700",
  color: colors.brandPurple,
};

const optionName: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0 0 6px",
  lineHeight: "1.4",
};

const optionDescription: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const optionImpactCell: React.CSSProperties = {
  width: "50%",
  verticalAlign: "top" as const,
};

const optionImpactLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 2px",
  lineHeight: "1",
};

const optionImpactValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0",
  lineHeight: "1.4",
};

const mutedClosing: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const signOff: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};
