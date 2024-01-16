"use client";

import { useEffect, useState } from "react";
import { getAnimeResponse } from "../libs/api-libs";
import Loading from "../loading";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [topCharacter, setTopCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const topCharacterAPI = await getAnimeResponse(`top/characters`, 'limit=20');
    setTopCharacter(topCharacterAPI);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="topCharacters">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-zinc-950 text-slate-200">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-2/3 w-11/12 mx-auto">
            <div className="py-12">
              <h1 className="text-2xl text-slate-200 font-bold">
                Top 20 Characters
              </h1>
              <h2 className="text-slate-200/70">Based on My Anime List</h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-zinc-800 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 text-center border-r border-zinc-700"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-center border-r border-zinc-700"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Popularity
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCharacter.data?.map((character, index) => {
                  return (
                    <tr className="bg- border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center border-r border-zinc-700"
                      >
                        #{index + 1}
                      </th>
                      <td className="px-2 py-4 flex flex-row items-center gap-4 border-r border-zinc-700 ml-6">
                        <Link
                          href={`/character/${character.mal_id}`}
                          key={index}
                          className=""
                        >
                          <div className="md:w-28 md:h-40 w-12 h-20 relative">
                            <Image
                              src={character.images.webp.image_url}
                              alt={character.name}
                              layout="fill"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col">
                          <Link href={`/character/${character.mal_id}`} key={index}>
                            <h3 className="text-base text-bold text-slate-200 hover:text-slate-50 transition-all">
                              {character.name}
                            </h3>
                            <h3>{character.name_kanji}</h3>
                            <h3 className="">
                              
                              {character.nicknames?.map((nickname, index) => {
                                return (
                                  <>
                                    {nickname}
                                    {index !== character.nicknames.length - 1 && ", "}
                                  </>
                                );
                              })}
                              </h3>
                          </Link>      
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center whitespace-nowrap text-slate-200">
                        🩷 {character.favorites.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
