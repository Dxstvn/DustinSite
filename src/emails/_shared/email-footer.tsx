import { Hr, Link, Section, Text } from "@react-email/components";
import { colors, siteUrl } from "./constants";

interface EmailFooterProps {
  /** "full" includes nav links + social. "minimal" is just legal. */
  variant?: "full" | "minimal";
}

export function EmailFooter({ variant = "full" }: EmailFooterProps) {
  return (
    <Section>
      <Hr style={hr} />

      <Text style={company}>
        Jaspire
        <br />
        Premium Digital Agency
      </Text>

      <Text style={contact}>
        <Link href="mailto:hello@jaspire.co" style={purpleLink}>
          hello@jaspire.co
        </Link>
      </Text>

      {variant === "full" && (
        <Text style={navLinks}>
          <Link href={`${siteUrl}/portfolio`} style={mutedLink}>
            Work
          </Link>
          {"  |  "}
          <Link href={`${siteUrl}/services`} style={mutedLink}>
            Services
          </Link>
          {"  |  "}
          <Link href={`${siteUrl}/about`} style={mutedLink}>
            About
          </Link>
          {"  |  "}
          <Link href={`${siteUrl}/contact`} style={mutedLink}>
            Contact
          </Link>
        </Text>
      )}

      <Text style={social}>
        <Link href="https://twitter.com/jaspire" style={mutedLink}>
          Twitter
        </Link>
        {"  /  "}
        <Link href="https://instagram.com/jaspire" style={mutedLink}>
          Instagram
        </Link>
        {"  /  "}
        <Link href="https://linkedin.com/company/jaspire" style={mutedLink}>
          LinkedIn
        </Link>
      </Text>

      <Text style={legal}>
        &copy; {new Date().getFullYear()} Jaspire. All rights reserved.
      </Text>
    </Section>
  );
}

const hr = {
  borderColor: colors.borderWarm,
  margin: "32px 0 16px",
};

const company = {
  fontSize: "12px",
  color: colors.textTertiary,
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const contact = {
  fontSize: "12px",
  margin: "0 0 12px",
};

const purpleLink = {
  color: colors.brandPurple,
  textDecoration: "none" as const,
};

const navLinks = {
  fontSize: "12px",
  color: colors.textTertiary,
  margin: "0 0 12px",
};

const mutedLink = {
  color: colors.textMuted,
  textDecoration: "none" as const,
};

const social = {
  fontSize: "11px",
  color: colors.textMuted,
  margin: "0 0 8px",
};

const legal = {
  fontSize: "11px",
  color: colors.textMuted,
  margin: "0",
};
