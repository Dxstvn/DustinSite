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
  innerRadius,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ServiceType = "web-development" | "seo" | "social-media";

interface DeliverableGroup {
  service: ServiceType;
  items: string[];
}

interface ContractAgreementProps {
  signerFirstName: string;
  clientCompany: string;
  documentName: string;
  documentDate: string;
  scope: string;
  timelineStart: string;
  timelineEnd: string;
  investmentAmount: string;
  paymentTerms: string;
  deliverables: DeliverableGroup[];
  keyTerms: string[];
  signUrl: string;
  senderName: string;
  senderPhone?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const serviceLabels: Record<ServiceType, string> = {
  "web-development": "Web Development",
  seo: "SEO",
  "social-media": "Social Media",
};

const serviceColors: Record<ServiceType, string> = {
  "web-development": colors.accentBlue,
  seo: colors.accentGreen,
  "social-media": colors.accentOrange,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContractAgreement({
  signerFirstName,
  clientCompany,
  documentName,
  documentDate,
  scope,
  timelineStart,
  timelineEnd,
  investmentAmount,
  paymentTerms,
  deliverables,
  keyTerms,
  signUrl,
  senderName,
  senderPhone,
}: ContractAgreementProps) {
  return (
    <EmailLayout
      preview={`${documentName} is ready for your signature — Jaspire + ${clientCompany}`}
      headerLabel="Agreement"
    >
      {/* Dark Header Banner */}
      <Section style={darkBanner}>
        <Heading style={darkBannerHeading}>
          Agreement Ready for Signature.
        </Heading>
        {/* Gradient line */}
        <div style={gradientLine} />
      </Section>

      {/* Personal Opening */}
      <Text style={{ ...baseStyles.bodyText, marginTop: "24px" }}>
        Hi {signerFirstName},
      </Text>
      <Text style={baseStyles.bodyText}>
        We&apos;re excited to move forward with {clientCompany}. Your agreement
        is ready for review and signature below. Take a moment to review the
        details, and let us know if you have any questions.
      </Text>

      <Hr style={baseStyles.hr} />

      {/* Agreement Summary Card */}
      <Section style={summaryCard}>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Document</td>
            <td style={summaryValueCell}>{documentName}</td>
          </tr>
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Date</td>
            <td style={summaryValueCell}>{documentDate}</td>
          </tr>
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Parties</td>
            <td style={summaryValueCell}>
              Jaspire &amp; {clientCompany}
            </td>
          </tr>
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Scope</td>
            <td style={summaryValueCell}>{scope}</td>
          </tr>
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Timeline</td>
            <td style={summaryValueCell}>
              {timelineStart} &mdash; {timelineEnd}
            </td>
          </tr>
          <tr style={summaryRow}>
            <td style={summaryLabelCell}>Investment</td>
            <td style={investmentValueCell}>{investmentAmount}</td>
          </tr>
          <tr style={{ ...summaryRow, borderBottom: "none" }}>
            <td style={summaryLabelCell}>Payment Terms</td>
            <td style={summaryValueCell}>{paymentTerms}</td>
          </tr>
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* What's Included */}
      <Section style={sectionBlock}>
        <MonoLabel>WHAT&apos;S INCLUDED</MonoLabel>
        {deliverables.map((group, gi) => (
          <div key={gi} style={{ marginBottom: "20px" }}>
            <Text
              style={{
                ...serviceNameStyle,
                color: serviceColors[group.service],
              }}
            >
              {serviceLabels[group.service]}
            </Text>
            {group.items.map((item, ii) => (
              <table
                key={ii}
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                role="presentation"
                style={{ marginBottom: "6px" }}
              >
                <tr>
                  <td style={checkCell}>
                    <span
                      style={{
                        color: serviceColors[group.service],
                        fontSize: "14px",
                      }}
                    >
                      &#10003;
                    </span>
                  </td>
                  <td>
                    <Text style={deliverableItem}>{item}</Text>
                  </td>
                </tr>
              </table>
            ))}
          </div>
        ))}
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Key Terms to Note */}
      <Section style={sectionBlock}>
        <MonoLabel>KEY TERMS TO NOTE</MonoLabel>
        {keyTerms.map((term, i) => (
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
                <Text style={termText}>{term}</Text>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      <Hr style={baseStyles.hr} />

      {/* How to Sign */}
      <Section style={sectionBlock}>
        <MonoLabel>HOW TO SIGN</MonoLabel>
        <Text style={baseStyles.bodyText}>
          Click the button below to review the full agreement and add your
          electronic signature. The process takes about 2 minutes.
        </Text>
      </Section>

      {/* Primary CTA */}
      <EmailButton href={signUrl}>Review &amp; Sign Agreement</EmailButton>

      {/* Closing */}
      <Text style={closingText}>
        Questions before signing? Reply to this email or call{" "}
        {senderPhone ? (
          <Link href={`tel:${senderPhone.replace(/\D/g, "")}`} style={phoneLink}>
            {senderPhone}
          </Link>
        ) : (
          "us"
        )}{" "}
        &mdash; happy to walk through anything.
      </Text>
      <Text style={signOff}>
        Looking forward to building something great together.
        <br />
        <br />
        <strong style={{ color: colors.textPrimary }}>{senderName}</strong>
        <br />
        Jaspire
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

ContractAgreement.PreviewProps = {
  signerFirstName: "Sarah",
  clientCompany: "Meridian Ventures",
  documentName: "Website Redesign & SEO Retainer Agreement",
  documentDate: "March 15, 2026",
  scope: "Full website redesign with ongoing SEO optimization",
  timelineStart: "April 1, 2026",
  timelineEnd: "July 31, 2026",
  investmentAmount: "$24,500",
  paymentTerms: "40% upfront, 30% at midpoint, 30% at launch",
  deliverables: [
    {
      service: "web-development",
      items: [
        "Custom Next.js website — 12 pages with responsive design",
        "CMS integration for blog and portfolio management",
        "Performance optimization targeting 95+ Lighthouse score",
        "Analytics dashboard and conversion tracking setup",
      ],
    },
    {
      service: "seo",
      items: [
        "Technical SEO audit and implementation",
        "Keyword research and content strategy for 20 target terms",
        "On-page optimization for all 12 pages",
        "Monthly SEO reporting for 3 months post-launch",
      ],
    },
    {
      service: "social-media",
      items: [
        "Social media profile optimization (LinkedIn, Twitter, Instagram)",
        "Launch announcement campaign — 2 weeks of daily content",
      ],
    },
  ],
  keyTerms: [
    "Two rounds of revisions are included per deliverable. Additional rounds are billed at our standard hourly rate.",
    "Timeline assumes feedback is provided within 3 business days of each review request.",
    "All source code and design files transfer to you upon final payment.",
    "Either party may terminate with 14 days written notice. Work completed to date will be invoiced and delivered.",
  ],
  signUrl: "https://jaspire.co/sign/agr_mer_2026_001",
  senderName: "Dustin Jasmin",
  senderPhone: "(201) 555-0142",
} satisfies ContractAgreementProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const darkBanner: React.CSSProperties = {
  backgroundColor: colors.darkZone,
  borderRadius: "12px",
  padding: "32px",
  margin: "0 0 0",
};

const darkBannerHeading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: colors.textOnDark,
  fontFamily: fontStack,
  margin: "0 0 16px",
  lineHeight: "1.3",
};

const gradientLine: React.CSSProperties = {
  height: "2px",
  background: `linear-gradient(to right, ${colors.brandPurple}, ${colors.accentBlue})`,
  borderRadius: "1px",
};

const summaryCard: React.CSSProperties = {
  border: `1px solid ${colors.borderWarm}`,
  borderRadius: "12px",
  padding: "24px",
  margin: "8px 0 0",
};

const summaryRow: React.CSSProperties = {
  borderBottom: `1px solid ${colors.borderLight}`,
};

const summaryLabelCell: React.CSSProperties = {
  padding: "10px 16px 10px 0",
  color: colors.textTertiary,
  fontSize: "13px",
  width: "120px",
  verticalAlign: "top" as const,
};

const summaryValueCell: React.CSSProperties = {
  padding: "10px 0",
  color: colors.textPrimary,
  fontSize: "14px",
  verticalAlign: "top" as const,
};

const investmentValueCell: React.CSSProperties = {
  ...summaryValueCell,
  fontSize: "18px",
  fontWeight: "700",
  color: colors.textPrimary,
};

const sectionBlock: React.CSSProperties = {
  margin: "8px 0 0",
};

const serviceNameStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 10px",
  lineHeight: "1",
};

const checkCell: React.CSSProperties = {
  width: "24px",
  verticalAlign: "top" as const,
  paddingTop: "1px",
};

const deliverableItem: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const bulletCell: React.CSSProperties = {
  width: "16px",
  verticalAlign: "top" as const,
  paddingTop: "1px",
};

const termText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.65",
};

const closingText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0 0 24px",
  lineHeight: "1.6",
  textAlign: "center",
};

const phoneLink: React.CSSProperties = {
  color: colors.brandPurple,
  textDecoration: "none" as const,
};

const signOff: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};
