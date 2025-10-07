import { Game, GamesResponse } from "@/types/game";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = async (
  page: number = 1,
  search?: string,
  genres?: string,
  platforms?: string,
  ordering: string = "-added"
): Promise<GamesResponse> => {
  const params = new URLSearchParams({
    key: API_KEY,
    page: page.toString(),
    page_size: "20",
    ordering,
  });

  if (search) params.append("search", search);
  if (genres) params.append("genres", genres);
  if (platforms) params.append("platforms", platforms);

  const response = await fetch(`${BASE_URL}/games?${params}`);
  if (!response.ok) throw new Error("Failed to fetch games");
  return response.json();
};

export const fetchGameDetails = async (id: number): Promise<Game> => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch game details");
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch genres");
  return response.json();
};

export const fetchPlatforms = async () => {
  const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch platforms");
  return response.json();
};
