"use server";

import { Resend } from "resend";

export async function submitContactForm(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Simple validation
    if (!name || !email || !message) {
        return {
            success: false,
            message: "Please fill in all fields.",
        };
    }

    // Check if API Key exists
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn("RESEND_API_KEY is missing in environment variables.");
        // For development, we might still want to show success but log to console
        console.log("Dev Mode - Form Data:", { name, email, message });
        return {
            success: true,
            message: "Form received (Dev mode: No API Key configured).",
        };
    }

    const resend = new Resend(apiKey);

    try {
        const data = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            // Replace this with your email address to receive notifications
            // Once you verify a domain in Resend, you can change the 'from' address too.
            to: ["kuniklo.vt@gmail.com"],
            reply_to: email,
            subject: `New Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });



        return {
            success: true,
            message: "Thank you! Your message has been sent.",
        };
    } catch (error) {
        console.error("Submission Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
