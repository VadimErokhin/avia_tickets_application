import { CurrentFilter } from "../../../hooks/useFilter";
import { FilterTypes } from "../../../types";
import style from "./Filter.module.css";

interface FilterProps {
  filter: (type: CurrentFilter) => void;
  currentFilter: CurrentFilter;
}

export function Filter(props: FilterProps) {
  function handleOneTransfer() {
    if (props.currentFilter === FilterTypes.OneTransfer) {
      props.filter(null);
      return;
    }
    props.filter(FilterTypes.OneTransfer);
  }

  function handleNoTransfer() {
    if (props.currentFilter === FilterTypes.NoTransfer) {
      props.filter(null);
      return;
    }
    props.filter(FilterTypes.NoTransfer);
  }

  return (
    <form className={style.form}>
      <label>
        <input
          onChange={handleOneTransfer}
          type="checkbox"
          value={FilterTypes.OneTransfer}
          checked={props.currentFilter === FilterTypes.OneTransfer}
        />
        -1 пересадка
      </label>
      <label>
        <input
          onChange={handleNoTransfer}
          type="checkbox"
          value={FilterTypes.NoTransfer}
          checked={props.currentFilter === FilterTypes.NoTransfer}
        />
        - без пересадок
      </label>
    </form>
  );
}
