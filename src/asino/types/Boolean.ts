import { AsinoClass, AsinoClasses } from './Class';
import { AsinoObject, AsinoObjects } from './Object';
import { AsinoSets } from './Set';
import { AsinoNumber } from './Number';

export type BooleanOperator = 'NONE' | 'IS_OBJECT' | 'IS_EACH_SET' | 'IS_EACH_OBJECT' | 'IS_OBJECT_CLASS' |
  'IS_EACH_CLASS_DIFFERENT' | 'IS_ANY_BOOLEAN' | 'IS_CLASS_STATIC' | 'IS_BOOLEAN_TRUE' | 'WITH_OBJECT_AS';

export type BooleanResult = {
  boolean?: boolean;
}

export type AsinoBooleans = {
  booleans?: AsinoBoolean[];
}

export type AsinoBoolean = {
  id?: string;
  name?: string; // name of this boolean
  value?: boolean;
  boolean?: AsinoBoolean;
  booleanId?: string;
  operator?: BooleanOperator;
  class?: AsinoClass;
  classes?: AsinoClasses;
  sets?: AsinoSets;
  objects?: AsinoObjects;
  booleans?: AsinoBooleans;
  object?: AsinoObject;
  collapsed?: boolean; // collapse in editor
  numbers?: { [id: string]: AsinoNumber }; // number parameters
  editedBoolean?: AsinoBoolean;
}
