"use client";
import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiInbox,
  HiChevronRight,
  HiTable,
  HiChevronLeft,
  HiUser,
} from "react-icons/hi";

export default function SlideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      {sidebarOpen && (
        <Sidebar className="h-[100vh]" aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup className="space-y-8">
              <Sidebar.Item className="font-bold text-lg" href="/">
                Attendance Manager
              </Sidebar.Item>
              <Sidebar.Item href="/users" icon={HiUser} labelColor="dark">
                Total Users
              </Sidebar.Item>
              <Sidebar.Item href="/" icon={HiInbox}>
                Attendance
              </Sidebar.Item>
              <Sidebar.Item href="/about" icon={HiTable}>
                How to use
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
      <button className="w-6 h-6 cursor-pointer" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <HiChevronLeft size={30} />
        ) : (
          <HiChevronRight size={30} />
        )}
      </button>
    </>
  );
}
