import React, { useState, useEffect } from 'react';
import { NavigationContext } from './navigation-context';

export default function NavigationProvider({ children }) {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    const validPages = ['home', 'about', 'treatments', 'faq', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prefilledBooking, setPrefilledBooking] = useState(null);
  const [confirmationModalData, setConfirmationModalData] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId, options = {}) => {
    const validPages = ['home', 'about', 'treatments', 'faq', 'contact'];
    const targetPage = validPages.includes(pageId) ? pageId : 'home';

    if (options.category) {
      setSelectedCategory(options.category);
    }

    if (options.bookingData) {
      setPrefilledBooking(options.bookingData);
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
