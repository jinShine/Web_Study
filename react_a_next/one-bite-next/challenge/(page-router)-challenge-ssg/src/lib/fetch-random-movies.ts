import { MovieData } from "@/types";

export default async function fetchRnadomMovies(): Promise<MovieData[]> {
  const url = "http://localhost:12345/movie/random";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch random movies");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
