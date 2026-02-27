import { newArrivals, hotDeals, genreBooks } from "./mockData";
import type { Book } from "../types";

/**
 * Extracts the actual author name from the raw author string.
 * e.g. "Paperback, Hindi, Mannu Bhandari" -> "Mannu Bhandari"
 */
export const getAuthorName = (rawAuthor: string): string => {
  return rawAuthor.split(",").pop()?.trim() || rawAuthor;
};

/**
 * Returns all unique books by a given author name (deduplicated by book.id).
 */
export const getAuthorBooks = (authorName: string): Book[] => {
  const allBooks = [...newArrivals, ...hotDeals, ...genreBooks];
  const seen = new Set<number>();
  return allBooks.filter((book) => {
    const name = getAuthorName(book.author);
    if (name === authorName && !seen.has(book.id)) {
      seen.add(book.id);
      return true;
    }
    return false;
  });
};

/**
 * Returns author info (description and image) from the first book that has it.
 */
export const getAuthorInfo = (
  authorName: string,
): { description: string; image: string } => {
  const books = getAuthorBooks(authorName);
  const bookWithInfo = books.find((b) => b.authorDescription || b.authorImage);
  return {
    description:
      bookWithInfo?.authorDescription ||
      "A celebrated author known for their vivid storytelling and rich portrayal of life. Their works often explore themes of human relationships and the complexities of society.",
    image:
      bookWithInfo?.authorImage ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  };
};

/**
 * Returns a list of all unique authors with their basic info.
 */
export const getAllAuthors = (): {
  name: string;
  description: string;
  image: string;
  bookCount: number;
}[] => {
  const allBooks = [...newArrivals, ...hotDeals, ...genreBooks];
  const authorsMap = new Map<
    string,
    { name: string; description: string; image: string; bookCount: number }
  >();

  allBooks.forEach((book) => {
    const authorName = getAuthorName(book.author);
    if (!authorsMap.has(authorName)) {
      authorsMap.set(authorName, {
        name: authorName,
        description:
          book.authorDescription ||
          "A celebrated author known for their vivid storytelling and rich portrayal of life. Their works often explore themes of human relationships and the complexities of society.",
        image:
          book.authorImage ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bookCount: 1,
      });
    } else {
      // Note: This simple count might count the same book multiple times if it appears in multiple lists,
      // but getAuthorBooks handles deduping. For simplicity in the listing, let's just use the length of getAuthorBooks.
    }
  });

  // Re-calculate accurate book counts using the deduplicating helper
  return Array.from(authorsMap.values())
    .map((author) => ({
      ...author,
      bookCount: getAuthorBooks(author.name).length,
    }))
    .sort((a, b) => b.bookCount - a.bookCount); // Sort by number of books descending
};
