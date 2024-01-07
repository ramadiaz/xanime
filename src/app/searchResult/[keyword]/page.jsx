import AnimeList from "@/components/AnimeList";
import CharacterList from "@/components/CharacterList";
import Header from "@/components/Utilites/Header";
import { getAnimeResponse } from "@/app/libs/api-libs";

const Page = async ({ params }) => {
  const keyword = params.keyword;
  const animeResult = await getAnimeResponse("anime", `q=${keyword}`);
  const charaResult = await getAnimeResponse("characters", `q=${keyword}`);

  return (
    
    
    <div className="bg-zinc-950">
      <section>
        <Header 
          title={`ANIME RESULT FOR "${decodeURIComponent(keyword)}"`}
        />
        <AnimeList api={animeResult} />
        <Header 
          title={`CHARACTER RESULT FOR "${decodeURIComponent(keyword)}"`}
        />
        <CharacterList api={charaResult} />
      </section>
    </div>
  );
};

export default Page;
