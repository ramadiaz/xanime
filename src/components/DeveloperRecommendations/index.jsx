import developerRecommendations from "@/app/libs/json/developerRecommendation.json";
import Image from "next/image";
import Link from "next/link";

const DeveloperRecommendations = () => {
  const recommendations = developerRecommendations;

  return (
    <div className="mx-auto w-11/12 lg:w-2/3 space-y-4 text-slate-200 ">
      <div className="border-l-2 border-pink-500 pl-4 left-4">
        <div className="pb-4 border-b border-b-slate-200">
          <h2 className="text-xl font-bold">Romance List</h2>
          <h3 className="text-sm text-slate-200/70">
            This is a series of several romance anime that will make you feel
            more lonely
          </h3>
        </div>
        <ul className="flex flex-col gap-4 ml-4 py-4">
          {recommendations.data.romance.map((romanceItem) => {
            return (
              <li className="flex flex-row gap-4 items-center">
                <Link href={`/anime/${romanceItem.mal_id}`} className="w-28">
                  <Image
                    src={romanceItem.image}
                    width={350}
                    height={350}
                    className="w-24 h-40 object-cover"
                  />
                </Link>
                <div className="w-full">
                  <Link
                    href={`/anime/${romanceItem.mal_id}`}
                    className="text-lg"
                  >
                    {romanceItem.title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-l-2 border-red-500 pl-4 left-4">
        <div className="pb-4 border-b border-b-slate-200">
          <h2 className="text-xl font-bold">Drama List</h2>
          <h3 className="text-sm text-slate-200/70">
            Series of drama anime that will make you cry with their stories
          </h3>
        </div>
        <ul className="flex flex-col gap-4 ml-4 py-4">
          {recommendations.data.drama.map((dramaItem) => {
            return (
              <li className="flex flex-row gap-4 items-center">
                <Link href={`/anime/${dramaItem.mal_id}`} className="w-28">
                  <Image
                    src={dramaItem.image}
                    width={350}
                    height={350}
                    className="w-24 h-40 object-cover"
                  />
                </Link>
                <div className="w-full">
                  <Link href={`/anime/${dramaItem.mal_id}`} className="text-lg">
                    {dramaItem.title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-l-2 border-yellow-500 pl-4 left-4">
        <div className="pb-4 border-b border-b-slate-200">
          <h2 className="text-xl font-bold">Comedy List</h2>
          <h3 className="text-sm text-slate-200/70">
            Need some funny stuff? Here's a list of some anime that will make
            you laugh
          </h3>
        </div>
        <ul className="flex flex-col gap-4 ml-4 py-4">
          {recommendations.data.comedy.map((comedyItem) => {
            return (
              <li className="flex flex-row gap-4 items-center">
                <Link href={`/anime/${comedyItem.mal_id}`} className="w-28">
                  <Image
                    src={comedyItem.image}
                    width={350}
                    height={350}
                    className="w-24 h-40 object-cover"
                  />
                </Link>
                <div className="w-full">
                  <Link href={`/anime/${comedyItem.mal_id}`} className="text-lg">
                    {comedyItem.title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperRecommendations;
