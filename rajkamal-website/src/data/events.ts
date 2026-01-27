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

export const upcomingEvents: EventItem[] = [
  {
    id: "1",
    title: "Kitab Utsav",
    date: "25th Dec 2025",
    location: "47 Gandhi Nagar, Delhi",
    description:
      "Join us at the Grand Book Fair in Delhi! Located at 47 Gandhi Nagar, just a stone's throw from the Laxmi Nagar Metro Station, this event promises a treasure trove of books for every reader. Don't miss out on the chance to discover new authors and attend exciting workshops!",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Upcoming",
    link: "#",
  },
  {
    id: "2",
    title: "Kitab Utsav",
    date: "25th Dec 2025",
    location: "47 Gandhi Nagar, Delhi",
    description:
      "Join us at the Grand Book Fair in Delhi! Located at 47 Gandhi Nagar, just a stone's throw from the Laxmi Nagar Metro Station, this event promises a treasure trove of books for every reader. Don't miss out on the chance to discover new authors and attend exciting workshops!",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Upcoming",
    link: "#",
  },
  {
    id: "3",
    title: "Kitab Utsav",
    date: "25th Dec 2025",
    location: "47 Gandhi Nagar, Delhi",
    description:
      "Join us at the Grand Book Fair in Delhi! Located at 47 Gandhi Nagar, just a stone's throw from the Laxmi Nagar Metro Station, this event promises a treasure trove of books for every reader. Don't miss out on the chance to discover new authors and attend exciting workshops!",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "Upcoming",
    link: "#",
  },
];

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
