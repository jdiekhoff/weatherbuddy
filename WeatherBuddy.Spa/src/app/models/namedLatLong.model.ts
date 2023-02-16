import { LatLong } from "./latLong.model";

export interface NamedLatLong extends LatLong {
  name: string;
  country: string;
}
