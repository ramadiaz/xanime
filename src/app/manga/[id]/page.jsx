"use client";

import { getAnimeResponse } from "@/app/libs/api-libs";
import Loading from "@/app/loading";
import { Bookmark } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [manga, setManga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                <button className="flex flex-row gap-2 border-2 border-amber-200 hover:bg-amber-200/50 transition-all duration-300 p-2 items-center justify-center uppercase font-bold">
                  <Bookmark size={24} color="#fde68a" />
                  bookmark
                </button>
              </div>
              <div className="basis-3/4 pl-4">
                <div className="">
                  <h1 className="text-2xl text-white">
                    {manga.data.title} ({manga.data.title_japanese})
                  </h1>
                  <h2 className="text-slate-200/70">{manga.data.type}</h2>
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
                <div>
                  <h2 className="pb-3 border-b-1 border-b-slate-200">
                    Background
                  </h2>
                  <h2 className="py-3 text-sm">{manga.data?.synopsis}</h2>
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
                                <Link 
                                    href={`/${child.type}/${child.mal_id}`}
                                >
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