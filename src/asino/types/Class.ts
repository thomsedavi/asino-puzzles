import { AsinoLayer } from "./Layer";
import { AsinoObject } from "./Object";

export type ClassOperator = 'CLASS_OF_OBJECT';

export type Class = {
  layers?: AsinoLayer[]; // layers to draw this class
}

export type AsinoClass = Class | string | ClassFormula | AsinoClassReference;

export type AsinoClasses = AsinoClass[] | string;

export type ClassFormula = {
  operator?: ClassOperator; // formula for this class
  objectInput?: AsinoObject; // object of formula
}

export type AsinoClassReference = {
  id?: string; // id of this class
  name?: { value?: string, editedValue?: string }; // name of this class
  value?: AsinoClass; // value of this class
}

export const isClassClass = (asinoClass: AsinoClass): asinoClass is Class => {
  return typeof asinoClass !== 'string' && 'layers' in asinoClass;
}

export const isClassFormula = (asinoClass: AsinoClass): asinoClass is ClassFormula => {
  return typeof asinoClass !== 'string' && 'operator' in asinoClass;
}
