import { Park } from "./types/Park";

const parks: Park[] = [
  {
    id: 1,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "Luxury Sofa Set",
    description: "A premium quality sofa set made with fine leather.",
    status: "reserved",
    rentTime: [
      "2025-01-01 15:00:00 - 2025-01-01 20:00:00",
      "2025-01-01 21:00:00 - 2025-01-02 02:00:00",
    ],
    price: "$1,200",
  },
  {
    id: 2,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "Modern Coffee Table",
    description: "Sleek and stylish coffee table with a tempered glass top.",
    status: "free",
    rentTime: [
      "2025-01-01 16:00:00 - 2025-01-01 18:00:00",
      "2025-01-02 12:00:00 - 2025-01-02 15:00:00",
    ],
    price: "$350",
  },
  {
    id: 3,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "Ergonomic Office Chair",
    description: "High-back office chair with adjustable lumbar support.",
    status: "reserved",
    rentTime: [
      "2025-01-01 14:00:00 - 2025-01-01 19:00:00",
      "2025-01-02 09:00:00 - 2025-01-02 13:00:00",
    ],
    price: "$400",
  },
  {
    id: 4,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "Classic Wooden Dining Table",
    description: "Handcrafted dining table with a mahogany finish.",
    status: "free",
    rentTime: [
      "2025-01-01 17:00:00 - 2025-01-01 22:00:00",
      "2025-01-02 08:00:00 - 2025-01-02 11:00:00",
    ],
    price: "$900",
  },
  {
    id: 5,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "King Size Bed Frame",
    description: "Sturdy and stylish bed frame with under-bed storage.",
    status: "reserved",
    rentTime: [
      "2025-01-01 20:00:00 - 2025-01-02 02:00:00",
      "2025-01-02 14:00:00 - 2025-01-02 19:00:00",
    ],
    price: "$1,500",
  },
  {
    id: 6,
    image: `https://placehold.co/${Math.floor(
      Math.random() * 1500
    )}x${Math.floor(Math.random() * 1500)}`,
    name: "Bookshelf",
    description: "Modern open-shelf design with a durable finish.",
    status: "free",
    rentTime: [
      "2025-01-01 10:00:00 - 2025-01-01 13:00:00",
      "2025-01-02 16:00:00 - 2025-01-02 18:00:00",
    ],
    price: "$200",
  },
];

export default {
  parks,
};
