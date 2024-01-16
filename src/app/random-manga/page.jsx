import RandomManga from "@/components/RandomManga";
import Header from "@/components/Utilites/Header";

const Page = () => {
  return (
    <div>
      <Header
        title="Need something new? Try this random manga"
        desc="Promise me that you will try read it to make it more exciting"
      />
      <RandomManga />
    </div>
  );
};

export default Page;
