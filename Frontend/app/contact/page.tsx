"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        ← Back to Home
        </Link>


        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          Have questions, feedback, or partnership inquiries?  
          We’d love to hear from you! Reach out using the form below or through our contact details.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Your message"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows={6}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <p className="text-green-600 font-semibold bg-green-50 p-4 rounded-lg mt-4">
            ✅ Thank you for reaching out! Our team will get back to you within 24 hours.
          </p>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Our Office</h2>
          <p className="text-lg">
            📍 EasyConstruct Pvt. Ltd.<br />Mangaluru,Karnataka, India
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Get in Touch</h2>
          <p className="text-lg">📞 +91 9874561230 </p>
          <p className="text-lg">✉️ support@easyconstruct.com</p>
        </div>
      </div>
    </div>
  );
}
