import {
  Heading,
  Hr,
  Img,
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

interface RecentProject {
  name: string;
  metric: string;
  screenshotUrl: string;
  url: string;
}

interface ValueTip {
  title: string;
  content: string;
  url: string;
}

interface ReEngagementEmailProps {
  recipientFirstName: string;
  recipientCompany?: string;
  openingMessage: string;
  recentProjects: RecentProject[];
  valueTip?: ValueTip;
  reconnectUrl: string;
  senderName: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReEngagementEmail({
  recipientFirstName,
  recipientCompany,
  openingMessage,
  recentProjects,
  valueTip,
  reconnectUrl,
  senderName,
}: ReEngagementEmailProps) {
  return (
    <EmailLayout
      preview={`Hey ${recipientFirstName} — a quick update from Jaspire.`}
      footerVariant="minimal"
    >
      {/* Personal Salutation — no hero image, intentionally */}
      <Heading style={salutation}>
        Hey {recipientFirstName},
      </Heading>

      {/* Opening Message */}
      <Text style={openingText}>{openingMessage}</Text>

      {/* Recent Projects */}
      <Section style={projectsSection}>
        <MonoLabel>SINCE WE LAST CONNECTED</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr>
            {recentProjects.slice(0, 2).map((project, i) => (
              <td
                key={project.name}
                style={i === 0 ? projectCellLeft : projectCellRight}
                valign="top"
              >
                <Link href={project.url} style={projectLink}>
                  <Img
                    src={project.screenshotUrl}
                    alt={project.name}
                    width="268"
                    height="160"
                    style={projectImage}
                  />
                </Link>
                <Text style={projectName}>{project.name}</Text>
                <Text style={projectMetric}>{project.metric}</Text>
              </td>
            ))}
          </tr>
        </table>
        <Link href={`${siteUrl}/portfolio`} style={seeAllLink}>
          See all our work &rarr;
        </Link>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Value Tip */}
      {valueTip && (
        <Section style={tipSection}>
          <MonoLabel>SOMETHING YOU MIGHT FIND USEFUL</MonoLabel>
          <Text style={tipTitle}>{valueTip.title}</Text>
          <Text style={tipContent}>{valueTip.content}</Text>
          <Link href={valueTip.url} style={baseStyles.link}>
            Read more &rarr;
          </Link>
        </Section>
      )}

      {valueTip && <Hr style={baseStyles.hr} />}

      {/* Soft Close */}
      <Text style={closingText}>
        If your plans have shifted or you&apos;re thinking about a redesign, SEO,
        or social strategy again — I&apos;d love to hear what&apos;s changed. No pitch,
        just a conversation.
      </Text>

      {/* CTA */}
      <EmailButton href={reconnectUrl}>Let&apos;s Reconnect</EmailButton>

      <Text style={replyNote}>Or just reply to this email.</Text>

      {/* Signature */}
      <Text style={signature}>&mdash; {senderName}</Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ReEngagementEmail.PreviewProps = {
  recipientFirstName: "Sarah",
  recipientCompany: "Bloom Studio",
  openingMessage:
    "It's been a while since we chatted about the Bloom Studio project, and I wanted to reach out. I've been following your growth on LinkedIn — looks like things have taken off since the rebrand. Really happy to see it.",
  recentProjects: [
    {
      name: "Meridian Ventures",
      metric: "+142% organic traffic in 90 days",
      screenshotUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=536&h=320&fit=crop",
      url: `${siteUrl}/portfolio/skintuary-studio`,
    },
    {
      name: "Noma Health",
      metric: "3x lead conversion after redesign",
      screenshotUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=536&h=320&fit=crop",
      url: `${siteUrl}/portfolio/parye`,
    },
  ],
  valueTip: {
    title: "Why your redesign won't fix your conversion problem.",
    content:
      "We recently analyzed 40+ client projects and found that 73% of conversion issues trace back to messaging, not design. If your traffic is decent but leads have stalled, the fix might be simpler than you think.",
    url: `${siteUrl}/blog/redesign-conversion-problem`,
  },
  reconnectUrl: "https://cal.com/jaspire/reconnect",
  senderName: "Dustin",
} satisfies ReEngagementEmailProps;

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

const openingText: React.CSSProperties = {
  fontSize: "15px",
  color: colors.textSecondary,
  lineHeight: "1.65",
  margin: "0 0 24px",
};

const projectsSection: React.CSSProperties = {
  marginTop: "8px",
};

const projectCellLeft: React.CSSProperties = {
  width: "268px",
  paddingRight: "12px",
};

const projectCellRight: React.CSSProperties = {
  width: "268px",
  paddingLeft: "12px",
};

const projectLink: React.CSSProperties = {
  textDecoration: "none",
};

const projectImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  display: "block",
  objectFit: "cover",
};

const projectName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "10px 0 2px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const projectMetric: React.CSSProperties = {
  fontSize: "12px",
  color: colors.textTertiary,
  margin: "0",
  lineHeight: "1.4",
};

const seeAllLink: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: colors.brandPurple,
  textDecoration: "none",
  display: "inline-block",
  marginTop: "16px",
};

const tipSection: React.CSSProperties = {
  marginTop: "16px",
};

const tipTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 8px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const tipContent: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  lineHeight: "1.65",
  margin: "0 0 12px",
};

const closingText: React.CSSProperties = {
  fontSize: "15px",
  color: colors.textSecondary,
  lineHeight: "1.65",
  margin: "16px 0 0",
};

const replyNote: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};

const signature: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: colors.textPrimary,
  margin: "24px 0 0",
  lineHeight: "1.4",
};
