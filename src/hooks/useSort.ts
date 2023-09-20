import { useState } from "react";
import { Flight, SortTypes } from "../types";

export function useSort() {
  const [sortMethod, setSortMethod] = useState<SortTypes>(SortTypes.PriceDesc);

  function sort(type: SortTypes, data: Flight[]) {
    setSortMethod(type);
    if (type === SortTypes.Duration) {
      sortDuration(data);
      return;
    }

    if (type === SortTypes.PriceAsc) {
      sortPriceRise(data);
      return;
    }

    if (type === SortTypes.PriceDesc) {
      sortPriceDown(data);
      return;
    }
  }

  function sortPriceRise(data: Flight[]) {
    if (!data) return;
    data.sort((a, b) => {
      const aPrice = Number(a.flight.price.total.amount);
      const bPrice = Number(b.flight.price.total.amount);
      return bPrice - aPrice;
    });
  }

  function sortPriceDown(data: Flight[]) {
    if (!data) return;

    data.sort((a, b) => {
      const aPrice = Number(a.flight.price.total.amount);
      const bPrice = Number(b.flight.price.total.amount);
      return aPrice - bPrice;
    });
  }

  function sortDuration(data: Flight[]) {
    if (!data) return;

    data.sort((a, b) => {
      const aDuration = a.flight.legs[0].duration;
      const bDuration = b.flight.legs[0].duration;
      return aDuration - bDuration;
    });
  }

  return {
    sort,
    currentSort: sortMethod,
  };
}
