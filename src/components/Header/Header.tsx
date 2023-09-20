import { AirlineCodes } from "../../types";
import style from "./Header.module.css";
import { ReactNode } from "react";
// @ts-ignore
import { ReactComponent as Aeroflot } from "../../img/Aeroflot_Russian_Airlines_logo_(ru).svg";
// @ts-ignore
import { ReactComponent as KL } from "../../img/KLM_logo.svg";
// @ts-ignore
import { ReactComponent as AirFrance } from "../../img/Air_France_Logo.svg";
// @ts-ignore
import { ReactComponent as TurkishAirline } from "../../img/Turkish_Airlines_logo_2019_compact.svg";
// @ts-ignore
import { ReactComponent as Airplane } from "../../img/plane_aidplane_aircraft_icon_246044.svg";

interface HeaderProps {
  price?: string;
  airlineCode?: AirlineCodes;
}

const pictures: Partial<Record<AirlineCodes, ReactNode>> = {
  [AirlineCodes.AF]: <AirFrance className={style.airFrance} />,
  [AirlineCodes.SU]: <Aeroflot className={style.aeroflot} />,
  [AirlineCodes.KL]: <KL className={style.klm} />,
  [AirlineCodes.TK]: <TurkishAirline className={style.tk} />,
};

export default function Header(props: HeaderProps) {
  return (
    <div className={style.wrapper}>
      {props.airlineCode && pictures[props.airlineCode] ? (
        pictures[props.airlineCode]
      ) : (
        <Airplane className={style.airplane} />
      )}
      <div className={style.priceInfoWrapper}>
        <div className={style.price}>{props.price} ₽</div>
        <span className={style.priceInfo}>
          Стоймость для одного взрослого пассажира
        </span>
      </div>
    </div>
  );
}
