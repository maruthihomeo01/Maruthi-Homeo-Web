import React, { useState } from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO } from '../data/clinicData';
import GoogleMapEmbed from '../components/contact/GoogleMapEmbed';

export default function ContactPage() {
  const { prefilledBooking, setConfirmationModalData, navigateTo } = useNavigation();

  // Enquiry type: 'medicine' | 'consultation' | 'dealer'
  const [enquiryType, setEnquiryType] = useState(() => (prefilledBooking ? 'consultation' : 'medicine'));
  // Mobile view switcher: 'form' | 'info' (desktop shows both side-by-side)
  const [mobileTab, setMobileTab] = useState('form');

  // Simple Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => {
    if (prefilledBooking?.careArea && prefilledBooking?.notes) {
      return `${prefilledBooking.careArea} — ${prefilledBooking.notes}`;
    }
    return prefilledBooking?.notes || prefilledBooking?.careArea || '';
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and phone / WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      const msgPrompt =
        enquiryType === 'medicine'
          ? 'Please enter the medicine names or prescription details.'
          : enquiryType === 'dealer'
            ? 'Please enter your clinic/pharmacy name and wholesale order details.'
            : 'Please briefly describe your health concern or question.';
      setErrorMsg(msgPrompt);
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('Please agree to the Privacy Policy and Terms & Conditions before submitting.');
      return;
    }

    setErrorMsg('');

    let waMessage = '';
    if (enquiryType === 'medicine') {
      setConfirmationModalData({
        type: 'medicine',
        name: name.trim(),
        phone: phone.trim(),
        medicines: message.trim(),
        fulfillment: 'Store Pickup / Courier',
        brand: 'Genuine Brands (Schwabe, Reckeweg, SBL, ADEL, Bakson)'
      });
      waMessage = `Namaste Maruthi Homoeo Centre! 🌿\nI would like to enquire about homoeopathic medicines:\n\n• Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Medicines / Prescription:\n${message.trim()}\n\nPlease confirm availability and pricing. Thank you!`;
    } else if (enquiryType === 'dealer') {
      setConfirmationModalData({
        type: 'medicine',
        name: name.trim(),
        phone: phone.trim(),
        medicines: message.trim(),
        fulfillment: 'Dealer / Wholesale Distribution',
        brand: 'Wholesale Homoeopathic Stock'
      });
      waMessage = `Namaste Maruthi Homoeo Centre! 🌿\nWholesale / Dealer Enquiry:\n\n• Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Requirement:\n${message.trim()}\n\nPlease share wholesale availability and pricing. Thank you!`;
    } else {
      setConfirmationModalData({
        type: 'consultation',
        name: name.trim(),
        phone: phone.trim(),
        careArea: 'Consultation Enquiry',
        mode: 'In-Clinic / Online',
        timingWindow: 'Clinic Hours (10:00 AM – 1:30 PM & 6:00 PM – 8:30 PM)',
        notes: message.trim()
      });
      waMessage = `Namaste Maruthi Homoeo Centre! 🌿\nI would like to enquire about a doctor consultation:\n\n• Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Concern / Query:\n${message.trim()}\n\nPlease confirm doctor availability. Thank you!`;
    }

    // Direct WhatsApp Dispatch
    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Clear message field after dispatch
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-5 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-saffron-500">
          Maruthi Homoeo Centre · Rajajinagar
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-ink">
          Contact &amp; Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Authorized dealers &amp; wholesale distributors of homoeopathic medicines. Order retail or bulk medicines, or consult our experienced physicians.
        </p>
      </div>

      {/* 3 Quick Contact Actions: Compact 3-col dock on mobile, full cards on sm+ */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {/* Phone - Direct Call Redirect */}
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          aria-label={`Call Pharmacy Desk at ${CLINIC_INFO.phone}`}
          className="p-3 sm:p-5 rounded-2xl bg-white border border-sand hover:border-sage-500 hover:shadow-sm transition-all group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 cursor-pointer active:scale-95 sm:active:scale-100"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-base sm:text-lg">
            📞
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-ink sm:text-muted sm:uppercase sm:tracking-wider">
              <span className="sm:hidden">Call Desk</span>
              <span className="hidden sm:inline">Call Pharmacy Desk</span>
            </p>
            <p className="text-[10px] sm:text-sm font-bold text-sage-800 sm:text-ink mt-0.5 leading-tight">{CLINIC_INFO.phone}</p>
            <p className="hidden sm:block text-[11px] text-sage-700 font-medium mt-0.5">Tap to call · Mon–Sat &rarr;</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello! I would like to enquire about homoeopathic medicines / consultation at Maruthi Homoeo Centre.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-5 rounded-2xl bg-white border border-sand hover:border-sage-600 hover:shadow-sm transition-all group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 active:scale-95 sm:active:scale-100"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-base sm:text-lg">
            💬
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-ink sm:text-muted sm:uppercase sm:tracking-wider">
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">WhatsApp Quick Chat</span>
            </p>
            <p className="hidden sm:block text-sm font-bold text-ink mt-0.5">Instant Enquiry</p>
            <p className="hidden sm:block text-[11px] text-sage-600 font-medium mt-0.5">Send prescriptions &rarr;</p>
            <p className="sm:hidden text-[10px] text-sage-600 font-medium">Quick chat</p>
          </div>
        </a>

        {/* Location */}
        <a
          href={CLINIC_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-5 rounded-2xl bg-white border border-sand hover:border-sage-400 hover:shadow-sm transition-all group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 active:scale-95 sm:active:scale-100"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-base sm:text-lg">
            📍
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-ink sm:text-muted sm:uppercase sm:tracking-wider">
              <span className="sm:hidden">Directions</span>
              <span className="hidden sm:inline">Location</span>
            </p>
            <p className="hidden sm:block text-sm font-bold text-ink mt-0.5">Rajajinagar 2nd Block</p>
            <p className="hidden sm:block text-[11px] text-sage-700 mt-0.5">ESI Hospital Main Rd &rarr;</p>
            <p className="sm:hidden text-[10px] text-sage-700 font-medium">Rajajinagar</p>
          </div>
        </a>
      </div>

      {/* Mobile App-Style Tab Switcher: Form vs Timings & Location */}
      <div className="grid grid-cols-2 lg:hidden p-1 rounded-2xl bg-white border border-sand shadow-xs gap-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mobileTab === 'form'
              ? 'bg-sage-800 text-white shadow-xs'
              : 'text-muted hover:text-ink'
          }`}
        >
          <span>✉️</span>
          <span>Send Enquiry</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('info')}
          className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mobileTab === 'info'
              ? 'bg-sage-800 text-white shadow-xs'
              : 'text-muted hover:text-ink'
          }`}
        >
          <span>🕒</span>
          <span>Timings &amp; Map</span>
        </button>
      </div>

      {/* Main Grid: Form (Left 7 cols) & Details (Right 5 cols) */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Simple & Clean Enquiry Form */}
        <div className={`lg:col-span-7 bg-white p-5 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-5 sm:space-y-6 ${mobileTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">Send an Enquiry</h2>
            <p className="text-xs text-muted mt-1">
              Select what you need help with. Our clinic desk will get back to you promptly.
            </p>
          </div>

          {/* Simple 3-Option Pill Toggle */}
          <div className="grid grid-cols-3 p-1 rounded-2xl bg-alabaster border border-sand gap-1 text-[11px] sm:text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setEnquiryType('medicine');
                setErrorMsg('');
              }}
              className={`py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                enquiryType === 'medicine'
                  ? 'bg-sage-800 text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>💊</span>
              <span>Medicines</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEnquiryType('consultation');
                setErrorMsg('');
              }}
              className={`py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                enquiryType === 'consultation'
                  ? 'bg-sage-800 text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>🩺</span>
              <span>Consultation</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEnquiryType('dealer');
                setErrorMsg('');
              }}
              className={`py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                enquiryType === 'dealer'
                  ? 'bg-sage-800 text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>📦</span>
              <span>Wholesale</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-ink mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rajesh Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-ink mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            {/* Simple Message / Details Area */}
            <div>
              <label htmlFor="enquiry-message" className="block text-xs font-semibold text-ink mb-1.5">
                {enquiryType === 'medicine'
                  ? 'Medicines or Prescription Details *'
                  : enquiryType === 'dealer'
                    ? 'Clinic / Pharmacy Name & Wholesale Order *'
                    : 'Health Concern or Question *'}
              </label>
              <textarea
                id="enquiry-message"
                rows="3"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  enquiryType === 'medicine'
                    ? 'e.g., Schwabe Arnica 200CH, Dr. Reckeweg R41, or store pickup / courier...'
                    : enquiryType === 'dealer'
                      ? 'e.g., Clinic/Store name, required brands (Reckeweg, Schwabe, SBL) & quantities...'
                      : 'e.g., Briefly share your symptoms or preferred in-clinic / video consultation time...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            {/* T&C Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms-agree"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-saffron-500 cursor-pointer shrink-0"
              />
              <label htmlFor="terms-agree" className="text-xs text-muted leading-relaxed cursor-pointer select-none">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('privacy-policy')}
                  className="text-saffron-600 underline font-semibold hover:text-saffron-700 transition-colors"
                >
                  Privacy Policy
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="text-saffron-600 underline font-semibold hover:text-saffron-700 transition-colors"
                >
                  Terms & Conditions
                </button>
                {' '}of Maruthi Homoeo Centre.
              </label>
            </div>

            {/* Submit Button - Directly dispatches to WhatsApp */}
            <button
              type="submit"
              disabled={!agreedToTerms}
              className="w-full py-3.5 px-5 rounded-xl bg-sage-600 hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.51 0-9.99 4.478-9.99 9.99 0 1.761.459 3.48 1.332 5l-1.413 5.161 5.289-1.387a9.96 9.96 0 004.782 1.216h.004c5.509 0 9.99-4.479 9.99-9.99 0-2.668-1.039-5.177-2.925-7.064A9.923 9.923 0 0012.031 2zm0 18.283h-.004a8.27 8.27 0 01-4.218-1.157l-.303-.18-3.136.822.836-3.056-.197-.314a8.272 8.272 0 01-1.272-4.408c0-4.57 3.719-8.289 8.294-8.289 2.215 0 4.298.863 5.864 2.43 1.566 1.568 2.428 3.652 2.428 5.867 0 4.571-3.719 8.285-8.29 8.285zm4.544-6.208c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.539.062s-1.05-.387-2.001-1.234c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.124-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.769-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.436.062-.664.312c-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.757 2.684 4.257 3.764.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.481-.072 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
              </svg>
              <span>
                {enquiryType === 'medicine'
                  ? 'Send Medicine Enquiry on WhatsApp'
                  : enquiryType === 'dealer'
                    ? 'Send Wholesale Enquiry on WhatsApp'
                    : 'Send Consultation Enquiry on WhatsApp'}
              </span>
            </button>

            <p className="text-[11px] text-center text-muted">
              Directly opens WhatsApp with your enquiry pre-typed for instant confirmation from our clinic desk.
            </p>
          </form>
        </div>

        {/* Clinic & Pharmacy Essentials (Right 5 cols) */}
        <div className={`lg:col-span-5 space-y-5 ${mobileTab === 'info' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sand shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sage-700">
                Clinic &amp; Pharmacy Timings
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink mt-1">
                Hours of Operation
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Pharmacy Hours */}
              <div className="p-3.5 rounded-2xl bg-sage-50/70 border border-sage-200/60 space-y-1">
                <p className="font-bold text-sage-900 flex items-center justify-between">
                  <span>💊 Pharmacy Counter</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Mon – Sat</span>
                </p>
                <p className="text-sm font-semibold text-ink">{CLINIC_INFO.timings.pharmacy}</p>
                <p className="text-[11px] text-muted">Genuine German &amp; Indian remedies in-stock.</p>
              </div>

              {/* Doctor Hours */}
              <div className="p-3.5 rounded-2xl bg-sage-50/70 border border-sage-200/60 space-y-1">
                <p className="font-bold text-sage-900 flex items-center justify-between">
                  <span>🩺 Doctor Consultation</span>
                  <span className="text-[11px] text-emerald-700 font-medium">By Enquiry</span>
                </p>
                <p className="text-xs font-semibold text-ink">
                  Morning: {CLINIC_INFO.timings.doctorMorning}
                </p>
                <p className="text-xs font-semibold text-ink">
                  Evening: {CLINIC_INFO.timings.doctorEvening}
                </p>
                <p className="text-[11px] text-muted">Walk-ins and prior phone enquiries welcomed.</p>
              </div>

              {/* Address */}
              <div className="pt-2 border-t border-sand space-y-1 text-xs">
                <p className="font-semibold text-ink">Store Address</p>
                <p className="text-muted leading-relaxed">{CLINIC_INFO.address.fullAddress}</p>
                <p className="text-[11px] text-sage-700 font-medium mt-1">
                  📍 {CLINIC_INFO.address.landmark}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Location */}
      <div className={`bg-white p-4 sm:p-6 rounded-3xl border border-sand shadow-sm space-y-3 ${mobileTab === 'info' ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink">Location Map</h2>
            <p className="text-xs text-muted">
              {CLINIC_INFO.legalName} · {CLINIC_INFO.address.street}, {CLINIC_INFO.locality}
            </p>
          </div>
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-sage-800 hover:underline"
          >
            Open in Google Maps &rarr;
          </a>
        </div>
        <GoogleMapEmbed />
      </div>
    </div>
  );
}