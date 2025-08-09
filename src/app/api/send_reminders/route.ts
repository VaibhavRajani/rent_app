import { NextResponse } from "next/server";
import { Resend } from "resend";
import { privateRoommates } from "@/data/roommates";

const resend = new Resend(process.env.RESEND_API_KEY);

// Change to your deployed Vercel URL
const BASE_URL = "https://rent683.vercel.app/";

export async function GET() {
  try {
    const roommates = privateRoommates;

    for (const roommate of roommates) {
      await resend.emails.send({
        from: "Vaibhav <onboarding@resend.dev>",
        to: roommate.email,
        subject: `Rent Due Reminder - ${roommate.name}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rent Reminder</title>
<style>
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--background, #f8fafc);
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 560px;
    margin: 0 auto;
    padding: 24px;
  }
  .card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    overflow: hidden;
  }
  .header {
    background: linear-gradient(to right, var(--primary, #3b82f6), var(--primary-hover, #4f46e5));
    color: white;
    text-align: center;
    padding: 24px;
  }
  .avatar-wrapper {
    margin-bottom: 16px;
  }
  .header h1 {
    font-size: 24px;
    margin: 0;
    font-weight: bold;
  }
  .content {
    padding: 24px;
    color: var(--foreground-secondary, #1e293b);
  }
  .content p {
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 16px;
  }
  .amount {
    font-size: 20px;
    font-weight: bold;
    color: var(--foreground, #0f172a);
    margin-bottom: 24px;
  }
  .button {
    display: inline-block;
    background: linear-gradient(to right, var(--primary, #60a5fa), var(--primary-hover, #6366f1));
    color: white !important;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
  }
  .footer {
    text-align: center;
    font-size: 12px;
    color: var(--foreground-tertiary, #64748b);
    padding: 16px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Rent Reminder</h1>
      </div>
      <div class="content">
        <p>Hi ${roommate.name},</p>
        <p>This is your friendly reminder that your rent is due this month.</p>
        <div class="amount">Total Due: $${roommate.amount}</div>
        <p>
          <a href="${BASE_URL}" class="button">
            Pay Now
          </a>
        </p>
        <p>Thank you,<br>The Rent Bot 🤖</p>
      </div>
    </div>
    <div class="footer">
      683 Washington St - APT 5 | Automated Rent Reminder
    </div>
  </div>
</body>
</html>
        `,
      });
    }

    return NextResponse.json({ status: "ok", sent: roommates.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error", error }, { status: 500 });
  }
}
