import { CurrentFilter, TransferFilter } from "../../../hooks/useFilter";
import { FilterTypes } from "../../../types";
import style from "./Filter.module.css";

interface FilterProps {
  filter: (type: CurrentFilter) => void;
  filterTransfer: TransferFilter;
}

export function Filter(props: FilterProps) {
  function handleOneTransfer() {
    if (props.filterTransfer === FilterTypes.OneTransfer) {
      props.filter(null);
      return;
    }
    props.filter(FilterTypes.OneTransfer);
  }

  function handleNoTransfer() {
    if (props.filterTransfer === FilterTypes.NoTransfer) {
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
          checked={props.filterTransfer === FilterTypes.OneTransfer}
        />
        -1 пересадка
      </label>
      <label>
        <input
          onChange={handleNoTransfer}
          type="checkbox"
          value={FilterTypes.NoTransfer}
          checked={props.filterTransfer === FilterTypes.NoTransfer}
        />
        - без пересадок
      </label>
    </form>
  );
}
