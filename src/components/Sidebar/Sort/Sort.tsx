import { SortTypes } from "../../../types";
import style from "./Sort.module.css";

interface SortProps {
  sortMethod: (type: SortTypes) => void;
  currentSort: SortTypes;
}
export function Sort(props: SortProps) {
  function onPriceUp() {
    props.sortMethod(SortTypes.PriceDesc);
  }
  function onPriceDown() {
    props.sortMethod(SortTypes.PriceAsc);
  }
  function onDuration() {
    props.sortMethod(SortTypes.Duration);
  }

  return (
    <form className={style.form}>
      <label>
        <input
          onChange={onPriceUp}
          type="radio"
          name="sort"
          value={SortTypes.PriceDesc}
          checked={props.currentSort === SortTypes.PriceDesc}
        />
        По возрвастанию цены
      </label>
      <label>
        <input
          onChange={onPriceDown}
          type="radio"
          name="sort"
          value={SortTypes.PriceAsc}
          checked={props.currentSort === SortTypes.PriceAsc}
        />
        По убыванию цены
      </label>
      <label>
        <input
          onChange={onDuration}
          type="radio"
          name="sort"
          value={SortTypes.Duration}
          checked={props.currentSort === SortTypes.Duration}
        />
        По времени в пути
      </label>
    </form>
  );
}
