import Image from "next/image";
import Link from "next/link";

const CharacterList = ({ api }) => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 mx-auto w-11/12 lg:w-2/3 text-slate-200">
      {api.data ? api.data.map((character) => {
        return (
          <Link href={`/${character.mal_id}`}>
            <Image
              src={character.images.webp.image_url}
              alt={character.name}
              width={350}
              height={350}
              className="w-full h-72 object-cover"
            />
            <div className="text-md py-4 flex flex-col gap-2">
              <h3 className="font-semibold">
                {character.name}
              </h3>
              <h3 className="font-medium inline-flex justify-end">
                🩷{character.favorites}
              </h3>
            </div>
          </Link>
        );
      }) : "No result"}
    </div>
  );
};

export default CharacterList;
