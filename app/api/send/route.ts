// app/api/send/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY_FOR_CONTACTS);

export async function POST(req: Request) {
  const { name, mobile, medicalFacility, city, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM || "onboarding@resend.dev",
      to: ["sales@dm-project.com.ua"], // можеш додати більше отримувачів
      subject: "Нове повідомлення з форми сайту",
      replyTo: email,
      text: `
        Ім’я: ${name}
        Мобільний: ${mobile}
        Медичний заклад: ${medicalFacility}
        Місто: ${city}
        Email: ${email}

Повідомлення:
${message}
      `,
    });

    console.log("✅ Лист надіслано, результат:", data);
    console.log("📨 FROM:", process.env.RESEND_FROM);
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Помилка при відправці:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}