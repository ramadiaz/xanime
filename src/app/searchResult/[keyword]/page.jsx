"use client";

import { getAnimeResponse } from "@/app/libs/api-libs";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

const Page = ({ params: { keyword } }) => {
  const [animeResult, setAnimeResult] = useState([]);
  const [mangaResult, setMangaResult] = useState([])
  const [charaResult, setCharaResult] = useState([]);
  const [totalFound, setTotalFound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const animeResultAPI = await getAnimeResponse("anime", `q=${keyword}`);
      const mangaResultAPI = await getAnimeResponse("manga", `q=${keyword}`)
      const charaResultAPI = await getAnimeResponse(
        "characters",
        `q=${keyword}`
      );

      setAnimeResult(animeResultAPI);
      setMangaResult(mangaResultAPI)
      setCharaResult(charaResultAPI);

      const totalAnimeResults = animeResultAPI.data ? animeResultAPI.data.length : 0;
      const totalMangaResults = mangaResultAPI.data ? mangaResultAPI.data.length : 0;
      const totalCharaResults = charaResultAPI.data ? charaResultAPI.data.length : 0;

      setTotalFound(totalAnimeResults + totalMangaResults + totalCharaResults)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-zinc-950 text-slate-200">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-2/3 w-11/12 mx-auto py-14">
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <h1 className="text-xl uppercase font-bold">
              <span className="">Search result for </span>
              <span className="text-amber-200">{`"${decodeURIComponent(
                keyword
              )}"`}</span>
            </h1>
            <h2 className="opacity-80 text-sm">About {totalFound} results</h2>
            <div className="mt-6">
              <table className="w-full text-sm text-left">
                <thead className="uppercase text-xs bg-zinc-800 text-center">
                  <tr>
                    <th className="px-4 py-2">Cover</th>
                    <th className="px-4 py-2">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {animeResult.data?.map((anime) => {
                    return (
                      <tr
                        key={anime.mal_id}
                        className="border-b-1 border-b-slate-200/50"
                      >
                        <th className="px-4 py-2 content-center w-32 md:w-36 text-center">
                          <Image
                            src={anime.images.webp.image_url}
                            width={350}
                            height={350}
                            alt={`poster of ${anime.title}`}
                            className="w-full"
                          />
                        </th>
                        <td className="px-4 py-2">
                          <h2 className="text-lg">
                            {anime.title} {anime.year ? `(${anime.year})` : ""}
                          </h2>
                          <h3 className="opacity-70">{anime.rating}</h3>
                          <h3 className="opacity-70">Anime ({anime.type})</h3>
                          <h3 className="opacity-70">{anime.status}</h3>
                          <h3 className="">
                            Genre:{" "}
                            {anime.genres?.map((genre, index) => {
                              return (
                                <>
                                  {genre.name}
                                  {index !== anime.genres.length - 1 && ", "}
                                </>
                              );
                            })}
                          </h3>
                        </td>
                      </tr>
                    );
                  })}
                  {mangaResult.data?.map((manga) => {
                    return (
                      <tr
                        key={manga.mal_id}
                        className="border-b-1 border-b-slate-200/50"
                      >
                        <th className="px-4 py-2 content-center w-32 md:w-36 text-center">
                          <Image
                            src={manga.images.webp.image_url}
                            width={350}
                            height={350}
                            alt={`poster of ${manga.title}`}
                            className="w-full"
                          />
                        </th>
                        <td className="px-4 py-2">
                          <h2 className="text-lg">
                            {manga.title}
                          </h2>
                          <h3 className="opacity-70">{manga.type}</h3>
                          <h3 className="opacity-70">{manga.status}</h3>
                          <h3 className="">
                            Genre:{" "}
                            {manga.genres?.map((genre, index) => {
                              return (
                                <>
                                  {genre.name}
                                  {index !== manga.genres.length - 1 && ", "}
                                </>
                              );
                            })}
                          </h3>
                        </td>
                      </tr>
                    );
                  })}
                  {charaResult.data?.map((chara) => {
                    return (
                      <tr
                        key={chara.mal_id}
                        className="border-b-1 border-b-slate-200/50"
                      >
                        <th className="px-4 py-2 content-center w-32 md:w-36 text-center">
                          <Image
                            src={chara.images.webp.image_url}
                            width={350}
                            height={350}
                            alt={`poster of ${chara.name}`}
                            className="w-full"
                          />
                        </th>
                        <td className="px-4 py-2">
                          <h2 className="text-lg">
                            {chara.name}{" "}
                            {chara.name_kanji ? `(${chara.name_kanji})` : ""}
                          </h2>
                          <h3 className="opacity-70">Character</h3>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Page;
