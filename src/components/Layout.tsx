"use client";
import React, { ReactNode } from "react";
import SlideBar from "./SlideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <SlideBar />
        {children}
      </div>
    </>
  );
};

export default Layout;
