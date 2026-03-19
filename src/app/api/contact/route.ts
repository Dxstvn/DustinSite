import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
}

interface ContactFormData {
  services: string[];
  name: string;
  email: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const servicesText =
      body.services.length > 0
        ? body.services
            .map((s) =>
              s
                .replace(/-/g, " ")
                .replace(/(^|\s)\S/g, (l) => l.toUpperCase()),
            )
            .join(", ")
        : "Not specified";

    const resend = getResendClient();
    await resend.emails.send({
      from: "Jaspire Contact <onboarding@resend.dev>",
      to: ["hello@jaspire.co"],
      replyTo: body.email,
      subject: `New project inquiry from ${body.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px;">
            New Project Inquiry
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-size: 14px; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a; font-size: 14px;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a; font-size: 14px;">
                <a href="mailto:${body.email}" style="color: #7c6bf0;">${body.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-size: 14px;">Services</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a; font-size: 14px;">${servicesText}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #737373; font-size: 14px;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a; font-size: 14px;">${body.budget || "Not specified"}</td>
            </tr>
          </table>

          <h3 style="font-size: 14px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
            Project Details
          </h3>
          <p style="font-size: 14px; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap; background: #f5f3f0; padding: 16px; border-radius: 8px;">
            ${body.message}
          </p>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0 16px;" />
          <p style="font-size: 12px; color: #a3a3a3;">
            Sent via jaspire.co/contact
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
