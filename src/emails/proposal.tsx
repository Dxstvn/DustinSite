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

interface ProposalEmailProps {
  clientFirstName: string;
  projectTitle: string;
  projectDescription: string;
  serviceTags: ServiceTag[];
  deliverables: string[];
  totalAmount: string;
  paymentTerms: string;
  timeline: string;
  proposalUrl: string;
  calendarUrl: string;
  expiryDate?: string;
  teamLeadName: string;
  teamLeadEmail: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProposalEmail({
  clientFirstName,
  projectTitle,
  projectDescription,
  serviceTags,
  deliverables,
  totalAmount,
  paymentTerms,
  timeline,
  proposalUrl,
  calendarUrl,
  expiryDate,
  teamLeadName,
  teamLeadEmail,
}: ProposalEmailProps) {
  return (
    <EmailLayout
      preview={`Your proposal for ${projectTitle} is ready — ${totalAmount}`}
      headerLabel="Proposal"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>Your proposal.</Heading>
      <Text style={baseStyles.subheading}>
        Hi {clientFirstName}, we've put together a proposal for {projectTitle}.
        Here's a summary of what we're recommending.
      </Text>

      {/* Proposal Summary Card */}
      <Section style={summaryCard}>
        {/* Project Title */}
        <Text style={projectTitleStyle}>{projectTitle}</Text>

        {/* Description */}
        <Text style={projectDesc}>{projectDescription}</Text>

        {/* Service Tags */}
        <div style={tagsRow}>
          {serviceTags.map((tag) => (
            <span
              key={tag.label}
              style={{
                ...tagPill,
                backgroundColor: badgeBgMap[tag.accent],
                color: accentColorMap[tag.accent],
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <Hr style={cardDivider} />

        {/* Deliverables */}
        <MonoLabel>DELIVERABLES</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          {deliverables.map((item, i) => (
            <tr key={i}>
              <td style={bulletCell}>
                <div style={purpleBullet} />
              </td>
              <td style={deliverableText}>
                <Text style={deliverableItem}>{item}</Text>
              </td>
            </tr>
          ))}
        </table>

        <Hr style={cardDivider} />

        {/* Investment Row */}
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr>
            <td>
              <Text style={summaryLabel}>Investment</Text>
            </td>
            <td style={alignRight}>
              <Text style={summaryAmount}>{totalAmount}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text style={summaryLabel}>Timeline</Text>
            </td>
            <td style={alignRight}>
              <Text style={summaryValue}>{timeline}</Text>
            </td>
          </tr>
          <tr>
            <td>
              <Text style={summaryLabel}>Payment Terms</Text>
            </td>
            <td style={alignRight}>
              <Text style={summaryValue}>{paymentTerms}</Text>
            </td>
          </tr>
        </table>
      </Section>

      {/* Dual CTAs */}
      <EmailButton href={proposalUrl}>Review Full Proposal</EmailButton>
      <EmailButton href={calendarUrl} variant="secondary">
        Schedule a Call to Discuss
      </EmailButton>

      {/* Expiry Note */}
      {expiryDate && (
        <Text style={expiryNote}>
          This proposal is valid until {expiryDate}.
        </Text>
      )}

      {/* Next Steps */}
      <Hr style={baseStyles.hr} />
      <Text style={baseStyles.bodyText}>
        Have questions or want to adjust the scope? Reach out to{" "}
        <Link href={`mailto:${teamLeadEmail}`} style={baseStyles.link}>
          {teamLeadName}
        </Link>{" "}
        directly — we're happy to fine-tune this until it feels right.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ProposalEmail.PreviewProps = {
  clientFirstName: "Marcus",
  projectTitle: "Meridian Ventures Brand & Web Redesign",
  projectDescription:
    "A complete brand identity refresh and custom website build designed to position Meridian as the premium venture firm in the climate tech space.",
  serviceTags: [
    { label: "Web Development", accent: "blue" },
    { label: "SEO Strategy", accent: "green" },
    { label: "Social Media", accent: "orange" },
  ],
  deliverables: [
    "Custom Next.js website (12-15 pages)",
    "Responsive design with mobile-first approach",
    "SEO audit & technical optimization",
    "Content strategy & copywriting",
    "Social media launch campaign (30 days)",
    "Analytics dashboard setup",
  ],
  totalAmount: "$24,500",
  paymentTerms: "50% upfront, 25% at midpoint, 25% at launch",
  timeline: "8–10 weeks",
  proposalUrl: "https://jaspire.co/proposals/prop_mer_2026",
  calendarUrl: "https://cal.com/jaspire/proposal-review",
  expiryDate: "April 15, 2026",
  teamLeadName: "Dustin Jasmin",
  teamLeadEmail: "dustin@jaspire.co",
} satisfies ProposalEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const summaryCard = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "8px",
  padding: "24px",
  margin: "16px 0",
};

const projectTitleStyle = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  fontFamily: fontStack,
  margin: "0 0 8px",
  lineHeight: "1.4",
};

const projectDesc = {
  fontSize: "14px",
  color: colors.textSecondary,
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const tagsRow = {
  margin: "0 0 0",
};

const tagPill = {
  display: "inline-block" as const,
  fontSize: "12px",
  fontWeight: "600" as const,
  padding: "4px 12px",
  borderRadius: "99px",
  marginRight: "8px",
  marginBottom: "4px",
  lineHeight: "1.6",
};

const cardDivider = {
  borderColor: colors.borderWarm,
  margin: "16px 0",
};

const bulletCell = {
  width: "20px",
  verticalAlign: "top" as const,
  paddingTop: "8px",
};

const purpleBullet = {
  width: "6px",
  height: "6px",
  backgroundColor: colors.brandPurple,
  borderRadius: "1px",
};

const deliverableText = {
  verticalAlign: "top" as const,
};

const deliverableItem = {
  fontSize: "14px",
  color: colors.textPrimary,
  lineHeight: "1.5",
  margin: "4px 0",
};

const summaryLabel = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "6px 0",
  lineHeight: "1.5",
};

const summaryAmount = {
  fontSize: "22px",
  fontWeight: "700" as const,
  color: colors.textPrimary,
  fontFamily: fontStack,
  margin: "6px 0",
  lineHeight: "1.3",
  textAlign: "right" as const,
};

const summaryValue = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: colors.textPrimary,
  margin: "6px 0",
  lineHeight: "1.5",
  textAlign: "right" as const,
};

const alignRight = {
  textAlign: "right" as const,
};

const expiryNote = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.6",
};
