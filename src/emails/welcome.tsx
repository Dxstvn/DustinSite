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
import { colors, baseStyles, fontStack, monoStack } from "./_shared/constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WelcomeEmailProps {
  clientFirstName: string;
  companyName: string;
  projectType: string;
  teamLeadName: string;
  teamLeadRole: string;
  teamLeadEmail: string;
  teamLeadAvatarUrl: string;
  dashboardUrl: string;
}

// ---------------------------------------------------------------------------
// Onboarding Steps Data
// ---------------------------------------------------------------------------

const onboardingSteps = [
  {
    number: "01",
    title: "Kickoff Call",
    description:
      "We align on vision, goals, and success metrics for your project.",
  },
  {
    number: "02",
    title: "Strategy Delivery",
    description:
      "You receive a detailed roadmap with milestones, timelines, and deliverables.",
  },
  {
    number: "03",
    title: "Build Phase",
    description:
      "Our team executes — with regular check-ins and previews along the way.",
  },
  {
    number: "04",
    title: "Launch & Growth",
    description:
      "We go live and shift into optimization, measurement, and scaling.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WelcomeEmail({
  clientFirstName,
  companyName,
  projectType,
  teamLeadName,
  teamLeadRole,
  teamLeadEmail,
  teamLeadAvatarUrl,
  dashboardUrl,
}: WelcomeEmailProps) {
  const teamLeadFirstName = teamLeadName.split(" ")[0];

  return (
    <EmailLayout
      preview={`Welcome to Jaspire, ${clientFirstName} — let's build something great for ${companyName}.`}
      headerLabel="Onboarding"
    >
      {/* Heading */}
      <Heading style={baseStyles.heading}>
        Welcome aboard, {clientFirstName}.
      </Heading>
      <Text style={baseStyles.subheading}>
        We're thrilled to partner with {companyName} on {projectType}. Here's
        what the journey looks like from here.
      </Text>

      {/* Onboarding Steps */}
      <Section style={stepsSection}>
        <MonoLabel>HOW WE WORK</MonoLabel>
        {onboardingSteps.map((step, i) => (
          <div key={step.number}>
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tr>
                <td style={stepNumberCell}>
                  <Text style={stepNumber}>{step.number}</Text>
                </td>
                <td style={stepContentCell}>
                  <Text style={stepTitle}>{step.title}</Text>
                  <Text style={stepDescription}>{step.description}</Text>
                </td>
              </tr>
            </table>
            {i < onboardingSteps.length - 1 && <Hr style={stepDivider} />}
          </div>
        ))}
      </Section>

      {/* Team Lead Card */}
      <Section style={teamSection}>
        <MonoLabel>YOUR TEAM</MonoLabel>
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={teamCard}
        >
          <tr>
            <td style={avatarCell}>
              <Img
                src={teamLeadAvatarUrl}
                alt={teamLeadName}
                width="48"
                height="48"
                style={avatar}
              />
            </td>
            <td style={teamInfoCell}>
              <Text style={teamName}>{teamLeadName}</Text>
              <Text style={teamRole}>{teamLeadRole}</Text>
              <Link href={`mailto:${teamLeadEmail}`} style={teamEmail}>
                {teamLeadEmail}
              </Link>
            </td>
          </tr>
        </table>
      </Section>

      {/* Primary CTA */}
      <EmailButton href={dashboardUrl}>Open Your Project Dashboard</EmailButton>

      {/* Muted Note */}
      <Text style={mutedNote}>
        Questions? Reply to this email — it goes straight to{" "}
        {teamLeadFirstName}.
      </Text>
    </EmailLayout>
  );
}

// ---------------------------------------------------------------------------
// Preview Props
// ---------------------------------------------------------------------------

WelcomeEmail.PreviewProps = {
  clientFirstName: "Sarah",
  companyName: "Meridian Ventures",
  projectType: "your website redesign",
  teamLeadName: "Dustin Jasmin",
  teamLeadRole: "Creative Director & Project Lead",
  teamLeadEmail: "dustin@jaspire.co",
  teamLeadAvatarUrl:
    "https://ui-avatars.com/api/?name=Dustin+Jasmin&background=7c6bf0&color=fff&size=96",
  dashboardUrl: "https://jaspire.co/dashboard/proj_mer_2026",
} satisfies WelcomeEmailProps;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const stepsSection = {
  margin: "32px 0 0",
};

const stepNumberCell = {
  width: "48px",
  verticalAlign: "top" as const,
  paddingRight: "16px",
};

const stepNumber = {
  fontSize: "32px",
  fontWeight: "700" as const,
  color: colors.brandPurple,
  fontFamily: fontStack,
  margin: "0",
  lineHeight: "1.2",
};

const stepContentCell = {
  verticalAlign: "top" as const,
};

const stepTitle = {
  fontSize: "16px",
  fontWeight: "600" as const,
  color: colors.textPrimary,
  margin: "0 0 4px",
  lineHeight: "1.4",
};

const stepDescription = {
  fontSize: "14px",
  color: colors.textSecondary,
  margin: "0",
  lineHeight: "1.6",
};

const stepDivider = {
  borderColor: colors.borderLight,
  margin: "16px 0",
};

const teamSection = {
  margin: "32px 0 0",
};

const teamCard = {
  backgroundColor: colors.surfaceWarm,
  borderRadius: "8px",
  padding: "16px 20px",
};

const avatarCell = {
  width: "64px",
  verticalAlign: "middle" as const,
};

const avatar = {
  borderRadius: "50%",
  width: "48px",
  height: "48px",
};

const teamInfoCell = {
  verticalAlign: "middle" as const,
};

const teamName = {
  fontSize: "15px",
  fontWeight: "600" as const,
  color: colors.textPrimary,
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const teamRole = {
  fontSize: "13px",
  color: colors.textSecondary,
  margin: "0 0 2px",
  lineHeight: "1.4",
};

const teamEmail = {
  fontSize: "13px",
  color: colors.brandPurple,
  textDecoration: "none" as const,
};

const mutedNote = {
  fontSize: "13px",
  color: colors.textTertiary,
  textAlign: "center" as const,
  margin: "0",
  lineHeight: "1.6",
};
