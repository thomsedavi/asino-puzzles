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
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: { [id: string]: AsinoInterface; }; // interfaces
  rectangles?: { [id: string]: AsinoRectangle; }; // rectangles
  collections?: { [id: string]: AsinoCollection; }; // collections
  objects?: { [id: string]: AsinoObject; }; // objects
  classes?: { [id: string]: AsinoClass; }; // classes
  sets?: { [id: string]: AsinoSet; }; // sets
  lines?: { [id: string]: AsinoLine; }; // lines
  circles?: { [id: string]: AsinoCircle; }; // circles
  paths?: { [id: string]: AsinoPath; }; // paths
  groups?: { [id: string]: AsinoGroup; }; // groups
  numberParams?: { [id: string]: AsinoNumber; }; // numbers
  booleans?: { [id: string]: AsinoBoolean; }; // booleans
  colors?: { [id: string]: AsinoColor; }; // colors
  commands?: { [id: string]: AsinoCommand; }; // commands
  viewBox?: ViewBox;
  dateCreated?: string;
  dateUpdated?: string;
}
