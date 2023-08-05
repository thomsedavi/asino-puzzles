import { AsinoObjects } from "./Object";

export type SetsOperator = 'NONE' | 'SETS_CONTAINING_OBJECT';

export type Set = { objects: AsinoObjects };

export type AsinoSet = Set | string | AsinoSetReference;

export type AsinoSets = AsinoSet[] | string | SetsFormula | AsinoSetsReference;

export type SetsFormula = {
  operator?: SetsOperator;
}

export type AsinoSetReference = {
  id?: string; // id of this set
  name?: { value?: string, editedValue?: string }; // name of this set
  value?: AsinoSet; // value of this set
}

export type AsinoSetsReference = {
  id?: string; // id of these sets
  name?: { value?: string, editedValue?: string }; // name of these sets
  value?: AsinoSets; // value of these sets
}

export const isSetSet = (set: AsinoSet): set is Set => {
  return typeof set !== 'string' && 'objects' in set;
}

export const isSetsFormula = (sets: AsinoSets): sets is SetsFormula => {
  return typeof sets !== 'string' && 'operator' in sets;
}

export const isSetsReference = (sets: AsinoSets): sets is AsinoSetsReference => {
  return typeof sets !== 'string' && 'id' in sets;
}
