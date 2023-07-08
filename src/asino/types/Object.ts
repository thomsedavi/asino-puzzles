export type ObjectsOperator = '-' | 'OBJECTS_IN_SET';

export type AsinoObject = string | AsinoObjectReference;

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
