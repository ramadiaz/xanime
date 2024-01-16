"use client";

import { getAnimeResponse } from "@/app/libs/api-libs";
import Loading from "@/app/loading";
import { Disclosure, Transition } from "@headlessui/react";
import { CaretDown, HeartStraight } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchData = async () => {
    try {
      const characterAPI = await getAnimeResponse(`characters/${id}/full`);
      setCharacter(characterAPI);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const favorite = Cookies.getJSON("favorite") || [];

    const isFavorite =
      Array.isArray(favorite) && favorite.some((item) => item.id === id);
    setIsFavorite(isFavorite);
  }, [id]);

  const handleAddFavorite = () => {
    const existingFavorite = Cookies.getJSON("favorite") || [];
    const isFavorite =
      Array.isArray(existingFavorite) &&
      existingFavorite.some((item) => item.id === id);

    if (!isFavorite) {
      const updateFavorite = [
        ...existingFavorite,
        { id, name: character.data?.name },
      ];
      Cookies.set("favorite", updateFavorite, { expires: 365 * 10 });
      setIsFavorite(true);
    }
  };
  
  const removeFavorite = () => {
    const existingFavorite = Cookies.getJSON("favorite") || [];
    
    const updateFavorite = existingFavorite.filter((item) => item.id !== id);
    Cookies.set("favorite", updateFavorite);
    setIsFavorite(false);
  };
  
  const aboutLines = character.data?.about?.split("\n");
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-zinc-950 text-slate-200 mx-auto flex flex-col gap-14">
            
            <div className="relative h-96 lg:h-120 -mt-14 md:hidden z-0">
              <Image
                src={character.data?.images.webp.image_url}
                width={2470}
                height={3500}
                alt={`poster of ${character.data?.name}`}
                className="absolute h-96 lg:h-120  object-cover blur-sm"
              />
              <div className="absolute inset-0 -bottom-5 bg-gradient-to-t from-zinc-950 from-15%" />
            </div>
          <div className="lg:w-2/3 w-11/12 mx-auto flex flex-col gap-14 -mt-72 md:mt-0 z-10">
            <div className="pt-12">
              <h1 className="text-2xl text-slate-200 font-bold">
                Character information
              </h1>
              <h2 className="text-slate-200/70">
                Everything we know about {character.data?.name}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row divide-x-1 divide-slate-200/50 gap-4 -mt-8 md:mt-0">
              <div className="flex flex-col gap-4 basis-1/4">
                <Image
                  src={character.data?.images.webp.image_url}
                  width={350}
                  height={350}
                  alt={`image of ${character.data?.name}`}
                  className="w-full h-fit object-cover hidden md:block"
                />
                <button
                  onClick={isFavorite ? removeFavorite : handleAddFavorite}
                >
                  {isFavorite ? (
                    <div className="flex flex-row gap-2 border-2 border-pink-800 hover:bg-pink-800/80 hover:border-pink-800/80 bg-pink-800 transition-all duration-300 p-2 items-center justify-center">
                      <HeartStraight size={24} color="#09090b" weight="fill" />
                      <h3 className="uppercase font-semibold text-sm text-zinc-950">
                        remove favorite
                      </h3>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 border-2 border-pink-800 hover:bg-pink-800/50 transition-all duration-300 p-2 items-center justify-center">
                      <HeartStraight size={24} color="#d05353" weight="bold" />
                      <h3 className="uppercase font-semibold text-sm">
                        Add to favorite
                      </h3>
                    </div>
                  )}
                </button>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="bg-zinc-800 py-2 px-4 flex flex-row justify-between items-center">
                        <h3>Voice actors</h3>

                        <CaretDown
                          size={26}
                          color="#e2e8f0"
                          weight="bold"
                          className={`${
                            open
                              ? "rotate-180 transform transition-all duration-300"
                              : "transform transition-all duration-300"
                          }`}
                        />
                      </Disclosure.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 -translate-y-5"
                        enterTo="transform opacity-100"
                        leave="transition ease-out duration-100"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0 -translate-y-5"
                      >
                        <div className="space-y-2 pb-4">
                          {character.data?.voices.map((voice) => {
                            return (
                              <Disclosure.Panel className="text-sm">
                                {voice.person.name} ({voice.language})
                              </Disclosure.Panel>
                            );
                          })}
                        </div>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="basis-3/4 pl-4 flex flex-col gap-4 divide-y-1">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">
                    {character.data?.name} ({character.data?.name_kanji})
                  </h2>
                  <h3 className="text-sm opacity-70">
                    Popoularity: {character.data?.favorites.toLocaleString()} 🩷
                  </h3>
                </div>
                <h2 className="text-sm py-4">
                  {aboutLines
                    ? aboutLines.map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index !== aboutLines.length - 1 && <br />}{" "}
                        </React.Fragment>
                      ))
                    : "No information"}
                </h2>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl text-white">Animeography.</h2>
                <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
                  {character.data?.anime.map((anime, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/anime/${anime.anime.mal_id}`}
                        className="relative w-max h-full my-4 hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-32">
                          <div className="h-full w-32 absolute bg-amber-500 opacity-0 hover:opacity-100 transition-all duration-300">
                            <h2 className="p-4 text-zinc-950 text-sm font-bold">
                              {anime.anime.title} (Anime)
                            </h2>
                          </div>
                          <div className="h-max ">
                            <Image
                              src={anime.anime.images.webp.image_url}
                              alt={anime.anime.title}
                              width={350}
                              height={350}
                              className="h-44 object-cover"
                            />
                            <h3 className="w-32 p-2 text-zinc-950 bg-slate-200 font-semibold text-sm">
                              {anime.role}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <h2 className="text-2xl text-white">Mangaography.</h2>
                <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
                  {character.data?.manga.map((manga, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/manga/${manga.manga.mal_id}`}
                        className="relative w-max h-full my-4 hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-32">
                          <div className="h-full w-full absolute bg-amber-500 opacity-0 hover:opacity-100 transition-all duration-300">
                            <h2 className="p-4 text-zinc-950 text-sm font-bold">
                              {manga.manga.title} (Manga)
                            </h2>
                          </div>
                          <div className="h-max ">
                            <Image
                              src={manga.manga.images.webp.image_url}
                              alt={manga.manga.title}
                              width={350}
                              height={350}
                              className="h-44 object-cover"
                            />
                            <h3 className="w-32 p-2 text-zinc-950 bg-slate-200 font-semibold text-sm">
                              {manga.role}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
