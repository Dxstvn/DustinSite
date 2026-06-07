import {
  Hr,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { EmailButton } from "./_shared/email-button";
import { MonoLabel } from "./_shared/mono-label";
import { InsetBox } from "./_shared/inset-box";
import { MetricCard } from "./_shared/metric-card";
import { DarkCard } from "./_shared/dark-card";
import {
  colors,
  baseStyles,
  fontStack,
  monoStack,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CompletedItem {
  name: string;
  status: "completed" | "in-progress";
}

interface UpcomingItem {
  name: string;
  owner: string;
}

interface Blocker {
  description: string;
  dueDate?: string;
}

interface ProjectStatusUpdateProps {
  projectName: string;
  clientName: string;
  pmName: string;
  dateRange: string;
  currentPhase: 1 | 2 | 3 | 4;
  completionPercent: number;
  hoursUsed: number;
  hoursTotal: number;
  nextMilestone: string;
  nextMilestoneDate: string;
  summary: string;
  completedItems: CompletedItem[];
  upcomingItems: UpcomingItem[];
  blockers?: Blocker[];
  reportUrl?: string;
  bookingUrl?: string;
}

// ---------------------------------------------------------------------------
// Phase Progress Indicator
// ---------------------------------------------------------------------------

const phases = ["Discovery", "Strategy", "Execution", "Growth"] as const;

function PhaseProgress({ currentPhase }: { currentPhase: 1 | 2 | 3 | 4 }) {
  return (
    <Section style={{ margin: "24px 0" }}>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
      >
        <tr>
          {phases.map((phase, i) => {
            const phaseNum = i + 1;
            const isCompleted = phaseNum < currentPhase;
            const isCurrent = phaseNum === currentPhase;
            const isFuture = phaseNum > currentPhase;

            return (
              <td
                key={phase}
                style={{
                  width: "25%",
                  textAlign: "center" as const,
                  verticalAlign: "top" as const,
                }}
              >
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                >
                  {/* Circle row */}
                  <tr>
                    <td style={{ textAlign: "center" as const, height: "36px" }}>
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        role="presentation"
                        style={{ margin: "0 auto" }}
                      >
                        <tr>
                          {/* Left connector line */}
                          <td
                            style={{
                              width: "30px",
                              height: "2px",
                              backgroundColor:
                                i === 0
                                  ? "transparent"
                                  : isCompleted || isCurrent
                                    ? colors.brandPurple
                                    : colors.borderLight,
                            }}
                          />
                          {/* Circle */}
                          <td>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                backgroundColor:
                                  isCompleted || isCurrent
                                    ? colors.brandPurple
                                    : "transparent",
                                border: isFuture
                                  ? `2px solid ${colors.borderWarm}`
                                  : `2px solid ${colors.brandPurple}`,
                                textAlign: "center" as const,
                                lineHeight: "24px",
                                fontSize: "14px",
                                color: isCompleted
                                  ? "#ffffff"
                                  : isCurrent
                                    ? "#ffffff"
                                    : colors.textTertiary,
                                fontWeight: "600" as const,
                              }}
                            >
                              {isCompleted ? "\u2713" : isCurrent ? phaseNum : phaseNum}
                            </div>
                          </td>
                          {/* Right connector line */}
                          <td
                            style={{
                              width: "30px",
                              height: "2px",
                              backgroundColor:
                                i === 3
                                  ? "transparent"
                                  : isCompleted
                                    ? colors.brandPurple
                                    : colors.borderLight,
                            }}
                          />
                        </tr>
                      </table>
                    </td>
                  </tr>
                  {/* Label row */}
                  <tr>
                    <td style={{ textAlign: "center" as const, paddingTop: "6px" }}>
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily: monoStack,
                          fontWeight: isCurrent ? "700" : "500",
                          color: isCurrent
                            ? colors.brandPurple
                            : isCompleted
                              ? colors.textSecondary
                              : colors.textTertiary,
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.08em",
                          margin: "0",
                          lineHeight: "1.3",
                        }}
                      >
                        {phase}
                      </Text>
                    </td>
                  </tr>
                </table>
              </td>
            );
          })}
        </tr>
      </table>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProjectStatusUpdate({
  projectName,
  clientName,
  pmName,
  dateRange,
  currentPhase,
  completionPercent,
  hoursUsed,
  hoursTotal,
  nextMilestone,
  nextMilestoneDate,
  summary,
  completedItems,
  upcomingItems,
  blockers,
  reportUrl,
  bookingUrl,
}: ProjectStatusUpdateProps) {
  return (
    <EmailLayout
      preview={`${projectName} — Weekly status update for ${dateRange}`}
      headerLabel="Status Update"
    >
      {/* Dark Card Header */}
      <DarkCard>
        <Text style={darkMonoLabel}>PROJECT UPDATE</Text>
        <Text style={darkProjectName}>{projectName}</Text>
        <Text style={darkDateRange}>{dateRange}</Text>
      </DarkCard>

      {/* Phase Progress Indicator */}
      <PhaseProgress currentPhase={currentPhase} />

      {/* Summary */}
      <Hr style={baseStyles.hr} />
      <Text style={baseStyles.bodyText}>{summary}</Text>

      {/* Metrics Row */}
      <Section style={{ margin: "24px 0" }}>
        <MetricCard
          metrics={[
            { value: `${completionPercent}%`, label: "Complete" },
            { value: `${hoursUsed}/${hoursTotal}`, label: "Hours Used" },
            { value: nextMilestoneDate, label: nextMilestone },
          ]}
        />
      </Section>

      {/* Mini progress bar below metric card */}
      <Section style={{ margin: "0 0 8px" }}>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={{
            backgroundColor: colors.borderLight,
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <tr>
            <td
              style={{
                width: `${completionPercent}%`,
                height: "4px",
                backgroundColor: colors.brandPurple,
                borderRadius: "4px",
              }}
            />
            <td
              style={{
                height: "4px",
              }}
            />
          </tr>
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Completed This Week */}
      <Section style={sectionBlock}>
        <MonoLabel>COMPLETED THIS WEEK</MonoLabel>
        {completedItems.map((item, i) => (
          <table
            key={i}
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ marginBottom: "8px" }}
          >
            <tr>
              <td style={checkIconCell}>
                <span
                  style={{
                    fontSize: "14px",
                    color:
                      item.status === "completed"
                        ? colors.accentGreen
                        : colors.accentBlue,
                  }}
                >
                  {item.status === "completed" ? "\u2713" : "\u25CF"}
                </span>
              </td>
              <td style={itemTextCell}>
                <Text style={itemText}>{item.name}</Text>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Upcoming */}
      <Section style={sectionBlock}>
        <MonoLabel>UPCOMING</MonoLabel>
        {upcomingItems.map((item, i) => (
          <table
            key={i}
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ marginBottom: "8px" }}
          >
            <tr>
              <td style={numberCell}>
                <Text style={numberText}>{i + 1}.</Text>
              </td>
              <td style={itemTextCell}>
                <Text style={itemText}>
                  {item.name}
                  <span style={ownerInitials}>
                    {" "}
                    &mdash;{" "}
                    {item.owner
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </Text>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      {/* Blockers (only if present) */}
      {blockers && blockers.length > 0 && (
        <>
          <Hr style={baseStyles.hr} />
          <Section style={sectionBlock}>
            <MonoLabel>BLOCKERS</MonoLabel>
            <InsetBox accent="orange">
              {blockers.map((blocker, i) => (
                <Text key={i} style={blockerText}>
                  <span style={{ color: colors.accentOrange, fontWeight: "600" }}>
                    &#9888;
                  </span>{" "}
                  {blocker.description}
                  {blocker.dueDate && (
                    <span style={blockerDue}> &mdash; needed by {blocker.dueDate}</span>
                  )}
                </Text>
              ))}
            </InsetBox>
          </Section>
        </>
      )}

      {/* CTAs */}
      {reportUrl && (
        <EmailButton href={reportUrl}>View Full Report</EmailButton>
      )}
      {bookingUrl && (
        <EmailButton href={bookingUrl} variant="secondary">
          Schedule a Call
        </EmailButton>
      )}

      {/* Muted sign-off */}
      <Text style={mutedNote}>
        Sent by {pmName} on behalf of the Jaspire team. Reply to this email
        with any questions.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ProjectStatusUpdate.PreviewProps = {
  projectName: "Meridian Ventures — Website Redesign",
  clientName: "Sarah Chen",
  pmName: "Dustin Jasmin",
  dateRange: "Mar 10 – Mar 14, 2026",
  currentPhase: 3,
  completionPercent: 62,
  hoursUsed: 84,
  hoursTotal: 140,
  nextMilestone: "Design Review",
  nextMilestoneDate: "Mar 21",
  summary:
    "Strong progress this week. The homepage and services pages are built and responsive. We finalized the portfolio grid layout and began integrating the CMS. One blocker on brand assets — details below.",
  completedItems: [
    { name: "Homepage hero section — responsive build", status: "completed" },
    { name: "Services page — layout and content integration", status: "completed" },
    { name: "Portfolio grid — interactive hover states", status: "completed" },
    { name: "CMS integration — content modeling", status: "in-progress" },
  ],
  upcomingItems: [
    { name: "Portfolio detail pages — full build", owner: "Marcus Lee" },
    { name: "Contact form — validation and submission flow", owner: "Dustin Jasmin" },
    { name: "SEO metadata — all pages", owner: "Aisha Patel" },
    { name: "Client review session — design walkthrough", owner: "Dustin Jasmin" },
  ],
  blockers: [
    {
      description:
        "Waiting on final brand assets (logo SVG, icon set) from your design team",
      dueDate: "Mar 17",
    },
    {
      description:
        "API credentials for the CRM integration need to be shared with our dev team",
    },
  ],
  reportUrl: "https://jaspire.co/dashboard/proj_mer_2026/reports/week-6",
  bookingUrl: "https://cal.com/jaspire/30min",
} satisfies ProjectStatusUpdateProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const darkMonoLabel: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600",
  color: colors.textTertiaryOnDark,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  margin: "0 0 8px",
  lineHeight: "1",
};

const darkProjectName: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: colors.textOnDark,
  fontFamily: fontStack,
  margin: "0 0 4px",
  lineHeight: "1.3",
};

const darkDateRange: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textMutedOnDark,
  margin: "0",
  lineHeight: "1.4",
};

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const checkIconCell: React.CSSProperties = {
  width: "24px",
  verticalAlign: "top" as const,
  paddingTop: "2px",
};

const numberCell: React.CSSProperties = {
  width: "24px",
  verticalAlign: "top" as const,
};

const numberText: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.textTertiary,
  margin: "0",
  lineHeight: "1.65",
};

const itemTextCell: React.CSSProperties = {
  verticalAlign: "top" as const,
};

const itemText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const ownerInitials: React.CSSProperties = {
  fontSize: "12px",
  color: colors.textTertiary,
  fontWeight: "500",
};

const blockerText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const blockerDue: React.CSSProperties = {
  fontSize: "13px",
  color: colors.accentOrange,
  fontWeight: "500",
};

const mutedNote: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
