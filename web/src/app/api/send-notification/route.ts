import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Format the email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6b36ff 0%, #7c47ff 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #6b36ff; margin-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
            .field { margin-bottom: 8px; }
            .label { font-weight: 600; color: #555; }
            .value { color: #333; margin-left: 8px; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 New Lead Alert</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone completed your survey!</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">📋 Business Information</div>
                <div class="field"><span class="label">Business Name:</span><span class="value">${data.business_name || "N/A"}</span></div>
                ${data.website ? `<div class="field"><span class="label">Website:</span><span class="value"><a href="${data.website}">${data.website}</a></span></div>` : ""}
                <div class="field"><span class="label">Industry:</span><span class="value">${data.industry || "N/A"}</span></div>
                <div class="field"><span class="label">Team Size:</span><span class="value">${data.team_size || "N/A"}</span></div>
                <div class="field"><span class="label">Location:</span><span class="value">${data.location || "N/A"}</span></div>
              </div>

              <div class="section">
                <div class="section-title">📞 Contact Details</div>
                <div class="field"><span class="label">Name:</span><span class="value">${data.full_name || "N/A"}</span></div>
                <div class="field"><span class="label">Email:</span><span class="value"><a href="mailto:${data.email}">${data.email}</a></span></div>
                ${data.phone ? `<div class="field"><span class="label">Phone:</span><span class="value"><a href="tel:${data.phone}">${data.phone}</a></span></div>` : ""}
                ${data.social ? `<div class="field"><span class="label">Social:</span><span class="value">${data.social}</span></div>` : ""}
              </div>

              <div class="section">
                <div class="section-title">⚙️ Operations</div>
                <div class="field"><span class="label">Lead Sources:</span><span class="value">${Array.isArray(data.lead_sources) ? data.lead_sources.join(", ") : data.lead_sources || "N/A"}</span></div>
                ${data.lead_source_other ? `<div class="field"><span class="label">Other Lead Source:</span><span class="value">${data.lead_source_other}</span></div>` : ""}
                <div class="field"><span class="label">Who Handles Calls:</span><span class="value">${data.handler || "N/A"}</span></div>
                ${Array.isArray(data.systems) && data.systems.length > 0 ? `<div class="field"><span class="label">Current Systems:</span><span class="value">${data.systems.join(", ")}</span></div>` : ""}
                ${data.systems_other ? `<div class="field"><span class="label">Other Systems:</span><span class="value">${data.systems_other}</span></div>` : ""}
              </div>

              <div class="section">
                <div class="section-title">🎯 Challenges & Goals</div>
                <div class="field"><span class="label">Pain Points:</span><span class="value">${Array.isArray(data.challenges) ? data.challenges.join(", ") : data.challenges || "N/A"}</span></div>
                ${data.challenge_other ? `<div class="field"><span class="label">Other Challenge:</span><span class="value">${data.challenge_other}</span></div>` : ""}
                <div class="field"><span class="label">Lead Loss Frequency:</span><span class="value">${data.lead_loss_frequency || "N/A"}/5</span></div>
                ${data.ai_help ? `<div class="field"><span class="label">AI Help Needed:</span><span class="value">${data.ai_help}</span></div>` : ""}
              </div>

              ${data.success_30_days ? `
              <div class="highlight">
                <div class="section-title">💡 Success Goal (30 Days)</div>
                <p style="margin: 0;">${data.success_30_days}</p>
              </div>
              ` : ""}

              ${data.timeline ? `
              <div class="section">
                <div class="section-title">⏰ Timeline</div>
                <p style="font-size: 18px; color: #6b36ff; font-weight: bold; margin: 0;">${data.timeline}</p>
              </div>
              ` : ""}

              <div class="footer">
                <p>Submitted: ${new Date(data.created_at || Date.now()).toLocaleString()}</p>
                <p>View all submissions: <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin">Admin Dashboard</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Drivn.ai <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL || "your-email@example.com",
      subject: `🎯 New Lead: ${data.business_name || "Survey Submission"}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, messageId: result.data?.id });
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}





