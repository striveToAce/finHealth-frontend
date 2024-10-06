import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <main className="p-2 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="text-center px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome to FinHealth
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Simplify your financial life with FinHealth. Track your spending,
          manage your funds, and reach your savings goals — all in one place.
        </p>
        <Link href="/auth?type=signup">
          <span className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
            Join Now 
          </span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 w-full">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 shadow-md rounded-lg bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Track Your Expenses
            </h3>
            <p className="text-gray-600">
              Stay on top of your spending habits with simple, clear, and
              easy-to-use expense tracking tools.
            </p>
          </div>
          <div className="text-center p-6 shadow-md rounded-lg bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Manage Your Funds
            </h3>
            <p className="text-gray-600">
              Track your assets and investments. Gain valuable insights into
              your financial well-being.
            </p>
          </div>
          <div className="text-center p-6 shadow-md rounded-lg bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Set Savings Goals
            </h3>
            <p className="text-gray-600">
              Plan for your future with clear savings goals. See your progress
              and stay motivated!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials/Quotes Section */}
      <section className="py-12 w-full text-center bg-white shadow-lg rounded-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What Our Users Say
        </h2>
        <blockquote className="italic text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          "FinHealth has completely transformed how I manage my finances. It’s
          simple, powerful, and keeps me on track!"
        </blockquote>
        <p className="mt-4 text-sm text-gray-500">- Sarah, FinHealth User</p>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 w-full bg-blue-50 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Start Managing Your Finances Today
        </h3>
        <Link href="/auth?type=signup">
          <span className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition">
            Get Started
          </span>
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
