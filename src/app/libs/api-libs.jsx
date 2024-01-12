import bannerData from "./json/bannerAPIsupport.json"

export const getAnimeResponse = async(resource, query) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const result = await response.json()
    return result
}
export const getBannerResponse = () => {
    return bannerData;
  };

export const getGithubResponse = async(resource) => {
    const response = await fetch(`${process.env.NEXT_GITHUB_USER_URL}`)
    const result = await response.json()
    return result
}