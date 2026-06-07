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
import { InsetBox } from "./_shared/inset-box";
import {
  colors,
  baseStyles,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Attendee {
  name: string;
  team: "jaspire" | "client";
}

interface ActionItem {
  action: string;
  owner: string;
  ownerTeam: "jaspire" | "client";
  dueDate: string;
}

interface DiscussionNote {
  topic: string;
  summary: string;
}

interface NextMeeting {
  date: string;
  time: string;
  calendarUrl?: string;
}

interface MeetingSummaryProps {
  projectName: string;
  meetingDate: string;
  meetingDuration: string;
  meetingTopic?: string;
  currentPhase: 1 | 2 | 3 | 4;
  attendees: Attendee[];
  decisions: string[];
  actionItems: ActionItem[];
  discussionNotes: DiscussionNote[];
  nextMeeting?: NextMeeting;
  fullNotesUrl?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const teamDotColor = {
  jaspire: colors.brandPurple,
  client: colors.accentBlue,
};

const phaseLabels = ["Discovery", "Strategy", "Execution", "Growth"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MeetingSummary({
  projectName,
  meetingDate,
  meetingDuration,
  meetingTopic,
  currentPhase,
  attendees,
  decisions,
  actionItems,
  discussionNotes,
  nextMeeting,
  fullNotesUrl,
}: MeetingSummaryProps) {
  const jaspireAttendees = attendees.filter((a) => a.team === "jaspire");
  const clientAttendees = attendees.filter((a) => a.team === "client");

  return (
    <EmailLayout
      preview={`Meeting recap${meetingTopic ? `: ${meetingTopic}` : ""} — ${projectName}`}
      headerLabel="Meeting Recap"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>Meeting recap.</Heading>

      {/* Meeting Metadata */}
      <Section style={metadataSection}>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr>
            <td style={metaLabelCell}>Project</td>
            <td style={metaValueCell}>{projectName}</td>
          </tr>
          {meetingTopic && (
            <tr>
              <td style={metaLabelCell}>Topic</td>
              <td style={metaValueCell}>{meetingTopic}</td>
            </tr>
          )}
          <tr>
            <td style={metaLabelCell}>Date</td>
            <td style={metaValueCell}>{meetingDate}</td>
          </tr>
          <tr>
            <td style={metaLabelCell}>Duration</td>
            <td style={metaValueCell}>{meetingDuration}</td>
          </tr>
          <tr>
            <td style={metaLabelCell}>Phase</td>
            <td style={metaValueCell}>{phaseLabels[currentPhase - 1]}</td>
          </tr>
          <tr>
            <td style={{ ...metaLabelCell, verticalAlign: "top" as const }}>
              Attendees
            </td>
            <td style={metaValueCell}>
              <Text style={attendeeGroup}>
                <span style={teamLabel}>Jaspire:</span>{" "}
                {jaspireAttendees.map((a) => a.name).join(", ")}
              </Text>
              <Text style={attendeeGroup}>
                <span style={teamLabel}>Client:</span>{" "}
                {clientAttendees.map((a) => a.name).join(", ")}
              </Text>
            </td>
          </tr>
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Key Decisions */}
      <Section style={sectionBlock}>
        <MonoLabel>KEY DECISIONS</MonoLabel>
        <InsetBox accent="purple">
          {decisions.map((decision, i) => (
            <Text key={i} style={decisionItem}>
              <span style={decisionNumber}>{i + 1}.</span> {decision}
            </Text>
          ))}
        </InsetBox>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Action Items */}
      <Section style={sectionBlock}>
        <MonoLabel>ACTION ITEMS</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={actionTable}
        >
          {/* Header */}
          <tr>
            <td style={actionHeaderCell}>Action</td>
            <td style={{ ...actionHeaderCell, width: "120px" }}>Owner</td>
            <td style={{ ...actionHeaderCell, width: "80px", textAlign: "right" as const }}>
              Due
            </td>
          </tr>
          {/* Rows */}
          {actionItems.map((item, i) => (
            <tr key={i}>
              <td style={actionDataCell}>{item.action}</td>
              <td style={{ ...actionDataCell, width: "120px", whiteSpace: "nowrap" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: teamDotColor[item.ownerTeam],
                    marginRight: "6px",
                    verticalAlign: "middle",
                  }}
                />
                <span style={{ verticalAlign: "middle" }}>{item.owner}</span>
              </td>
              <td
                style={{
                  ...actionDataCell,
                  width: "80px",
                  textAlign: "right" as const,
                  whiteSpace: "nowrap",
                }}
              >
                {item.dueDate}
              </td>
            </tr>
          ))}
        </table>
        {/* Legend */}
        <Text style={legendText}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: colors.brandPurple,
              marginRight: "4px",
              verticalAlign: "middle",
            }}
          />
          <span style={{ verticalAlign: "middle", marginRight: "12px" }}>
            Jaspire
          </span>
          {"  "}
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: colors.accentBlue,
              marginRight: "4px",
              verticalAlign: "middle",
            }}
          />
          <span style={{ verticalAlign: "middle" }}>Client</span>
        </Text>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Discussion Notes */}
      <Section style={sectionBlock}>
        <MonoLabel>DISCUSSION NOTES</MonoLabel>
        {discussionNotes.map((note, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <Text style={discussionTopic}>{note.topic}</Text>
            <Text style={discussionSummary}>{note.summary}</Text>
          </div>
        ))}
      </Section>

      {/* Next Meeting */}
      {nextMeeting && (
        <>
          <Hr style={baseStyles.hr} />
          <Section style={sectionBlock}>
            <MonoLabel>NEXT MEETING</MonoLabel>
            <InsetBox>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
              >
                <tr>
                  <td>
                    <Text style={nextMeetingText}>
                      {nextMeeting.date} at {nextMeeting.time}
                    </Text>
                  </td>
                  {nextMeeting.calendarUrl && (
                    <td style={{ textAlign: "right" as const }}>
                      <Link
                        href={nextMeeting.calendarUrl}
                        style={calendarLink}
                      >
                        Add to Calendar &rarr;
                      </Link>
                    </td>
                  )}
                </tr>
              </table>
            </InsetBox>
          </Section>
        </>
      )}

      {/* CTA */}
      {fullNotesUrl && (
        <EmailButton href={fullNotesUrl} variant="secondary">
          View Full Notes
        </EmailButton>
      )}

      {/* Muted note */}
      <Text style={mutedNote}>
        This recap was generated from our meeting notes. Reply if anything needs
        correction.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

MeetingSummary.PreviewProps = {
  projectName: "Meridian Ventures — Website Redesign",
  meetingDate: "Wednesday, Mar 18, 2026",
  meetingDuration: "45 minutes",
  meetingTopic: "Design Review & Development Planning",
  currentPhase: 3,
  attendees: [
    { name: "Dustin Jasmin", team: "jaspire" },
    { name: "Marcus Lee", team: "jaspire" },
    { name: "Sarah Chen", team: "client" },
    { name: "David Park", team: "client" },
  ],
  decisions: [
    "Homepage hero will use the bold headline variant with video background.",
    "Portfolio section moves to a 2-column grid layout on desktop.",
    "Launch date confirmed for April 15, 2026.",
    "Client will provide remaining testimonials by end of week.",
  ],
  actionItems: [
    {
      action: "Finalize hero video compression and hosting",
      owner: "Marcus",
      ownerTeam: "jaspire",
      dueDate: "Mar 20",
    },
    {
      action: "Provide 4 client testimonials with headshots",
      owner: "Sarah",
      ownerTeam: "client",
      dueDate: "Mar 21",
    },
    {
      action: "Build portfolio detail page templates",
      owner: "Dustin",
      ownerTeam: "jaspire",
      dueDate: "Mar 24",
    },
    {
      action: "Review and approve final copy for all pages",
      owner: "David",
      ownerTeam: "client",
      dueDate: "Mar 25",
    },
    {
      action: "Set up staging environment for client preview",
      owner: "Marcus",
      ownerTeam: "jaspire",
      dueDate: "Mar 26",
    },
  ],
  discussionNotes: [
    {
      topic: "Hero Section Direction",
      summary:
        "Reviewed 3 hero concepts. Team aligned on the video background approach with a single bold headline. Sarah flagged the importance of mobile fallback — Marcus will ensure a static image loads on slower connections.",
    },
    {
      topic: "Portfolio Architecture",
      summary:
        "Discussed filtering vs. flat grid. Decided on a flat 2-column grid for launch with category filtering as a phase 2 enhancement. David confirmed 8 portfolio pieces will be ready for launch.",
    },
    {
      topic: "Timeline Check",
      summary:
        "All workstreams on track for April 15 launch. The only dependency is client testimonial content, which Sarah committed to delivering by Friday.",
    },
  ],
  nextMeeting: {
    date: "Wednesday, Mar 25, 2026",
    time: "2:00 PM EST",
    calendarUrl: "https://cal.com/jaspire/meridian-weekly",
  },
  fullNotesUrl:
    "https://jaspire.co/dashboard/proj_mer_2026/meetings/mar-18-2026",
} satisfies MeetingSummaryProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const metadataSection: React.CSSProperties = {
  margin: "8px 0 0",
};

const metaLabelCell: React.CSSProperties = {
  padding: "6px 16px 6px 0",
  color: colors.textTertiary,
  fontSize: "13px",
  width: "90px",
  verticalAlign: "middle" as const,
};

const metaValueCell: React.CSSProperties = {
  padding: "6px 0",
  color: colors.textPrimary,
  fontSize: "14px",
  verticalAlign: "middle" as const,
};

const attendeeGroup: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "0 0 2px",
  lineHeight: "1.5",
};

const teamLabel: React.CSSProperties = {
  fontWeight: "600",
  color: colors.textPrimary,
  fontSize: "12px",
};

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const decisionItem: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textOnDark,
  margin: "0 0 8px",
  lineHeight: "1.6",
};

const decisionNumber: React.CSSProperties = {
  fontWeight: "700",
  color: colors.textPrimary,
};

const actionTable: React.CSSProperties = {
  margin: "0",
  borderCollapse: "collapse" as const,
};

const actionHeaderCell: React.CSSProperties = {
  padding: "10px 8px 10px 0",
  fontSize: "11px",
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  borderBottom: `2px solid ${colors.borderWarm}`,
  verticalAlign: "bottom" as const,
};

const actionDataCell: React.CSSProperties = {
  padding: "12px 8px 12px 0",
  fontSize: "13px",
  color: colors.textSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  verticalAlign: "top" as const,
  lineHeight: "1.5",
};

const legendText: React.CSSProperties = {
  fontSize: "11px",
  color: colors.textTertiary,
  margin: "8px 0 0",
  lineHeight: "1.4",
};

const discussionTopic: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.textSecondary,
  margin: "0 0 4px",
  lineHeight: "1.4",
};

const discussionSummary: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const nextMeetingText: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "0",
  lineHeight: "1.4",
};

const calendarLink: React.CSSProperties = {
  fontSize: "13px",
  color: colors.brandPurple,
  textDecoration: "none" as const,
  fontWeight: "500",
};

const mutedNote: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
