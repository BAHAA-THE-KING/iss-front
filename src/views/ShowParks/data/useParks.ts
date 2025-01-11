import { useEffect, useState } from "react";
import { Park } from "src/types/Park";
import { api } from "src/utils";

export function useParks() {
  const [parks, setParks] = useState<Park[]>([]);
  useEffect(() => {
    api
      .get("/park/all")
      .then((res) => {
        setParks(JSON.parse(res.data).parks);
      })
      .catch();
  }, []);
  return { parks };
}
