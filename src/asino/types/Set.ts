import { AsinoObject, AsinoObjects, ObjectResult } from "./Object";

export type SetsOperator = 'NONE' | 'SETS_CONTAINING_OBJECT';

export type SetResult = {
  objectList?: ObjectResult[]
}

export type SetsResult = {
  setList?: SetResult[];
}

export type AsinoSet = {
  id?: string;
  name?: string; // name of this set
  objectList?: AsinoObject[];
  objects?: AsinoObjects;
  setId?: string;
  editedSet?: AsinoSet;
}

export type AsinoSets = {
  id?: string;
  name?: string; // name of these sets
  setList?: AsinoSet[];
  operator?: SetsOperator;
  objectId?: string;
  editedSets?: AsinoSets;
}
