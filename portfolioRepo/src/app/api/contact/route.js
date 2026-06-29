import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required. Please check your submission.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Output submission locally (or send via service in production)
    console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

    // In a real production environment, you would use a service like Resend, Nodemailer,
    // SendGrid, or integrate with an external database or slack webhook.
    // Example:
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'your-email@example.com',
    //   subject: `New Portfolio Message from ${name}`,
    //   text: message,
    // });

    return NextResponse.json(
      { message: 'Your message has been processed successfully. I will get back to you shortly!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact Form Route Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
