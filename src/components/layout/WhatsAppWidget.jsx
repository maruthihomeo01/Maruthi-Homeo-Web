import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../../data/clinicData';

const NUDGE_MESSAGES = [
  '👋 Hi! Need doctor consultation in Rajajinagar?',
  '💬 Enquire now for skin, allergy & child care.',
  '💊 Buy or order genuine German homoeopathic medicines!',
  '🌿 Have a question? Ask our clinic desk on WhatsApp.'
];

export default function WhatsAppWidget({ isOpen, setIsOpen }) {
  const [message, setMessage] = useState('');
  const [nudgeIndex, setNudgeIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(false);

  // Proactive speech bubble timer every 15 seconds
  useEffect(() => {
    // Initial prompt after 5 seconds
    const initialTimer = setTimeout(() => {
      setShowNudge(true);
    }, 5000);

    // Recurring interval every 15 seconds
    const interval = setInterval(() => {
      setNudgeIndex((prev) => (prev + 1) % NUDGE_MESSAGES.length);
      setShowNudge(true);

      // Auto dismiss bubble after 6 seconds so it's not obtrusive
      setTimeout(() => {
        setShowNudge(false);
      }, 6000);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      setShowNudge(false);
    }
    setIsOpen(!isOpen);
  };

  const defaultMessage = 'Hello! I would like to inquire about homoeopathic medicine availability and pharmacy timings at Maruthi Homoeo Centre, Rajajinagar.';

  const presets = [
    { label: 'Buy / Order Medicines', text: 'Hello! I would like to check availability or order homoeopathic medicines from Maruthi Homoeo Centre Pharmacy, Rajajinagar.' },
    { label: 'Doctor Timings Enquiry', text: 'Hello! I would like to enquire about doctor consultation timings at Maruthi Homoeo Centre Clinic, Rajajinagar.' },
    { label: 'Send Prescription', text: 'Hello! I have a homoeopathic prescription to send for pricing and availability check.' }
  ];

  const currentText = message.trim() || defaultMessage;
  const whatsappHref = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(currentText)}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp Chat Card */}
      {isOpen && (
        <div className="w-80 max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-2xl border border-sand overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shrink-0">
                <img
                  src="/images/Logo.png"
                  alt="Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">{CLINIC_INFO.shortName}</p>
                <p className="text-[11px] text-emerald-100">{CLINIC_INFO.phone} · {CLINIC_INFO.locality}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp Chat"
              className="text-white/80 hover:text-white p-1 cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Bubble & Quick Presets */}
          <div className="p-4 bg-[#ECE5DD] space-y-3">
            <div className="bg-white rounded-xl rounded-tl-none p-3 text-xs text-ink shadow-sm leading-relaxed">
              Namaste! Welcome to <strong>{CLINIC_INFO.legalName}</strong>. Choose a topic or type your message below:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(p.text)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-sage-50 border border-sand text-ink cursor-pointer transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input & Action */}
          <div className="p-3 bg-white border-t border-sand space-y-2">
            <textarea
              rows="2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your WhatsApp message..."
              className="w-full px-3 py-2 rounded-xl border border-sand bg-alabaster text-xs focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-muted">{CLINIC_INFO.phone}</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors inline-block text-center"
              >
                Send on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Proactive Speech Nudge Bubble (Loops every 15s) */}
      {!isOpen && showNudge && (
        <div
          onClick={() => {
            setIsOpen(true);
            setShowNudge(false);
          }}
          className="max-w-[260px] sm:max-w-[280px] bg-white text-ink p-3 rounded-2xl rounded-br-none shadow-xl border border-sand cursor-pointer transition-all hover:scale-102 flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 relative group"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] mt-1.5 shrink-0 animate-pulse" />
          <div className="flex-1 pr-3">
            <p className="text-xs font-semibold text-ink leading-snug">{NUDGE_MESSAGES[nudgeIndex]}</p>
            <p className="text-[10px] text-sage-700 font-medium mt-1 flex items-center gap-1">
              <span>Click to chat</span>
              <span>&rarr;</span>
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowNudge(false);
            }}
            className="text-muted/60 hover:text-ink text-xs p-0.5 absolute top-2 right-2 leading-none"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Bubble Launcher */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Open WhatsApp Chat"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus:outline-none"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 2c-5.51 0-9.99 4.478-9.99 9.99 0 1.761.459 3.48 1.332 5l-1.413 5.161 5.289-1.387a9.96 9.96 0 004.782 1.216h.004c5.509 0 9.99-4.479 9.99-9.99 0-2.668-1.039-5.177-2.925-7.064A9.923 9.923 0 0012.031 2zm0 18.283h-.004a8.27 8.27 0 01-4.218-1.157l-.303-.18-3.136.822.836-3.056-.197-.314a8.272 8.272 0 01-1.272-4.408c0-4.57 3.719-8.289 8.294-8.289 2.215 0 4.298.863 5.864 2.43 1.566 1.568 2.428 3.652 2.428 5.867 0 4.571-3.719 8.285-8.29 8.285zm4.544-6.208c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.539.062s-1.05-.387-2.001-1.234c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.124-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.769-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.436.062-.664.312c-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.757 2.684 4.257 3.764.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.481-.072 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
        </svg>
      </button>
    </div>
  );
}
