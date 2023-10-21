import { dx as DX, dx1 as DX1, dx2 as DX2, dy as DY, dy1 as DY1, dy2 as DY2, x as X, x1 as X1, x2 as X2, y as Y, y1 as Y1, y2 as Y2 } from "../consts";
import { AsinoNumber } from "./Number";

export type Letter = 'NONE' | 'C' | 'c' | 'H' | 'h' | 'L' | 'l' | 'M' | 'm' | 'Q' | 'q' | 'S' | 's' | 'T' | 't' | 'V' | 'v' | 'Z' | 'z';

export type AsinoCommand = {
  id?: string;
  name?: string; // name of this command
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
  commandId?: string; // refer to the command with this id
  editedCommand?: AsinoCommand;
};