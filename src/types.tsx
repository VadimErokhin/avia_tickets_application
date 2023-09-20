export interface PriceValue {
  amount: string;
  currency: string;
  currencyCode: string;
}

export interface CurrencyValue {
  amount: number;
  currencyCode: Currency;
}

export enum Currency {
  RUB = "RUB",
  EUR = "EUR",
  USD = "USD",
}

export enum AirlineCodes {
  AF = "AF",
  SU = "SU",
  KL = "KL",
  TK = "TK",
}

export enum PassengerType {
  ADULT = "ADULT",
}

export type ClassCode = number | string;

export interface Carrier {
  uid: string;
  caption: string;
  airlineCode: AirlineCodes;
}

export interface ServicesValue {
  uid: string | number;
  caption: string | number;
}

export type FareBasisValue = Record<PassengerType, string>;

export interface AdultValue {
  pieces: number;
  nil: boolean;
  unit: string;
}

export type FreeLuggage = Record<PassengerType, AdultValue>;

export interface ServicesDetailsValue {
  freeCabinLuggage: unknown;
  paidCabinLuggage: unknown;
  tariffName: string;
  fareBasis: FareBasisValue;
  freeLuggage: FreeLuggage;
  paidLuggage: unknown;
}

export interface AdultRefundsValue {
  refundableBeforeDeparture: boolean;
  refundableAfterDeparture: boolean;
}

export interface PriceRates {
  totalUsd: CurrencyValue;
  totalEur: CurrencyValue;
}

export interface PassengerPrice {
  total: PriceValue;
  passengerType: ServicesValue;
  singlePassengerTotal: PriceValue;
  passengerCount: number;
  tariff: PriceValue;
  feeAndTaxes: PriceValue;
}

export interface FlightPrice {
  total: PriceValue;
  totalFeeAndTaxes: PriceValue;
  rates: PriceRates;
  passengerPrices: PassengerPrice[];
}

export interface ServicesStatuses {
  baggage: ServicesValue;
  exchange: ServicesValue;
  refund: ServicesValue;
}

export interface LegSegment {
  classOfServiceCode: ClassCode;
  classOfService: ServicesValue;
  departureAirport: ServicesValue;
  departureCity: ServicesValue;
  aircraft: ServicesValue;
  travelDuration: number;
  arrivalCity: ServicesValue;
  arrivalDate: string;
  flightNumber: number;
  techStopInfos: unknown[];
  departureDate: string;
  stops: number;
  servicesDetails: ServicesDetailsValue;
  airline: Carrier;
  starting: boolean;
  arrivalAirport: ServicesValue;
}

export interface Leg {
  duration: number;
  segments: LegSegment[];
}

export interface FlightExchangeValue {
  exchangeableBeforeDeparture: boolean;
  exchangeAfterDeparture: PriceValue;
  exchangeBeforeDeparture: PriceValue;
  exchangeableAfterDeparture: boolean;
}

export type FlightExchange = Record<PassengerType, FlightExchangeValue>;
export type FlightRefund = Record<PassengerType, AdultRefundsValue>;

export interface FlightSeat {
  count: number;
  type: ServicesValue;
}

export interface FlightItem {
  carrier: Carrier;
  price: FlightPrice;
  servicesStatuses: ServicesStatuses;
  legs: Leg[];
  exchange: FlightExchange;
  isTripartiteContractDiscountApplied: boolean;
  international: boolean;
  seats: FlightSeat[];
  refund: FlightRefund;
}

export interface Flight {
  hasExtendedFare: boolean;
  flight: FlightItem;
  flightToken: string;
}

export interface ResponseResult {
  bestPrices: unknown;
  flights: Flight[];
}

export interface SearchResponse {
  result: ResponseResult;
}

export enum SortTypes {
  PriceDesc = "PriceDesc",
  PriceAsc = "PriceAsc",
  Duration = "Duration",
}

export enum FilterTypes {
  OneTransfer = "OneTransfer",
  NoTransfer = "NoTransfer",
  Price = "Price",
  Airline = "Airline",
}
