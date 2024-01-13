import { getAnimeResponse } from "./libs/api-libs";
import Header from "@/components/Utilites/Header";
import AnimeList from "@/components/AnimeList";
import Banner from "@/components/Utilites/Banner";
import Link from "next/link";
import Image from "next/image";
import DeveloperRecommendations from "@/components/DeveloperRecommendations";
import RandomAnime from "@/components/RandomAnime";

const Home = async () => {
  const seasonUpcoming = await getAnimeResponse("seasons/upcoming", "limit=12");
  const topAnime = await getAnimeResponse("top/anime", "limit=10");
  const topManga = await getAnimeResponse("top/manga", "limit=10")
  const seasonsNow = await getAnimeResponse("seasons/now", "limit=12");
  return (
    <div className="bg-zinc-950">
      <Banner />

      <section>
        <Header
          title="Airing Now"
          desc="New anime released this season"
          linkTitle="See all"
          linkHref="/airingAnime"
        />
        <AnimeList api={seasonsNow} />
      </section>

      <section>
        <Header
          title="Top Tier Anime List 🔥"
          desc="Ranking of anime with the highest scores based on myanimelist"
          linkTitle="See all"
          linkHref="/topAnime"
        />

        <div className="flex flex-row gap-6 overflow-x-auto overflow-y-hidden custom-scrollbar mx-auto w-11/12 lg:w-2/3 -mt-4">
          {topAnime.data?.map((anime, index) => {
            return (
              <div className="flex flex-row pb-2 gap-4 scale-90">
                <h1 className="text-5xl font-bold text-slate-200 pt-2">
                  #{index + 1}
                </h1>
                <Link
                  href={`/anime/${anime.mal_id}`}
                  className="w-max "
                  key={index}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute w-full h-full bg-amber-500 opacity-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
                      <div className="p-4 flex flex-col justify-between h-full">
                        <div className="space-y-2">
                          <h2 className="text-zinc-950 font-semibold">
                            {anime.title}
                          </h2>
                          <h3 className="text-sm">
                            ⭐ {anime.score ? anime.score : "Unknown score"}
                          </h3>
                          <h3 className="space-x-2 space-y-2 max-w-full">
                            {anime.genres &&
                              anime.genres.slice(0, 3).map((genre) => (
                                <button
                                  key={genre.mal_id}
                                  className="p-1 border border-zinc-950 text-zinc-950 text-xs"
                                >
                                  {genre.name}
                                </button>
                              ))}
                          </h3>
                          <h3 className="text-sm pt-2">
                            Theme:{" "}
                            {anime.themes[0] ? anime.themes[0].name : "Unknown"}
                          </h3>
                        </div>
                        <button className="bg-zinc-950 text-amber-500 uppercase text-sm py-2 w-full">
                          more information
                        </button>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        width={350}
                        height={350}
                        className="w-full h-72 object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <Header
          title="Upcoming Anime"
          desc="Anime that will be released soon"
          linkTitle="See all"
          linkHref="/upcomingAnime"
        />
        <AnimeList api={seasonUpcoming} />
      </section>

      <section>
        <Header
          title="Top Tier Manga List"
          desc="Ranking of manga with the highest scores based on myanimelist"
          linkTitle="See all"
          linkHref="/topManga"
        />

        <div className="flex flex-row gap-6 overflow-x-auto overflow-y-hidden custom-scrollbar mx-auto w-11/12 lg:w-2/3 -mt-4">
          {topManga.data?.map((anime, index) => {
            return (
              <div className="flex flex-row pb-2 gap-4 scale-90">
                <h1 className="text-5xl font-bold text-slate-200 pt-2">
                  #{index + 1}
                </h1>
                <Link
                  href={`/manga/${anime.mal_id}`}
                  className="w-max "
                  key={index}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute w-full h-full bg-amber-500 opacity-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
                      <div className="p-4 flex flex-col justify-between h-full">
                        <div className="space-y-2">
                          <h2 className="text-zinc-950 font-semibold">
                            {anime.title}
                          </h2>
                          <h3 className="text-sm">
                            ⭐ {anime.score ? anime.score : "Unknown rating"}
                          </h3>
                          <h3 className="space-x-2 space-y-2 max-w-full">
                            {anime.genres &&
                              anime.genres.slice(0, 3).map((genre) => (
                                <button
                                  key={genre.mal_id}
                                  className="p-1 border border-zinc-950 text-zinc-950 text-xs"
                                >
                                  {genre.name}
                                </button>
                              ))}
                          </h3>
                          <h3 className="text-sm pt-2">
                            Theme:{" "}
                            {anime.themes[0] ? anime.themes[0].name : "Unknown"}
                          </h3>
                        </div>
                        <button className="bg-zinc-950 text-amber-500 uppercase text-sm py-2 w-full">
                          more information
                        </button>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        width={350}
                        height={350}
                        className="w-full h-72 object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <Header
          title="Developer Recommendations"
          desc="Some anime that I recommend for you are based on my experience of being a `wibu` for 7 years"
        />
        <DeveloperRecommendations/>
      </section>

      <section>
        <Header
          title="Need something new? Try this random anime"
          desc="Promise me that you will try watch it to make it more exciting"
        />
        <RandomAnime/>
      </section>
    </div>
  );
};

export default Home;
