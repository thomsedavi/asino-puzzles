import { Stroke, StrokeWidth, X1, X2, Y1, Y2 } from "../consts";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference } from "./Number";

export type AsinoLine = {
  [X1]?: AsinoNumber; // if this exists, draw x1 here
  [X2]?: AsinoNumber; // if this exists, draw x2 here
  [Y1]?: AsinoNumber; // if this exists, draw y1 here
  [Y2]?: AsinoNumber; // if this exists, draw y2 here
  [Stroke]?: AsinoColor; // the stroke for this line
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoLineReference = {
  id?: string; // id of this line
  name?: { value?: string, editedValue?: string }; // name of this line
  value?: AsinoLine; // value of this line
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}
