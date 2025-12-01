import React from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';
import {
  PiInstagramLogo,
  PiTiktokLogo,
  PiFacebookLogo,
  PiWhatsappLogo,
} from 'react-icons/pi';

interface HoursContactSectionProps {
  onOpenBooking?: () => void;
  customCtaContent?: React.ReactNode;
}

const HoursContactSection: React.FC<HoursContactSectionProps> = ({ onOpenBooking, customCtaContent }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              AUKIOLOAJAT & YHTEYSTIEDOT
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-8 opacity-90">
              Ei aikaa varattu? Ei hätää – tule käymään tai varaa heti!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 mr-4" />
                <h3 className="text-2xl font-bold">AUKIOLOAJAT</h3>
              </div>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>MA - PE</span>
                  <span className="font-bold">10-18</span>
                </div>
                <div className="flex justify-between">
                  <span>LA</span>
                  <span className="font-bold">10-17</span>
                </div>
                <div className="flex justify-between">
                  <span>SU</span>
                  <span className="font-bold">SULJETTU</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <Phone className="w-8 h-8 mr-4" />
                <h3 className="text-2xl font-bold">YHTEYSTIEDOT</h3>
              </div>
              <div className="space-y-4 text-lg">
                <a
                  href="tel:+358407736334"
                  className="flex items-center hover:text-orange-200 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +358 407736334
                </a>
                <a
                  href="https://maps.app.goo.gl/fhJGDGEQWfo1ZRxGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-orange-200 transition-colors"
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  Heinolankaari 9, Kokkola 67600
                </a>
                <div className="flex items-center space-x-4 pt-4">
                  <a
                    href="https://www.instagram.com/k_parturi_kokkola?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-200 transition-colors"
                    title="Instagram"
                  >
                    <PiInstagramLogo className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@k_parturi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-200 transition-colors"
                    title="TikTok"
                  >
                    <PiTiktokLogo className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/people/K-Parturi/61582622773569/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-200 transition-colors"
                    title="Facebook"
                  >
                    <PiFacebookLogo className="w-6 h-6" />
                  </a>
                  <a
                    href="https://wa.me/358407736334?text=Hei%2C%20haluaisin%20tiedustella%20palveluistanne%20ja%20ajanvarauksesta.%20Voisitteko%20auttaa%20minua%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-200 transition-colors"
                    title="WhatsApp"
                  >
                    <PiWhatsappLogo className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-sm opacity-75">
                  LÖYDÄT MEIDÄT SOMESTA: @K_PARTURI | WHATSAPP ASIAKASPALVELU
                </p>
              </div>
            </div>
          </div>

          <div className={`text-center ${customCtaContent ? 'mt-6' : 'mt-12'}`}>
            {customCtaContent ? (
              customCtaContent
            ) : onOpenBooking ? (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={onOpenBooking}
                  className="bg-white text-orange-600 px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-50 transition-all duration-300"
                >
                  VARAA AIKA NYT
                </button>
                <a
                  href="tel:+358407736334"
                  className="border-2 border-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  TAI SOITA
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoursContactSection;