import React, { useState } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setShowSidebar(false);
    }
    const resizeEvent = window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    });
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <>
        <div className="flex w-full min-h-screen bg-gray-200">
          <Sidebar showSidebar={showSidebar} />
          <div
            className={`flex flex-col w-full duration-300 ${
              showSidebar ? 'ml-60 max-w-dashboard-content' : 'ml-0'
            }`}
          >
            <Navbar
              onToggleSidebar={handleToggleSidebar}
              showSidebar={showSidebar}
            />
            <div className="ml-8 mt-[76px] pr-8 pb-8">
              <Outlet />
            </div>
          </div>
          
        </div>
    </>
  );
};

export default DashboardLayout;
