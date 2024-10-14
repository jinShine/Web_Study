import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  let url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books", error);
    return null;
  }
}
