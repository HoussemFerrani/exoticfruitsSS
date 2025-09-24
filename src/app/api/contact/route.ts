import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  sanitizeInput,
  validateEmail,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";

export const runtime = "nodejs";

type FormType = "consultation" | "service" | "job" | "partnership";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  details?: string;
  formType?: FormType;
  serviceName?: string;
  fileName?: string;
}

function getSubject({
  name,
  formType,
  service,
  serviceName,
}: {
  name: string;
  formType?: FormType;
  service?: string;
  serviceName?: string;
}) {
  const svc = service || serviceName;
  switch (formType) {
    case "consultation":
      return `New Product Inquiry from ${name}`;
    case "service":
      return `New Service Request: ${svc || "Service"} from ${name}`;
    case "job":
      return `New Job Application from ${name}`;
    case "partnership":
      return `New Partnership Inquiry from ${name}`;
    default:
      return `New Contact from ${name}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting for contact form
    if (!checkRateLimit(`contact_${clientIP}`, 3, 60 * 60 * 1000)) {
      auditLogger.log({
        action: 'RATE_LIMIT_EXCEEDED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { endpoint: 'contact' }
      });
      return NextResponse.json(
        { error: 'Too many contact form submissions, please try again later.' },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactFormData;
    const {
      name,
      email,
      phone,
      service,
      details,
      formType,
      serviceName,
      fileName,
    } = body;

    // Validate and sanitize input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedService = service ? sanitizeInput(service) : undefined;
    const sanitizedDetails = details ? sanitizeInput(details) : undefined;
    const sanitizedServiceName = serviceName
      ? sanitizeInput(serviceName)
      : undefined;

    // Use sanitized details in email processing
    const processedDetails = sanitizedDetails || 'No additional details provided';

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    if (sanitizedPhone.length < 10) {
      return NextResponse.json(
        { error: "Phone number must be at least 10 characters" },
        { status: 400 }
      );
    }

    auditLogger.log({
      action: "CONTACT_FORM_SUBMITTED",
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: {
        email: sanitizedEmail,
        name: sanitizedName,
        formType,
        service: sanitizedService || sanitizedServiceName,
      },
    });

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user || "no-reply@example.com";
    const to = process.env.CONTACT_EMAIL || user || "";

    if (!user || !pass || !to) {
      return NextResponse.json(
        { error: "Email transport not configured on server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = getSubject({ name, formType, service, serviceName });
    const brand = "#15803d";
    const cta = "#f97316";
    const muted = "#6b7280";

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { background:#f6f7f9; margin:0; padding:24px; font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111827; }
    .container { max-width:640px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
    .header { padding:28px 24px; background: linear-gradient(135deg, ${brand} 0%, #0f5132 100%); color:#fff; text-align:center; }
    .header h1 { margin:0 0 6px; font-size:22px; font-weight:800; letter-spacing:0.2px; }
    .header p { margin:0; opacity:0.9; font-size:13px; }
    .content { padding:24px; }
    .badge { display:inline-block; background:${cta}; color:#fff; padding:6px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.3px; }
    .grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; margin-top:16px; }
    .item { border:1px solid #e5e7eb; border-radius:12px; padding:12px; background:#fff; }
    .label { font-size:11px; color:${muted}; text-transform:uppercase; letter-spacing:0.4px; margin-bottom:4px; }
    .value { font-size:15px; color:#111827; font-weight:600; }
    .section { margin-top:20px; background:#f9fafb; border-radius:12px; padding:16px; }
    .section h3 { margin:0 0 8px; font-size:14px; color:#111827; }
    .bubble { background:#fff; border-left:3px solid ${brand}; padding:12px; border-radius:8px; font-size:14px; color:#111827; }
    .actions { text-align:center; margin:24px 0 4px; }
    .btn { display:inline-block; text-decoration:none; font-weight:700; padding:10px 16px; border-radius:10px; color:#fff; margin:0 8px; }
    .btn-primary { background:${brand}; }
    .btn-cta { background:${cta}; }
    .footer { background:#111827; color:#fff; text-align:center; padding:16px; font-size:12px; }
    @media (max-width: 540px) { .grid { grid-template-columns: 1fr; } }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${subject}</h1>
        <p>Exotic Fruits International — Contact Form</p>
      </div>
      <div class="content">
        <div style="text-align:center; margin-bottom:12px;"> 
          <span class="badge">${(formType || "contact").toUpperCase()}</span>
        </div>
        <div class="grid">
          <div class="item">
            <div class="label">Full Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="item">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color:${brand}; text-decoration:none;">${email}</a></div>
          </div>
          <div class="item">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${phone}" style="color:${brand}; text-decoration:none;">${phone}</a></div>
          </div>
          ${
            service || serviceName
              ? `
          <div class="item">
            <div class="label">Product/Service</div>
            <div class="value">${service || serviceName}</div>
          </div>`
              : ""
          }
          ${
            fileName
              ? `
          <div class="item">
            <div class="label">File</div>
            <div class="value">${fileName}</div>
          </div>`
              : ""
          }
        </div>

        ${
          processedDetails && processedDetails !== 'No additional details provided'
            ? `
        <div class="section">
          <h3>Details</h3>
          <div class="bubble">${processedDetails
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</div>
        </div>`
            : ""
        }

        <div class="actions">
          <a class="btn btn-cta" href="mailto:${sanitizedEmail}">Reply by Email</a>
          <a class="btn btn-primary" href="tel:${sanitizedPhone}">Call Now</a>
        </div>
      </div>
      <div class="footer">
        <div><strong>Exotic Fruits International</strong></div>
        <div style="opacity:0.8; margin-top:4px;">This email was generated automatically from the website.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `${subject}
==============================

CLIENT INFORMATION:
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Request type: ${formType || "contact"}
${service || serviceName ? `• Product/Service: ${service || serviceName}` : ""}
${fileName ? `• File: ${fileName}` : ""}

${details ? `DETAILS:\n${details}\n\n` : ""}NEXT STEPS:
• Respond within 24 hours
• Email: ${email}
• Phone: ${phone}
`;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}


