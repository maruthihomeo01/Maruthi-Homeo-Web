import React from 'react';
import { useNavigation } from '../context';

export default function PrivacyPolicyPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 animate-in fade-in duration-300">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-700 hover:text-sage-900 transition-colors mb-8 cursor-pointer"
      >
        ← Back to Home
      </button>

      {/* Header */}
      <div className="space-y-2 mb-10 pb-6 border-b border-sand">
        <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
          Maruthi Homoeo Centre · Rajajinagar, Bengaluru
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted">
          Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: November 2026
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8 text-muted leading-relaxed">

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">1. About Us</h2>
          <p>
            Maruthi Homoeo Centre Pharmacy – Clinic (trading as <strong className="text-ink">Maruthi Homoeo</strong>)
            is a licensed homoeopathic pharmacy and clinic located at Rajajinagar, Bengaluru – 560 010, Karnataka, India.
            This Privacy Policy explains how we collect, use, and protect information you share with us through our website
            or enquiry form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">2. Information We Collect</h2>
          <p>When you submit an enquiry or appointment request via our contact form, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Your full name</li>
            <li>Your phone / WhatsApp number</li>
            <li>Your health concern or medicine requirement (as typed by you)</li>
            <li>Your preferred mode of delivery or consultation</li>
          </ul>
          <p>
            We do <strong className="text-ink">not</strong> collect payment information, national ID numbers, or
            sensitive health records through this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">3. How We Use Your Information</h2>
          <p>The information you provide is used exclusively to:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Respond to your medicine or consultation enquiry via WhatsApp</li>
            <li>Confirm appointment timings or medicine availability</li>
            <li>Provide you with pricing and dispatch details for wholesale orders</li>
          </ul>
          <p>
            Your information is <strong className="text-ink">not used for any marketing communications</strong> without
            your explicit consent, and we do not send unsolicited messages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">4. Data Storage & Retention</h2>
          <p>
            Enquiry data submitted through our form is transmitted directly to our WhatsApp business number
            (<strong className="text-ink">+91 97400 09664</strong>) and is not stored on any server operated by this website.
            WhatsApp messages are subject to WhatsApp's own Privacy Policy.
          </p>
          <p>
            We retain WhatsApp conversation records for operational purposes for up to 12 months, after which
            they are deleted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">5. Sharing of Information</h2>
          <p>
            We do <strong className="text-ink">not sell, rent, or share</strong> your personal information with any third
            party for commercial purposes. Your details are accessed only by the clinic staff responsible for
            handling your enquiry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">6. Cookies & Analytics</h2>
          <p>
            This website does not use tracking cookies or third-party analytics services. No personal data is
            collected automatically through your browser session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Request access to any personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time by contacting us</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">8. Contact</h2>
          <p>
            For any privacy-related queries, contact us at:
          </p>
          <div className="p-4 rounded-xl bg-sage-50/70 border border-sage-200/60 text-sm space-y-1">
            <p className="font-semibold text-ink">Maruthi Homoeo Centre Pharmacy – Clinic</p>
            <p>7th Cross, Rajajinagar, Bengaluru – 560 010</p>
            <p>
              WhatsApp / Phone:{' '}
              <a href="tel:+919740009664" className="text-sage-800 font-semibold hover:underline">
                +91 97400 09664
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:care@maruthihomoeo.com" className="text-sage-800 font-semibold hover:underline">
                care@maruthihomoeo.com
              </a>
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the
            updated effective date. Continued use of our website after changes constitutes your acceptance.
          </p>
        </section>
      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-sand flex flex-wrap gap-4 text-xs text-muted">
        <button
          type="button"
          onClick={() => navigateTo('terms')}
          className="text-sage-700 hover:text-sage-900 font-semibold underline cursor-pointer transition-colors"
        >
          Terms & Conditions →
        </button>
        <button
          type="button"
          onClick={() => navigateTo('contact')}
          className="text-sage-700 hover:text-sage-900 font-semibold underline cursor-pointer transition-colors"
        >
          Contact Us →
        </button>
      </div>
    </div>
  );
}
