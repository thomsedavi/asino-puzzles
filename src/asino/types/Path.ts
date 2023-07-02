import { DX, DX1, DX2, DY, DY1, DY2, Fill, Stroke, StrokeWidth, X, X1, X2, Y, Y1, Y2 } from "../consts";
import { Letter } from "../types";
import { AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference } from "./Number";

export type AsinoPath = {
  commands?: AsinoCommand[]; // list of commands
  [Fill]?: string; // the fill for this path
  [Stroke]?: string; // the stroke for this path
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoPathReference = {
  id?: string; // id of this path
  name?: string; // name of this path
  value?: AsinoPath; // value of this path
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}

export interface AsinoCommand {
  letter?: Letter;
  [X]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [X1]?: AsinoNumber; // if this exists, draw x1 here, or...
  [X2]?: AsinoNumber; // if this exists, draw x2 here, or...
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [Y1]?: AsinoNumber; // if this exists, draw y1 here, or...
  [Y2]?: AsinoNumber; // if this exists, draw y2 here, or...
  [DX]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
}
