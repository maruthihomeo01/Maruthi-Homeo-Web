import React, { useState, useEffect, useRef } from 'react';
import { NavigationContext } from './navigation-context';

const PAGE_SEO = {
  home: {
    title: 'Maruthi Homoeo | Best Homoeopathic Pharmacy & Clinic in Rajajinagar, Bengaluru',
    description: 'Maruthi Homoeo Centre Pharmacy & Clinic in Rajajinagar, Bengaluru (560010). Authorized wholesale distributor & retail dispensary for Dr. Reckeweg, Schwabe, SBL, ADEL & Bakson\'s with 1-on-1 doctor consultations.'
  },
  about: {
    title: 'About Us | Maruthi Homoeo Centre Pharmacy & Clinic, Rajajinagar',
    description: 'Learn about Maruthi Homoeo Centre in Rajajinagar, Bengaluru—our classical constitutional methodology, three wings (wholesale, retail dispensary, clinic), and authorized German & Indian brand partners.'
  },
  treatments: {
    title: 'Treatments & Conditions | Maruthi Homoeo, Rajajinagar Bengaluru',
    description: 'Explore gentle, steroid-free homoeopathic care at Maruthi Homoeo for diabetes, kidney stones, hypertension, arthritis, skin, hair fall, allergies, PCOS, thyroid & pediatric immunity.'
  },
  faq: {
    title: 'FAQ | Maruthi Homoeo Centre, Rajajinagar Bengaluru',
    description: 'Frequently asked questions about Maruthi Homoeo pharmacy timings, doctor consultation hours, wholesale medicine orders, courier delivery & classical homoeopathy.'
  },
  contact: {
    title: 'Contact & Order Medicines | Maruthi Homoeo Centre, Rajajinagar',
    description: 'Order genuine German & Indian homoeopathic medicines or book a doctor consultation at Maruthi Homoeo Centre, ESI Hospital Main Rd, Rajajinagar, Bengaluru. Call +91 97400 09664.'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Maruthi Homoeo Centre, Rajajinagar',
    description: 'Privacy Policy for Maruthi Homoeo Centre Pharmacy - Clinic in Rajajinagar, Bengaluru.'
  },
  terms: {
    title: 'Terms & Conditions | Maruthi Homoeo Centre, Rajajinagar',
    description: 'Terms and Conditions for Maruthi Homoeo Centre Pharmacy - Clinic in Rajajinagar, Bengaluru.'
  }
};

export default function NavigationProvider({ children }) {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    const validPages = ['home', 'about', 'treatments', 'faq', 'contact', 'privacy-policy', 'terms'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prefilledBooking, setPrefilledBooking] = useState(null);
  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [isNavigating, setIsNavigating] = useState(true);
  const navTimerRef = useRef(null);

  const triggerPulse = (duration = 450) => {
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    setIsNavigating(true);
    navTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, duration);
  };

  useEffect(() => {
    const initTimer = setTimeout(() => setIsNavigating(false), 500);

    const handleHashChange = () => {
      const page = getInitialPage();
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerPulse(450);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      clearTimeout(initTimer);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const seo = PAGE_SEO[activePage] || PAGE_SEO.home;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }
  }, [activePage]);

  const navigateTo = (pageId, options = {}) => {
    const validPages = ['home', 'about', 'treatments', 'faq', 'contact', 'privacy-policy', 'terms'];
    const targetPage = validPages.includes(pageId) ? pageId : 'home';

    if (options.category) {
      setSelectedCategory(options.category);
    }

    if (options.bookingData) {
      setPrefilledBooking(options.bookingData);
    }

    if (targetPage !== activePage) {
      triggerPulse(450);
    }

    setActivePage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        activePage,
        navigateTo,
        isNavigating,
        selectedCategory,
        setSelectedCategory,
        prefilledBooking,
        setPrefilledBooking,
        confirmationModalData,
        setConfirmationModalData
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
