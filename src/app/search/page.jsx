"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

const Page = () => {
  const searchRef = useRef();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    searchRef.current.focus();
    }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    const keyword = searchRef.current.value

    router.push(`searchResult/${keyword}`)
  };

  const handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      handleSearch(event);
    }
  }

  

  return (
    <div className="h-screen bg-zinc-950">
      <div className="mx-auto w-9/12">
        <div className="p-8 flex justify-end items-center">
          <input
            placeholder="Anime name, character name, genre, etc"
            className="w-full p-2 rounded"
            onKeyDown={handleKeyDown}
            ref={searchRef}
          />
          <button type="submit" className="absolute pr-2" onClick={handleSearch}>
            <MagnifyingGlass size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
