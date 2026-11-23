import React, { useState } from 'react';
import { useNavigation } from '../context';
import { CLINIC_INFO } from '../data/clinicData';
import GoogleMapEmbed from '../components/contact/GoogleMapEmbed';

export default function ContactPage() {
  const { prefilledBooking, setConfirmationModalData } = useNavigation();

  // Enquiry type: 'medicine' (primary) or 'consultation'
  const [enquiryType, setEnquiryType] = useState(() => (prefilledBooking ? 'consultation' : 'medicine'));

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => prefilledBooking?.notes || '');
  const [deliveryOption, setDeliveryOption] = useState('Store Pickup (Rajajinagar)');
  const [consultMode, setConsultMode] = useState('In-Clinic (Rajajinagar)');
  const [careArea, setCareArea] = useState(() => prefilledBooking?.careArea || 'General Consultation');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and phone / WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg(
        enquiryType === 'medicine'
          ? 'Please enter the medicine names, potencies, or prescription details.'
          : 'Please briefly describe your health concern or question.'
      );
      return;
    }

    setErrorMsg('');

    let waMessage = '';
    if (enquiryType === 'medicine') {
      const entry = {
        type: 'medicine',
        name: name.trim(),
        phone: phone.trim(),
        medicines: message.trim(),
        fulfillment: deliveryOption,
        brand: 'Genuine Brands (Schwabe, Reckeweg, SBL, ADEL, Bakson)'
      };
      setConfirmationModalData(entry);
      waMessage = `Namaste Maruthi Homoeo Centre! 🌿\nI would like to enquire about homoeopathic medicines:\n\n• Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Fulfillment: ${deliveryOption}\n• Required Medicines / Prescription:\n${message.trim()}\n\nPlease confirm availability and pricing. Thank you!`;
    } else {
      const entry = {
        type: 'consultation',
        name: name.trim(),
        phone: phone.trim(),
        careArea,
        mode: consultMode,
        timingWindow: 'Clinic Hours (10:00 AM – 1:30 PM & 6:00 PM – 8:30 PM)',
        notes: message.trim()
      };
      setConfirmationModalData(entry);
      waMessage = `Namaste Maruthi Homoeo Centre! 🌿\nI would like to enquire about doctor consultation timings:\n\n• Patient Name: ${name.trim()}\n• Phone: ${phone.trim()}\n• Health Concern: ${careArea}\n• Mode: ${consultMode}\n• Query / Symptoms:\n${message.trim()}\n\nPlease confirm doctor availability. Thank you!`;
    }

    // Direct WhatsApp Dispatch
    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Clear form
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-sage-700">
          Maruthi Homoeo Centre · Rajajinagar
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
          Contact &amp; Enquiries
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Order genuine homoeopathic medicines, enquire about wholesale distribution, or consult our experienced physicians.
        </p>
      </div>

      {/* 3 Quick Contact Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Phone */}
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="p-5 rounded-2xl bg-white border border-sand hover:border-sage-400 hover:shadow-sm transition-all group flex items-start gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-lg">
            📞
          </div>
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Call Pharmacy Desk</p>
            <p className="text-sm font-bold text-ink mt-0.5">{CLINIC_INFO.phone}</p>
            <p className="text-[11px] text-sage-700 mt-0.5">Mon–Sat, 10 AM – 8:30 PM</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello! I would like to enquire about homoeopathic medicines / consultation at Maruthi Homoeo Centre.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-sand hover:border-emerald-400 hover:shadow-sm transition-all group flex items-start gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-lg">
            💬
          </div>
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">WhatsApp Quick Chat</p>
            <p className="text-sm font-bold text-ink mt-0.5">Instant Enquiry</p>
            <p className="text-[11px] text-[#25D366] font-medium mt-0.5">Send prescriptions &amp; photos &rarr;</p>
          </div>
        </a>

        {/* Location */}
        <a
          href={CLINIC_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-white border border-sand hover:border-sage-400 hover:shadow-sm transition-all group flex items-start gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-lg">
            📍
          </div>
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Location</p>
            <p className="text-sm font-bold text-ink mt-0.5">Rajajinagar 2nd Block</p>
            <p className="text-[11px] text-sage-700 mt-0.5">ESI Hospital Main Rd &rarr;</p>
          </div>
        </a>
      </div>

      {/* Main Grid: Form (Left 7 cols) & Details (Right 5 cols) */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Simple & Clean Enquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sand shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">Send an Enquiry</h2>
            <p className="text-xs text-muted mt-1">
              Select what you need help with. Our clinic desk will get back to you promptly.
            </p>
          </div>

          {/* Simple 2-Option Pill Toggle */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-alabaster border border-sand gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setEnquiryType('medicine');
                setErrorMsg('');
              }}
              className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                enquiryType === 'medicine'
                  ? 'bg-sage-800 text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>💊</span>
              <span>Medicine / Prescription</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEnquiryType('consultation');
                setErrorMsg('');
              }}
              className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                enquiryType === 'consultation'
                  ? 'bg-sage-800 text-white shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>🩺</span>
              <span>Doctor Consultation</span>
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
                  Your Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rajesh Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-ink mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                />
              </div>
            </div>

            {/* Medicine Specific Option: Fulfillment */}
            {enquiryType === 'medicine' && (
              <div>
                <label htmlFor="delivery-preference" className="block text-xs font-semibold text-ink mb-1.5">
                  Fulfillment &amp; Order Type
                </label>
                <select
                  id="delivery-preference"
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                >
                  <option value="Store Pickup (Rajajinagar)">Store Pickup (Rajajinagar Store)</option>
                  <option value="Bengaluru Home Delivery / Courier">Bengaluru Home Delivery / Courier</option>
                  <option value="Pan-India Courier Dispatch">Pan-India Courier Dispatch</option>
                  <option value="Doctor / Clinic Wholesale Supply">Doctor / Clinic Wholesale Supply</option>
                </select>
              </div>
            )}

            {/* Consultation Specific Options */}
            {enquiryType === 'consultation' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="care-area-select" className="block text-xs font-semibold text-ink mb-1.5">
                    Health Concern
                  </label>
                  <select
                    id="care-area-select"
                    value={careArea}
                    onChange={(e) => setCareArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                  >
                    <option value="Metabolic & Diabetes Care">Diabetes Mellitus &amp; Metabolic Care</option>
                    <option value="Kidney Stones & Renal Health">Kidney Stones &amp; Renal Health</option>
                    <option value="Arthritis & Joint Health">Arthritis, Sciatica &amp; Joint Pain</option>
                    <option value="Skin & Hair Care">Skin &amp; Hair Care (Eczema, Psoriasis)</option>
                    <option value="Respiratory & Allergies">Respiratory &amp; Allergies (Sinus, Asthma)</option>
                    <option value="Digestive & Liver Health">Digestive &amp; Liver (Acidity, Piles, Fatty Liver)</option>
                    <option value="Women's & Pediatric Care">Women's (PCOS) &amp; Pediatric Care</option>
                    <option value="Stress, Sleep & Migraine">Stress, Sleep &amp; Migraine</option>
                    <option value="General Consultation">General Constitutional Health</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="consult-mode-select" className="block text-xs font-semibold text-ink mb-1.5">
                    Mode of Consult
                  </label>
                  <select
                    id="consult-mode-select"
                    value={consultMode}
                    onChange={(e) => setConsultMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
                  >
                    <option value="In-Clinic (Rajajinagar)">In-Clinic Visit (Rajajinagar)</option>
                    <option value="Online Video / Phone">Online Video / Phone</option>
                  </select>
                </div>
              </div>
            )}

            {/* Message / Details Area */}
            <div>
              <label htmlFor="enquiry-message" className="block text-xs font-semibold text-ink mb-1.5">
                {enquiryType === 'medicine'
                  ? 'Medicines, Potencies or Prescription Details *'
                  : 'Brief Health Concerns or Questions *'}
              </label>
              <textarea
                id="enquiry-message"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  enquiryType === 'medicine'
                    ? 'Enter medicine names and dilutions, e.g.:\n1. Schwabe Arnica 200CH\n2. Dr. Reckeweg R41\n3. Belladonna 30CH (globules)'
                    : 'Mention your primary symptoms, duration, or any questions about doctor timings...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand bg-alabaster text-sm focus:outline-none focus:ring-2 focus:ring-sage-600"
              />
            </div>

            {/* Submit Button - Directly dispatches to WhatsApp */}
            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm shadow hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.51 0-9.99 4.478-9.99 9.99 0 1.761.459 3.48 1.332 5l-1.413 5.161 5.289-1.387a9.96 9.96 0 004.782 1.216h.004c5.509 0 9.99-4.479 9.99-9.99 0-2.668-1.039-5.177-2.925-7.064A9.923 9.923 0 0012.031 2zm0 18.283h-.004a8.27 8.27 0 01-4.218-1.157l-.303-.18-3.136.822.836-3.056-.197-.314a8.272 8.272 0 01-1.272-4.408c0-4.57 3.719-8.289 8.294-8.289 2.215 0 4.298.863 5.864 2.43 1.566 1.568 2.428 3.652 2.428 5.867 0 4.571-3.719 8.285-8.29 8.285zm4.544-6.208c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.539.062s-1.05-.387-2.001-1.234c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.124-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.769-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.436.062-.664.312c-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.757 2.684 4.257 3.764.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.481-.072 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
              </svg>
              <span>
                {enquiryType === 'medicine' ? 'Send Medicine Enquiry on WhatsApp' : 'Send Consultation Enquiry on WhatsApp'}
              </span>
            </button>

            <p className="text-[11px] text-center text-muted">
              Directly opens WhatsApp with your enquiry pre-typed for instant confirmation from our clinic desk.
            </p>
          </form>
        </div>

        {/* Clinic & Pharmacy Essentials (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
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
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand shadow-sm space-y-3">
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