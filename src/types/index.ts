export interface iBike {
  id: number;
  model: string;
  picture: string;
  price: number;
  brand: string;
  color: string;
  size: string;
  year: number;
  popular: number;
  amount: number;
}

export interface iFilter {
  yearFrom: number;
  yearTo: number;
  amountFrom: number;
  amountTo: number;
  brand: number;
  size: number;
  onlyPopular: boolean;
  color: Array<string>;
}

export enum eBrand {
  "All",
  "Aspect",
  "BEARBIKE",
  "Felt",
  "Format",
  "Rocky Mountain",
  "Royal Baby",
  "SCOTT",
  "Welt",
}

export enum eSize {
  "All",
  "adult",
  "teenager",
  "child",
}
