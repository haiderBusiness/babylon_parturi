import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import BookingFlow from './components/booking/BookingFlow';
import StampCardModal from './components/StampCardModal';
import HomePage from './pages/HomePage';
import QRcodePage from './pages/QRcodePage';
import BookingStandAlone from './pages/BookingStandAlone';
import NotFoundPage from './pages/NotFoundPage';
import RequestStampCardStandAlone from './pages/RequestStampCardStandAlone'

function AppContent() {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isStampCardOpen, setIsStampCardOpen] = useState(false);
  const [openedBookingFromStampCard, setOpenedBookingFromStampCard] =
    useState(false);

  const handleOpenBookingFromStampCard = () => {
    setIsBookingOpen(true);
    setOpenedBookingFromStampCard(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setOpenedBookingFromStampCard(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen || isStampCardOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('body-no-scroll');
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('body-no-scroll');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('body-no-scroll');
    };
  }, [isBookingOpen, isStampCardOpen]);

  return (
      <div className="min-h-screen bg-white">
        {/* Sticky Stamp Card Button - Hidden on Request Stamp Card page */}
        {location.pathname !== '/pyydä_leimakortti' && (
          <button
            onClick={() => {
              setIsStampCardOpen(true);
            }}
            className="fixed top-4 right-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 flex items-center space-x-2 font-bold text-sm"
          >
            <Ticket className="w-4 h-4" />
            <span>Leimakortti</span>
          </button>
        )}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/qrcode"
            element={<QRcodePage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="/varaukset"
            element={<BookingStandAlone onOpenBooking={() => setIsBookingOpen(true)} />}
          />

          <Route
            path="/pyydä_leimakortti"
            element={<RequestStampCardStandAlone onOpenBooking={() => setIsBookingOpen(true)} />}
          />
          <Route
            path="*"
            element={<NotFoundPage onOpenBooking={() => setIsBookingOpen(true)} />}
          />
        </Routes>

        {/* Global Modals */}
        <BookingFlow
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          openedFromStampCard={openedBookingFromStampCard}
        />

        <StampCardModal
          isOpen={isStampCardOpen}
          onClose={() => setIsStampCardOpen(false)}
          onOpenBooking={handleOpenBookingFromStampCard}
        />
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
