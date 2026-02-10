export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  isLiked?: boolean;
  formats?: string[]; // e.g., ['Paperback', 'Hardcover', 'E-Book']
  prices?: { [key: string]: number };
  originalPrices?: { [key: string]: number };
  tag?: {
    text: string;
    color: string; // e.g., 'bg-red-500'
  };
  isbn?: string;
  edition?: string;
  description?: string;
  authorDescription?: string;
  authorImage?: string;
  images?: string[];
  reviewsList?: {
    id: number;
    user: string;
    avatar?: string;
    rating: number;
    date: string;
    content: string;
    likes: number;
    images?: string[];
  }[];
}
