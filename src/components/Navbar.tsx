import React from "react";

interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = () => {
  return (
    <nav className="flex justify-center space-x-4 py-5 items-center">
      <img className="w-10 h-10" src="/giphy-icon.png" alt="" />
      <h1 className="font-semibold text-xl">Giphy Magic</h1>
    </nav>
  );
};
export default Navbar;
