import { Operator } from "../types";

export type Fraction = { numerator?: Number, denominator?: Number };
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';

export type AsinoNumber = Number | string | Formula | AsinoNumberReference;

export type Formula = {
  operator?: Operator; // formula for this number
  operandLeft?: AsinoNumber; // left operand of formula
  operandRight?: AsinoNumber; // right operand of formula
}

export type AsinoNumberReference = {
  id?: string; // id of this number
  name?: string; // name of this number
  value?: AsinoNumber; // value of this number
  numbers?: AsinoNumberReference[]; // parameters to use when overriding
}

export const isNumberFraction = (number: Number): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isAsinoNumberFraction = (number: AsinoNumber): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isFormula = (number: AsinoNumber): number is Formula => {
  return typeof number !== 'string' && typeof number !== 'number' && 'operator' in number && 'operandLeft' in number && 'operandRight' in number;
}
