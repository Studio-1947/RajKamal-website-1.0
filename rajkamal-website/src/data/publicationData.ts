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
    name: "Banyan Tree Books",
    image: "/publication/bani.jpg",
    href: "/publication/Bani%20Prakashan",
  },
  {
    name: "Fanda Prakashan",
    image: "/publication/fanda.jpg",
    href: "/publication/Fanda",
  },
  {
    name: "Hans Prakashan",
    image: "/publication/han.jpg",
    href: "/publication/Hans",
  },
  {
    name: "Lokbharti Prakashan",
    image: "/publication/lokh.jpg",
    href: "/publication/Lokbharti",
  },
  {
    name: "Purvanchal Prakashan",
    image: "/publication/pur.jpg",
    href: "/publication/Purvanchal",
  },
  {
    name: "Rajkamal Prakashan",
    image: "/publication/ra.jpg",
    href: "/publication/Rajkamal",
  },
  {
    name: "Radhakrishna Prakashan",
    image: "/publication/radha.jpg",
    href: "/publication/Radhakrishna",
  },
  {
    name: "Remadhav Prakashan",
    image: "/publication/re.jpg",
    href: "/publication/Remadhav",
  },
  {
    name: "Rekhta Prakashan",
    image: "/publication/rekhta_1.jpg",
    href: "/publication/Rekhta",
  },
  {
    name: "Sahitya Prakashan",
    image: "/publication/sahi.jpg",
    href: "/publication/Sahitya",
  },
  {
    name: "Saransh Prakashan",
    image: "/publication/sarn.jpg",
    href: "/publication/Saransh",
  },
  {
    name: "Sarthak Prakashan",
    image: "/publication/sart.jpg",
    href: "/publication/Sarthak",
  },
];

export const getPublicationLogo = (name: string): string | undefined => {
  return publications.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ?.image;
};
