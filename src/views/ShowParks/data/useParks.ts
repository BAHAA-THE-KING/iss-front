import { useEffect, useState } from "react";
import { useHandleError } from "src/hooks";
import { Park } from "src/types/Park";
import { api } from "src/utils";

export function useParks() {
  const [parks, setParks] = useState<Park[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [fakeState, setFakeState] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    api
      .get("/park/all")
      .then((res) => {
        const data = res.data;
        handleError(res);
        setParks(data.parks);
        setError(undefined);
      })
      .catch((err) => {
        setParks([]);
        setError(err.message);
      });
  }, [fakeState]);
  function refetch() {
    setFakeState(!fakeState);
  }

  return { parks, error, refetch };
}
