import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../components/emails/TestMail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: "Michele <noreply@michelemanna.me>",
      to: ["torre.michele07@gmail.com"],
      subject: "Hello world",
      text: "HELLO",
      react: EmailTemplate({ firstName: "John" }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};