import { AsinoBooleanReference } from "./Boolean";
import { AsinoCircleReference } from "./Circle";
import { AsinoClassReference } from "./Class";
import { AsinoCollection } from "./Collection";
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

export interface AsinoPuzzle {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: AsinoInterfaceReference[]; // interfaces
  rectangles?: AsinoRectangleReference[]; // rectangles
  collections?: AsinoCollection[]; // collections
  objects?: AsinoObjectReference[]; // objects
  classes?: AsinoClassReference[]; // classes
  sets?: AsinoSetReference[]; // sets
  lines?: AsinoLineReference[]; // lines
  circles?: AsinoCircleReference[]; // circles
  paths?: AsinoPathReference[]; // paths
  groups?: AsinoGroupReference[]; // groups
  numbers?: AsinoNumberReference[]; // numbers
  booleans?: AsinoBooleanReference[] // booleans
  colors?: AsinoColorReference[]; // colors
  commands?: AsinoCommandReference[]; // commands
  dateCreated?: string;
  dateUpdated?: string;
}
