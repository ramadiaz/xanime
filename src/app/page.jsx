import { getAnimeResponse } from "./libs/api-libs";
import Header from "@/components/Utilites/Header";
import AnimeList from "@/components/AnimeList";
import CharacterList from "@/components/CharacterList";
import Banner from "@/components/Utilites/Banner";

const Home = async () => {
  const seasonUpcoming = await getAnimeResponse("seasons/upcoming", "limit=12");
  const topAnime = await getAnimeResponse("top/anime", "limit=12");
  const topCharacters = await getAnimeResponse("top/characters", "limit=12");

  return (
    <div className="bg-zinc-950">

      <Banner />

      <section>
        <Header
          title="UPCOMING ANIME"
          linkTitle="See all"
          linkHref="/upcomingAnime"
        />
        <AnimeList api={seasonUpcoming} />
      </section>

      <section>
        <Header
          title="TOP TIER ANIME LIST 🔥"
          linkTitle="See all"
          linkHref="/topAnime"
        />
        <AnimeList api={topAnime} />
      </section>

      <section>
        <Header
          title="TOP FAVORITE CHARACTER"
          linkTitle="See all"
          linkHref="/topCharacter"
        />
        <CharacterList api={topCharacters} />
      </section>
    </div>
  );
};

export default Home;
