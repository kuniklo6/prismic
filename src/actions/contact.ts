"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("--------------------------------");
    console.log("CONTACT FORM SUBMISSION RECEIVED");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("--------------------------------");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Determine if valid (simple validation)
    if (!name || !email || !message) {
        return {
            success: false,
            message: "Please fill in all fields.",
        };
    }

    return {
        success: true,
        message: "Thank you! Your message has been sent.",
    };
}
