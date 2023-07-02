import { CX, CY, Fill, R, Stroke, StrokeWidth } from "../consts";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference } from "./Number";

export type AsinoCircle = {
  [CX]?: AsinoNumber; // if this exists, draw cx here
  [CY]?: AsinoNumber; // if this exists, draw cy here
  [R]?: AsinoNumber; // if this exists, draw r here
  [Fill]?: AsinoColor; // the stroke for this circle
  [Stroke]?: AsinoColor; // the stroke for this circle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoCircleReference = {
  id?: string; // id of this circle
  name?: string; // name of this circle
  value?: AsinoCircle; // value of this circle
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}
