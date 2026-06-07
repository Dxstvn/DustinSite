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
  accentColorMap,
  badgeBgMap,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ServiceTag {
  label: string;
  accent: "blue" | "green" | "orange";
}

interface Milestone {
  title: string;
  dateRange: string;
  description: string;
  isCurrent: boolean;
}

interface ProjectKickoffEmailProps {
  clientFirstName: string;
  projectTitle: string;
  serviceTags: ServiceTag[];
  startDate: string;
  targetDate: string;
  teamLeadName: string;
  clientContactName: string;
  milestones: Milestone[];
  actionItems: string[];
  dashboardUrl: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProjectKickoffEmail({
  clientFirstName,
  projectTitle,
  serviceTags,
  startDate,
  targetDate,
  teamLeadName,
  clientContactName,
  milestones,
  actionItems,
  dashboardUrl,
}: ProjectKickoffEmailProps) {
  const keyFacts = [
    { label: "Start Date", value: startDate },
    { label: "Target Launch", value: targetDate },
    { label: "Project Lead", value: teamLeadName },
    { label: "Your Contact", value: clientContactName },
  ];

  return (
    <EmailLayout
      preview={`${projectTitle} is officially underway — here's your project plan.`}
      headerLabel="Kickoff"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>We're building.</Heading>
      <Text style={baseStyles.subheading}>
        Hi {clientFirstName}, {projectTitle} is officially underway. Below is
        everything you need to stay in the loop.
      </Text>

      {/* Dark Card — Project Overview */}
      <DarkCard>
        <Text style={darkProjectTitle}>{projectTitle}</Text>

        {/* Service Tags */}
        <div style={tagsRow}>
          {serviceTags.map((tag) => (
            <span
              key={tag.label}
              style={{
                ...darkTagPill,
                backgroundColor: badgeBgMap[tag.accent],
                color: accentColorMap[tag.accent],
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* 2x2 Key Facts Grid */}
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={factsTable}
        >
          <tr>
            {keyFacts.slice(0, 2).map((fact) => (
              <td key={fact.label} style={factCell}>
                <Text style={factLabel}>{fact.label}</Text>
                <Text style={factValue}>{fact.value}</Text>
              </td>
            ))}
          </tr>
          <tr>
            {keyFacts.slice(2, 4).map((fact) => (
              <td key={fact.label} style={factCell}>
                <Text style={factLabel}>{fact.label}</Text>
                <Text style={factValue}>{fact.value}</Text>
              </td>
            ))}
          </tr>
        </table>
      </DarkCard>

      {/* Milestone Timeline */}
      <Section style={milestonesSection}>
        <MonoLabel>MILESTONES</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          {milestones.map((milestone, i) => (
            <tr key={i}>
              {/* Timeline column: dot + connecting line */}
              <td style={timelineColumn}>
                <div
                  style={{
                    ...timelineDot,
                    ...(milestone.isCurrent
                      ? timelineDotCurrent
                      : timelineDotFuture),
                  }}
                />
                {i < milestones.length - 1 && <div style={timelineLine} />}
              </td>
              {/* Content column */}
              <td style={milestoneContent}>
                <Text style={milestoneTitle}>{milestone.title}</Text>
                <Text style={milestoneDate}>{milestone.dateRange}</Text>
                <Text style={milestoneDesc}>{milestone.description}</Text>
              </td>
            </tr>
          ))}
        </table>
      </Section>

      {/* Action Items */}
      <Section style={actionSection}>
        <MonoLabel>ACTION ITEMS</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          {actionItems.map((item, i) => (
            <tr key={i}>
              <td style={checkboxCell}>
                <div style={checkbox} />
              </td>
              <td style={actionTextCell}>
                <Text style={actionText}>{item}</Text>
              </td>
            </tr>
          ))}
        </table>
      </Section>

      {/* Primary CTA */}
      <EmailButton href={dashboardUrl}>Open Project Dashboard</EmailButton>

      {/* Muted Note */}
      <Text style={bookmarkNote}>
        Bookmark this email — it has all your project details in one place.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ProjectKickoffEmail.PreviewProps = {
  clientFirstName: "Sarah",
  projectTitle: "Meridian Ventures Brand & Web Redesign",
  serviceTags: [
    { label: "Web Development", accent: "blue" },
    { label: "SEO Strategy", accent: "green" },
  ],
  startDate: "March 24, 2026",
  targetDate: "May 30, 2026",
  teamLeadName: "Dustin Jasmin",
  clientContactName: "Sarah Mitchell",
  milestones: [
    {
      title: "Discovery & Strategy",
      dateRange: "Mar 24 – Apr 4",
      description:
        "Stakeholder interviews, competitive audit, and strategic brief delivery.",
      isCurrent: true,
    },
    {
      title: "Design Phase",
      dateRange: "Apr 7 – Apr 25",
      description:
        "Wireframes, visual design concepts, and interactive prototypes.",
      isCurrent: false,
    },
    {
      title: "Development",
      dateRange: "Apr 28 – May 16",
      description:
        "Frontend build, CMS integration, and responsive implementation.",
      isCurrent: false,
    },
    {
      title: "QA & Launch",
      dateRange: "May 19 – May 30",
      description:
        "Cross-browser testing, performance optimization, and go-live.",
      isCurrent: false,
    },
  ],
  actionItems: [
    "Share brand assets and style guides (logos, fonts, colors)",
    "Provide access to current website CMS and analytics",
    "Confirm stakeholders for the kickoff call",
    "Review and sign the project brief by March 26",
  ],
  dashboardUrl: "https://jaspire.co/dashboard/proj_mer_2026",
} satisfies ProjectKickoffEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const darkProjectTitle = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: colors.textOnDark,
  fontFamily: fontStack,
  margin: "0 0 12px",
  lineHeight: "1.4",
};

const tagsRow = {
  marginBottom: "20px",
};

const darkTagPill = {
  display: "inline-block" as const,
  fontSize: "11px",
  fontWeight: "600" as const,
  padding: "4px 10px",
  borderRadius: "99px",
  marginRight: "6px",
  lineHeight: "1.6",
};

const factsTable = {
  marginTop: "4px",
};

const factCell = {
  width: "50%",
  padding: "8px 0",
  verticalAlign: "top" as const,
};

const factLabel = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600" as const,
  color: colors.textTertiaryOnDark,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const factValue = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: colors.textOnDark,
  margin: "0",
  lineHeight: "1.4",
};

const milestonesSection = {
  margin: "32px 0 0",
};

const timelineColumn = {
  width: "32px",
  verticalAlign: "top" as const,
  paddingTop: "4px",
};

const timelineDot = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  marginLeft: "2px",
};

const timelineDotCurrent = {
  backgroundColor: colors.brandPurple,
};

const timelineDotFuture = {
  backgroundColor: "transparent",
  border: `2px solid ${colors.borderWarm}`,
  width: "12px",
  height: "12px",
  boxSizing: "border-box" as const,
};

const timelineLine = {
  width: "2px",
  height: "48px",
  backgroundColor: colors.borderLight,
  marginLeft: "7px",
  marginTop: "4px",
};

const milestoneContent = {
  verticalAlign: "top" as const,
  paddingBottom: "24px",
  paddingLeft: "8px",
};

const milestoneTitle = {
  fontSize: "15px",
  fontWeight: "600" as const,
  color: colors.textPrimary,
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const milestoneDate = {
  fontSize: "12px",
  fontFamily: monoStack,
  color: colors.textTertiary,
  margin: "0 0 4px",
  lineHeight: "1.4",
};

const milestoneDesc = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const actionSection = {
  margin: "32px 0 0",
};

const checkboxCell = {
  width: "28px",
  verticalAlign: "top" as const,
  paddingTop: "6px",
};

const checkbox = {
  width: "16px",
  height: "16px",
  border: `2px solid ${colors.brandPurple}`,
  borderRadius: "3px",
};

const actionTextCell = {
  verticalAlign: "top" as const,
};

const actionText = {
  fontSize: "14px",
  color: colors.textPrimary,
  margin: "4px 0 12px",
  lineHeight: "1.5",
};

const bookmarkNote = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center" as const,
  fontStyle: "italic" as const,
  margin: "0",
  lineHeight: "1.6",
};
