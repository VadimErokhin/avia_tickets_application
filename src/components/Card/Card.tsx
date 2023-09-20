import { FlightItem } from "../../types";
import { FlightInfo } from "../FlightInfo/FlightInfo";
import Header from "../Header/Header";
import style from "./Card.module.css";

interface CardProps {
  price?: string;
  flight: FlightItem;
}

export default function Card(props: CardProps) {
  return (
    <div className={style.mainWrapper}>
      <Header
        airlineCode={props.flight.carrier.airlineCode}
        price={props.price}
      />
      {props.flight.legs.map((leg, index) => {
        return (
          <FlightInfo
            leg={leg}
            key={index}
            caption={props.flight.carrier.caption}
          />
        );
      })}

      <button className={style.btn}>ВЫБРАТЬ</button>
    </div>
  );
}
