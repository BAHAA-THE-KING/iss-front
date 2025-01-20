// models/Park.ts
import { Park } from "./parks";
export interface Reserve {
    id: number;
    accountId: number;
    parkingId: number;
    cost: number;
    duration: number;
    startTime: string;
    createdAt: string;
    updatedAt: string;
    Parking: Omit<Park, "status" | "rentTime">; 
  }
  