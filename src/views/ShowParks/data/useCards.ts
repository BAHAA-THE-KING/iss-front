import { useEffect, useState } from "react";
import { useHandleError } from "src/hooks";
import { Card } from "src/types/Card";
import { api } from "src/utils";

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [fakeState, setFakeState] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    api
      .get("/accounts")
      .then((res) => {
        const data = JSON.parse(res.data);
        handleError(res);
        setCards(data.accounts);
        setError(undefined);
      })
      .catch((err) => {
        setCards([]);
        setError(err.message);
      });
  }, [fakeState]);
  function refetch() {
    setFakeState(!fakeState);
  }
  return { cards, error, refetch };
}
