import { CLINIC_INFO, FAQS, TREATMENTS, BOT_KEYWORD_MAP } from '../data/clinicData.js';

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could', 'do', 'does',
  'for', 'from', 'get', 'have', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its',
  'me', 'my', 'of', 'on', 'or', 'our', 'please', 'should', 'so', 'tell', 'than',
  'that', 'the', 'their', 'them', 'there', 'these', 'they', 'this', 'to', 'us',
  'want', 'was', 'we', 'what', 'which', 'who', 'will', 'with',
  'would', 'you', 'your', 'about', 'any', 'give', 'info', 'information', 'know',
  'need', 'help', 'take', 'homeopathy', 'homoeopathy', 'homeopathic', 'homoeopathic'
]);

const GREETINGS = new Set([
  'hi', 'hii', 'hiii', 'hello', 'hey', 'namaste', 'namaskara', 'hola',
  'good morning', 'good afternoon', 'good evening'
]);

const THANKS = new Set([
  'thanks', 'thank you', 'thankyou', 'thx', 'ty', 'ok', 'okay', 'cool', 'great', 'got it'
]);

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(normalized) {
  return normalized
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function scoreTokens(queryNorm, queryTokens, targetText, keywords = []) {
  const targetNorm = normalize(targetText);
  let score = 0;

  // 1. Curated keyword/phrase matching
  for (const kw of keywords) {
    const kwNorm = normalize(kw);
    if (!kwNorm) continue;
    if (kwNorm.includes(' ')) {
      if (queryNorm.includes(kwNorm)) score += 10;
    } else {
      for (const qt of queryTokens) {
        if (qt === kwNorm) {
          score += 6;
        } else if (qt.length >= 4 && kwNorm.length >= 4 && (kwNorm.startsWith(qt) || qt.startsWith(kwNorm))) {
          score += 3.5;
        }
      }
    }
  }

  // 2. Direct token match against target title/text
  const targetWords = targetNorm.split(/\s+/);
  for (const qt of queryTokens) {
    if (targetWords.includes(qt)) {
      score += 2.5;
    } else if (qt.length >= 4 && targetNorm.includes(qt)) {
      score += 1.5;
    }
  }

  return score;
}

/**
 * Matches a user query against clinic FAQs and treatment protocols.
 * Returns { matched: true, topic, answer, question, isGreeting } or { matched: false }.
 */
export function findBotReply(rawQuery) {
  const queryNorm = normalize(rawQuery);
  if (!queryNorm) {
    return {
      matched: false,
      reason: 'empty'
    };
  }

  if (GREETINGS.has(queryNorm)) {
    return {
      matched: true,
      isGreeting: true,
      topic: 'Welcome',
      answer: `Namaste! Welcome to ${CLINIC_INFO.shortName}. Ask me about pharmacy & doctor timings, address, courier delivery, medicine brands, or treatments — or tap a quick question below!`
    };
  }

  if (THANKS.has(queryNorm)) {
    return {
      matched: true,
      isGreeting: true,
      topic: 'Clinic Assistant',
      answer: `You're very welcome! If you need personalized advice, prescriptions, or stock confirmation, feel free to chat online with our clinic desk on WhatsApp anytime.`
    };
  }

  const queryTokens = tokenize(queryNorm);

  // Direct contact / phone / email shortcut
  const contactKeywords = ['phone', 'number', 'contact', 'call', 'mobile', 'email', 'mail', 'whatsapp'];
  const contactHits = queryTokens.filter((t) => contactKeywords.includes(t));
  if (contactHits.length > 0 && !queryTokens.some((t) => ['timing', 'timings', 'hours', 'online', 'video'].includes(t))) {
    return {
      matched: true,
      topic: 'Contact Details',
      question: 'How can I contact Maruthi Homoeo Centre?',
      answer: `You can call or WhatsApp our pharmacy & clinic desk at ${CLINIC_INFO.phone} (Mon–Sat, 10:00 AM – 8:30 PM), or email us at ${CLINIC_INFO.email}.`
    };
  }

  if (queryTokens.length === 0) {
    return { matched: false };
  }

  let bestMatch = null;
  let bestScore = 0;

  // Score against FAQS
  for (const faq of FAQS) {
    const keywords = BOT_KEYWORD_MAP[faq.id] || [];
    const qScore = scoreTokens(queryNorm, queryTokens, faq.q, keywords);
    const aScore = scoreTokens(queryNorm, queryTokens, faq.a, []) * 0.45;
    const total = qScore + aScore;

    if (total > bestScore) {
      bestScore = total;
      bestMatch = {
        topic: faq.category,
        question: faq.q,
        answer: faq.a
      };
    }
  }

  // Score against specific TREATMENTS (allows instant answers for specific ailments like PCOS, piles, thyroid, migraine, etc.)
  for (const t of TREATMENTS) {
    const tKeywords = [
      ...t.tags,
      ...t.title.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w))
    ];
    const tScore = scoreTokens(queryNorm, queryTokens, `${t.title} ${t.summary}`, tKeywords);
    // Slightly favor specific treatment match when user names a condition directly
    if (tScore > bestScore) {
      bestScore = tScore;
      bestMatch = {
        topic: `Treatment · ${t.category}`,
        question: t.title,
        answer: `${t.summary} Walk in during doctor hours (Mon–Sat: 10:00 AM – 1:30 PM & 6:00 PM – 8:30 PM) or chat with us on WhatsApp to book.`
      };
    }
  }

  // Require solid confidence so unrelated questions fall back cleanly to WhatsApp
  if (bestMatch && bestScore >= 5) {
    return {
      matched: true,
      ...bestMatch
    };
  }

  return {
    matched: false
  };
}
