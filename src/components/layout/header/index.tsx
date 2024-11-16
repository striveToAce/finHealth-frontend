"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-700 via-black to-blue-800 text-white py-4 fixed top-0 w-full z-50 shadow-xl">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
            FinHealth
          </span>
        </h1>

        {isClient && (
          <nav>
            {/* Desktop Menu */}
            {loggedInUser ? (
              <ul className="hidden md:flex space-x-8">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-lg text-white hover:text-neon transition-transform transform hover:scale-105"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-lg text-white hover:text-neon transition-transform transform hover:scale-105"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="hidden md:flex space-x-8">
                <li>
                  <Link
                    href="/auth?type=login"
                    className="text-lg text-white hover:text-neon transition-transform transform hover:scale-105"
                  >
                    Login/Signup
                  </Link>
                </li>
              </ul>
            )}

            {/* Mobile Hamburger Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none hover:text-neon transition-transform transform hover:scale-110"
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && isClient && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-black to-blue-800 text-white absolute top-16 left-0 w-full shadow-lg">
          {loggedInUser ? (
            <ul className="flex flex-col space-y-6 px-6 py-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-lg hover:text-neon transition-transform transform hover:scale-105"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-lg hover:text-neon transition-transform transform hover:scale-105"
                >
                  Profile
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col space-y-6 px-6 py-4">
              <li>
                <Link
                  href="/auth?type=login"
                  className="text-lg hover:text-neon transition-transform transform hover:scale-105"
                >
                  Login/Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;