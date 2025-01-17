import { AsinoBoolean } from "./Boolean";
import { AsinoNumber, NumberResult } from "./Number";

export type ColorOperator = 'NONE' | 'IF_ELSE';

export type ColorResult = {
  red?: NumberResult;
  redDark?: NumberResult;
  green?: NumberResult;
  greenDark?: NumberResult;
  blue?: NumberResult;
  blueDark?: NumberResult;
  hue?: NumberResult;
  hueDark?: NumberResult;
  saturation?: NumberResult;
  saturationDark?: NumberResult;
  lightness?: NumberResult;
  lightnessDark?: NumberResult;
}

export type AsinoColors = {
  colors: AsinoColor[];
}

export type AsinoColor = {
  id?: string;
  name?: string; // name of this color
  red?: AsinoNumber;
  redDark?: AsinoNumber;
  green?: AsinoNumber;
  greenDark?: AsinoNumber;
  blue?: AsinoNumber;
  blueDark?: AsinoNumber;
  hue?: AsinoNumber;
  hueDark?: AsinoNumber;
  saturation?: AsinoNumber;
  saturationDark?: AsinoNumber;
  lightness?: AsinoNumber;
  lightnessDark?: AsinoNumber;
  colorId?: string;
  operator?: ColorOperator;
  booleanList?: AsinoBoolean[]; // boolean inputs
  colorList?: AsinoColor[]; // color inputs
  numberVariableDictionary?: { [id: string]: AsinoNumber }; // number parameters
  colorVariableDictionary?: { [id: string]: AsinoColor }; // color parameters
  editedColor?: AsinoColor;
}
