import { AsinoClass } from "./Class";

export type ObjectsOperator = '-' | 'OBJECTS_IN_SET';

export type Object = {
  class?: AsinoClass; // class of this object
}

export type AsinoObject = Object | string | AsinoObjectReference;

export type AsinoObjects = AsinoObject[] | string | AsinoObjectsFormula;

export type AsinoObjectsFormula = {
  operator?: ObjectsOperator;
  objectsLeftInput?: AsinoObjects; // left object of formula
  objectsRightInput?: AsinoObjects; // right object of formula
}

export interface AsinoObjectReference {
  id?: string; // id of this object
  name?: string; // name of this object
  value?: AsinoObject; // value of this object
}

export const isObjectObject = (object: AsinoObject): object is Object => {
  return typeof object !== 'string' && 'class' in object;
}

export const isObjectsFormula = (objects: AsinoObjects): objects is AsinoObjectsFormula => {
  return typeof objects !== 'string' && 'operator' in objects;
}
