import { Card } from "./types/Card";
import { Park } from "./types/Park";

const parks: Park[] = [
  {
    id: 1,
    image: "https://placehold.co/698x187",
    name: "Luxury Sofa Set",
    description: "A premium quality sofa set made with fine leather.",
    status: "reserved",
    rentTime: [
      {
        startDateTime: "2025-01-02 21:00:00",
        duration: 5,
      },
      {
        startDateTime: "2025-01-03 03:00:00",
        duration: 5,
      },
    ],
    price: 1200,
  },
  {
    id: 2,
    image: "https://placehold.co/1120x1172",
    name: "Modern Coffee Table",
    description: "Sleek and stylish coffee table with a tempered glass top.",
    status: "free",
    rentTime: [
      {
        startDateTime: "2025-01-01 16:00:00",
        duration: 2,
      },
      {
        startDateTime: "2025-01-02 12:00:00",
        duration: 3,
      },
    ],
    price: 350,
  },
  {
    id: 3,
    image: "https://placehold.co/667x73",
    name: "Ergonomic Office Chair",
    description: "High-back office chair with adjustable lumbar support.",
    status: "reserved",
    rentTime: [
      {
        startDateTime: "2025-01-01 14:00:00",
        duration: 5,
      },
      {
        startDateTime: "2025-01-02 09:00:00",
        duration: 4,
      },
    ],
    price: 400,
  },
  {
    id: 4,
    image: "https://placehold.co/511x1480",
    name: "Classic Wooden Dining Table",
    description: "Handcrafted dining table with a mahogany finish.",
    status: "free",
    rentTime: [
      {
        startDateTime: "2025-01-01 17:00:00",
        duration: 5,
      },
      {
        startDateTime: "2025-01-02 18:00:00",
        duration: 10,
      },
    ],
    price: 900,
  },
  {
    id: 5,
    image: "https://placehold.co/284x719",
    name: "King Size Bed Frame",
    description: "Sturdy and stylish bed frame with under-bed storage.",
    status: "reserved",
    rentTime: [
      {
        startDateTime: "2025-01-01 20:00:00",
        duration: 6,
      },
      {
        startDateTime: "2025-01-02 14:00:00",
        duration: 5,
      },
    ],
    price: 1500,
  },
  {
    id: 6,
    image: "https://placehold.co/147x1142",
    name: "Bookshelf",
    description: "Modern open-shelf design with a durable finish.",
    status: "free",
    rentTime: [
      {
        startDateTime: "2025-01-01 10:00:00",
        duration: 3,
      },
      {
        startDateTime: "2025-01-02 16:00:00",
        duration: 2,
      },
    ],
    price: 200,
  },
];

const cards: Card[] = [
  {
    id: 12,
    name: "Family",
    balance: 100,
  },
  {
    id: 26,
    name: "Personal",
    balance: 1000,
  },
];

export default {
  parks,
  cards,
};
