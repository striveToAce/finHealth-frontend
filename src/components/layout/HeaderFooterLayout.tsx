'use client'
import React from "react";
import { ToastContainer } from "react-toastify";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Header from "./header";
import Footer from "./footer";

interface WrapperProps {
  children: React.ReactNode;
}

const HeaderFooterLayout: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto pt-16 pb-8">
          {children}
        </main>
        <Footer />
        <ToastContainer autoClose={1000} />
      </div>
    </Provider>
  );
};

export default HeaderFooterLayout;
