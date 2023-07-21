import { AsinoLayer } from "../interfaces";

export type Class = {
  layers?: AsinoLayer[]; // layers to draw this class
}

export type AsinoClass = Class | string | AsinoClassReference;

export type AsinoClasses = AsinoClass[] | string;

export type AsinoClassReference = {
  id?: string; // id of this class
  name?: string; // name of this class
  value?: AsinoClass; // value of this class
}

export const isClassClass = (asinoClass: AsinoClass): asinoClass is Class => {
  return typeof asinoClass !== 'string' && 'layers' in asinoClass;
}
