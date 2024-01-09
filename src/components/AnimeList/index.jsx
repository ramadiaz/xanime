import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 mx-auto w-11/12 lg:w-2/3">
      {api.data?.map((anime) => {
        return (
          <Link href={`/anime/${anime.mal_id}`}>
            <div className="w-full h-full relative">
              <div className="absolute w-full h-full bg-amber-500 opacity-0 hover:opacity-100 hover:scale-105 transition-all duration-300">
                <div className="p-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <h2 className="text-zinc-950 font-semibold">
                      {anime.title}
                    </h2>
                    <h3 className="text-sm">
                      {anime.rating ? anime.rating : "Unknown rating"}
                    </h3>
                    <h3 className="space-x-2 space-y-2 max-w-full">
                      {anime.genres &&
                        anime.genres.map((genre) => (
                          <button
                            key={genre.mal_id}
                            className="p-1 border border-zinc-950 text-zinc-950 text-xs"
                          >
                            {genre.name}
                          </button>
                        ))}
                    </h3>
                    <h3 className="text-sm pt-2">Theme: {anime.themes[0] ? anime.themes[0].name : "Unknown"}</h3>
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
                <h3 className="text-md text-slate-200 py-4">{anime.title}</h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
