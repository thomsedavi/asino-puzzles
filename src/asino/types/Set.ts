import { AsinoObjects } from "./Object";

export type SetsOperator = 'NONE' | 'SETS_CONTAINING_OBJECT';

export type SetResult = {
  objects?: AsinoObjects
}

export type SetsResult = {
  sets?: SetResult[];
}

export type AsinoSet = {
  id?: string;
  name?: string; // name of this set
  objects?: AsinoObjects
  setId?: string;
  editedSet?: AsinoSet;
}

export type AsinoSets = {
  id?: string;
  name?: string; // name of these sets
  sets?: AsinoSet[];
  operator?: SetsOperator;
  objectId?: string;
  editedSets?: AsinoSets;
}
