"use client";

import React, { useEffect, useState } from "react";
import { getAnimeResponse } from "@/app/libs/api-libs";
import VideoPlayer from "@/components/Utilites/VideoPlayer";
import { Bookmark, Play } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

const Page = async ({ params: { id } }) => {
    const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const anime = await getAnimeResponse(`anime/${id}/full`);
  const recommendations = await getAnimeResponse(`anime/${id}/recommendations`);
  


  const recommendationsList = recommendations.data.map((recommendation) => {
    return (
      <Link href={`/anime/${recommendation.entry.mal_id}`} className="py-3">
        <Image
          src={recommendation.entry.images.webp.image_url}
          alt={recommendation.entry.title}
          width={350}
          height={350}
          className="w-full h-64 object-cover"
        />
        <h2 className="pt-4 hover:text-slate-200/90">
          {recommendation.entry.title}
        </h2>
      </Link>
    );
  });

  const displayRecommendations = showAll
    ? recommendationsList
    : recommendationsList.slice(0, 6);

  return (
    <div
      className=" bg-zinc-950 text-slate-200 lg:w-2/3 w-11/12 mx-auto pt-14 flex flex-col gap-14"
      suppressHydrationWarning
    >
      <div className="flex flex-col md:flex-row justify-between py-6 gap-8">
        <div className="flex flex-col gap-4 md:hidden">
          <div className="mx-auto">
            <VideoPlayer
              youtubeID={anime.data.trailer.youtube_id}
              w={356}
              h={203}
            />
          </div>
          <div className="uppercase text-center bg-zinc-300 text-zinc-950 text-sm font-bold p-2 flex flex-row items-center gap-2 justify-center">
            trailer video
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-2xl text-white">{anime.data.title}</h2>
          <h2 className="pt-4 text-sm text-slate-200/90">
            {anime.data.rating ? anime.data.rating : "Unknown age rating"}
          </h2>
          <h2 className="pt-7 pb-4">
            ⭐ {anime.data.score ? anime.data.score : "Not yet aired"} |{" "}
            {anime.data.scored_by
              ? anime.data.scored_by.toLocaleString()
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
          <h2 className="py-3 text-sm">{anime.data.synopsis}</h2>
          <div className="space-x-2 space-y-2 py-6 max-w-full">
            {anime.data.genres &&
              anime.data.genres.map((genre) => (
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
                {anime.data.producers[0]
                  ? anime.data.producers[0].name
                  : "Unknown"}
              </h2>
            </div>
            <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
              <h2>Studio</h2>
              <h2 className="text-sm text-slate-200/75">
                {anime.data.studios[0] ? anime.data.studios[0].name : "Unknown"}
              </h2>
            </div>
            <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
              <h2>Source</h2>
              <h2 className="text-sm text-slate-200/75">{anime.data.source}</h2>
            </div>
            <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
              <h2>Release</h2>
              <h2 className="text-sm text-slate-200/75">
                {anime.data.season && anime.data.year
                  ? anime.data.season + " (" + anime.data.year + ")"
                  : "Unknown"}
              </h2>
            </div>
            <div className="flex flex-row justify-between border-b-1 border-b-slate-200/50 py-3">
              <h2>Members</h2>
              <h2 className="text-sm text-slate-200/75">
                {anime.data.members
                  ? anime.data.members.toLocaleString()
                  : "Unknown"}
              </h2>
            </div>
          </div>
        </div>
        <div className="md:flex md:flex-col gap-4 hidden md:visible">
          <div className="">
            <VideoPlayer
              youtubeID={anime.data.trailer.youtube_id}
              w={400}
              h={225}
            />
          </div>
          <div className="uppercase text-center bg-zinc-300 text-zinc-950 text-sm font-bold p-2 flex flex-row items-center gap-2 justify-center">
            trailer video
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl text-white">Recommendations</h2>
        <div>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-8 md:gap-10 gap-4">
            {displayRecommendations}
          </div>
          <button onClick={() => setShowAll(!showAll)} className="mt-4">
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
