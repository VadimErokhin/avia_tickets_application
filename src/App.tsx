import { useEffect, useState } from "react";
import { AirlineCodes, SearchResponse, SortTypes } from "./types";
import SearchResults from "./components/SearchResults/SearchResults";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { usePagination } from "./hooks/usePagination";
import { useSort } from "./hooks/useSort";
import { CurrentFilter, PriceFilterValue, useFilter } from "./hooks/useFilter";
import "./App.css";

function App() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const { visibleResults, handleNextPage, setFirstPage } = usePagination();
  const { sort, currentSort } = useSort();
  const { filter, currentFilter, filtredItems, filterTransfer } = useFilter();

  function loadMore() {
    if (!data) return;
    handleNextPage(filtredItems || data.result.flights);
  }

  function handleSort(type: SortTypes) {
    if (!data) return;
    sort(type, filtredItems || data.result.flights);
    setFirstPage(filtredItems || data.result.flights);
  }

  function handleFilter(
    type: CurrentFilter,
    value?: PriceFilterValue | AirlineCodes
  ) {
    if (!data) return;
    const filtredResults = filter(type, data.result.flights, value);
    setFirstPage(filtredResults || data.result.flights);
  }

  useEffect(() => {
    fetch("./flights.json").then((res) =>
      res.json().then((d: SearchResponse) => {
        sort(currentSort, d.result.flights);
        setData(d);
        setFirstPage(d.result.flights);
      })
    );
  }, []);

  return (
    <div className="wrapper">
      <Sidebar
        filterTransfer={filterTransfer}
        filter={handleFilter}
        currentSort={currentSort}
        sortMethod={handleSort}
        currentFilter={currentFilter}
      />
      {visibleResults && (
        <SearchResults handleNextPage={loadMore} flights={visibleResults} />
      )}
    </div>
  );
}

export default App;
