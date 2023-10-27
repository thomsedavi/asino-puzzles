import { AsinoBoolean } from "./Boolean";
import { AsinoCircle } from "./Circle";
import { AsinoClass } from "./Class";
import { AsinoCollection } from "./Collection";
import { AsinoColor } from "./Color";
import { AsinoCommand } from "./Command";
import { AsinoGroup } from "./Group";
import { AsinoInterface } from "./Interface";
import { AsinoLayer } from "./Layer";
import { AsinoLine } from "./Line";
import { AsinoNumber } from "./Number";
import { AsinoObject } from "./Object";
import { AsinoPath } from "./Path";
import { AsinoRectangle } from "./Rectangle";
import { AsinoSet } from "./Set";
import { ViewBox } from "./ViewBox";

export type AsinoPuzzle = {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layerList?: AsinoLayer[]; // ids of layers
  interfaceDictionary?: { [id: string]: AsinoInterface; }; // interfaces
  rectangleDictionary?: { [id: string]: AsinoRectangle; }; // rectangles
  collectionDictionary?: { [id: string]: AsinoCollection; }; // collections
  objectDictionary?: { [id: string]: AsinoObject; }; // objects
  classDictionary?: { [id: string]: AsinoClass; }; // classes
  setDictionary?: { [id: string]: AsinoSet; }; // sets
  lineDictionary?: { [id: string]: AsinoLine; }; // lines
  circleDictionary?: { [id: string]: AsinoCircle; }; // circles
  pathDictionary?: { [id: string]: AsinoPath; }; // paths
  groupDictionary?: { [id: string]: AsinoGroup; }; // groups
  numberVariableDictionary?: { [id: string]: AsinoNumber; }; // numbers
  booleanDictionary?: { [id: string]: AsinoBoolean; }; // booleans
  colorDictionary?: { [id: string]: AsinoColor; }; // colors
  commandDictionary?: { [id: string]: AsinoCommand; }; // commands
  viewBox?: ViewBox;
  dateCreated?: string;
  dateUpdated?: string;
}
