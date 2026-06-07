import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface ContactNotificationProps {
  name: string;
  email: string;
  services: string;
  budget: string;
  message: string;
}

export default function ContactNotification({
  name,
  email,
  services,
  budget,
  message,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New project inquiry from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New Project Inquiry</Heading>

          <Section style={table}>
            <Row style={row}>
              <Column style={labelCol}>Name</Column>
              <Column style={valueCol}>{name}</Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}>Email</Column>
              <Column style={valueCol}>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}>Services</Column>
              <Column style={valueCol}>{services}</Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}>Budget</Column>
              <Column style={valueCol}>{budget}</Column>
            </Row>
          </Section>

          <Text style={detailsLabel}>Project Details</Text>
          <Text style={messageBox}>{message}</Text>

          <Hr style={hr} />
          <Text style={footer}>Sent via jaspire.co/contact</Text>
        </Container>
      </Body>
    </Html>
  );
}

ContactNotification.PreviewProps = {
  name: "Marie Dupont",
  email: "marie@example.com",
  services: "Web Development, SEO",
  budget: "$5,000 – $10,000",
  message:
    "We're looking to redesign our company website and improve our search rankings. We currently get about 2,000 monthly visitors and want to 5x that within 6 months. Our current site is on WordPress but we're open to a full rebuild.",
} satisfies ContactNotificationProps;

const body = {
  backgroundColor: "#f5f3f0",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 32px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700" as const,
  color: "#1a1a1a",
  marginBottom: "24px",
};

const table = {
  marginBottom: "24px",
};

const row = {
  borderBottom: "1px solid #e5e5e5",
};

const labelCol = {
  padding: "12px 0",
  color: "#737373",
  fontSize: "14px",
  width: "120px",
  verticalAlign: "top" as const,
};

const valueCol = {
  padding: "12px 0",
  color: "#1a1a1a",
  fontSize: "14px",
};

const link = {
  color: "#7c6bf0",
  textDecoration: "none" as const,
};

const detailsLabel = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#737373",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "8px",
};

const messageBox = {
  fontSize: "14px",
  color: "#1a1a1a",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f5f3f0",
  padding: "16px",
  borderRadius: "8px",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "32px 0 16px",
};

const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
};
