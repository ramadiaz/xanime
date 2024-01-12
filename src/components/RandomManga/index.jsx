"use client";

import { getAnimeResponse } from "@/app/libs/api-libs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SmallLoading from "../Utilites/SmallLoading";
import { ShuffleSimple } from "@phosphor-icons/react";

const RandomManga = () => {
  const [random, setRandom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const randomAPI = await getAnimeResponse("random/manga");
      setRandom(randomAPI);

      setIsLoading(false);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleRandomNextClick = () => {
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative mx-auto w-11/12 lg:w-2/3 bg-zinc-800 text-slate-200 h-96">
      {isLoading ? (
        <SmallLoading />
      ) : (
        <div className="p-6 flex flex-col gap-6 h-full">
          <div className="flex flex-row gap-6">
            <Link href={`/manga/${random.data?.mal_id}`} className="w-max">
              <Image
                src={random.data?.images.webp.image_url}
                width={350}
                height={350}
                className="w-40 h-60 object-cover"
              />
            </Link>
            <div className="w-full">
              <h2 className="text-2xl font-semibold">{random.data?.title}</h2>
              <h3 className="opacity-70">{random.data?.rating}</h3>
              <div className="max-h-32 overflow-y-scroll mt-2 custom-scrollbar pr-4">
                <h3 className="text-sm">
                    {random.data?.synopsis ? random.data.synopsis : "There is no synopsis for this anime"}
                    {random.data?.synopsis}</h3>
              </div>
              <div className="space-x-2 space-y-2 py-6 max-w-full">
                {random.data?.genres &&
                  random.data?.genres.slice(0, 3).map((genre) => (
                    <button
                      key={genre.mal_id}
                      className="p-2 bg-zinc-300 text-zinc-950 font-semibold pointer-events-none"
                    >
                      {genre.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleRandomNextClick}
        className="absolute bottom-4 bg-amber-500 p-2 left-1/2 -translate-x-1/2 uppercase text-sm font-bold text-zinc-950 flex flex-row items-center gap-1 hover:bg-amber-500/70 transition-all duration-300"
      >
        Random next
        <ShuffleSimple size={28} color="#09090b" />
      </button>
    </div>
  );
};

export default RandomManga;
