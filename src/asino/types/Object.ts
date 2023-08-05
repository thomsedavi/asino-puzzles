import { AsinoClass } from "./Class";

export type ObjectsOperator = 'NONE' | '-' | 'OBJECTS_IN_SET';

export type Object = {
  class?: AsinoClass; // class of this object
}

export type AsinoObject = Object | string | AsinoObjectReference;

export type AsinoObjects = AsinoObject[] | string | AsinoObjectsFormula;

export type AsinoObjectsFormula = {
  operator?: ObjectsOperator;
  objectsInputs?: (AsinoObjects | undefined)[]; // objects inputs
  collapsed?: boolean; // collapse in editor
}

export interface AsinoObjectReference {
  id?: string; // id of this object
  name?: { value?: string, editedValue?: string }; // name of this object
  value?: AsinoObject; // value of this object
}

export const isObjectObject = (object: AsinoObject): object is Object => {
  return typeof object !== 'string' && 'class' in object;
}

export const isObjectsFormula = (objects: AsinoObjects): objects is AsinoObjectsFormula => {
  return typeof objects !== 'string' && 'operator' in objects;
}
