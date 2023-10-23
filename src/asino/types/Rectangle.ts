import { fill as Fill, height as Height, stroke as Stroke, strokeWidth as StrokeWidth, width as Width, x as X, y as Y } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber } from "./Number";

export type AsinoRectangle = {
  id?: string;
  name?: string; // name of this rectangle
  [Width]?: AsinoNumber; // if this exists, draw the rectangle this wide
  [Height]?: AsinoNumber; // if this exists, draw the rectangle this high
  [X]?: AsinoNumber; // if this exists, draw the rectangle here
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here
  [Fill]?: AsinoColor; // the stroke for this rectangle
  [Stroke]?: AsinoColor; // the stroke for this rectangle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
  rectangleId?: string;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedRectangle?: AsinoRectangle;
}
