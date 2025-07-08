"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="flex justify-center w-full h-20">
        <nav className="w-3xl h-20 fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-center z-50 bg-black rounded-4xl text-center">
          <Link href="/">
            <h1 className=" text-8xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.3em] hover:tracking-[0.5em] transition-all duration-300">POKE PULSE</h1>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
