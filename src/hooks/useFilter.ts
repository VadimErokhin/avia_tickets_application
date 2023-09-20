import { useEffect, useState } from "react";
import { AirlineCodes, FilterTypes, FilterValue, Flight, SearchResponse, TransferTypes } from "../types";

export interface PriceFilterValue {
  min?: string;
  max?: string;
}

export type CurrentFilter = FilterTypes | AirlineCodes | TransferFilter | null;
export type TransferFilter = TransferTypes | null

export function useFilter(data: SearchResponse | null) {
  const [filtredItems, setFiltredItems] = useState<Flight[] | null>(null);

  const [filterTransfer, setFilterTransfer] = useState<TransferTypes | null>(null);
  const [filterPrice, setFilterPrice] = useState<PriceFilterValue | null>(null);
  const [filterAirline, setFilterAirline] = useState<AirlineCodes | null>(null);

  const [filtersToApply, setFiltersToApply] = useState<CurrentFilter[]>([]);

  useEffect(() => {
    setFiltersToApply(() => {
      const newState = []

      if (filterTransfer) newState.push(FilterTypes.Transfer)
      if (filterAirline) newState.push(FilterTypes.Airline)
      if (filterPrice) newState.push(FilterTypes.Price)
      
      return newState;
    })
  }, [filterTransfer, filterPrice, filterAirline])

  useEffect(() => {
    if (!data || !data.result.flights.length) return;

    let filteredItems: null | Flight[] = null;

    filtersToApply.forEach((filterType: CurrentFilter) => {
      if (filterType === FilterTypes.Transfer && filterTransfer) {
        filteredItems = filterByTransfers(filteredItems || data.result.flights, filterTransfer)
      }
      if (filterType === FilterTypes.Price && filterPrice) {
        filteredItems = filterByPrice(filteredItems || data.result.flights, filterPrice)
      }
      if (filterType === FilterTypes.Airline && filterAirline) {
        filteredItems = filterByAirline(filteredItems || data.result.flights, filterAirline)
      }
    })

    setFiltredItems(filteredItems);
  }, [filtersToApply])

  function filter(
    type: CurrentFilter,
    value?: FilterValue
  ) {
    if (type === FilterTypes.Transfer) {
      setFilterTransfer(value as TransferTypes);
    }

    if (type === FilterTypes.Price) {
      setFilterPrice(value as PriceFilterValue)
    }

    if (type === FilterTypes.Airline) {
      setFilterAirline(value as AirlineCodes)
    }
  }

  function filterByAirline(data: Flight[], value: AirlineCodes) {
    return data.filter((el) => el.flight.carrier.airlineCode === value);
  }

  function filterByPrice(data: Flight[], { min, max }: PriceFilterValue) {
    if (!min && !max) return data;

    if (min && max) {
      return data.filter(
        (el) =>
          Number(el.flight.price.total.amount) > Number(min) &&
          Number(el.flight.price.total.amount) < Number(max)
      );
    }
    
    if (min) {
      return data.filter(
        (el) => Number(el.flight.price.total.amount) > Number(min)
      );
    } 


    return data.filter((el) => Number(el.flight.price.total.amount) < Number(max))
  }

  function filterByTransfers(data: Flight[], type: TransferTypes | null) {
    if (!type) return data;

    const transfers = type === TransferTypes.NoTransfer ? 0 : 1;

    return data.filter((flight) => {
      const hasOneTransfers = flight.flight.legs.every(
        (leg) => leg.segments.length === transfers + 1
      );
      return hasOneTransfers;
    });
  }

  return {
    filterTransfer,
    filterPrice,
    filterAirline,
    filter,
    filtredItems,
  };
}
