import { useEffect, useState } from "react";

import { useHandleError } from "src/hooks";

import { api } from "src/utils";

import  {Reserve}  from "src/models/reverse";
import Cookies from "js-cookie";

type ReservationParms = {
  search?: string;
  date?: string;
  time?: string;
};

export function useReservations({ search, date, time }: ReservationParms) {

  const [reserves, setParks] = useState<Reserve[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fakeState, setFakeState] = useState(false);
  const { handleError } = useHandleError();
  const role = Cookies.get("role");

  useEffect(() => {
    console.log('we are here');
    setLoading(true);
    api
      .get(role === "admin"|| role === "employee"? "/booking/all" :"/booking/me", 
        {
        params: { search, date, time },
      }
    )
      .then((res) => {
        const data = res.data.bookings;
        handleError(res);
        console.log('we are here 2');
        console.log(res.data.bookings);
        setParks(data);
        setError(undefined);
        setLoading(false);
      })
      .catch((err) => {
        console.log('we are here');
        setParks([]);
        setError(err.message);
        setLoading(false);
      });
  }, [fakeState, search, date, time]);
  function refetch() {
    setFakeState(!fakeState);
  }
  return { reserves, error, refetch ,loading};
}
