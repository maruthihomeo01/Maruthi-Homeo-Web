import React, { useState } from 'react';
import { NavigationProvider, useNavigation } from './context';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppWidget from './components/layout/WhatsAppWidget';
import ConfirmationModal from './components/common/ConfirmationModal';
import PulseLoader from './components/common/PulseLoader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TreatmentsPage from './pages/TreatmentsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

function MainLayout() {
  const { activePage, isNavigating } = useNavigation();
  const [isWaOpen, setIsWaOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />;
      case 'treatments':
        return <TreatmentsPage />;
      case 'faq':
        return <FaqPage onOpenWhatsApp={() => setIsWaOpen(true)} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'home':
      default:
        return <HomePage onOpenWhatsApp={() => setIsWaOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-ink font-sans selection:bg-sage-200 selection:text-sage-900">
      <PulseLoader visible={isNavigating} />
      <Header />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />
      <WhatsAppWidget isOpen={isWaOpen} setIsOpen={setIsWaOpen} />
      <ConfirmationModal />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <MainLayout />
    </NavigationProvider>
  );
}
