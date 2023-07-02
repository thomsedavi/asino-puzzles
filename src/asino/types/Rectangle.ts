import { Fill, Height, Stroke, StrokeWidth, Width, X, Y } from "../consts";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference } from "./Number";

export type AsinoRectangle = {
  [Width]?: AsinoNumber; // if this exists, draw the rectangle this wide
  [Height]?: AsinoNumber; // if this exists, draw the rectangle this high
  [X]?: AsinoNumber; // if this exists, draw the rectangle here
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here
  [Fill]?: AsinoColor; // the stroke for this rectangle
  [Stroke]?: AsinoColor; // the stroke for this rectangle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoRectangleReference = {
  id?: string; // id of this rectangle
  name?: string; // name of this rectangle
  value?: AsinoRectangle; // value of this rectangle
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}
