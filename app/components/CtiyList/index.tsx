"use client";
import React, { useEffect, useState } from "react";
import { CityListProps, CitySearchError, CitySearchResponse } from "./types";
import CityItems from "../CityItems";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = "http://localhost:3000";

const CityList = ({ search }: CityListProps) => {
  const [result, setResult] = useState<CitySearchResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchCities = async (search: string | undefined) => {
    setLoading(true);
    const response: CitySearchResponse & CitySearchError = await fetch(
      `${BASE_URL}/api/cities?query=${search ?? ''}`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        setError( "مشکلی پیش آمده لطفا دوباره تلاش کنید.!");
        console.log(err);
        return;
      })
      .finally(() => setLoading(false));

    if (response.error) {
      setError(response.error);
      return;
    }

    setResult(response);
  };

  useEffect(() => {
    fetchCities(search);
  }, [search]);

  if (loading || !result) {
    return (
      <ClipLoader
        color="purple"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if(error) {
    return(
      <div className="text-[.9rem] text-[red] max-w-[300px]">
        {`محله ${search} یافت نشد!`}
      </div>
    )
  }

  return <CityItems areas={result.cities} />;
};

export default CityList;
