import { Height, Width, X, Y } from "../consts";
import { AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference } from "./Number";

export type AsinoInterface = {
  objectId?: string; // id of the object for this interface
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide
  [Height]?: AsinoNumber; // if this exists, draw the interface this high
  [X]?: AsinoNumber; // if this exists, draw the interface here
  [Y]?: AsinoNumber; // if this exists, draw the interface here
  collectionId?: string; // id of collection of this layer
  fixedClassId?: string; // object is fixed to this class
}

export type AsinoInterfaceReference = {
  id?: string; // id of this interface
  name?: { value?: string, editedValue?: string }; // name of this interface
  value?: AsinoInterface; // value of this interface
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}
