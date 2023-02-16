import { NamedLatLong } from "./namedLatLong.model";

export interface ZipCode extends NamedLatLong {
  zip: string;
}
