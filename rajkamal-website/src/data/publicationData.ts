export interface Publication {
  name: string;
  image: string;
  href: string;
}

export const publications: Publication[] = [
  {
    name: "Akshar Prakashan",
    image: "/publication/akshar_lo.png",
    href: "/publication/Akshar%20Prakashan",
  },
  {
    name: "Bani Prakashan",
    image: "/publication/bani.jpg",
    href: "/publication/Bani%20Prakashan",
  },
  {
    name: "Fanda",
    image: "/publication/fanda.jpg",
    href: "/publication/Fanda",
  },
  { name: "Hans", image: "/publication/han.jpg", href: "/publication/Hans" },
  {
    name: "Lokbharti",
    image: "/publication/lokh.jpg",
    href: "/publication/Lokbharti",
  },
  {
    name: "Purvanchal",
    image: "/publication/pur.jpg",
    href: "/publication/Purvanchal",
  },
  {
    name: "Rajkamal",
    image: "/publication/ra.jpg",
    href: "/publication/Rajkamal",
  },
  {
    name: "Radhakrishna",
    image: "/publication/radha.jpg",
    href: "/publication/Radhakrishna",
  },
  {
    name: "Remadhav",
    image: "/publication/re.jpg",
    href: "/publication/Remadhav",
  },
  {
    name: "Rekhta",
    image: "/publication/rekhta_1.jpg",
    href: "/publication/Rekhta",
  },
  {
    name: "Sahitya",
    image: "/publication/sahi.jpg",
    href: "/publication/Sahitya",
  },
  {
    name: "Saransh",
    image: "/publication/sarn.jpg",
    href: "/publication/Saransh",
  },
  {
    name: "Sarthak",
    image: "/publication/sart.jpg",
    href: "/publication/Sarthak",
  },
];

export const getPublicationLogo = (name: string): string | undefined => {
  return publications.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ?.image;
};
