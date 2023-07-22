import { AsinoCircleReference } from "./Circle";
import { AsinoColorReference } from "./Color";
import { AsinoInterfaceReference } from "./Interface";
import { AsinoLineReference } from "./Line";
import { AsinoNumberReference } from "./Number";
import { AsinoPathReference } from "./Path";
import { AsinoRectangleReference } from "./Rectangle";

export interface AsinoLayer {
  interface?: AsinoInterfaceReference; // draw the interface with these attributes
  rectangle?: AsinoRectangleReference; // draw the rectangle with these attributes
  line?: AsinoLineReference; // draw the layer with these attributes
  circle?: AsinoCircleReference; // draw the circle with these attributes
  path?: AsinoPathReference; // draw the path with these attributes
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // color parameters
  objectId?: string; // id of the interface of this layer
  collectionId?: string; // id of collection of this layer
}
