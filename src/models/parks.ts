// models/Park.ts
export interface Park {
    id: number;
    price: number;
    name: string;
    description: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    rentTime: {
      startDateTime: string;
      duration: number;
    }[][];
    status: string;
  }
  