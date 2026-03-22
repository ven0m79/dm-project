import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { name, mobile, medicalFacility, productName, city, email, message } = await req.json();
  const resendApiKey = process.env.RESEND_API_KEY_FOR_CONTACTS;
  const fromAddress = process.env.RESEND_FROM;

  if (!resendApiKey || !fromAddress) {
    return NextResponse.json(
      { success: false, error: "Missing RESEND_API_KEY_FOR_CONTACTS or RESEND_FROM" },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const data = await resend.emails.send({
      from: fromAddress,
      to: ["sales@dm-project.com.ua"], // можеш додати більше отримувачів
      subject: "Нове повідомлення з форми сайту З Контакти",
      replyTo: email,
      text: `
        Ім’я: ${name}
        Мобільний: ${mobile}
        Назва товару: ${productName}
        Медичний заклад: ${medicalFacility}
        Місто: ${city}
        Email: ${email}
        Повідомлення: ${message}
      `,
    });

    //("✅ Лист надіслано, результат:", data);
    //console.log("📨 FROM:", process.env.RESEND_FROM);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Помилка при відправці:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}