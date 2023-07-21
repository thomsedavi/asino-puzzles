import { AsinoClass, AsinoClasses } from "./Class";
import { AsinoObject, AsinoObjects } from "./Object";
import { AsinoSets } from "./Set";

export type BooleanOperator = 'IS_OBJECT' | 'IS_EACH_SET' | 'IS_EACH_OBJECT' | 'IS_OBJECT_CLASS' | 'IS_EACH_CLASS_DIFFERENT';

export type AsinoBoolean = boolean | string | BooleanFormula | AsinoBooleanReference;

export type BooleanFormula = {
  operator?: BooleanOperator;
  classOutput?: AsinoClass;
  classesInput?: AsinoClasses;
  setsInput?: AsinoSets;
  objectsInput?: AsinoObjects;
  objectOutput?: AsinoObject;
  boolean?: AsinoBoolean;
}

export type AsinoBooleanReference = {
  id?: string; // id of this boolean
  name?: string; // name of this boolean
  value?: AsinoBoolean; // value of this boolean
  numbers?: AsinoBooleanReference[]; // parameters to use when overriding
}

export const isBooleanFormula = (boolean: AsinoBoolean): boolean is BooleanFormula => {
  return typeof boolean !== 'string' && typeof boolean !== 'boolean' && 'operator' in boolean;
}
