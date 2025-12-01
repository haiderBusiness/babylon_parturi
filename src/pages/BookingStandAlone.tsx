import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import BookingFlow from '../components/booking/BookingFlow';

// import StampCardContent from '../components/StampCardContent';
// import Footer from '../components/Footer';

const BookingStandAlone: React.FC = () => {
  const navigate = useNavigate();

  const HomeButton = () => (
    <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 font-medium"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">Takaisin etusivulle</span>
    </button>
  );

  return (
    <div>

      <main>

          <BookingFlow
          isOpen={true}
          onClose={() => {}}
          openedFromStampCard={false}
          CustomButton={HomeButton}

        />
      </main>

    </div>
  );
};

export default BookingStandAlone;