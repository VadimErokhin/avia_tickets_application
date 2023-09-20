import { CurrentFilter, PriceFilterValue } from "../../hooks/useFilter";
import { AirlineCodes, SortTypes } from "../../types";
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
    value?: PriceFilterValue | AirlineCodes
  ) => void;
  currentFilter: CurrentFilter;
}

export function Sidebar(props: SidebarProps) {
  return (
    <div className={style.wrapper}>
      <SidebarItem title="Сортировать">
        <Sort currentSort={props.currentSort} sortMethod={props.sortMethod} />
      </SidebarItem>

      <SidebarItem title="Фильтровать">
        <Filter currentFilter={props.currentFilter} filter={props.filter} />
      </SidebarItem>

      <SidebarItem title="Цена">
        <PriceFilter filter={props.filter} />
      </SidebarItem>

      <SidebarItem title="Авиакомпании">
        <AviaCompanyFilter
          currentFilter={props.currentFilter}
          filter={props.filter}
        />
      </SidebarItem>
    </div>
  );
}
