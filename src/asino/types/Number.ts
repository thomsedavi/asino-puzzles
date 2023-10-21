export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+' | 'FLOOR' | 'CEILING' | 'TOTAL';

export type NumberResult = {
  integer?: number;
  numerator?: number;
  denominator?: number;
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
}

export type AsinoNumber = {
  id?: string;
  name?: string; // name of this number
  integer?: number;
  numberId?: string;
  operator?: NumberOperator; // formula for this number
  numbers?: AsinoNumber[]; // number inputs
  collapsed?: boolean; // collapse in editor
  numerator?: AsinoNumber,
  denominator?: AsinoNumber
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedNumber?: AsinoNumber;
}
