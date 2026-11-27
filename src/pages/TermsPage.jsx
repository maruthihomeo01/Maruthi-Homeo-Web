import React from 'react';
import { useNavigation } from '../context';

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p className="text-sm text-muted">
          Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: November 2026
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none space-y-8 text-muted leading-relaxed">

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the <strong className="text-ink">Maruthi Homoeo</strong> website or submitting
            an enquiry form, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not
            use this website or submit your details.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">2. Nature of Services</h2>
          <p>
            Maruthi Homoeo Centre Pharmacy – Clinic provides licensed homoeopathic pharmacy retail, wholesale
            distribution, and homoeopathic doctor consultations. Our services are <strong className="text-ink">
            complementary / alternative medicine</strong> and are not a substitute for emergency medical care or
            allopathic treatment where medically indicated.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-sm text-amber-900">
            <strong>Important:</strong> In the event of a medical emergency, please immediately contact emergency
            services (108 / 112) or proceed to the nearest hospital. Do not rely solely on homoeopathic consultation
            for life-threatening conditions.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">3. Appointment & Consultation Enquiries</h2>
          <p>
            Submitting the contact or appointment form on this website does <strong className="text-ink">not</strong>
            {' '}guarantee a confirmed appointment. It initiates a WhatsApp conversation with our clinic desk, who will
            confirm availability and timings.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Doctor consultations are available during specified clinic hours only</li>
            <li>Walk-in and prior phone/WhatsApp enquiries are both accepted</li>
            <li>Consultation fees are as displayed at the clinic counter (currently ₹200 for new patients)</li>
            <li>We reserve the right to decline or reschedule appointments at our discretion</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">4. Medicine Orders & Wholesale</h2>
          <p>
            All medicine orders placed through WhatsApp are subject to availability. We stock genuine branded
            homoeopathic medicines from authorised manufacturers (Dr. Reckeweg, Schwabe, SBL, ADEL, Bakson's, etc.).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Orders are fulfilled subject to stock availability — typically confirmed within 2–3 business days if out of stock</li>
            <li>Pricing is as per current MRP; wholesale pricing is discussed on a case-by-case basis</li>
            <li>We do not accept returns on dispensed medicines unless there is a proven manufacturing defect</li>
            <li>Shipping / delivery charges for outstation orders are communicated at the time of order confirmation</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">5. WhatsApp Communication Consent</h2>
          <p>
            By submitting the enquiry form, you expressly consent to receive WhatsApp messages from
            Maruthi Homoeo Centre (<strong className="text-ink">+91 97400 09664</strong>) regarding your enquiry.
            These messages are strictly operational — no promotional or marketing messages will be sent without
            your further consent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">6. Accuracy of Information</h2>
          <p>
            While we endeavour to keep the content of this website accurate and up to date, we make no warranties
            regarding the completeness or accuracy of information related to medicine descriptions, treatment
            outcomes, or doctor availability. Always verify critical details directly with our clinic staff.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">7. Limitation of Liability</h2>
          <p>
            Maruthi Homoeo Centre shall not be held liable for any direct, indirect, or consequential damages
            arising from the use of this website, reliance on its content, or the outcome of homoeopathic
            consultation or treatment. All medical decisions must be made in conjunction with qualified healthcare
            professionals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">8. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, brand logos, and design — is the property of
            Maruthi Homoeo Centre or its respective brand owners. Brand logos displayed on the Brand Partners
            section are trademarks of their respective companies and are used for identification purposes only.
            Reproduction without written permission is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
            shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">10. Contact</h2>
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

      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-sand flex flex-wrap gap-4 text-xs text-muted">
        <button
          type="button"
          onClick={() => navigateTo('privacy-policy')}
          className="text-sage-700 hover:text-sage-900 font-semibold underline cursor-pointer transition-colors"
        >
          Privacy Policy →
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
