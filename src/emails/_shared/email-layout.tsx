import { Body, Container, Head, Html, Preview } from "@react-email/components";
import { baseStyles } from "./constants";
import { EmailHeader } from "./email-header";
import { EmailFooter } from "./email-footer";

interface EmailLayoutProps {
  preview: string;
  headerLabel?: string;
  footerVariant?: "full" | "minimal";
  children: React.ReactNode;
}

export function EmailLayout({
  preview,
  headerLabel,
  footerVariant = "full",
  children,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={baseStyles.body}>
        <Container style={baseStyles.container}>
          <EmailHeader label={headerLabel} />
          {children}
          <EmailFooter variant={footerVariant} />
        </Container>
      </Body>
    </Html>
  );
}
