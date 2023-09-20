import {
  formateDate,
  formateDuration,
  formateTime,
} from "../../helpers/helpers";
import { Leg } from "../../types";
import style from "./FlightInfo.module.css";
//@ts-ignore
import { ReactComponent as Arrow } from "../../img/arrow.svg";
//@ts-ignore
import { ReactComponent as Clock } from "../../img/clock-with-white-face_icon-icons.com_72804.svg";
import { useMemo } from "react";

interface FlightInfoProps {
  caption: string;
  leg: Leg;
}

export function FlightInfo(props: FlightInfoProps) {
  const segment = useMemo(() => {
    const result = props.leg.segments[0];
    if (props.leg.segments.length > 1) {
      const lastSegment = props.leg.segments[props.leg.segments.length - 1];
      result.arrivalCity = lastSegment.arrivalCity;
      result.arrivalAirport = lastSegment.arrivalAirport;
      result.arrivalDate = lastSegment.arrivalDate;
      result.travelDuration = props.leg.duration;
    }
    return result;
  }, [props.leg]);

  if (!segment) return null;

  return (
    <div className={style.ticketWrapper}>
      <div className={style.airportInfo}>
        {segment.departureCity && segment.departureAirport && (
          <span className={style.departure}>
            {`${segment.departureCity.caption}, ${segment.departureAirport.caption}`}
            <span className={style.airportName}>
              ({segment.departureAirport.uid})
            </span>
          </span>
        )}

        <Arrow className={style.arrow} />
        {segment.arrivalCity && segment.arrivalAirport && (
          <span className={style.arrival}>
            {`${segment.arrivalCity.caption}, ${segment.arrivalAirport.caption}`}
            <span className={style.airportName}>
              ({segment.arrivalAirport.uid})
            </span>
          </span>
        )}
      </div>

      <div className={style.timeInfo}>
        <div className={style.departureInfoWrapper}>
          <span className={style.time}>
            {formateTime(segment.departureDate)}
          </span>
          <span className={style.timeInfoItem}>
            {formateDate(segment.departureDate)}
          </span>
        </div>
        <span className={style.travelDuration}>
          <Clock className={style.clock} />
          {formateDuration(segment.travelDuration)}
        </span>

        <div className={style.arrivalInfoWrapper}>
          <span className={style.timeInfoItem}>
            {formateDate(segment.arrivalDate)}
          </span>
          <span className={style.time}>{formateTime(segment.arrivalDate)}</span>
        </div>
      </div>

      {props.leg.segments.length - 1 > 0 ? (
        <div className={style.transferInfo}>
          <span className={style.transferCounty}>
            {props.leg.segments.length - 1} пересадка
          </span>
        </div>
      ) : (
        <div className={style.withoutStops}></div>
      )}

      <span className={style.carrierInfo}>Рейс выподняет: {props.caption}</span>
    </div>
  );
}
