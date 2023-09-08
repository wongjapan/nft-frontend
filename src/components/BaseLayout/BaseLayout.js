import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Styles from "./BaseLayout.module.css";
import { SidebarContext } from "../../context/SidebarContext/GlobalProvider";
import { useActiveItem } from "../../hooks/setActiveItem";
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";
import Topbar from "../Topbar/Topbar";
import { ToastContainer } from "react-toastify";

export default function BaseLayout({
  children,
  noTopbar,
  noSidebar
}) {
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [sideBarMobile, setSideBarMobile] = useState(false);
  const [tempfixed, setTempFixed] = useState(true);
  const [activeItem] = useActiveItem();

  const handleTempFixed = () => {
    setTheme(!tempfixed ? "light" : "dark");
    setTempFixed(!tempfixed);
  };

  const hideSidebar = () => {
    if (sideBarMobile) {
      setSideBarMobile(false);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      setTempFixed(false);
    }
  }, [theme]);

  return (
    <div className="w-full dark:bg-dark">
      <div className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 dark:bg-dark-2 dark:border-dark-3">
        <ToastContainer className="!absolute" />
      </div>

      <div className={`flex w-full ${noTopbar ? "" : ""}`}>
        {noSidebar ? null : (
          <div className="fixed top-0 z-20">
            <div
              className={`${sideBarMobile ? "block" : "hidden"
                } md:hidden w-[270px] h-screen bg-white absolute dark:bg-dark-1 `}
            >
              <Sidebar
                fullSidebar={true}
                tempfixed={tempfixed}
                handleTempFixed={handleTempFixed}
                activeLink={activeItem}
              />
            </div>
          </div>
        )}
        {noSidebar ? null : (
          <div
            className={`hidden md:flex w-[270px] bg-white dark:bg-dark-1 ${Styles.sideBar
              } ease-in-out duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-[130px]"
              }`}
          >
            <Sidebar
              fullSidebar={showSidebar}
              tempfixed={tempfixed}
              handleTempFixed={handleTempFixed}
              activeLink={activeItem}
            />

            <div className="absolute z-100 ml-[90%] mt-20">
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer dark:bg-dark-1"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <img
                  className={`${showSidebar ? "" : "rotate-180"}`}
                  src="/images/sidebar/arrow-left.svg"
                  alt="arrow-left"
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full dark:bg-dark md:w-[calc(100%-270px)] md:ml-[270px] ease-in-out duration-300 ${showSidebar ? " translate-x-0" : "-translate-x-[100px]"
            }`}
        >
          {noTopbar ? null : (
            <div className={`${Styles.topBar} w-full`}>
              <Topbar
                setSideBarMobile={setSideBarMobile}
                sideBarMobile={sideBarMobile}
              />
            </div>
          )}
          <div
            className="pb-10 mt-[130px] min-h-[calc(100vh-130px)] font-gilroy bg-tree-pattern-mobile md:bg-tree-pattern bg-center bg-no-repeat bg-contain"
            onClick={hideSidebar}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
