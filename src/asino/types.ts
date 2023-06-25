export type Fraction = { numerator: Number, denominator: Number };
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';
export type Letter = 'C' | 'c' | 'H' | 'h' | 'L' | 'l' | 'M' | 'm' | 'Q' | 'q' | 'S' | 's' | 'T' | 't' | 'V' | 'v' | 'Z' | 'z';
export type Operator = '*' | '/' | '-' | '+';
