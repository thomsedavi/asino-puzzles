import { AsinoBooleanReference } from "./Boolean";
import { AsinoCircleReference } from "./Circle";
import { AsinoClassReference } from "./Class";
import { AsinoCollectionReference } from "./Collection";
import { AsinoColorReference } from "./Color";
import { AsinoGroupReference } from "./Group";
import { AsinoInterfaceReference } from "./Interface";
import { AsinoLayer } from "./Layer";
import { AsinoLineReference } from "./Line";
import { AsinoNumberReference } from "./Number";
import { AsinoObjectReference } from "./Object";
import { AsinoCommandReference, AsinoPathReference } from "./Path";
import { AsinoRectangleReference } from "./Rectangle";
import { AsinoSetReference } from "./Set";
import { ViewBox } from "./ViewBox";

export type AsinoPuzzle = {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: { [id: string]: AsinoInterfaceReference; }; // interfaces
  rectangles?: { [id: string]: AsinoRectangleReference; }; // rectangles
  collections?: { [id: string]: AsinoCollectionReference; }; // collections
  objects?: { [id: string]: AsinoObjectReference; }; // objects
  classes?: { [id: string]: AsinoClassReference; }; // classes
  sets?: { [id: string]: AsinoSetReference; }; // sets
  lines?: { [id: string]: AsinoLineReference; }; // lines
  circles?: { [id: string]: AsinoCircleReference; }; // circles
  paths?: { [id: string]: AsinoPathReference; }; // paths
  groups?: { [id: string]: AsinoGroupReference; }; // groups
  numbers?: { [id: string]: AsinoNumberReference; }; // numbers
  booleans?: { [id: string]: AsinoBooleanReference; }; // booleans
  colors?: { [id: string]: AsinoColorReference; }; // colors
  commands?: { [id: string]: AsinoCommandReference; }; // commands
  viewBox?: ViewBox;
  dateCreated?: string;
  dateUpdated?: string;
}
