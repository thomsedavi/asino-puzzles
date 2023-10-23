import { AsinoCircle } from "./Circle";
import { AsinoGroup } from "./Group";
import { AsinoInterface } from "./Interface";
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
  interface?: AsinoInterface; // draw this interface
  interfaceId?: string;
  rectangle?: AsinoRectangle; // draw this rectangle
  rectangleId?: string;
  line?: AsinoLine; // draw this line
  lineId?: string;
  circle?: AsinoCircle; // draw this circle
  circleId?: string;
  path?: AsinoPath; // draw this path
  pathId?: string;
  group?: AsinoGroup; // draw this group
  object?: AsinoObject; // id of the interface of this layer
  objectId?: string;
  numberVariables?: { [id: string]: AsinoNumber }; // number parameters
  editedLayer?: AsinoLayer;
}
