import React, { useState, useEffect, useRef } from 'react';
import { CLINIC_INFO, BOT_QUICK_QUESTIONS } from '../../data/clinicData';
import { findBotReply } from '../../utils/faqBotMatcher';

const NUDGE_MESSAGES = [
  '👋 Hi! Ask a quick question or chat with us!',
  '🕒 Need doctor timings, address, or courier info?',
  '💊 Ask about German homoeopathic brands in stock!',
  '🌿 Instant answers here or live chat on WhatsApp.'
];

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const createWelcomeMessage = () => ({
  id: 'welcome',
  sender: 'bot',
  text: `Namaste! Welcome to ${CLINIC_INFO.shortName}. Ask me a question below (timings, address, delivery, brands, treatments) for an instant reply:`,
  time: formatTime(),
  isWelcome: true
});

export default function WhatsAppWidget({ isOpen, setIsOpen }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [createWelcomeMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [nudgeIndex, setNudgeIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(false);
  const chatEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  // Proactive speech bubble timer every 15 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowNudge(true);
    }, 5000);

    const interval = setInterval(() => {
      setNudgeIndex((prev) => (prev + 1) % NUDGE_MESSAGES.length);
      setShowNudge(true);

      setTimeout(() => {
        setShowNudge(false);
      }, 6000);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Clean up pending bot typing timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  // Scroll to bottom when messages, typing state, or open state changes
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      setShowNudge(false);
    }
    setIsOpen(!isOpen);
  };

  const buildWhatsAppUrl = (text) => {
    const body = text?.trim()
      ? `Namaste Maruthi Homoeo Centre! I have a question:\n"${text.trim()}"`
      : `Hello! I would like to chat online with ${CLINIC_INFO.shortName}, Rajajinagar.`;
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(body)}`;
  };

  const submitQuestion = (rawText) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    const userMsg = {
      id: `user-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: trimmed,
      time: formatTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const result = findBotReply(trimmed);

    typingTimerRef.current = setTimeout(() => {
      const botMsg = result.matched
        ? {
            id: `bot-${Date.now()}-${Math.random()}`,
            sender: 'bot',
            text: result.answer,
            time: formatTime(),
            isFallback: false,
            userQuery: trimmed
          }
        : {
            id: `bot-${Date.now()}-${Math.random()}`,
            sender: 'bot',
            text: "Sorry, I couldn't find an exact record for that question. Please chat online with our clinic desk on WhatsApp — our team will reply to you directly!",
            time: formatTime(),
            isFallback: true,
            userQuery: trimmed
          };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      typingTimerRef.current = null;
    }, 700);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitQuestion(input);
  };

  const handleResetChat = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTyping(false);
    setMessages([createWelcomeMessage()]);
    setInput('');
  };

  const lastUserQuestion = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
  const showQuickQuestions = messages.length === 1 && !isTyping;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp-Style Chat Assistant Card */}
      {isOpen && (
        <div className="w-[340px] sm:w-[375px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-sand overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-2 flex flex-col">
          {/* Brand-Green WhatsApp Top Bar */}
          <div className="bg-sage-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shrink-0">
                <img
                  src="/images/maruthi-homoeo-logo-cropped.png"
                  alt="Maruthi Homoeo"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight truncate text-white">{CLINIC_INFO.shortName}</p>
                <p className="text-[11px] text-sage-100 leading-tight mt-0.5">
                  {isTyping ? 'typing...' : `online · ${CLINIC_INFO.phone}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset chat"
                  aria-label="Reset chat"
                  className="text-sage-100 hover:text-white text-[11px] px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
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
          </div>

          {/* Chat Area & Bubbles */}
          <div className="p-3.5 bg-[#F4F5F4] h-72 sm:h-80 overflow-y-auto space-y-2.5">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[82%] bg-sage-600 text-white rounded-xl rounded-tr-none px-3 py-2 text-xs leading-relaxed shadow-xs">
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-sage-100">
                        <span>{msg.time}</span>
                        <span className="text-white font-bold tracking-tighter">✓✓</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex justify-start animate-in fade-in duration-150">
                  <div className="max-w-[88%] bg-white text-ink rounded-xl rounded-tl-none px-3 py-2 text-xs shadow-xs space-y-2 leading-relaxed">
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                    {msg.isFallback && (
                      <a
                        href={buildWhatsAppUrl(msg.userQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <span>Chat Online on WhatsApp</span>
                        <span>&rarr;</span>
                      </a>
                    )}

                    <div className="flex items-center justify-between gap-2 text-[10px] text-muted">
                      {!msg.isWelcome && !msg.isFallback ? (
                        <a
                          href={buildWhatsAppUrl(msg.userQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage-600 hover:underline font-medium"
                        >
                          Chat on WhatsApp &rarr;
                        </a>
                      ) : (
                        <span />
                      )}
                      <span>{msg.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp 3-Dot Typing Animation Bubble */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-150">
                <div
                  aria-label="Assistant is typing"
                  className="bg-white rounded-xl rounded-tl-none px-3.5 py-3 shadow-xs inline-flex items-center gap-1.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#667781] animate-bounce"
                    style={{ animationDelay: '0ms', animationDuration: '900ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#667781] animate-bounce"
                    style={{ animationDelay: '150ms', animationDuration: '900ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#667781] animate-bounce"
                    style={{ animationDelay: '300ms', animationDuration: '900ms' }}
                  />
                </div>
              </div>
            )}

            {/* Quick Questions (Shown only before first user reply) */}
            {showQuickQuestions && (
              <div className="pt-1 flex flex-wrap gap-1.5">
                {BOT_QUICK_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => submitQuestion(item.query)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-sage-600 hover:text-white border border-sand text-ink shadow-2xs cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* WhatsApp Message Input Bar */}
          <form onSubmit={handleFormSubmit} className="p-2.5 bg-[#F0F2F5] border-t border-black/5 space-y-1.5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3.5 py-2 rounded-full bg-white text-xs text-ink placeholder:text-muted border border-sand focus:outline-none focus:ring-2 focus:ring-sage-600"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-sage-600 hover:bg-sage-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <svg className="w-4 h-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted px-1.5">
              <span>{CLINIC_INFO.phone}</span>
              <a
                href={buildWhatsAppUrl(lastUserQuestion)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sage-600 hover:underline"
              >
                Chat Online on WhatsApp &rarr;
              </a>
            </div>
          </form>
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
          <span className="w-2 h-2 rounded-full bg-sage-600 mt-1.5 shrink-0 animate-pulse" />
          <div className="flex-1 pr-3">
            <p className="text-xs font-semibold text-ink leading-snug">{NUDGE_MESSAGES[nudgeIndex]}</p>
            <p className="text-[10px] text-sage-600 font-medium mt-1 flex items-center gap-1">
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
        className="w-14 h-14 rounded-full bg-sage-600 hover:bg-sage-700 text-white border border-white/25 shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus:outline-none"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 2c-5.51 0-9.99 4.478-9.99 9.99 0 1.761.459 3.48 1.332 5l-1.413 5.161 5.289-1.387a9.96 9.96 0 004.782 1.216h.004c5.509 0 9.99-4.479 9.99-9.99 0-2.668-1.039-5.177-2.925-7.064A9.923 9.923 0 0012.031 2zm0 18.283h-.004a8.27 8.27 0 01-4.218-1.157l-.303-.18-3.136.822.836-3.056-.197-.314a8.272 8.272 0 01-1.272-4.408c0-4.57 3.719-8.289 8.294-8.289 2.215 0 4.298.863 5.864 2.43 1.566 1.568 2.428 3.652 2.428 5.867 0 4.571-3.719 8.285-8.29 8.285zm4.544-6.208c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.539.062s-1.05-.387-2.001-1.234c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.124-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.769-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.436.062-.664.312c-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.757 2.684 4.257 3.764.595.257 1.06.41 1.423.525.599.19 1.144.163 1.575.099.481-.072 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
        </svg>
      </button>
    </div>
  );
}
