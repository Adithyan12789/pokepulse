"use client";

import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="flex justify-center w-full h-20">
        <nav className="w-3xl h-20 fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-center z-50 bg-black rounded-4xl text-center">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16"
            />
            <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-[0.3em] hover:tracking-[0.5em] transition-all duration-300">
              POKE PULSE
            </h1>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
