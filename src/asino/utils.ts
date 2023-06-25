import { Addition, Division, Multiplication, Subtraction } from "./consts";
import { AsinoColor, AsinoNumber } from "./interfaces";
import { Number } from "./types";

export const getSum = (left: Number, right: Number): Number => {
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left + right;
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getSum(getProduct(left, right.denominator), right.numerator), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 0;
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return 0;
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getSum(getProduct(right, left.denominator), left.numerator), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getSum(getProduct(left.numerator, right.denominator), getProduct(right.numerator, left.denominator)), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getDifference = (left: Number, right: Number): Number => {
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left - right;
    } else if (right === 'infinity') {
      return 'negativeInfinity';
    } else if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return { numerator: getSum(getProduct(left, right.denominator), right.numerator), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 0
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return 0
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getSum(getProduct(right, left.denominator), left.numerator), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'negativeInfinity';
    } else if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return { numerator: getDifference(getProduct(left.numerator, right.denominator), getProduct(right.numerator, left.denominator)), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getProduct = (left: Number, right: Number): Number => {
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left * right;
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getProduct(left, right.numerator), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getProduct(left.denominator, right), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getProduct(left.numerator, right.numerator), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getQuotient = (left: Number, right: Number): Number => {
  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return { numerator: left, denominator: right };
    } else if (right === 'infinity') {
      return 0;
    } else if (right === 'negativeInfinity') {
      return 0;
    } else {
      return { numerator: left, denominator: right };
    }
  } else if (left === 'infinity') {
    if (right === 'infinity') {
      return 1;
    } else if (right === 'negativeInfinity') {
      return -1;
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return -1;
    } else if (right === 'negativeInfinity') {
      return 1;
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: left.numerator, denominator: getProduct(left.denominator, right) };
    } else if (right === 'infinity') {
      return 0;
    } else if (right === 'negativeInfinity') {
      return 0;
    } else {
      return { numerator: left, denominator: right };
    }
  }
}

export const GetNumberFromAsinoNumber = (asinoNumber: string | number | AsinoNumber, numbers: AsinoNumber[]): Number => {
  if (typeof asinoNumber === 'number') {
    return asinoNumber;
  } else if (typeof asinoNumber === 'string') {
    return getNumberFromId(asinoNumber, numbers);
  } else {
    return getNumberFromNumber(asinoNumber, numbers);
  }
}

export const getGridValue = (value: Number, doNotMultiply?: boolean): number | 'infinity' | 'negativeInfinity' | 'potato' => {
  if (typeof value === 'number') {
    return value * (doNotMultiply ? 1 : 5040);
  } else if (value === 'infinity') {
    return 'infinity';
  } else if (value === 'negativeInfinity') {
    return 'negativeInfinity';
  } else {
    const numerator = getGridValue(value.numerator, true);
    const denominator = getGridValue(value.denominator, true);

    if (numerator === 'infinity') {
      if (denominator === 'infinity') {
        return 'potato';
      } else if (denominator === 'negativeInfinity') {
        return 'potato';
      } else if (denominator === 'potato') {
        return 'potato';
      } else {
        return 'infinity';
      }
    } else if (numerator === 'negativeInfinity') {
      if (denominator === 'infinity') {
        return 'potato';
      } else if (denominator === 'negativeInfinity') {
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
      } else if (denominator === 'negativeInfinity') {
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

  if (number.operator !== undefined) {
    let left: Number = 0;
    let right: Number = 0;

    if (number.operandLeftId !== undefined) {
      numbers.forEach((leftNumber: AsinoNumber) => {
        if (leftNumber.id === number.operandLeftId) {
          left = getNumberFromNumber(leftNumber, [...numbers, ...(number.numbers ?? [])]);
        }
      });
    }

    if (number.operandRightId !== undefined) {
      numbers.forEach((rightNumber: AsinoNumber) => {
        if (rightNumber.id === number.operandRightId) {
          right = getNumberFromNumber(rightNumber, [...numbers, ...(number.numbers ?? [])]);
        }
      });
    }

    number.operandLeft !== undefined && (left = getNumberFromNumber(number.operandLeft, [...numbers, ...(number.numbers ?? [])]));
    number.operandRight !== undefined && (right = getNumberFromNumber(number.operandRight, [...numbers, ...(number.numbers ?? [])]));

    if (number.operator === Multiplication)
      numberResult = getProduct(left, right);
    else if (number.operator === Subtraction)
      numberResult = getDifference(left, right);
    else if (number.operator === Addition)
      numberResult = getSum(left, right);
    else if (number.operator === Division)
      numberResult = getQuotient(left, right);
  }

  if (number.numberId !== undefined) {
    numbers.forEach((numberNumber: AsinoNumber) => {
      if (numberNumber.id === number.numberId) {
        numberResult = getNumberFromNumber(numberNumber, [...numbers, ...(number.numbers ?? [])]);
      }
    });
  }

  number.number !== undefined && (numberResult = number.number);

  return numberResult;
}

export const getColorFromId = (colorId: string, colors: AsinoColor[]): string => {
  let colorResult: string = 'none';

  colors.forEach((color: AsinoColor) => {
    if (color.id === colorId) {
      color.color !== undefined && (colorResult = color.color);
    }
  });

  return colorResult;
}

export const getNumberFromId = (numberId: string, numbers: AsinoNumber[]): Number => {
  let numberResult: Number = 0;

  numbers.forEach((number: AsinoNumber) => {
    if (number.id === numberId) {
      numberResult = getNumberFromNumber(number, [...numbers, ...(number.numbers ?? [])]);
    }
  });

  return numberResult;
}

export const getNumberFromLayer = (array: (any | undefined)[], numbers: AsinoNumber[], valueNameAndId: string, numberDefault: AsinoNumber): Number => {
  let numberResult: Number = 0;

  numberDefault.number && (numberResult = numberDefault.number);

  array.forEach(value => {
    const valueNumberValue: number | string | AsinoNumber | undefined = value?.[valueNameAndId];

    if (valueNumberValue !== undefined) {
      if (typeof valueNumberValue === 'number') {
        numberResult = valueNumberValue;
      } else if (typeof valueNumberValue === 'string') {
        numbers.forEach((number: AsinoNumber) => {
          if (number.id === valueNumberValue) {
            numberResult = getNumberFromNumber(number, [...numbers, ...(value?.[valueNameAndId]?.numbers ?? [])]);
          }
        });
      } else {
        if (valueNumberValue.id !== undefined) {
          numbers.forEach((number: AsinoNumber) => {
            if (number.id === valueNumberValue.id) {
              numberResult = getNumberFromNumber(number, [...numbers, ...(value?.[valueNameAndId]?.numbers ?? [])]);
            }
          });
        }
      }
    }

    const valueNumber: AsinoNumber | undefined = value?.[valueNameAndId];
    valueNumber !== undefined && valueNumber.number && (numberResult = valueNumber.number);
  });

  return numberResult;
}
