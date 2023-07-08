export type SetsOperator = 'SETS_CONTAINING_OBJECT';

import { AsinoObjects } from "./Object";

export type Set = { objects: AsinoObjects };

export type AsinoSet = Set | string | AsinoSetReference;

export type AsinoSets = AsinoSet[] | string | SetsFormula | AsinoSetsReference;

export type SetsFormula = {
  operator?: SetsOperator;
}

export type AsinoSetReference = {
  id?: string; // id of this set
  name?: string; // name of this set
  value?: AsinoSet; // value of this set
}

export type AsinoSetsReference = {
  id?: string; // id of these sets
  name?: string; // name of these sets
  value?: AsinoSets; // value of these sets
}
