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
    title: "Mumbai Kitab Utsav (मुंबई किताब उत्सव)",
    date: "6th - 10th Feb 2026",
    location: "Azad Maidan, Mumbai",
    description:
      "मुंबई की धड़कन में किताबों का महापर्व! Join us for a grand celebration of literature and culture. मुंबई किताब उत्सव provides a platform for readers to engage with their favorite authors and discover new worlds through books.",
    image: "/events/mumbai utsV.jpg",
    status: "Ongoing",
    link: "/event/1",
  },
  {
    id: "2",
    title: "New Delhi World Book Fair (नई दिल्ली विश्व पुस्तक मेला)",
    date: "10th - 18th Feb 2026",
    location: "Pragati Maidan, New Delhi",
    description:
      "विश्व का सबसे बड़ा पुस्तक मेला अब दिल्ली में! Education, enlightenment, and entertainment await you. Explore thousands of titles from across the globe in this year's World Book Fair.",
    image: "/events/delhi world book fair.jpg",
    status: "Ongoing",
    link: "/event/2",
  },
  {
    id: "3",
    title: "Patna Book Fair (पटना पुस्तक मेला)",
    date: "15th - 25th March 2026",
    location: "Gandhi Maidan, Patna",
    description:
      "बिहार की साहित्यिक विरासत का उत्सव! Bringing together authors, poets, and readers in the heart of Patna. पटना पुस्तक मेला celebrates the rich tradition of Hindi and regional literature.",
    image: "/events/world book fair.jpg",
    status: "Upcoming",
    link: "/event/3",
  },
  {
    id: "4",
    title: "Lucknow Literature Festival (लखनऊ साहित्य उत्सव)",
    date: "5th - 10th April 2026",
    location: "Lucknow, Uttar Pradesh",
    description:
      "नवाबों के शहर में शब्दों की महफिल! Experience the elegance of Lucknow combined with modern literary discourse. शानदार चर्चाएं और किताबों की नयी आमद.",
    image: "/events/world book fair books.jpg",
    status: "Upcoming",
    link: "/event/4",
  },
  {
    id: "5",
    title: "Rajkamal Events (राजकमल आयोजन)",
    date: "Monthly Events 2026",
    location: "Various Cities",
    description:
      "राजकमल प्रकाशन के विशेष साहित्यिक कार्यक्रम. Engaging discussions, book signings, and literary workshops held throughout the year for our beloved readers.",
    image: "/events/rajkaml-events.jpg",
    status: "Upcoming",
    link: "/event/5",
  },
  {
    id: "6",
    title: "Entry Poster: Book Fair (प्रवेश द्वार)",
    date: "Annual Celebration",
    location: "All Major Cities",
    description:
      "साहित्य के द्वार पर आपका स्वागत है! Welcome to the gateway of knowledge and imagination. हमारी प्रदर्शनी में पधारें और किताबों की दुनिया का हिस्सा बनें.",
    image: "/events/entry poster.jpg",
    status: "Past",
    link: "/event/6",
  },
  {
    id: "7",
    title: "More Book Fairs (अधिक पुस्तक मेले)",
    date: "2025 Retrospective",
    location: "Pan India",
    description:
      "देश भर में राजकमल की गूँज! Looking back at our successful participation in various regional book fairs. जहाँ तक शब्द पहुँचते हैं, वहाँ तक राजकमल पहुँचता है.",
    image: "/events/MORE of book fairs.jpg",
    status: "Past",
    link: "/event/7",
  },
  {
    id: "8",
    title: "Kitab Utsav Highlights (किताब उत्सव झलकियां)",
    date: "January 2025",
    location: "Cultural Centers",
    description:
      "खूबसूरत यादें और किताबों का साथ! Capturing the most impactful moments from our previous festivals. लेखकों और पाठकों का अद्भुत संगम.",
    image: "/events/kitav_utsav.jpg",
    status: "Past",
    link: "/event/8",
  },
  {
    id: "9",
    title: "Sahitya Sangam (साहित्य संगम)",
    date: "December 2025",
    location: "Special Venues",
    description:
      "कलम और कल्पना का मिलन! Special sessions focused on the future of Hindi literature and the role of young publishers. साहित्य संगम: जहाँ विचार मिलते हैं.",
    image: "/events/kitav_itsav.jpg",
    status: "Past",
    link: "/event/9",
  },
  {
    id: "10",
    title: "Javed Akhtar at Kitab Utsav (जावेद अख्तर किताब उत्सव में)",
    date: "Special Session 2025",
    location: "Main Stage",
    description:
      "दिग्गज रचनाकारों के साथ बातचीत. A memorable evening with Javed Akhtar discussing the nuances of poetry and storytelling in the modern age.",
    image: "/events/kitav_utsav_javed.jpg",
    status: "Past",
    link: "/event/10",
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
    thumbnail: "/events/world book fair.jpg",
    videoUrl: "#",
    title: "Mumbai Kitab Utsav Highlights",
  },
  {
    id: "2",
    thumbnail: "/events/world book fair books.jpg",
    videoUrl: "#",
    title: "Authors Discussion Panel",
  },
  {
    id: "3",
    thumbnail: "/events/delhi world book fair.jpg",
    videoUrl: "#",
    title: "New Releases 2026",
  },
  {
    id: "4",
    thumbnail: "/events/rajkaml-events.jpg",
    videoUrl: "#",
    title: "Readers Community Meet",
  },
];
