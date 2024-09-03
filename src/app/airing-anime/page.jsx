import AnimeList from "@/components/AnimeList";
import { getAnimeResponse } from "../libs/api-libs";
import Header from "@/components/Utilites/Header";
import { Analytics } from "@vercel/analytics/react";

const Page = async () => {
  const airingAnime = await getAnimeResponse("seasons/now");

  return (
    <>
      <Header title="Airing Anime" desc="New anime released this season" />

      <AnimeList api={airingAnime} />
      <Analytics />
    </>
  );
};

export default Page;
