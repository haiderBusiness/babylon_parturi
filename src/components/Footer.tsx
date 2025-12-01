import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logo_only_k.png"
              alt="K-Parturi Logo"
              className="w-8 h-8 mr-3 object-contain"
            />
            <span className="text-2xl font-bold">PARTURI</span>
          </div>
          <p className="text-gray-400">
            Ammattitaitoista hiustenleikkausta jo vuodesta 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;