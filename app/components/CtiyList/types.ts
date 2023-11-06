import { City } from "../types";

export type CityListProps = {
  search?: string;
};

export type CitySearchResponse = {
  cities: City[];
};

export type CitySearchError = {
  error: string
}
