export interface MapPoint {
  x: number;
  y: number;
}

export type MapAreaType =
  | "stand"
  | "lounge"
  | "bathroom"
  | "credential"
  | "entrance"
  | "coupon"
  | "voucher"
  | "restaurant"
  | "deposit"
  | "elevator"
  | "escalator"
  | "stage"
  | "exhibition"
  | "business";

export interface MapArea {
  id: string;
  code?: string;
  name: string;
  companyId?: string;
  catalogUrl?: string;
  type: MapAreaType;
  points: MapPoint[];
  /** Only polygons checked against visible boundary intersections belong here. */
  precision: "verified" | "draft";
}
