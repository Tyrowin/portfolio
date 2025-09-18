import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

interface SendEmailRequestData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(5),
  company: z.string().optional(),
  message: z.string().min(1),
});

async function sendEmailToMe(request: SendEmailRequestData): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: parseInt(process.env.MAIL_PORT ?? '587'),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const subject = `New contact from ${request.name}`;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject,
    text: request.message,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const validatedRequest = contactSchema.safeParse(body);

    if (!validatedRequest.success) {
      const errorTree = z.treeifyError(validatedRequest.error);
      const fieldErrors: Record<string, string[]> = {};
      if (errorTree.properties) {
        for (const [key, value] of Object.entries(errorTree.properties)) {
          fieldErrors[key] = value.errors;
        }
      }
      return NextResponse.json({ error: fieldErrors }, { status: 400 });
    }

    await sendEmailToMe(validatedRequest.data);
    return NextResponse.json({ message: 'Message processed' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Unable to send email' },
      { status: 500 }
    );
  }
}
