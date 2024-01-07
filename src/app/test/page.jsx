"use client"
import { getAnimeResponse } from '../libs/api-libs';



const App = async() => {


 const recomendations = await getAnimeResponse(`anime/4181/recommendations`)

 console.log(recomendations)


}

export default App;