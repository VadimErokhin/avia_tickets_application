import { CurrentFilter, PriceFilterValue } from "../../../hooks/useFilter";
import { AirlineCodes, FilterTypes } from "../../../types";
import style from "./AviaCompanyFilter.module.css";

interface AviaCompanyFilterProps {
  filter: (
    type: CurrentFilter,
    value?: PriceFilterValue | AirlineCodes
  ) => void;
  currentFilter: CurrentFilter;
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
    if (props.currentFilter === choosenCode) {
      props.filter(null);
      return;
    }

    props.filter(FilterTypes.Airline, choosenCode);
  }

  return (
    <form className={style.form}>
      {airlines.map((code) => (
        <label>
          <input
            onChange={handelAirlineCode}
            type="checkbox"
            value={code}
            checked={props.currentFilter === code}
          />
          -{companyNames[code]}
        </label>
      ))}
    </form>
  );
}
