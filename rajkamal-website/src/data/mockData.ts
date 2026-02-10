import type { Book } from "../types";

export const newArrivals: Book[] = [
  {
    id: 1,
    title: "Aapka Bunti",
    author: "Paperback, Hindi, Mannu Bhandari",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_01.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    tag: { text: "New", color: "bg-red-500" },
    isbn: "978-0143454212",
    edition: "2024, 1st Edition",
    description:
      "Aapka Bunty is a timeless classic by Mannu Bhandari that explores the impact of divorce on a child's psyche. Through the eyes of young Bunty, the novel poignantly captures the confusion, loneliness, and emotional turmoil of a child caught between two parents starting new lives. A masterpiece of modern Hindi literature.",
    authorDescription:
      "Mannu Bhandari was a prominent Indian author, known for her realistic and compelling portrayal of the middle-class Indian woman. She was a pioneer of the 'Nayi Kahani' movement in Hindi literature.",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    reviewsList: [
      {
        id: 1,
        user: "Akash Patel",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "2 days ago",
        content:
          "A heart-wrenching tale that explores the journey of a young boy. The narrative beautifully intertwines themes of love, separation, and self-discovery. Mannu Bhandari's storytelling is rich and engaging.",
        likes: 124,
        images: [
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        ],
      },
      {
        id: 2,
        user: "Priya Sharma",
        rating: 4,
        date: "1 week ago",
        content:
          "A poignant exploration of the complexities of family dynamics. The characters are deeply drawn and the story addresses the struggles of love and belonging.",
        likes: 85,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Rag Darbari",
    author: "Paperback, Hindi, Shrilal Shukla",
    rating: 4.8,
    reviews: 3200,
    image: "/BooksMock/book_02.jpg",
    price: 250,
    originalPrice: 300,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Rohan Gupta",
        rating: 5,
        date: "3 days ago",
        content:
          "Dushyant Kumar's ghazals are soul-stirring. This collection is a must-have for poetry lovers.",
        likes: 45,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 3,
    title: "Rashmirathi",
    author: "Paperback, Hindi, Ramdhari Singh 'Dinkar'",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_03.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Amit Verma",
        rating: 5,
        date: "1 day ago",
        content:
          "Rashmirathi is an epic that inspires courage and righteousness. Dinkar ji's words are powerful.",
        likes: 67,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 10,
    title: "Sofi Ka Sansar",
    author: "Paperback, Hindi, Jostein Gaarder",
    rating: 4.7,
    reviews: 1500,
    image: "/BooksMock/book_04.jpg",
    price: 299,
    originalPrice: 450,
    discount: 33,
    isLiked: false,
    formats: ["Paperback", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Rahul Sharma",
        rating: 5,
        date: "1 week ago",
        content:
          "A tragic love story that stays with you long after you finish reading. Dharamvir Bharati is a genius.",
        likes: 90,
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 11,
    title: "Varchaswa",
    author: "Paperback, Hindi, Raghuveer Chaudhari",
    rating: 4.5,
    reviews: 800,
    image: "/BooksMock/book_05.jpg",
    price: 199,
    originalPrice: 250,
    discount: 20,
    isLiked: false,
    formats: ["Paperback"],
    reviewsList: [
      {
        id: 1,
        user: "Vikram Singh",
        rating: 5,
        date: "2 days ago",
        content:
          "Madhushala is not just poetry, it's a philosophy of life. Bachchan ji's best work.",
        likes: 110,
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 12,
    title: "Nirmala",
    author: "Paperback, Hindi, Premchand",
    rating: 4.6,
    reviews: 2100,
    image: "/BooksMock/book_06.jpg",
    price: 150,
    originalPrice: 200,
    discount: 25,
    isLiked: true,
    formats: ["Paperback", "Hardcover"],
    reviewsList: [
      {
        id: 1,
        user: "Suresh Kumar",
        rating: 5,
        date: "4 days ago",
        content:
          "Premchand's writing is simple yet powerful. Nirmala's story highlights the social issues of that era.",
        likes: 95,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
];

export const hotDeals: Book[] = [
  {
    id: 4,
    title: "Aapka Bunti",
    author: "Paperback, Hindi, Mannu Bhandari",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_11.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Akash Patel",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "2 days ago",
        content:
          "A heart-wrenching tale that explores the journey of a young boy. The narrative beautifully intertwines themes of love, separation, and self-discovery.",
        likes: 124,
      },
      {
        id: 2,
        user: "Priya Sharma",
        rating: 4,
        date: "1 week ago",
        content:
          "A poignant exploration of the complexities of family dynamics.",
        likes: 85,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 5,
    title: "Rag Darbari",
    author: "Paperback, Hindi, Shrilal Shukla",
    rating: 4.8,
    reviews: 3200,
    image: "/BooksMock/book_01.jpg",
    price: 250,
    originalPrice: 300,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Rohan Gupta",
        rating: 5,
        date: "3 days ago",
        content:
          "Dushyant Kumar's ghazals are soul-stirring. This collection is a must-have for poetry lovers.",
        likes: 45,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 6,
    title: "Rashmirathi",
    author: "Paperback, Hindi, Ramdhari Singh 'Dinkar'",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_02.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Amit Verma",
        rating: 5,
        date: "1 day ago",
        content:
          "Rashmirathi is an epic that inspires courage and righteousness. Dinkar ji's words are powerful.",
        likes: 67,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 13,
    title: "Kitne Pakistan",
    author: "Paperback, Hindi, Kamleshwar",
    rating: 4.4,
    reviews: 1200,
    image: "/BooksMock/book_07.jpg",
    price: 320,
    originalPrice: 400,
    discount: 20,
    isLiked: false,
    formats: ["Paperback"],
    reviewsList: [
      {
        id: 1,
        user: "Arjun Reddy",
        rating: 5,
        date: "1 week ago",
        content:
          "A thought-provoking book that questions the boundaries created by humans. Kamleshwar is brilliant.",
        likes: 88,
        avatar:
          "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 14,
    title: "Tamas",
    author: "Paperback, Hindi, Bhisham Sahni",
    rating: 4.6,
    reviews: 1500,
    image: "/BooksMock/book_08.jpg",
    price: 280,
    originalPrice: 350,
    discount: 20,
    isLiked: true,
    formats: ["Paperback", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Rajesh Khanna",
        rating: 5,
        date: "2 days ago",
        content:
          "Tamas is a powerful depiction of the partition era. Bhisham Sahni captures the pain and chaos vividly.",
        likes: 100,
        avatar:
          "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
];

export const genreBooks: Book[] = [
  {
    id: 7,
    title: "Aapka Bunti",
    author: "Paperback, Hindi, Mannu Bhandari",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_03.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Akash Patel",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "2 days ago",
        content: "A heart-wrenching tale.",
        likes: 124,
      },
    ],
  },
  {
    id: 8,
    title: "Rag Darbari",
    author: "Paperback, Hindi, Shrilal Shukla",
    rating: 4.8,
    reviews: 3200,
    image: "/BooksMock/book_04.jpg",
    price: 250,
    originalPrice: 300,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Rohan Gupta",
        rating: 5,
        date: "3 days ago",
        content: "Soul-stirring.",
        likes: 45,
      },
    ],
  },
  {
    id: 9,
    title: "Rashmirathi",
    author: "Paperback, Hindi, Ramdhari Singh 'Dinkar'",
    rating: 4.5,
    reviews: 2520,
    image: "/BooksMock/book_05.jpg",
    price: 350,
    originalPrice: 500,
    discount: 100,
    isLiked: true,
    formats: ["Paperback", "Hardcover", "E-Book"],
    reviewsList: [
      {
        id: 1,
        user: "Amit Verma",
        rating: 5,
        date: "1 day ago",
        content: "Powerful.",
        likes: 67,
      },
    ],
  },
  {
    id: 15,
    title: "Godan",
    author: "Paperback, Hindi, Premchand",
    rating: 4.9,
    reviews: 5000,
    image: "/BooksMock/book_09.jpg",
    price: 220,
    originalPrice: 300,
    discount: 26,
    isLiked: true,
    formats: ["Paperback", "Hardcover"],
    reviewsList: [
      {
        id: 1,
        user: "Vijay Kumar",
        rating: 5,
        date: "1 week ago",
        content:
          "Godan is the greatest Hindi novel ever written. Premchand's portrayal of rural India is unmatched.",
        likes: 150,
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        user: "Rekha Sharma",
        rating: 5,
        date: "3 weeks ago",
        content:
          "A classic that everyone should read. Hori's struggle breaks your heart.",
        likes: 120,
        avatar:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
  {
    id: 16,
    title: "Gaban",
    author: "Paperback, Hindi, Premchand",
    rating: 4.5,
    reviews: 2200,
    image: "/BooksMock/book_10.jpg",
    price: 180,
    originalPrice: 250,
    discount: 28,
    isLiked: false,
    formats: ["Paperback"],
    reviewsList: [
      {
        id: 1,
        user: "Anil Kapoor",
        rating: 4,
        date: "2 days ago",
        content:
          "Gaban explores the greed and moral corruption in society. Very relevant even today.",
        likes: 80,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        user: "Pooja Hegde",
        rating: 5,
        date: "1 month ago",
        content:
          "Premchand's characters are so real. Jalpa's desire for jewelry and its consequences are depicted well.",
        likes: 65,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
  },
];
