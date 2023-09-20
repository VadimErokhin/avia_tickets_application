import { Flight } from "../../types";
import Card from "../Card/Card";
import style from "./SearchResults.module.css";

interface SearchResultsProps {
  flights: Flight[];
  handleNextPage: () => void;
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <div className={style.wrapperSearchResult}>
      {props.flights.map((flight) => {
        return (
          <Card
            key={flight.flightToken}
            price={flight.flight.price.total.amount}
            flight={flight.flight}
          />
        );
      })}

      <button onClick={props.handleNextPage} className={style.showMoreBtn}>
        Показать еще
      </button>
    </div>
  );
}
