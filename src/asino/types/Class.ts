import { AsinoLayer, AsinoLayers } from "./Layer";
import { AsinoObject, AsinoObjects } from "./Object";
import { ViewBox } from './ViewBox';
import { AsinoNumber } from './Number';

export type ClassOperator = 'NONE' | 'CLASS_OF_OBJECT';

export type AsinoClasses = {
  classes?: AsinoClass[];
};

export type AsinoClass = {
  id?: string;
  name?: string; // name of this class
  layers?: AsinoLayer[]; // layers to draw this class
  viewBox?: ViewBox;
  classId?: string;
  operator?: ClassOperator; // formula for this class
  object?: AsinoObject;
  objects?: AsinoObjects;
  collectionId?: string; // collection of this class
  numberVariables?: { [id: string]: AsinoNumber }; // number parameters
  editedClass?: AsinoClass;
}

export type ClassResult = {
  layers?: AsinoLayer[]; // layers to draw this class
  viewBox?: ViewBox;
}