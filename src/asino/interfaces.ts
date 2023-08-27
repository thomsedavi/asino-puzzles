import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoCircleReference } from "./types/Circle";
import { AsinoClassReference } from "./types/Class";
import { AsinoCollection } from "./types/Collection";
import { AsinoColorReference } from "./types/Color";
import { AsinoGroupReference } from "./types/Group";
import { AsinoInterfaceReference } from "./types/Interface";
import { AsinoLayer } from "./types/Layer";
import { AsinoLineReference } from "./types/Line";
import { AsinoNumberReference } from "./types/Number";
import { AsinoObjectReference } from "./types/Object";
import { AsinoCommandReference, AsinoPathReference } from "./types/Path";
import { AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSetReference } from "./types/Set";

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

export interface StyleClass {
  id?: string;
  fill?: string;
  fillDark?: string;
  stroke?: string;
  strokeDark?: string;
}

export interface Solution {
  selectedClasses?: { objectId: string, classId: string }[]; // keep track of user selections
}
