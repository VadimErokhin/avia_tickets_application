import { useMemo, useState } from "react";
import { CurrentFilter, PriceFilterValue } from "../../../hooks/useFilter";
import { AirlineCodes, FilterTypes } from "../../../types";
import style from "./PriceFilter.module.css";

interface PriceFilterProps {
  filterPrice: PriceFilterValue | null;
  filter: (
    type: CurrentFilter,
    value?: PriceFilterValue | AirlineCodes
  ) => void;
}

export function PriceFilter(props: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(() => props.filterPrice && props.filterPrice.min || "");
  const [maxPrice, setMaxPrice] = useState(() => props.filterPrice && props.filterPrice.max || '');

  const formattedValue = useMemo<PriceFilterValue>(
    () => ({
      min: minPrice,
      max: maxPrice,
    }),
    [minPrice, maxPrice]
  );

  function onMinInput(e: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(e.target.value);
  }

  function onMaxInput(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(e.target.value);
  }

  function submit() {
    props.filter(FilterTypes.Price, formattedValue);
  }

  return (
    <form className={style.form}>
      <label>
        <span className={style.text}>От</span>
        <input
          onBlur={submit}
          onInput={onMinInput}
          type="number"
          value={minPrice}
        />
      </label>

      <label className={style.text}>
        <span className={style.text}>До</span>
        <input
          onBlur={submit}
          onInput={onMaxInput}
          type="number"
          value={maxPrice}
        />
      </label>
    </form>
  );
}
