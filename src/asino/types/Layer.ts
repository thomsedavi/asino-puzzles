import { AsinoCircle } from "./Circle";
import { AsinoGroup } from "./Group";
import { Interface } from "./Interface";
import { AsinoLine } from "./Line";
import { AsinoNumber } from './Number';
import { AsinoObject } from "./Object";
import { AsinoPath } from "./Path";
import { AsinoRectangle } from "./Rectangle";

export type AsinoLayers = {
  layers?: AsinoLayer[];
}

export type AsinoLayer = {
  id?: string;
  name?: string; // name of this rectangle
  layerId?: string;
  interface?: Interface; // draw this interface
  rectangle?: AsinoRectangle; // draw this rectangle
  line?: AsinoLine; // draw this line
  circle?: AsinoCircle; // draw this circle
  path?: AsinoPath; // draw this path
  group?: AsinoGroup; // draw this group
  object?: AsinoObject; // id of the interface of this layer
  numbers?: { [id: string]: AsinoNumber }; // number parameters
  editedLayer?: AsinoLayer;
}
