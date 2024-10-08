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
    <header className="bg-gradient-to-r from-teal-400 via-blue-300 to-purple-400 text-gray-800 py-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg sm:text-2xl font-bold">FinHealth</h1>
        {isClient && (
          <nav>
            {loggedInUser ? (
              <ul className="hidden md:flex space-x-6">
                <li>
                  <a href="#" className="hover:text-gray-600 transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-gray-600 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="hidden md:flex space-x-6">
                <li>
                  <Link
                    href="/auth?type=login"
                    className="hover:text-gray-600 transition-colors"
                  >
                    Login/Signup
                  </Link>
                </li>
              </ul>
            )}
            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none hover:text-gray-600 transition-colors"
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
        <div className="md:hidden bg-gradient-to-r from-teal-400 via-blue-300 to-purple-400 text-gray-800 absolute top-16 left-0 w-full shadow-md">
          {loggedInUser ? (
            <ul className="flex flex-col space-y-4 px-6 py-4">
              <li>
                <a href="#" className="hover:text-gray-600 transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-gray-600 transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col space-y-4 px-6 py-4">
              <li>
                <Link
                  href="/auth?type=login"
                  className="hover:text-gray-600 transition-colors"
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
