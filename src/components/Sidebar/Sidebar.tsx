import {
  CurrentFilter,
  PriceFilterValue,
  TransferFilter,
} from "../../hooks/useFilter";
import { AirlineCodes, FilterTypes, FilterValue, SortTypes } from "../../types";
import { AviaCompanyFilter } from "./AviaCompanyFilter/AviaCompanyFilter";
import { Filter } from "./Filter/Filter";
import { PriceFilter } from "./PriceFilter/PriceFilter";
import style from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import { Sort } from "./Sort/Sort";

interface SidebarProps {
  sortMethod: (type: SortTypes) => void;
  currentSort: SortTypes;
  filter: (
    type: CurrentFilter,
    value?: FilterValue
  ) => void;
  filterTransfer: TransferFilter;
  filterPrice: PriceFilterValue | null;
  filterAirline: AirlineCodes | null;

}

export function Sidebar(props: SidebarProps) {
  return (
    <div className={style.wrapper}>
      <SidebarItem title="Сортировать">
        <Sort currentSort={props.currentSort} sortMethod={props.sortMethod} />
      </SidebarItem>

      <SidebarItem title="Фильтровать">
        <Filter
          filterTransfer={props.filterTransfer}
          filter={props.filter}
        />
      </SidebarItem>

      <SidebarItem title="Цена">
        <PriceFilter filterPrice={props.filterPrice} filter={props.filter} />
      </SidebarItem>

      <SidebarItem title="Авиакомпании">
        <AviaCompanyFilter
          filterAirline={props.filterAirline}
          filter={props.filter}
        />
      </SidebarItem>
    </div>
  );
}
