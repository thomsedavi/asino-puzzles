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

export type Color = {
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
}

export type AsinoColor = {
  color?: Color;
  colorId?: string;
  formula?: ColorFormula;
}

export type ColorFormula = {
  operator?: ColorOperator;
  booleanInputs?: (AsinoBoolean | undefined)[]; // boolean inputs
  colorInputs?: (AsinoColor | undefined)[]; // color inputs
}

export type AsinoColorReference = {
  name?: { value?: string, editedValue?: string }; // name of this color
  value?: AsinoColor;
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}
