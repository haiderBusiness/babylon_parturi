import React, { useState, useEffect } from 'react';
import HoursContactSection from '../components/HoursContactSection';
import Footer from '../components/Footer';

interface HomePageProps {
  onOpenBooking: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const [showSliderView] = useState(false);
  const [isAutoSlidingPaused] = useState(false);

  // Fake Google Reviews data - replace with real reviews later
  const googleReviews = [
    {
      id: 1,
      name: 'Mikko Virtanen',
      rating: 5,
      text: 'Erinomainen palvelu! Parturi osaa työnsä todella hyvin ja lopputulos oli juuri sitä mitä halusin. Suosittelen lämpimästi!',
      date: '2 viikkoa sitten',
    },
    {
      id: 2,
      name: 'Jari Korhonen',
      rating: 5,
      text: 'Ammattitaitoinen ja ystävällinen palvelu. Hinta-laatusuhde on erinomainen. Tulen varmasti uudelleen!',
      date: '1 kuukausi sitten',
    },
    {
      id: 3,
      name: 'Antti Mäkinen',
      rating: 5,
      text: 'Paras parturi Kokkolassa! Aina tyytyväinen lopputulokseen. Varsinkin hiuskuviointi onnistuu täydellisesti.',
      date: '3 viikkoa sitten',
    },
    {
      id: 4,
      name: 'Petri Lahtinen',
      rating: 4,
      text: 'Hyvä palvelu ja siisti liike. Ainoa miinus oli että jouduin odottamaan hieman, mutta lopputulos oli hyvä.',
      date: '2 kuukautta sitten',
    },
    {
      id: 5,
      name: 'Ville Nieminen',
      rating: 5,
      text: 'Loistava kokemus! Parturi kuunteli toiveeni ja toteutti ne täydellisesti. Kiitos ammattitaitoisesta palvelusta!',
      date: '1 viikko sitten',
    },
    {
      id: 6,
      name: 'Timo Hakkarainen',
      rating: 5,
      text: 'Olen käynyt täällä jo useita kertoja ja aina yhtä tyytyväinen. Suosittelen kaikille!',
      date: '1 kuukausi sitten',
    },
  ];


  // Auto-slide functionality for reviews
  useEffect(() => {
    if (!showSliderView || isAutoSlidingPaused) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === googleReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [showSliderView, isAutoSlidingPaused, googleReviews.length]);


  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-black min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-10 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img
                src="logo_only_k_white_orange.png"
                alt="K-Parturi Logo"
                className="w-24 h-24 md:w-32 md:h-32 mt-6 mb-4 mx-auto object-contain"
              />
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                PARTURI
              </h1>
              <p className="text-xl md:text-2xl font-bold mb-8 opacity-90">
                Ei aikaa varattu? Ei hätää – tule käymään tai varaa heti!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
              <div className="text-3xl md:text-4xl font-black mb-4">
                UUSI ILME - NYT -20%
              </div>
              <div className="text-xl md:text-2xl font-bold">
                ENSIMMÄISESTÄ HIUSTENLEIKKAUKSESTA!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={onOpenBooking}
                className="bg-black text-yellow-400 px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                VARAA AIKA
              </button>
              <a
                href="tel:+358407736334"
                className="border-2 border-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-black hover:text-yellow-400 transition-all duration-300"
              >
                SOITA NYT
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section - Temporarily Hidden */}
      {/* 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                ASIAKKAIDEN ARVOSTELUT
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Katso mitä asiakkaamme sanovat palvelustamme
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex space-x-1">{renderStars(5)}</div>
                <span className="text-2xl font-bold text-gray-900">4.9</span>
                <span className="text-gray-600">Google-arvostelut</span>
              </div>
            </div>

            <div className="text-center mb-12">
              <button
                onClick={toggleReviewView}
                className="inline-flex items-center border border-orange-500 text-orange-500 px-6 py-2 rounded-lg text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                {showSliderView ? (
                  <Grid className="w-4 h-4 mr-2" />
                ) : (
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                )}
                {showSliderView ? 'Näytä ruudukossa' : 'Näytä liukuna'}
              </button>
            </div>

            {showSliderView ? (
              // Slider View
              <div className="relative max-w-4xl mx-auto mb-12 overflow-hidden">
                <div className="bg-gray-50 rounded-2xl shadow-lg min-h-[200px] relative">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentReviewIndex * 100}%)`,
                    }}
                  >
                    {googleReviews.map((review, index) => (
                      <div
                        key={review.id}
                        className="w-full flex-shrink-0 p-4 sm:p-8 flex items-center"
                      >
                        <div className="w-full px-4 sm:px-8 md:px-16">
                          <div className="flex items-center justify-center mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mr-4 sm:mr-6">
                              <span className="text-white font-bold text-lg sm:text-2xl">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div className="text-center">
                              <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">
                                {review.name}
                              </h4>
                              <div className="flex items-center justify-center space-x-2">
                                <div className="flex space-x-1">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-center text-sm sm:text-base md:text-lg">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handlePreviousReview}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-20"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
                  </button>

                  <button
                    onClick={handleNextReview}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-20"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
                  </button>
                </div>

                
                <div className="flex justify-center space-x-2 mt-6">
                  {googleReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentReviewIndex(index);
                        setIsAutoSlidingPaused(true);
                        setTimeout(() => setIsAutoSlidingPaused(false), 10000);
                      }}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentReviewIndex
                          ? 'bg-orange-500'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Grid View (Original)
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {googleReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {review.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <a
                href="https://www.google.com/search?q=K-Parturi+Kokkola+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                LUE LISÄÄ GOOGLE-ARVOSTELUJA
              </a>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                PALVELUMME
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ammattitaitoista hiustenleikkausta ja parturipalveluja miehille
                kaikenikäisille sekä ajanvarauksella että ilman.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/hair_clipper.svg"
                      alt="Hair Clipper"
                      className="w-12 h-12 text-yellow-500"
                    />
                    <img
                      src="/scissor.svg"
                      alt="Scissor"
                      className="w-12 h-12 text-yellow-500"
                    />
                  </div>
                  <span className="text-3xl font-black text-yellow-500">
                    25€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Koneella & Saksilla
                </h3>
                <p className="text-gray-600">
                  Klassinen hiustenleikkaus koneella ja saksilla,
                  ammattitaitoisesti toteutettuna.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/scissor.svg"
                      alt="Scissor"
                      className="w-12 h-12 text-yellow-500"
                    />
                    <img
                      src="/comb.svg"
                      alt="Comb"
                      className="w-12 h-12 text-yellow-500"
                    />
                  </div>
                  <span className="text-3xl font-black text-yellow-500">
                    35€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vain Saksilla
                </h3>
                <p className="text-gray-600">
                  Tarkka hiustenleikkaus pelkästään saksilla, yksityiskohtiin
                  keskittyen.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="/kid_haircut.svg"
                    alt="Kid Haircut"
                    className="w-12 h-12 text-yellow-500"
                  />
                  <span className="text-3xl font-black text-yellow-500">
                    20€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  5-7 Vuotta Lapsi
                </h3>
                <p className="text-gray-600">
                  Erikoisesti lapsille suunnattu hiustenleikkaus turvallisessa
                  ympäristössä.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/one_height_hair.svg"
                      alt="One Height Hair"
                      className="w-12 h-12 text-yellow-500"
                    />
                    <img
                      src="/hair_clipper.svg"
                      alt="Hair Clipper"
                      className="w-12 h-12 text-yellow-500"
                    />
                  </div>
                  <span className="text-3xl font-black text-yellow-500">
                    20€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Koneajo, Yksi Pituus
                </h3>
                <p className="text-gray-600">
                  Nopea ja siisti koneajo koko pää yhdellä pituudella.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/hair-style.svg"
                      alt="Hair Style"
                      className="w-12 h-12 text-yellow-500"
                    />
                    <img
                      src="/razor.svg"
                      alt="Razor"
                      className="w-12 h-12 text-yellow-500"
                    />
                  </div>
                  <span className="text-3xl font-black text-yellow-500">
                    20€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hiuskuviointi (Hiuskuvio)
                </h3>
                <p className="text-gray-600">
                  Tarkkojen mallien ja viivojen tekeminen hiuksiin tyylin
                  korostamiseksi.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="/hair_wash_1.svg"
                    alt="Hair Wash"
                    className="w-12 h-12 text-yellow-500"
                  />
                  <span className="text-3xl font-black text-yellow-500">
                    10€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hiustenpesu
                </h3>
                <p className="text-gray-600">
                  Rentouttava hiustenpesu ja hoito.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="/beard-trimming.svg"
                    alt="Beard Trimming"
                    className="w-12 h-12 text-yellow-500"
                  />
                  <span className="text-3xl font-black text-yellow-500">
                    25€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Parran Siistiminen
                </h3>
                <p className="text-gray-600">
                  Ammattimainen parran muotoilu ja siistiminen.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="/shaving_with_blade .svg"
                    alt="Shaving with Blade"
                    className="w-12 h-12 text-yellow-500"
                  />
                  <span className="text-3xl font-black text-yellow-500">
                    25€
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Parran Ajo
                </h3>
                <p className="text-gray-600">
                  Perinteinen parranajo sileäksi iholle, viimeistelty
                  rauhoittavalla jälkihoidolla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                TYÖT PUHUVAT PUOLESTAAN
              </h2>
              <p className="text-xl text-gray-600">
                Katso esimerkkejä ammattitaitoisista hiustenleikkauksistamme
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                const cloudinaryImageIds = [
                  'skin_fade_jvaiqt',
                  'kid_fade_1_olw7pd',
                  'young_fade_hair_and_beard_is96ih',
                  'kid_messy_hair_ruxivy',
                  'fade_hair_and_beard_mid_age_2_rq06tp',
                  'kid_skinfade_2_azthaq',
                  'fade_hair_and_beard_mid_age_u5pceg',
                  'buzz_cut_eqojea',
                ];
                const imageId = cloudinaryImageIds[item - 1];

                return (
                  <div key={item} className="group relative">
                    <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={`https://res.cloudinary.com/der6cjvt7/image/upload/w_1080,q_auto,f_auto/${imageId}.jpg`}
                        alt={`Haircut example ${item}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://www.instagram.com/k_parturi_kokkola?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                KATSO LISÄÄ TÖITÄMME
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Contact Section */}
      <HoursContactSection onOpenBooking={onOpenBooking} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;