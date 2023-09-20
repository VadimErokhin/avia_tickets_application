const days = ["вс.", "пн.", "вт.", "ср.", "чт.", "пт.", "сб."];

const months = [
  "янв.",
  "февр.",
  "март",
  "апр.",
  "май.",
  "июнь",
  "июль",
  "авг.",
  "сент.",
  "окт.",
  "ноябрь",
  "дек.",
];

function formateSmallTime(number: number) {
  return number < 10 ? "0" + number : number;
}

export function formateDate(timeString: string) {
  const date = new Date(timeString);
  const dayNumber = date.getDate();
  const month = date.getMonth();
  const day = date.getDay();
  return `${dayNumber} ${months[month]} ${days[day]}`;
}

export function formateTime(timeString: string) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${formateSmallTime(hours)}:${formateSmallTime(minutes)}`;
}

export function formateDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes - hours * 60;

  return `${formateSmallTime(hours)}:${formateSmallTime(remainMinutes)}`;
}
