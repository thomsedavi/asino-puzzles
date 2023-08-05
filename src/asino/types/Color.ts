import { AsinoBoolean } from "./Boolean";

export type ColorOperator = 'NONE' | 'IF_ELSE';

export type AsinoColor = string | ColorFormula | AsinoColorReference;

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
