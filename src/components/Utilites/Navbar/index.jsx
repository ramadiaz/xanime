"use client";

import Link from "next/link";
import Burger from "./Burger";
import { Bookmark, MagnifyingGlass, UserCircle } from "@phosphor-icons/react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header className="bg-zinc-900/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center px-4 gap-4">
          <Burger />
          <Link href="/" className="hover:opacity-80 transition-all duration-300">
            <span className="font-bold text-2xl text-amber-300">XAN</span>
            <span className="font-bold text-2xl text-slate-200">IMELIST</span>
          </Link>
        </div>
        <div className="flex flex-row">
          <Link href="../../../search">
            <button className="p-3 md:p-5 hover:bg-zinc-900 transition-all">
              <MagnifyingGlass size={24} color="#fdfcfc" />
            </button>
          </Link>
          <UserMenu/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
