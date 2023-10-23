import { cx as CX, cy as CY, fill as Fill, r as R, stroke as Stroke, strokeWidth as StrokeWidth } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber } from "./Number";

export type AsinoCircle = {
  id?: string;
  name?: string; // name of this circle
  [CX]?: AsinoNumber; // if this exists, draw cx here
  [CY]?: AsinoNumber; // if this exists, draw cy here
  [R]?: AsinoNumber; // if this exists, draw r here
  [Fill]?: AsinoColor; // the stroke for this circle
  [Stroke]?: AsinoColor; // the stroke for this circle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
  circleId?: string;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedCircle?: AsinoCircle;
}
