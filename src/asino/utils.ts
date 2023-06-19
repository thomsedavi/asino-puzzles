import { Multiplication } from "./consts";
import { AsinoNumber } from "./interfaces";
import { Number } from "./types";

const getProduct = (left: Number, right: Number): Number => {
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left * right;
    } else if (right === 'infinity') {
      return 'infinity';
    } else {
      return { numerator: getProduct(left, right.numerator), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    return 'infinity';
  } else {
    if (typeof right === 'number') {
      return { numerator: getProduct(left, left.numerator), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else {
      return { numerator: getProduct(left.numerator, right.numerator), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getGridValue = (value: Number, doNotMultiply?: boolean): number | 'infinity' | 'potato' => {
  if (typeof value === 'number') {
    return value * (doNotMultiply ? 1 : 5040);
  } else if (value === 'infinity') {
    return 'infinity';
  } else {
    const numerator = getGridValue(value.numerator, true);
    const denominator = getGridValue(value.denominator, true);

    if (numerator === 'infinity') {
      if (denominator === 'infinity') {
        return 'potato';
      } else if (denominator === 'potato') {
        return 'potato';
      } else {
        return 'infinity';
      }
    } else if (numerator === 'potato') {
      return 'potato';
    } else {
      if (denominator === 'infinity') {
        return 0;
      } else if (denominator === 'potato') {
        return 'potato';
      } else {
        return (numerator * (doNotMultiply ? 1 : 5040)) / denominator;
      }
    }
  }
}

export const getNumberFromNumber = (number: AsinoNumber, numbers: AsinoNumber[]): Number => {
  let numberResult: Number = 0;

  if (number.operator === Multiplication) {
    let left: Number = 0;
    let right: Number = 0;

    if (number.operandLeftId !== undefined) {
      numbers.forEach((leftNumber: AsinoNumber) => {
        if (leftNumber.id === number.operandLeftId) {
          left = getNumberFromNumber(leftNumber, numbers);
        }
      });
    }

    if (number.operandRightId !== undefined) {
      numbers.forEach((rightNumber: AsinoNumber) => {
        if (rightNumber.id === number.operandRightId) {
          right = getNumberFromNumber(rightNumber, numbers);
        }
      });
    }

    number.operandLeft !== undefined && number.operandLeft.number !== undefined && (left = number.operandLeft.number);
    number.operandRight !== undefined && number.operandRight.number !== undefined && (right = number.operandRight.number);

    numberResult = getProduct(left, right);
  }

  if (number.numberId !== undefined) {
    numbers.forEach((numberNumber: AsinoNumber) => {
      if (numberNumber.id === number.numberId) {
        numberResult = getNumberFromNumber(numberNumber, numbers);
      }
    });
  }

  number.number !== undefined && (numberResult = number.number);

  return numberResult;
}

export const getNumberFromLayer = (array: (any | undefined)[], numbers: AsinoNumber[], valueName: string, valueId: string, numberDefault: AsinoNumber): Number => {
  let numberResult: Number = 0;

  numberDefault.number && (numberResult = numberDefault.number);

  array.forEach(value => {
    const valueNumberId: string | undefined = value?.[valueId];

    if (valueNumberId !== undefined) {
      numbers.forEach((number: AsinoNumber) => {
        if (number.id === valueNumberId) {
          numberResult = getNumberFromNumber(number, [...numbers, ...(value?.[valueName]?.numbers ?? [])]);
        }
      });
    }

    const valueNumber: AsinoNumber | undefined = value?.[valueName];
    valueNumber !== undefined && valueNumber.number && (numberResult = valueNumber.number);
  });

  return numberResult;
}
