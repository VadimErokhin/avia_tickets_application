import { useState } from "react";
import { AirlineCodes, FilterTypes, Flight } from "../types";

export interface PriceFilterValue {
  min?: string;
  max?: string;
}

export type CurrentFilter = FilterTypes | null | AirlineCodes;
export type TransferFilter = FilterTypes.NoTransfer | FilterTypes.OneTransfer | null

export function useFilter() {
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>(null);
  const [filtredItems, setFiltredItems] = useState<Flight[] | null>(null);

  function filter(
    type: CurrentFilter,
    data: Flight[],
    value?: PriceFilterValue | AirlineCodes
  ): Flight[] | null {
    setCurrentFilter(type);

    if (type === FilterTypes.NoTransfer) {
      const results = filterByTransfers(data, 0);
      setFiltredItems(results);
      return results;
    }

    if (type === FilterTypes.OneTransfer) {
      const results = filterByTransfers(data, 1);
      setFiltredItems(results);
      return results;
    }

    if (type === FilterTypes.Price) {
      const results = filterByPrice(data, value as PriceFilterValue);
      setFiltredItems(results);
      return results;
    }

    if (type === FilterTypes.Airline) {
      setCurrentFilter(value as AirlineCodes);
      const results = filterByAirline(data, value as AirlineCodes);
      setFiltredItems(results);
      return results;
    }

    if (type === null) {
      setFiltredItems(null);
    }

    return null;
  }

  function filterByAirline(data: Flight[], value: AirlineCodes) {
    return data.filter((el) => el.flight.carrier.airlineCode === value);
  }

  function filterByPrice(data: Flight[], { min, max }: PriceFilterValue) {
    if (min && max) {
      return data.filter(
        (el) =>
          Number(el.flight.price.total.amount) > Number(min) &&
          Number(el.flight.price.total.amount) < Number(max)
      );
    } else if (min) {
      return data.filter(
        (el) => Number(el.flight.price.total.amount) > Number(min)
      );
    } else if (max) {
      return data.filter(
        (el) => Number(el.flight.price.total.amount) < Number(max)
      );
    }
    return null;
  }

  function filterByTransfers(data: Flight[], transfers: number) {
    return data.filter((flight) => {
      const hasOneTransfers = flight.flight.legs.every(
        (leg) => leg.segments.length === transfers + 1
      );
      return hasOneTransfers;
    });
  }

  return {
    currentFilter,
    filter,
    filtredItems,
  };
}
