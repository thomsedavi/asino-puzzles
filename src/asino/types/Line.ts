import { stroke as Stroke, strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2 } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber } from "./Number";

export type AsinoLine = {
  id?: string;
  name?: string; // name of this line
  [X1]?: AsinoNumber; // if this exists, draw x1 here
  [X2]?: AsinoNumber; // if this exists, draw x2 here
  [Y1]?: AsinoNumber; // if this exists, draw y1 here
  [Y2]?: AsinoNumber; // if this exists, draw y2 here
  [Stroke]?: AsinoColor; // the stroke for this line
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
  lineId?: string;
  numbers?: { [id: string]: AsinoNumber }; // number parameters
  editedLine?: AsinoLine;
}
