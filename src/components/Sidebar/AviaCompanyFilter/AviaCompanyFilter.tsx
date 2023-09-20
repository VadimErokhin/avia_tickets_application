import { CurrentFilter, PriceFilterValue } from "../../../hooks/useFilter";
import { AirlineCodes, FilterTypes } from "../../../types";
import style from "./AviaCompanyFilter.module.css";

interface AviaCompanyFilterProps {
  filter: (
    type: CurrentFilter,
    value?: PriceFilterValue | AirlineCodes | null
  ) => void;
  filterAirline: AirlineCodes | null;
}

const companyNames: Partial<Record<AirlineCodes, string>> = {
  [AirlineCodes.AF]: "AirFrance",
  [AirlineCodes.SU]: "Аэрофлот",
  [AirlineCodes.KL]: "KLM",
  [AirlineCodes.TK]: "Turkish Airlines",
};

export function AviaCompanyFilter(props: AviaCompanyFilterProps) {
  const airlines = Object.keys(AirlineCodes) as AirlineCodes[];

  function handelAirlineCode(e: React.ChangeEvent<HTMLInputElement>) {
    const choosenCode = e.currentTarget.value as AirlineCodes;
    if (props.filterAirline === choosenCode) {
      props.filter(FilterTypes.Airline, null);
      return;
    }

    props.filter(FilterTypes.Airline, choosenCode);
  }

  return (
    <form className={style.form}>
      {airlines.map((code, index) => (
        <label key={index}>
          <input
            onChange={handelAirlineCode}
            type="checkbox"
            value={code}
            checked={props.filterAirline === code}
          />
          -{companyNames[code]}
        </label>
      ))}
    </form>
  );
}
