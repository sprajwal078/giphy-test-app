import { GIPHY_API_KEY } from "appConstants";
import axios from "axios";

export function getTrendingGifs<T>({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  let apiUrl = "https://api.giphy.com/v1/gifs/trending";
  let params = {
    api_key: GIPHY_API_KEY,
    limit,
    offset,
  };
  return axios.get<T>(apiUrl, { params });
}

export function getGifsBasedOnSearchTerm<T>({
  limit,
  offset,
  searchTerm,
}: {
  limit: number;
  offset: number;
  searchTerm: string;
}) {
  let apiUrl = "https://api.giphy.com/v1/gifs/search";
  let params = {
    api_key: GIPHY_API_KEY,
    limit,
    offset,
    q: searchTerm,
  };
  return axios.get<T>(apiUrl, { params });
}
