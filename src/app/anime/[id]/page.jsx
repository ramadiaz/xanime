"use client";

import React, { useEffect, useState } from "react";
import { getAnimeResponse } from "@/app/libs/api-libs";
import VideoPlayer from "@/components/Utilites/VideoPlayer";
import { Bookmark, Play } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Page = ({ params: { id } }) => {
  const [anime, setAnime] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  var episodeCounter = 0;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const fetchData = async () => {
    const animeAPI = await getAnimeResponse(`anime/${id}/full`);
    setAnime(animeAPI);

    const recommendationsAPI = await getAnimeResponse(
      `anime/${id}/recommendations`
    );
    setRecommendations(recommendationsAPI);

    const charactersAPI = await getAnimeResponse(`anime/${id}/characters`);
    setCharacters(charactersAPI);

    const episodesAPI = await getAnimeResponse(`anime/${id}/episodes`);
    setEpisodes(episodesAPI);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className=" bg-zinc-950 text-slate-200 mx-auto flex flex-col gap-14"
      suppressHydrationWarning
    >
      <div className="relative h-96 lg:h-120 -mt-32 hidden md:block">
        <Image
          src={anime.data?.images.webp.large_image_url}
          width={2470}
          height={3500}
          alt={`poster of ${anime.data?.title}`}
          className="absolute h-96 lg:h-120  object-cover blur-sm"
        />
        <div className="absolute inset-0 -bottom-5 bg-gradient-to-t from-zinc-950 from-15%" />
      </div>
      <div className="lg:w-2/3 w-11/12 mx-auto flex flex-col gap-14 z-10 bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between pt-6 gap-8">
          <div className="flex flex-col gap-4 md:hidden">
            <div className="mx-auto">
              <VideoPlayer
                youtubeID={anime.data?.trailer.youtube_id}
                w={330}
                h={203}
              />
            </div>
            <div className="uppercase text-center bg-zinc-300 text-zinc-950 text-sm font-bold p-2 flex flex-row items-center gap-2 justify-center">
              trailer video
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h2 className="text-2xl text-white">{anime.data?.title}</h2>
            <h2 className="pt-4 text-sm text-slate-200/90">
              {anime.data?.rating ? anime.data?.rating : "Unknown age rating"}
            </h2>
            <h2 className="pt-7 pb-4">
              ⭐ {anime.data?.score ? anime.data?.score : "Not yet aired"} |{" "}
              {anime.data?.scored_by
                ? anime.data?.scored_by.toLocaleString()
                : "No"}{" "}
              reviews
            </h2>
            <button className="p-3 hover:bg-amber-200/25 transition-all border border-amber-200 flex flex-row gap-4 uppercase font-bold">
              <Bookmark size={24} color="#fde68a" />
              add to watchlist
            </button>
            <h2 className="pt-8 pb-3 border-b-1 border-b-slate-200/50">
              Synopsis
            </h2>
            <h2 className="py-3 text-sm">{anime.data?.synopsis}</h2>
            <div className="space-x-2 space-y-2 py-6 max-w-full">
              {anime.data?.genres &&
                anime.data?.genres.map((genre) => (
                  <button
                    key={genre.mal_id}
                    className="p-2 bg-zinc-300 text-zinc-950 font-semibold hover:bg-zinc-300/75 transition-all"
                  >
                    {genre.name}
                  </button>
                ))}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Producer</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.producers[0]
                    ? anime.data?.producers[0].name
                    : "Unknown"}
                </h2>
              </div>
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Studio</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.studios[0]
                    ? anime.data?.studios[0].name
                    : "Unknown"}
                </h2>
              </div>
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Source</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.source}
                </h2>
              </div>
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Theme</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.themes[0]
                    ? anime.data?.themes[0].name
                    : "Unknown"}
                  {anime.data?.themes[1]
                    ? `, ` + anime.data?.themes[1].name
                    : ""}
                </h2>
              </div>
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Release</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.season && anime.data?.year
                    ? anime.data?.season + " (" + anime.data?.year + ")"
                    : "Unknown"}
                </h2>
              </div>
              <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
                <h2>Members</h2>
                <h2 className="text-sm text-slate-200/75">
                  {anime.data?.members
                    ? anime.data?.members.toLocaleString()
                    : "Unknown"}
                </h2>
              </div>
            </div>
          </div>
          <div className="md:flex md:flex-col gap-4 hidden md:visible w-120">
            <div className="mx-auto">
              <VideoPlayer
                youtubeID={anime.data?.trailer.youtube_id}
                w={400}
                h={225}
              />
            </div>
            <div className="uppercase text-center bg-zinc-300 text-zinc-950 text-sm font-bold p-2 flex flex-row items-center gap-2 justify-center">
              trailer video
            </div>
            <div className="py-4">
              <h2 className="text-2xl border-b-1 border-b-slate-200/50 pb-2">
                Episodes
              </h2>
              <div className="relative mt-2 mx-auto h-120 overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase dark:bg-zinc-800 dark:text-gray-400 sticky top-0">
                    <tr className="">
                      <th scope="col" className="px-2 py-3 text-center">
                        Episode
                      </th>
                      <th scope="col" className="px-2 py-3 text-center">
                        Title
                      </th>
                      <th scope="col" className="px-2 py-3 text-center">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="px-2 py-4 text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : episodes.data && episodes.data.length > 0 ? (
                      episodes.data.map((episode, index) => {
                        episodeCounter++;
                        return (
                          <tr className="dark:border-gray-700" key={index}>
                            <th
                              scope="row"
                              className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white text-center border-r border-zinc-700"
                            >
                              {episodeCounter}
                            </th>
                            <td className="px-2 py-4 flex flex-row items-center gap-4 border-r border-zinc-700 ml-6">
                              <Link
                                href={`/anime/${id}/episodes/${episodeCounter}`}
                              >
                                <h3 className="text-slate-200 hover:text-slate-50 transition-all">
                                  {episode.title}
                                </h3>
                              </Link>
                            </td>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                              ⭐ {episode.score}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-2 py-4 text-center">
                          No data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl text-white">Characters</h2>
          <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
            {characters.data?.map((character, index) => {
              return (
                <Link
                  href={`/character/${character.character.mal_id}`}
                  className="w-max py-4"
                  key={index}
                >
                  <div className="w-40 h-full hover:scale-105 transition-all duration-300">
                    <Image
                      src={character.character.images.webp.image_url}
                      width={247}
                      height={350}
                      alt={character.character.name}
                      className="h-44 object-cover"
                    />
                    <h3 className="h-16 p-2 text-zinc-950 bg-amber-500  font-semibold">
                      {character.character.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          <h2 className="text-2xl text-white">Recommendations</h2>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-10 gap-4">
            {recommendations.data?.map((recommendation, index) => {
              return (
                <Link
                  href={`/anime/${recommendation.entry.mal_id}`}
                  className="py-3"
                  key={index}
                >
                  <Image
                    src={recommendation.entry.images.webp.image_url}
                    alt={recommendation.entry.title}
                    width={350}
                    height={350}
                    className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
                  />
                  <h2 className="pt-4 hover:text-slate-200/90">
                    {recommendation.entry.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
