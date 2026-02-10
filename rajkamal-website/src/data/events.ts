export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  status: "Upcoming" | "Past" | "Ongoing";
  link: string;
}

export interface Video {
  id: string;
  thumbnail: string;
  videoUrl: string;
  title: string;
}

export const events: EventItem[] = [
  {
    id: "1",
    title: "Mumbai Kitab Utsav",
    date: "10th - 18th Feb 2026",
    location: "Mumbai, Maharashtra",
    description:
      "Join us for the vibrant Mumbai Kitab Utsav! A celebration of literature, culture, and the joy of reading in the heart of the city of dreams. Meet your favorite authors, participate in workshops, and explore a vast collection of books.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Ongoing",
    link: "/event/1",
  },
  {
    id: "2",
    title: "New Delhi World Book Fair 2026",
    date: "10th - 18th Feb 2026",
    location: "Pragati Maidan, New Delhi",
    description:
      "The massive World Book Fair returns to Delhi! Rajkamal Prakashan is proud to present its largest collection yet. Visit our stall for exclusive launches, author interactions, and special discounts.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Ongoing",
    link: "/event/2",
  },
  {
    id: "3",
    title: "Patna Book Fair",
    date: "15th March 2026",
    location: "Gandhi Maidan, Patna",
    description:
      "Get ready for the Patna Book Fair! Specifically curated for the literature lovers of Bihar. Expect a massive gathering of publishers, authors, and readers. Special sessions on regional literature and history.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Upcoming",
    link: "/event/3",
  },
  {
    id: "4",
    title: "Lucknow Kitab Utsav",
    date: "5th - 10th April 2026",
    location: "Sangeet Natak Akademi, Lucknow",
    description:
      "The city of Nawabs welcomes the Kitab Utsav. Immerse yourself in the rich literary heritage of Lucknow. A perfect blend of classic and contemporary literature awaits you.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Upcoming",
    link: "/event/4",
  },
  {
    id: "5",
    title: "Chandigarh Kitab Utsav",
    date: "10th - 14th Dec 2025",
    location: "Punjab Kala Bhawan, Chandigarh",
    description:
      "A successful 5-day literary festival in Chandigarh. We celebrated the joy of reading with thousands of visitors. Highlights included poetry sessions and book discussions.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Past",
    link: "/event/5",
  },
  {
    id: "6",
    title: "Bhopal Kitab Utsav",
    date: "Nov 2025",
    location: "Rabindra Bhavan, Bhopal",
    description:
      "Bhopal witnessed a grand celebration of books. The event focused on promoting Hindi literature among youth. Author meet-and-greet sessions were a major hit.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Past",
    link: "/event/6",
  },
  {
    id: "7",
    title: "Bareilly Kitab Utsav",
    date: "4th - 8th Oct 2025",
    location: "Bareilly Club Ground, Bareilly",
    description:
      "The first-ever Kitab Utsav in Bareilly was a resounding success. Readers from across the region gathered to explore new titles. We thank everyone for the overwhelming response.",
    image:
      "https://images.unsplash.com/photo-1476275466078-bd007cd8191f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Past",
    link: "/event/7",
  },
  {
    id: "8",
    title: "Varanasi Kitab Utsav",
    date: "Sep 2025",
    location: "Sanskriti Sankul, Varanasi",
    description:
      "In the spiritual capital of India, we celebrated knowledge and wisdom. The Varanasi Kitab Utsav brought together scholars and young readers alike.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Past",
    link: "/event/8",
  },
  {
    id: "9",
    title: "Annual Online Book Fair",
    date: "June 2025",
    location: "Online (rajkamalprakashan.com)",
    description:
      "Our annual online book fair made literature accessible to everyone, everywhere. With over 6000 titles and massive discounts, it was a digital festival of books.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Past",
    link: "/event/9",
  },
];

// Helper to keep existing code working if it imports upcomingEvents
export const upcomingEvents = events.filter(
  (e) => e.status === "Upcoming" || e.status === "Ongoing",
);

export const eventFilters = [
  "Kitab Utsav",
  "Stree Barsh",
  "Jalsaghar",
  "Kitabganj",
  "More Events",
];

export const videos: Video[] = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "#",
    title: "Event Highlight 1",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "#",
    title: "Event Highlight 2",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "#",
    title: "Event Highlight 3",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    videoUrl: "#",
    title: "Event Highlight 4",
  },
];
