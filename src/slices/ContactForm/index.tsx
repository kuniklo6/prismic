"use client";

import { FC, useActionState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { submitContactForm } from "@/actions/contact";
import { useFormStatus } from "react-dom";

export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
};

const ContactForm: FC<ContactFormProps> = ({ slice }) => {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: "",
  });

  return (
    <section className="relative py-16 px-6 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-black">
              Get in Touch
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We'd love to hear from you. Send us a message and we'll get back to you shortly.
            </p>
          </div>

          {!state.success ? (
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all text-black"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all text-black"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-blue-500 transition-all resize-none text-black"
                />
              </div>

              {state.message && !state.success && (
                <p className="text-red-500 text-sm text-center font-medium">{state.message}</p>
              )}

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
              <div className="rounded-full bg-green-100 p-4 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
              <p className="mt-2 text-slate-600 max-w-sm">
                {state.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 text-sm font-semibold text-blue-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


export default ContactForm;
