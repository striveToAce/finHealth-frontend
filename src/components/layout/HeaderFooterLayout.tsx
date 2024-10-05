import React from "react";
import Header from "./header";
import Footer from "./footer";

interface WrapperProps {
  children: React.ReactNode;
}

const HeaderFooterLayout: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto pt-16 pb-8">{children}</main>
      <Footer />
    </div>
  );
};

export default HeaderFooterLayout;
