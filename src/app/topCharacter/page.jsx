import Header from "@/components/Utilites/Header";
import CharacterList from "@/components/CharacterList";
import Banner from "@/components/Utilites/Banner";

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/characters`
  );
  const topCharacter = await response.json();
  return (
    <div className="bg-zinc-950">
      <section>
        <Header
          title="TOP TIER CHARACTER"
          linkTitle=""
          linkHref="/"
          />
        <CharacterList api={topCharacter} />
      </section>
    </div>
  );
};

export default Page;
