"use client";

import { getAnimeResponse } from "@/app/libs/api-libs";
import Loading from "@/app/loading";
import { Bookmark } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [isInBookmark, setIsInBookmark] = useState(false);
  const [manga, setManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const fetchData = async () => {
    try {
      const mangaAPI = await getAnimeResponse(`manga/${id}/full`);
      setManga(mangaAPI);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const bookmark = Cookies.getJSON("bookmark");

    const isInBookmark =
      Array.isArray(bookmark) && bookmark.some((item) => item.id === id);

    setIsInBookmark(isInBookmark);
  }, [id]);

  const handleAddBookmark = () => {
    const existingBookmark = Cookies.getJSON("bookmark") || [];

    const isInBookmark =
      Array.isArray(existingBookmark) &&
      existingBookmark.some((item) => item.id === id);

    if (!isInBookmark) {
      const updateBookmark = [
        ...existingBookmark,
        { id, title: manga.data?.title },
      ];
      Cookies.set("bookmark", updateBookmark);
      setIsInBookmark(true);
    }
  };

  const removeBookmark = () => {
    const existingBookmark = Cookies.getJSON("bookmark") || [];

    const updateBookmark = existingBookmark.filter((item) => item.id !== id);
    Cookies.set("bookmark", updateBookmark);
    setIsInBookmark(false);
  };

  let counter = 0;

  return (
    <div className="app">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-14 mx-auto text-slate-200">
          <div className="relative h-96 lg:h-120 -mt-32 hidden md:block">
            <Image
              src={manga.data?.images.webp.large_image_url}
              width={2470}
              height={3500}
              alt={`poster of ${manga.data?.title}`}
              className="absolute h-96 lg:h-120  object-cover blur-sm"
            />
            <div className="absolute inset-0 -bottom-5 bg-gradient-to-t from-zinc-950 from-15%" />
          </div>
          <div className="lg:w-2/3 w-11/12 mt-12 mx-auto flex flex-col gap-14 z-10 bg-zinc-950">
            <div className="flex flex-row gap-4 divide-x-1 divide-slate-200/50 border-b-1 border-b-slate-200/50 pb-4">
              <div className="basis-1/4 flex flex-col gap-4">
                <Image
                  src={manga.data?.images.webp.large_image_url}
                  width={350}
                  height={350}
                  alt={`poster of ${manga.data?.title}`}
                />
                <button
                  onClick={isInBookmark ? removeBookmark : handleAddBookmark}
                >
                  {isInBookmark ? (
                    <div className="flex flex-row gap-2 border-2 border-amber-400 bg-amber-400 hover:bg-amber-400/75 hover:border-amber-400/75 transition-all duration-300 p-2 items-center justify-center uppercase font-bold text-zinc-950">
                      <Bookmark size={24} color="#09090b" weight="fill" />
                      Added to bookmark
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 border-2 border-amber-200 hover:bg-amber-200/50 transition-all duration-300 p-2 items-center justify-center uppercase font-bold">
                      <Bookmark size={24} color="#fde68a" />
                      bookmark
                    </div>
                  )}
                </button>
              </div>
              <div className="basis-3/4 pl-4">
                <div className="">
                  <h1 className="text-2xl text-white">
                    {manga.data.title} ({manga.data.title_japanese})
                  </h1>
                  <h2 className="text-slate-200/70">{manga.data.type}</h2>
                  <h2 className="pt-2">
                    ⭐ {manga.data?.score ? manga.data?.score : "Not yet aired"}{" "}
                    |{" "}
                    {manga.data?.scored_by
                      ? manga.data?.scored_by.toLocaleString()
                      : "No"}{" "}
                    reviews
                  </h2>
                </div>
                <div>
                  <h2 className="pt-8 pb-3 border-b-1 border-b-slate-200">
                    Synopsis
                  </h2>
                  <h2 className="pt-3 text-sm">{manga.data?.synopsis}</h2>
                  <div className="space-x-2 space-y-2 py-6 max-w-full">
                    {manga.data?.genres &&
                      manga.data?.genres.map((genre) => (
                        <button
                          key={genre.mal_id}
                          className="p-2 bg-zinc-300 text-zinc-950 font-semibold hover:bg-zinc-300/75 transition-all"
                        >
                          {genre.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-slate-200">
              <h2 className="text-2xl text-white">More information</h2>
              <div className="flex flex-row w-full divide-x-1 divide-slate-200/50 gap-4 pt-2">
                <ul className="basis-2/5 divide-y-1 divide-slate-200/50 text-sm">
                  <li className="w-full flex flex-row justify-between py-2">
                    <span>Rank</span>
                    <span className="opacity-70">
                      #{" "}
                      {manga.data?.rank
                        ? manga.data.rank.toLocaleString()
                        : "Unknown"}
                    </span>
                  </li>
                  <li className="w-full flex flex-row justify-between py-2">
                    <span>Popularity</span>
                    <span className="opacity-70">
                      {manga.data?.popularity
                        ? manga.data.popularity.toLocaleString()
                        : "Unknown"}
                    </span>
                  </li>
                  <li className="w-full flex flex-row justify-between py-2">
                    <span>Members</span>
                    <span className="opacity-70">
                      {manga.data?.members
                        ? manga.data.members.toLocaleString()
                        : "Unknown"}
                    </span>
                  </li>
                  <li className="w-full flex flex-row justify-between py-2">
                    <span>Favorites</span>
                    <span className="opacity-70">
                      {manga.data?.favorites
                        ? manga.data.favorites.toLocaleString()
                        : "Unknown"}
                    </span>
                  </li>
                </ul>
                <div className="basis-3/5 space-y-3 pl-4">
                  <h2 className="border-b-1 border-b-slate-200 pb-3">
                    Background
                  </h2>
                  <h3 className="text-sm">
                    <span className="opacity-85">
                      {manga.data?.background
                        ? manga.data.background
                        : "No information"}
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-white">Relations.</h2>
              <div className="overflow-y-auto max-h-96 mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-zinc-800 sticky top-0">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Relation
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {manga.data?.relations.map((relation, index) =>
                      relation.entry.map((child, childIndex) => {
                        counter++;
                        return (
                          <tr
                            key={childIndex}
                            className="divide-x-1 divide-slate-200/50"
                          >
                            <th
                              scope="row"
                              className="px-4 py-4 font-medium text-white whitespace-nowrap"
                            >
                              {counter}.
                            </th>
                            <td className="px-6 py-4">{relation.relation}</td>
                            <td className="px-6 py-4">
                              <Link href={`/${child.type}/${child.mal_id}`}>
                                {child.name}
                              </Link>
                            </td>
                            <td className="px-6 py-4 uppercase font-semibold">
                              {child.type}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
