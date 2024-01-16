import RandomAnime from "@/components/RandomAnime";
import Header from "@/components/Utilites/Header";

const Page = () => {
  return (
    <div>
      <Header
        title="Need something new? Try this random anime"
        desc="Promise me that you will try watch it to make it more exciting"
      />
      <RandomAnime />
    </div>
  );
};

export default Page;
