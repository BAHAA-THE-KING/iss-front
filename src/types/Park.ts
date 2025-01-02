export type Park = {
  id: number;
  image: string;
  name: string;
  description: string;
  status: "reserved" | "free";
  rentTime: {
    startDateTime: string;
    duration: number;
  }[];
  price: number;
};
