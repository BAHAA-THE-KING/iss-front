import { RentForm } from "src/types/RentForm";
import { api } from "src/utils";

export function useMakeReservation() {
  async function makeReservation(data: RentForm & { parkId: number }) {
    return await api.post("/park/reserve", data);
  }

  return { makeReservation };
}