import Link from 'next/link';
import { useState } from 'react';

const Burger = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleMenu = () => {
    setIsOpen(!isOpen);
 };

 return (
    <div className="flex items-center ">
      <button
        className="text-gray-500 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          ></path>
        </svg>
      </button>
      {isOpen ? (
        <div className="absolute top-full left-0 bg-zinc-900/90 h-screen w-2/5 pt-4 z-40 transform transition-all duration-300">
          <ul className="flex flex-col text-slate-200">
            <li className='pl-4 py-2 uppercase text-xs font-bold text-slate-200/80'>Discover</li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topAnime">Top Anime</Link></li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topCharacter">Top Character</Link></li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topManga">Top Manga</Link></li>
          </ul>
        </div>
      ) : (
        <div className="absolute top-full left-0 bg-zinc-900/90 h-screen w-2/5 pt-4 z-40 transform -translate-x-full transition-all duration-300">
          <ul className="flex flex-col text-slate-200">
            <li className='pl-4 py-2 uppercase text-xs font-bold text-slate-200/80'>Discover</li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topAnime">Top Anime</Link></li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topCharacter">Top Character</Link></li>
            <li className='pl-4 py-2 hover:bg-zinc-700'><Link href="/topManga">Top Manga</Link></li>
          </ul>
        </div>
      )}
    </div>
 );
};

export default Burger;