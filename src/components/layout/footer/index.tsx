import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-black to-blue-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Footer Title */}
        <p className="text-2xl font-bold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
            FinHealth
          </span>
        </p>
        {/* Footer Subtitle */}
        <p className="text-sm mt-2 text-gray-300">
          Empowering Your Financial Health
        </p>
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="#"
            className="text-neon text-2xl transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#"
            className="text-neon text-2xl transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-neon text-2xl transition-transform transform hover:scale-110"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        {/* Copyright */}
        <p className="mt-6 text-gray-500 text-xs">
          © {new Date().getFullYear()} FinHealth. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;