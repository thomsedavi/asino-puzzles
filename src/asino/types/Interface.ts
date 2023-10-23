import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected, PaddingTopHeight, PaddingBottomHeight, PaddingRightWidth, PaddingLeftWidth, AlignmentHorizontal, AlignmentVertical } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber } from "./Number";
import { AsinoObject } from './Object';

export type AsinoInterface = {
  id?: string;
  name?: string; // name of this interface
  object?: AsinoObject; // the object for this interface
  objectId?: string;
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide
  [Height]?: AsinoNumber; // if this exists, draw the interface this high
  [X]?: AsinoNumber; // if this exists, draw the interface here
  [Y]?: AsinoNumber; // if this exists, draw the interface here
  collectionId?: string; // id of collection of this layer
  fixedClassId?: string; // object is fixed to this class
  [BorderTopHeight]?: AsinoNumber;
  [BorderRightWidth]?: AsinoNumber;
  [BorderBottomHeight]?: AsinoNumber;
  [BorderLeftWidth]?: AsinoNumber;
  [BorderTopFill]?: AsinoColor;
  [BorderRightFill]?: AsinoColor;
  [BorderBottomFill]?: AsinoColor;
  [BorderLeftFill]?: AsinoColor;
  [PaddingTopHeight]?: AsinoNumber;
  [PaddingRightWidth]?: AsinoNumber;
  [PaddingBottomHeight]?: AsinoNumber;
  [PaddingLeftWidth]?: AsinoNumber;
  [AlignmentHorizontal]?: AsinoNumber;
  [AlignmentVertical]?: AsinoNumber;
  [Fill]?: AsinoColor;
  [FillSelected]?: AsinoColor;
  interfaceId?: string;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedInterface?: AsinoInterface;
}
