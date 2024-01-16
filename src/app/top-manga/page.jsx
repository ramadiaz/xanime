"use client";

import { useEffect, useState } from "react";
import { getAnimeResponse } from "../libs/api-libs";
import Loading from "../loading";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [topManga, setTopManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const topMangaAPI = await getAnimeResponse("top/manga");
      setTopManga(topMangaAPI);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="topManga">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-zinc-950 text-slate-200">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-2/3 w-11/12 mx-auto">
            <div className="py-12">
              <h1 className="text-2xl text-slate-200 font-bold">
                Top 20 Manga
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
                    Title
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {topManga.data?.map((manga, index) => {
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
                          href={`/manga/${manga.mal_id}`}
                          key={index}
                          className=""
                        >
                          <div className="w-20 h-40 md:w-28 md:h-40 relative">
                            <Image
                              src={manga.images.webp.image_url}
                              alt={manga.title}
                              layout="fill"
                              objectFit="cover"
                              className=""
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col">
                          <Link href={`/manga/${manga.mal_id}`} key={index}>
                            <h3 className="text-base text-bold text-slate-200 hover:text-slate-50 transition-all">
                              {manga.title}
                              {manga.title_japanese && (
                                <> ({manga.title_japanese})</>
                              )}
                            </h3>
                          </Link>
                          <h3>{manga.rating}</h3>
                          <h3>Genre: {manga.genres[0]?.name}</h3>
                          <h3>{manga.scored_by.toLocaleString()} votes</h3>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center whitespace-nowrap">
                        ⭐ {manga.score}
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
