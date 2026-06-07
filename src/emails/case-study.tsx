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
import { MetricCard } from "./_shared/metric-card";
import { DarkCard } from "./_shared/dark-card";
import {
  colors,
  baseStyles,
  fontStack,
  siteUrl,
  accentColorMap,
  badgeBgMap,
} from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ResultMetric {
  value: string;
  label: string;
}

interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
}

interface CaseStudyEmailProps {
  projectName: string;
  category: string;
  categoryAccent: "blue" | "green" | "orange";
  heroImageUrl: string;
  secondaryImageUrl?: string;
  results: ResultMetric[];
  challenge: string;
  approach: string;
  result: string;
  testimonial?: Testimonial;
  techStack?: string[];
  caseStudyUrl: string;
  calendarUrl?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CaseStudyEmail({
  projectName,
  category,
  categoryAccent,
  heroImageUrl,
  secondaryImageUrl,
  results,
  challenge,
  approach,
  result,
  testimonial,
  techStack,
  caseStudyUrl,
  calendarUrl,
}: CaseStudyEmailProps) {
  return (
    <EmailLayout
      preview={`Case Study: ${projectName} — See how we delivered results.`}
      headerLabel="Case Study"
    >
      {/* Hero Image — flush top with rounded bottom corners */}
      <Img
        src={heroImageUrl}
        alt={projectName}
        width="536"
        style={heroImage}
      />

      {/* Project Intro */}
      <Section style={introSection}>
        <span
          style={{
            ...categoryPill,
            backgroundColor: badgeBgMap[categoryAccent],
            color: accentColorMap[categoryAccent],
          }}
        >
          {category}
        </span>
        <Heading style={projectTitle}>{projectName}.</Heading>
      </Section>

      {/* Results Bar */}
      <Section style={resultsBar}>
        <MetricCard
          metrics={results.map((r) => ({
            value: r.value,
            label: r.label,
          }))}
        />
      </Section>

      {/* The Challenge */}
      <Section style={contentSection}>
        <MonoLabel>THE CHALLENGE</MonoLabel>
        <Text style={baseStyles.bodyText}>{challenge}</Text>
      </Section>

      <Hr style={baseStyles.hr} />

      {/* The Approach */}
      <Section style={contentSection}>
        <MonoLabel>THE APPROACH</MonoLabel>
        <Text style={baseStyles.bodyText}>{approach}</Text>
        {secondaryImageUrl && (
          <Img
            src={secondaryImageUrl}
            alt={`${projectName} — approach`}
            width="536"
            style={secondaryImage}
          />
        )}
      </Section>

      <Hr style={baseStyles.hr} />

      {/* The Result */}
      <Section style={contentSection}>
        <MonoLabel>THE RESULT</MonoLabel>
        <Text style={baseStyles.bodyText}>{result}</Text>
      </Section>

      {/* Testimonial */}
      {testimonial && (
        <DarkCard>
          <Text style={quoteText}>
            &ldquo;{testimonial.quote}&rdquo;
          </Text>
          <Text style={authorName}>{testimonial.authorName}</Text>
          <Text style={authorMeta}>
            {testimonial.authorTitle}, {testimonial.company}
          </Text>
        </DarkCard>
      )}

      {/* Tech Stack */}
      {techStack && techStack.length > 0 && (
        <Section style={techStackSection}>
          <div>
            {techStack.map((tech) => (
              <span key={tech} style={techPill}>
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <EmailButton href={caseStudyUrl}>See the Full Case Study</EmailButton>

      {calendarUrl && (
        <Text style={softCtaText}>
          Have a similar challenge?{" "}
          <Link href={calendarUrl} style={baseStyles.link}>
            Let&apos;s talk about it &rarr;
          </Link>
        </Text>
      )}
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

CaseStudyEmail.PreviewProps = {
  projectName: "Meridian Ventures",
  category: "Web Development",
  categoryAccent: "blue",
  heroImageUrl:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  secondaryImageUrl:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop",
  results: [
    { value: "+142%", label: "Organic Traffic" },
    { value: "3.2s", label: "Avg. Session" },
    { value: "68%", label: "Lead Increase" },
  ],
  challenge:
    "Meridian Ventures had outgrown their template website. As a climate tech VC managing $200M in assets, their digital presence didn't match their market position. Founders weren't taking them seriously at first glance, and their organic pipeline had flatlined.",
  approach:
    "We rebuilt Meridian from the ground up — a custom Next.js site with scroll-driven storytelling that walks visitors through their thesis, portfolio, and team. Every page was designed to convert a specific audience: founders evaluating investors, LPs reviewing performance, and press looking for quotes.",
  result:
    "Within 90 days of launch, organic traffic increased 142%. Inbound founder applications rose 68%, and the average session duration more than doubled. Meridian's managing partner called it 'the single highest-ROI investment we made last quarter.'",
  testimonial: {
    quote:
      "Jaspire didn't just build us a website — they gave us a competitive advantage. Founders now come to meetings already sold on our thesis.",
    authorName: "Elena Marchetti",
    authorTitle: "Managing Partner",
    company: "Meridian Ventures",
  },
  techStack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "Sanity CMS",
    "Plausible Analytics",
  ],
  caseStudyUrl: `${siteUrl}/portfolio/skintuary-studio`,
  calendarUrl: "https://cal.com/jaspire/discovery",
} satisfies CaseStudyEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const heroImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "0 0 8px 8px",
  display: "block",
  marginTop: "-8px",
};

const introSection: React.CSSProperties = {
  marginTop: "24px",
};

const categoryPill: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 12px",
  borderRadius: "99px",
  lineHeight: "1.6",
};

const projectTitle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "700",
  color: colors.textPrimary,
  lineHeight: "1.2",
  margin: "12px 0 0",
  fontFamily: fontStack,
};

const resultsBar: React.CSSProperties = {
  margin: "24px 0",
};

const contentSection: React.CSSProperties = {
  marginTop: "16px",
};

const secondaryImage: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  display: "block",
  marginTop: "16px",
};

const quoteText: React.CSSProperties = {
  fontSize: "16px",
  fontStyle: "italic",
  color: colors.textOnDark,
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const authorName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: colors.textOnDark,
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const authorMeta: React.CSSProperties = {
  fontSize: "13px",
  color: colors.textMutedOnDark,
  margin: "0",
  lineHeight: "1.4",
};

const techStackSection: React.CSSProperties = {
  margin: "24px 0 8px",
};

const techPill: React.CSSProperties = {
  display: "inline-block",
  fontSize: "11px",
  color: colors.textSecondary,
  backgroundColor: colors.surfaceWarm,
  padding: "4px 10px",
  borderRadius: "99px",
  marginRight: "6px",
  marginBottom: "6px",
  lineHeight: "1.5",
};

const softCtaText: React.CSSProperties = {
  fontSize: "14px",
  color: colors.textSecondary,
  textAlign: "center",
  margin: "0",
  lineHeight: "1.6",
};
