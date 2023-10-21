export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+' | 'FLOOR' | 'CEILING' | 'TOTAL';

export type NumberResult = {
  integer?: number;
  numerator?: number;
  denominator?: number;
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
}

export type AsinoNumbers = {
  numbers?: AsinoNumber[];
}

export type AsinoNumber = {
  id?: string;
  name?: string; // name of this number
  integer?: number;
  numberId?: string;
  operator?: NumberOperator; // formula for this number
  numberInputs?: AsinoNumbers; // number inputs
  collapsed?: boolean; // collapse in editor
  numerator: AsinoNumber,
  denominator: AsinoNumber
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
  numbers?: { [id: string]: AsinoNumber }; // number parameters
  editedNumber?: AsinoNumber;
}
