import { NamedLatLong } from "./namedLatLong.model";

export interface Location extends NamedLatLong {
  state: string;
}
