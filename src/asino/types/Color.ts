import { AsinoBoolean } from "./Boolean";
import { AsinoNumber } from "./Number";

export type ColorOperator = 'NONE' | 'IF_ELSE';

export type Color = {
  hue?: AsinoNumber | string,
  hueDark?: AsinoNumber | string,
  saturation?: AsinoNumber | string,
  saturationDark?: AsinoNumber | string;
  lightness?: AsinoNumber | string,
  lightnessDark?: AsinoNumber | string;
};

export type AsinoColor = string | Color | ColorFormula | AsinoColorReference;

export type ColorFormula = {
  operator?: ColorOperator;
  booleanInputs?: (AsinoBoolean | undefined)[]; // boolean inputs
  colorInputs?: (AsinoColor | undefined)[]; // color inputs
}

export type AsinoColorReference = {
  id?: string; // id of this color
  name?: { value?: string, editedValue?: string }; // name of this color
  value?: AsinoColor;
}

export const isColorFormula = (number: AsinoColor): number is ColorFormula => {
  return typeof number !== 'string' && typeof number !== 'number' && 'operator' in number;
}

export const isColorColor = (color: AsinoColor): color is Color => {
  return typeof color !== 'string' && 'hue' in color;
}
