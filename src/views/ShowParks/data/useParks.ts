import { useEffect, useState } from "react";

import { useHandleError } from "src/hooks";

import { api } from "src/utils";

import { Park } from "src/types/Park";

type Params = {
  search?: string;
  date?: string;
  time?: string;
};

export function useParks({ search, date, time }: Params) {
  const [parks, setParks] = useState<Park[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [fakeState, setFakeState] = useState(false);
  const { handleError } = useHandleError();
  useEffect(() => {
    api
      .get("/park/all", {
        params: { search, date, time },
      })
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
  }, [fakeState, search, date, time]);
  function refetch() {
    setFakeState(!fakeState);
  }

  return { parks, error, refetch };
}
