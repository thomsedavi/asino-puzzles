import { fill as Fill, stroke as Stroke, strokeWidth as StrokeWidth } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoCommand } from "./Command";
import { AsinoNumber } from "./Number";

export type Letter = 'NONE' | 'C' | 'c' | 'H' | 'h' | 'L' | 'l' | 'M' | 'm' | 'Q' | 'q' | 'S' | 's' | 'T' | 't' | 'V' | 'v' | 'Z' | 'z';

export type AsinoPath = {
  id?: string;
  name?: string; // name of this path
  commands?: AsinoCommand[]; // list of commands
  [Fill]?: AsinoColor; // the fill for this path
  [Stroke]?: string; // the stroke for this path
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
  pathId?: string;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedPath?: AsinoPath;
}
