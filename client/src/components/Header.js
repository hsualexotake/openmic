import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <h1 className="text-xl font-bold">NYC Open Mics</h1>
      <button onClick={toggleSidebar} className="text-gray-600">
        ☰ {/* Menu Icon */}
      </button>
    </header>
  );
};

export default Header;
