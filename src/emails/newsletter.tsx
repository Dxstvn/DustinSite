import {
  Heading,
  Hr,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import { EmailLayout } from "./_shared/email-layout";
import { MonoLabel } from "./_shared/mono-label";
import {
  colors,
  baseStyles,
  fontStack,
  monoStack,
  siteUrl,
  accentColorMap,
  badgeBgMap,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeaturedArticle {
  title: string;
  excerpt: string;
  url: string;
}

interface QuickHit {
  category: "TIP" | "TOOL" | "TREND";
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
}

interface WorkSpotlight {
  projectName: string;
  category: string;
  categoryAccent: "blue" | "green" | "orange";
  metric: string;
  description: string;
  screenshotUrl: string;
  url: string;
}

interface NewsletterEmailProps {
  issueNumber: number;
  monthYear: string;
  heroImageUrl: string;
  featured: FeaturedArticle;
  quickHits: QuickHit[];
  spotlight: WorkSpotlight;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsletterEmail({
  issueNumber,
  monthYear,
  heroImageUrl,
  featured,
  quickHits,
  spotlight,
}: NewsletterEmailProps) {
  return (
    <EmailLayout
      preview={`The Digital Briefing #${issueNumber} — ${featured.title}`}
      headerLabel={monthYear}
    >
      {/* Masthead */}
      <Section style={mastheadSection}>
        <Text style={mastheadTitle}>THE DIGITAL BRIEFING</Text>
        <Text style={mastheadIssue}>Issue {issueNumber}</Text>
      </Section>

      {/* Hero Image */}
      <Img
        src={heroImageUrl}
        alt="The Digital Briefing"
        width="536"
        style={heroImage}
      />

      {/* Featured Insight */}
      <Section style={featuredSection}>
        <MonoLabel>INSIGHT</MonoLabel>
        <Heading style={featuredHeading}>{featured.title}</Heading>
        <Text style={baseStyles.bodyText}>{featured.excerpt}</Text>
        <Link href={featured.url} style={readMoreLink}>
          Read More &rarr;
        </Link>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Quick Hits */}
      <Section style={quickHitsSection}>
        <MonoLabel>QUICK HITS</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tr>
            <td style={quickHitCellLeft} valign="top">
              {quickHits[0] && <QuickHitItem hit={quickHits[0]} />}
              {quickHits[2] && (
                <>
                  <div style={quickHitSpacer} />
                  <QuickHitItem hit={quickHits[2]} />
                </>
              )}
            </td>
            <td style={quickHitGutter} />
            <td style={quickHitCellRight} valign="top">
              {quickHits[1] && <QuickHitItem hit={quickHits[1]} />}
              {quickHits[3] && (
                <>
                  <div style={quickHitSpacer} />
                  <QuickHitItem hit={quickHits[3]} />
                </>
              )}
            </td>
          </tr>
        </table>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* Work Spotlight */}
      <Section style={spotlightSection}>
        <MonoLabel>WORK</MonoLabel>
        <Img
          src={spotlight.screenshotUrl}
          alt={spotlight.projectName}
          width="536"
          style={spotlightImage}
        />
        <span
          style={{
            ...categoryPill,
            backgroundColor: badgeBgMap[spotlight.categoryAccent],
            color: accentColorMap[spotlight.categoryAccent],
          }}
        >
          {spotlight.category}
        </span>
        <Text style={spotlightName}>{spotlight.projectName}</Text>
        <Text style={spotlightMetric}>{spotlight.metric}</Text>
        <Text style={spotlightDesc}>{spotlight.description}</Text>
        <Link href={spotlight.url} style={readMoreLink}>
          See the Project &rarr;
        </Link>
      </Section>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Quick Hit Sub-Component
// ---------------------------------------------------------------------------

function QuickHitItem({ hit }: { hit: QuickHit }) {
  return (
    <div>
      <Text style={quickHitCategory}>{hit.category}</Text>
      <Text style={quickHitTitle}>{hit.title}</Text>
      <Text style={quickHitDescription}>{hit.description}</Text>
      <Link href={hit.url} style={quickHitLink}>
        Read &rarr;
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

NewsletterEmail.PreviewProps = {
  issueNumber: 14,
  monthYear: "March 2026",
  heroImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  featured: {
    title: "Why your redesign won't fix your conversion problem.",
    excerpt:
      "Most brands reach for a redesign when conversions stall. But the data tells a different story — 73% of conversion issues trace back to messaging, not aesthetics. We analyzed 40+ client projects to find the patterns that actually move the needle. The uncomfortable truth: your site probably looks fine. It's what you're saying (and when you're saying it) that's costing you revenue.",
    url: `${siteUrl}/blog/redesign-conversion-problem`,
  },
  quickHits: [
    {
      category: "TIP",
      title: "The 3-second audit for your hero section.",
      description:
        "Cover your hero headline with your hand. Can a stranger tell what you do from the subhead alone? If not, rewrite.",
      url: `${siteUrl}/blog/hero-section-audit`,
    },
    {
      category: "TOOL",
      title: "Claymorphism is back. Here's how to use it.",
      description:
        "Soft, tactile UI elements are trending for 2026. We break down the CSS and when it actually makes sense.",
      url: `${siteUrl}/blog/claymorphism-guide`,
    },
    {
      category: "TREND",
      title: "Google's March core update: what we're seeing.",
      description:
        "Early data shows content depth winning over keyword density. Sites with topical authority gained 15-30%.",
      url: `${siteUrl}/blog/march-core-update`,
    },
    {
      category: "TIP",
      title: "Stop hiding your pricing page.",
      description:
        "B2B brands that display pricing see 2.3x more qualified leads. Transparency is the new premium signal.",
      url: `${siteUrl}/blog/pricing-page-visibility`,
    },
  ],
  spotlight: {
    projectName: "Meridian Ventures",
    category: "Web Development",
    categoryAccent: "blue",
    metric: "+142% organic traffic in 90 days.",
    description:
      "A complete site rebuild for a climate tech VC — designed to attract founders, not just impress LPs.",
    screenshotUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop",
    url: `${siteUrl}/portfolio/skintuary-studio`,
  },
} satisfies NewsletterEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const mastheadSection: React.CSSProperties = {
  marginBottom: "24px",
};

const mastheadTitle: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600",
  color: colors.textPrimary,
  textTransform: "uppercase",
  letterSpacing: "0.25em",
  margin: "0 0 4px",
  lineHeight: "1",
};

const mastheadIssue: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textTertiary,
  margin: "0",
  lineHeight: "1.4",
};

const heroImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  display: "block",
};

const featuredSection: React.CSSProperties = {
  marginTop: "32px",
};

const featuredHeading: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  color: colors.textPrimary,
  lineHeight: "1.3",
  margin: "0 0 16px",
  fontFamily: fontStack,
};

const readMoreLink: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.brandPurple,
  textDecoration: "none",
};

const quickHitsSection: React.CSSProperties = {
  marginTop: "16px",
};

const quickHitCellLeft: React.CSSProperties = {
  width: "268px",
};

const quickHitCellRight: React.CSSProperties = {
  width: "268px",
};

const quickHitGutter: React.CSSProperties = {
  width: "24px",
};

const quickHitSpacer: React.CSSProperties = {
  height: "24px",
};

const quickHitCategory: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: monoStack,
  fontWeight: "600",
  color: colors.textTertiary,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  margin: "0 0 8px",
  lineHeight: "1",
};

const quickHitTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "0 0 6px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const quickHitDescription: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "0 0 8px",
  lineHeight: "1.5",
};

const quickHitLink: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: colors.brandPurple,
  textDecoration: "none",
};

const spotlightSection: React.CSSProperties = {
  marginTop: "16px",
};

const spotlightImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  border: `4px solid ${colors.surfaceWarm}`,
  display: "block",
  marginBottom: "16px",
};

const categoryPill: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 12px",
  borderRadius: "99px",
  lineHeight: "1.6",
  marginBottom: "8px",
};

const spotlightName: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "700",
  color: colors.textPrimary,
  margin: "8px 0 4px",
  lineHeight: "1.4",
  fontFamily: fontStack,
};

const spotlightMetric: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.brandPurple,
  margin: "0 0 8px",
  lineHeight: "1.5",
};

const spotlightDesc: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0 0 12px",
  lineHeight: "1.6",
};
