import { CurrentFilter, TransferFilter } from "../../../hooks/useFilter";
import { FilterTypes, FilterValue, TransferTypes } from "../../../types";
import style from "./Filter.module.css";

interface FilterProps {
  filter: (type: CurrentFilter, value: FilterValue) => void;
  filterTransfer: TransferFilter;
}

export function Filter(props: FilterProps) {
  function handleOneTransfer() {
    if (props.filterTransfer === TransferTypes.OneTransfer) {
      props.filter(FilterTypes.Transfer, null);
      return;
    }
    props.filter(FilterTypes.Transfer, TransferTypes.OneTransfer);
  }

  function handleNoTransfer() {
    if (props.filterTransfer === TransferTypes.NoTransfer) {
      props.filter(FilterTypes.Transfer, null);
      return;
    }
    props.filter(FilterTypes.Transfer, TransferTypes.NoTransfer);
  }

  return (
    <form className={style.form}>
      <label>
        <input
          onChange={handleOneTransfer}
          type="checkbox"
          value={TransferTypes.OneTransfer}
          checked={props.filterTransfer === TransferTypes.OneTransfer}
        />
        -1 пересадка
      </label>
      <label>
        <input
          onChange={handleNoTransfer}
          type="checkbox"
          value={TransferTypes.NoTransfer}
          checked={props.filterTransfer === TransferTypes.NoTransfer}
        />
        - без пересадок
      </label>
    </form>
  );
}
