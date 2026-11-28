import React from 'react';
import { useNavigation } from '../../context';
import { CLINIC_INFO } from '../../data/clinicData';

export default function ConfirmationModal() {
  const { confirmationModalData, setConfirmationModalData } = useNavigation();

  if (!confirmationModalData) return null;

  const isMedicine = confirmationModalData.type === 'medicine';
  const { name, phone } = confirmationModalData;

  let waMessage = '';
  let title = '';
  let description = null;

  if (isMedicine) {
    const { medicines, fulfillment, brand } = confirmationModalData;
    title = 'Medicine Enquiry Received';
    description = (
      <>
        Thank you, <strong className="text-ink">{name}</strong>. Your inquiry for homoeopathic medicines ({brand || 'Genuine Brands'}, {fulfillment}) has been logged for {CLINIC_INFO.legalName}. Our pharmacy counter will review availability and notify you on <strong className="text-ink">{phone}</strong> shortly.
      </>
    );
    waMessage = `Namaste! I submitted a medicine availability inquiry on ${CLINIC_INFO.name}:
• Name: ${name}
• Phone: ${phone}
• Preference: ${fulfillment} (${brand || 'Genuine Brands'})
• Medicine List:
${medicines}
Please confirm stock availability and pricing.`;
  } else {
    const { careArea, mode, timingWindow } = confirmationModalData;
    title = 'Doctor Consultation Enquiry Received';
    description = (
      <>
        Thank you, <strong className="text-ink">{name}</strong>. Your consultation inquiry regarding <strong className="text-sage-800">{careArea || 'General Health'}</strong> ({mode || 'In-Clinic'}, {timingWindow || 'Clinic Hours'}) has been received. Our clinic desk will check doctor availability and contact you on <strong className="text-ink">{phone}</strong>.
      </>
    );
    waMessage = `Namaste! I submitted a doctor consultation inquiry on ${CLINIC_INFO.name}:
• Name: ${name}
• Phone: ${phone}
• Care Area: ${careArea || 'General'}
• Mode: ${mode || 'In-Clinic'}
• Timing: ${timingWindow || 'Clinic Hours'}
Please confirm doctor availability and timings.`;
  }

  const waLink = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={() => setConfirmationModalData(null)}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-sand space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11 h-11 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h3 id="modal-title" className="font-serif text-xl font-semibold text-ink">
            {title}
          </h3>
          <p className="text-sm text-muted mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="p-3 bg-sage-50 rounded-xl border border-sage-100 text-xs text-sage-900 flex items-center justify-between gap-3">
          <span>Need instant confirmation on WhatsApp?</span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-sage-600 hover:bg-sage-700 text-white font-medium whitespace-nowrap transition-colors"
          >
            Chat Now
          </a>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => setConfirmationModalData(null)}
            className="px-5 py-2.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
