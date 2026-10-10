export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface IPriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface IMarket {
  id: string;
  name: string;
  district: string;
  today: number;
  min: number;
  max: number;
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: Unit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: IPriceChange;
  markets: IMarket[];
}

export type Unit = "litre" | "kg" | "dozen" | "pc";

export const unitBn: Record<Unit, string> = {
  litre: "লিটার",
  kg: "কেজি",
  dozen: "ডজন",
  pc: "পিস",
};

export const priceChangeBn: Record<IPriceChange["dir"], string> = {
  up: "বেড়েছে",
  down: "কমেছে",
  flat: "অপরিবর্তিত",
};