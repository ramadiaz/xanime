import AnimeList from "@/components/AnimeList"
import { getAnimeResponse } from "../libs/api-libs"
import Header from "@/components/Utilites/Header"

const Page = async() => {
    const upcomingAnime = await getAnimeResponse("seasons/upcoming")

    return (
        <>
        <Header title="Season Upcoming Anime"
        desc="Anime that will be released soon"
        
        />

        <AnimeList api={upcomingAnime}/>
        </>
    )
}

export default Page