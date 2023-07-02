import { AsinoLayer } from "../interfaces";

export type AsinoClass = {
  layers?: AsinoLayer[]; // layers to draw this class
}

export type AsinoClassReference = {
  id?: string; // id of this class
  name?: string; // name of this class
  value?: AsinoClass; // value of this class
}
