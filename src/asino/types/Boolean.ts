import { AsinoClass, AsinoClasses } from './Class';
import { AsinoObject, AsinoObjects } from './Object';
import { AsinoSet, AsinoSets } from './Set';
import { AsinoNumber } from './Number';

export type BooleanOperator = 'NONE' | 'IS_OBJECT' | 'IS_EACH_SET' | 'IS_EACH_OBJECT' | 'IS_OBJECT_CLASS' |
  'IS_EACH_CLASS_DIFFERENT' | 'IS_ANY_BOOLEAN' | 'IS_CLASS_STATIC' | 'IS_BOOLEAN_TRUE' | 'WITH_OBJECT_AS';

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
  classList?: AsinoClass[];
  classes?: AsinoClasses;
  classesId?: string;
  setList?: AsinoSet[];
  sets?: AsinoSets;
  setsId?: string;
  objects?: AsinoObjects;
  objectList?: AsinoObject[];
  objectsId?: string;
  booleanList?: AsinoBoolean[];
  objectId?: string;
  collapsed?: boolean; // collapse in editor
  numberVariableDictionary?: { [id: string]: AsinoNumber }; // number parameters
  editedBoolean?: AsinoBoolean;
}

export type BooleanResult = {
  boolean?: boolean;
}
