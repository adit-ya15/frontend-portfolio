import { NextRequest,NextResponse } from "next/server";
import { transporter } from "../config";

async function sendMailToMe(email:string,subject:string,message:string, name:string){
    await transporter.sendMail({
        from:'suryanshverma.nitp@gmail.com',
        to:'suryanshverma.nitp@gmail.com',
        subject,
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 100%); min-height: 100vh;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 40px 20px;">
                        <table role="presentation" style="max-width: 600px; width: 100%; background: #151030; border-radius: 16px; box-shadow: 0 8px 32px rgba(145, 94, 255, 0.15); overflow: hidden;">
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #915eff 0%, #6b46c1 100%); padding: 30px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                                        📧 New Contact Message
                                    </h1>
                                    <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                        Portfolio Contact Form Submission
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <!-- Sender Info Card -->
                                    <div style="background: #1a1543; border-left: 4px solid #915eff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                                        <h2 style="margin: 0 0 15px 0; color: #915eff; font-size: 18px; font-weight: bold;">
                                            Sender Information
                                        </h2>
                                        <table style="width: 100%;">
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span style="color: #aaa6c3; font-size: 14px; display: inline-block; width: 80px;">Name:</span>
                                                    <span style="color: #ffffff; font-size: 14px; font-weight: 600;">${name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span style="color: #aaa6c3; font-size: 14px; display: inline-block; width: 80px;">Email:</span>
                                                    <a href="mailto:${email}" style="color: #915eff; font-size: 14px; text-decoration: none; font-weight: 600;">${email}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                    <!-- Message Card -->
                                    <div style="background: #1a1543; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                        <h2 style="margin: 0 0 15px 0; color: #915eff; font-size: 18px; font-weight: bold;">
                                            Message
                                        </h2>
                                        <div style="color: #e0dff6; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                                    </div>
                                    
                                    <!-- Action Button -->
                                    <div style="text-align: center; margin-top: 30px;">
                                        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #915eff 0%, #6b46c1 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 15px; box-shadow: 0 4px 16px rgba(145, 94, 255, 0.3);">
                                            Reply to ${name}
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background: #0f0b24; padding: 20px 40px; text-align: center; border-top: 1px solid rgba(145, 94, 255, 0.2);">
                                    <p style="margin: 0; color: #aaa6c3; font-size: 13px;">
                                        This email was sent from your portfolio contact form
                                    </p>
                                    <p style="margin: 10px 0 0 0; color: #666580; font-size: 12px;">
                                        &copy; ${new Date().getFullYear()} Suryansh Verma Portfolio. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
     })
}

async function sendMailToSender(senderEmail:string,subject:string, name:string){
    await transporter.sendMail({
        from:'suryanshverma.nitp@gmail.com',
        to:senderEmail,
        subject,
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 100%); min-height: 100vh;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 40px 20px;">
                        <table role="presentation" style="max-width: 600px; width: 100%; background: #151030; border-radius: 16px; box-shadow: 0 8px 32px rgba(145, 94, 255, 0.15); overflow: hidden;">
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #915eff 0%, #6b46c1 100%); padding: 40px; text-align: center;">
                                    <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                        <span style="font-size: 40px;">✓</span>
                                    </div>
                                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                                        Thank You!
                                    </h1>
                                    <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                                        Your message has been received
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 22px; text-align: center;">
                                        Hi ${name},
                                    </h2>
                                    
                                    <p style="margin: 0 0 20px 0; color: #e0dff6; font-size: 16px; line-height: 1.7; text-align: center;">
                                        Thank you for reaching out! I appreciate you taking the time to contact me through my portfolio.
                                    </p>
                                    
                                    <div style="background: #1a1543; border-left: 4px solid #915eff; padding: 20px; border-radius: 8px; margin: 30px 0;">
                                        <p style="margin: 0; color: #aaa6c3; font-size: 14px; line-height: 1.6;">
                                            💡 <strong style="color: #915eff;">What's Next?</strong><br>
                                            I've received your message and will review it shortly. I typically respond within 24-48 hours. If your inquiry is urgent, feel free to connect with me on LinkedIn.
                                        </p>
                                    </div>
                                    
                                    <p style="margin: 30px 0 20px 0; color: #e0dff6; font-size: 15px; line-height: 1.6; text-align: center;">
                                        In the meantime, feel free to explore my portfolio:
                                    </p>
                                    
                                    <!-- Links Grid -->
                                    <table role="presentation" style="width: 100%; margin: 20px 0;">
                                        <tr>
                                            <td style="padding: 8px; width: 50%;">
                                                <a href="https://github.com/suryanshvermaa" style="display: block; background: #1a1543; color: #915eff; text-decoration: none; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; border: 1px solid rgba(145, 94, 255, 0.2);">
                                                    🔗 GitHub Profile
                                                </a>
                                            </td>
                                            <td style="padding: 8px; width: 50%;">
                                                <a href="https://linkedin.com/in/suryanshvermaa" style="display: block; background: #1a1543; color: #915eff; text-decoration: none; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; border: 1px solid rgba(145, 94, 255, 0.2);">
                                                    💼 LinkedIn
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(145, 94, 255, 0.2);">
                                        <p style="margin: 0 0 10px 0; color: #aaa6c3; font-size: 15px;">
                                            Best regards,
                                        </p>
                                        <p style="margin: 0; color: #915eff; font-size: 18px; font-weight: bold;">
                                            Suryansh Verma
                                        </p>
                                        <p style="margin: 5px 0 0 0; color: #666580; font-size: 13px;">
                                            Full-Stack Developer | Cloud & DevOps Engineer
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background: #0f0b24; padding: 20px 40px; text-align: center; border-top: 1px solid rgba(145, 94, 255, 0.2);">
                                    <p style="margin: 0 0 10px 0; color: #aaa6c3; font-size: 13px;">
                                        This is an automated response to confirm we received your message.
                                    </p>
                                    <p style="margin: 0; color: #666580; font-size: 12px;">
                                        &copy; ${new Date().getFullYear()} Suryansh Verma Portfolio. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
     })
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
        }
        await sendMailToMe(email, `Portfolio Contact Form: New message from ${name}`, message, name);
        await sendMailToSender(email, `Thank you for contacting me, ${name}!`, name);
        return NextResponse.json({ message: "Email sent successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}