import Header from "@/components/Utilites/Header";
import Image from "next/image";
import { getAnimeResponse } from "../libs/api-libs";
import Link from "next/link";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime");

  return (
    <div className="bg-zinc-950 text-slate-200">
      <Header title="TOP ANIME SERIES" />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-2/3 w-11/12 mx-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                class="px-2 py-3 text-center border-r border-zinc-700"
              >
                Rank
              </th>
              <th
                scope="col"
                class="px-2 py-3 text-center border-r border-zinc-700"
              >
                Title
              </th>
              <th scope="col" class="px-2 py-3 text-center">
                Score
              </th>
            </tr>
          </thead>
          {topAnime.data.map((anime) => {
            return (
              <tbody>
                <tr class="bg- border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center border-r border-zinc-700"
                  >
                    #{anime.rank}
                  </th>
                  <td class="px-2 py-4 flex flex-row items-center gap-4 border-r border-zinc-700 ml-6">
                    <Link href={`/anime/${anime.mal_id}`}>
                      <Image
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        width={350}
                        height={350}
                        className="md:w-28 md:h-40 w-12 h-20 object-cover"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link href={`/anime/${anime.mal_id}`}>
                        <h3 className="text-base text-bold text-slate-200 hover:text-slate-50 transition-all">
                          {anime.title}(
                          {anime.year ? anime.year : "Unknown release year"})
                        </h3>
                      </Link>
                      <h3>{anime.rating}</h3>
                      <h3>Genre: {anime.genres[0].name}</h3>
                      <h3>{anime.members.toLocaleString()} members</h3>
                    </div>
                  </td>
                  <td class="px-2 py-4 text-center">⭐ {anime.score}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Page;
