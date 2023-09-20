import { useEffect, useState } from "react";
import { SearchResponse, SortTypes } from "./types";
import SearchResults from "./components/SearchResults/SearchResults";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { usePagination } from "./hooks/usePagination";
import { useSort } from "./hooks/useSort";
import { useFilter } from "./hooks/useFilter";
import "./App.css";

function App() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const { visibleResults, handleNextPage, setFirstPage } = usePagination();
  const { sort, currentSort } = useSort();
  const { filter, filtredItems, filterTransfer, filterPrice, filterAirline } = useFilter(data);

  function loadMore() {
    if (!data) return;
    handleNextPage(filtredItems || data.result.flights);
  }

  function handleSort(type: SortTypes) {
    if (!data) return;
    sort(type, filtredItems || data.result.flights);
    setFirstPage(filtredItems || data.result.flights);
  }

  useEffect(() => {
    if (!data) return;

    setFirstPage(!filtredItems ? data.result.flights : filtredItems);
  }, [filtredItems, data])

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
        filterPrice={filterPrice}
        filterAirline={filterAirline}
        filter={filter}
        currentSort={currentSort}
        sortMethod={handleSort}
      />
      {visibleResults && (
        <SearchResults handleNextPage={loadMore} flights={visibleResults} />
      )}
    </div>
  );
}

export default App;
