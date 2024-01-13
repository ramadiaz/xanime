"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Header from "@/components/Utilites/Header";
import Link from "next/link";

const Page = () => {
  const [watchList, setWatchList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const watchlistData = Cookies.getJSON("watchlist") || [];
      setWatchList(watchlistData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeWatchlist = (id) => {
    const updateWatchlist = watchList.filter((item) => item.id !== id);
    Cookies.set("watchlist", updateWatchlist);
    location.reload()
  };

  return (
    <div className="watch-list">
      <Header
        title="Your Watchlist"
        desc="List of anime that you have added to"
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="lg:w-2/3 w-11/12 mx-auto text-slate-200">
          <table className="w-full text-center">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-2 px-4 w-10">No.</th>
                <th className="py-2 px-4 ">Title</th>
                <th className="py-2 px-4 w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchList !== null ? (
                watchList.length > 0 ? (
                  watchList.map((watchlistItem, index) => {
                    return (
                      <tr
                        key={index}
                        className="divide-x-1 border-b-1 divide-zinc-700 border-b-zinc-700 text-left"
                      >
                        <th className="py-2 px-4 w-10">{index + 1}.</th>
                        <td className="py-2 px-4">
                          <Link
                            href={`anime/${watchlistItem.id}`}
                            className="hover:text-white hover:underline underline-offset-4 transition-all duration-300 text-left"
                          >
                            {watchlistItem.title}
                          </Link>
                        </td>
                        <td className="p-2 text-center">
                            <button onClick={() => removeWatchlist(watchlistItem.id)} className="bg-red-600 py-2 px-4 rounded-md uppercase text-sm font-bold">
                                remove
                            </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-1 border-b-zinc-700">
                    <td colSpan={3} className="py-2 px-4 text-center">
                      Empty watchlist
                    </td>
                  </tr>
                )
              ) : (
                <Loading />
              )}
              {}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
