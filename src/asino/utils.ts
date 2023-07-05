import { Addition, Division, Multiplication, Subtraction } from "./consts";
import { AsinoClass, AsinoClassReference } from "./types/Class";
import { AsinoColor, AsinoColorReference } from "./types/Color";
import { AsinoNumber, AsinoNumberReference, Number, isFormula, isAsinoNumberFraction, isNumberFraction, Formula } from "./types/Number";

export const getSum = (left: Number | undefined, right: Number | undefined): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

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

export const getDifference = (left: Number | undefined, right: Number | undefined): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

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

export const getProduct = (left: Number | undefined, right: Number | undefined): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

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

export const getQuotient = (left: Number | undefined, right: Number | undefined): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

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

export const getValueFromAsinoColor = (color: AsinoColor, colorReferences: AsinoColorReference[]): string | undefined => {
  let result: string | undefined = undefined;

  if (typeof color === 'string') {
    colorReferences.forEach(colorReference => {
      if (colorReference.id === color) {
        if (typeof colorReference.value === 'string') {
          result = colorReference.value;
        }
      }
    });
  } else {
    colorReferences.forEach(colorReference => {
      if (colorReference.id === color.id) {
        if (typeof colorReference.value === 'string') {
          result = colorReference.value;
        }
      }
    });
  }

  return result;
}

export const getValueFromNumber = (number: Number | undefined, doNotMultiply?: boolean): number | 'infinity' | 'negativeInfinity' | 'potato' | undefined => {
  let result: number | 'infinity' | 'negativeInfinity' | 'potato' | undefined = undefined;

  if (number === undefined) {
    // do nothing
  } else if (typeof number === 'number') {
    result = number * (doNotMultiply ? 1 : 5040);
  } else if (number === 'infinity') {
    result = 'infinity';
  } else if (number === 'negativeInfinity') {
    result = 'negativeInfinity';
  } else {
    const numerator = getValueFromNumber(number.numerator, true);
    const denominator = getValueFromNumber(number.denominator, true);

    if (numerator === undefined || denominator === undefined) {
      // do nothing
    } else if (numerator === 'infinity') {
      if (denominator === 'infinity') {
        result = 'potato';
      } else if (denominator === 'negativeInfinity') {
        result = 'potato';
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = 'infinity';
      }
    } else if (numerator === 'negativeInfinity') {
      if (denominator === 'infinity') {
        result = 'potato';
      } else if (denominator === 'negativeInfinity') {
        result = 'potato';
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = 'infinity';
      }
    } else if (numerator === 'potato') {
      result = 'potato';
    } else {
      if (denominator === 'infinity') {
        result = 0;
      } else if (denominator === 'negativeInfinity') {
        result = 0;
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = (numerator * (doNotMultiply ? 1 : 5040)) / denominator;
      }
    }
  }

  return result;
}

export const getNumberFromFormula = (formula: Formula | undefined, numberReferences: AsinoNumberReference[]): Number | undefined => {
  let result: Number | undefined = undefined;

  if (formula?.operator === undefined || formula.operandLeft === undefined || formula.operandRight === undefined) {
    // do nothing
  } else {
    let left = getNumberFromAsinoNumber(formula.operandLeft, numberReferences);
    let right = getNumberFromAsinoNumber(formula.operandRight, numberReferences);

    if (left === undefined || right === undefined) {
      // do nothing
    } else {
      if (formula.operator === Multiplication)
        result = getProduct(left, right);
      else if (formula.operator === Subtraction)
        result = getDifference(left, right);
      else if (formula.operator === Addition)
        result = getSum(left, right);
      else if (formula.operator === Division)
        result = getQuotient(left, right);
    }
  }

  return result;
}

export const getClassFromClassReference = (asinoClass: AsinoClassReference | undefined, classReferences: AsinoClassReference[]): AsinoClass | undefined => {
  let result: AsinoClass | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (asinoClass.value) {
    result = asinoClass.value;
  } else {
    classReferences.forEach(classReference => {
      if (classReference.id === asinoClass.id) {
        result = getClassFromClassReference(classReference, classReferences);
      }
    });
  }

  return result;
}

export const getNumberFromAsinoNumber = (number: AsinoNumber | undefined, numberReferences: AsinoNumberReference[]): Number | undefined => {
  let result: Number | undefined = undefined;

  if (number === undefined) {
    // do nothing
  } else if (typeof number === 'number') {
    result = number;
  } else if (typeof number === 'string') {
    numberReferences.forEach(numberReference => {
      if (numberReference.id === number) {
        result = getNumberFromAsinoNumber(numberReference.value, numberReferences);
      }
    });
  } else if (isAsinoNumberFraction(number)) {
    result = number;
  } else if (isFormula(number)) {
    result = getNumberFromFormula(number, numberReferences);
  } else {
    if (number.id === undefined && number.value !== undefined) {
      result = getNumberFromAsinoNumber(number.value, [...numberReferences, ...(number.numbers ?? [])]);
    } else {
      result = getNumberFromAsinoNumber(number.id, [...numberReferences, ...(number.numbers ?? [])]);
    }
  }

  return result;
}

export const getNumberFromLayer = (array: (any | undefined)[], numbers: AsinoNumberReference[], valueNameAndId: string, numberDefault: AsinoNumberReference): Number | undefined => {
  let result: Number | undefined = getNumberFromAsinoNumber(numberDefault, numbers);

  array.forEach(value => {
    const valueNumberValue: number | string | AsinoNumber | undefined = value?.value?.[valueNameAndId];

    if (valueNumberValue !== undefined) {
      if (typeof valueNumberValue === 'number') {
        result = valueNumberValue;
      } else if (typeof valueNumberValue === 'string') {
        numbers.forEach((number: AsinoNumberReference) => {
          if (number.id === valueNumberValue) {
            result = getNumberFromAsinoNumber(number, [...numbers, ...(value?.[valueNameAndId]?.numbers ?? [])]);
          }
        });
      } else if (isAsinoNumberFraction(valueNumberValue)) {
        result = valueNumberValue;
      } else if (isFormula(valueNumberValue)) {
        console.log('TODO');
      } else {
        result = getNumberFromAsinoNumber(valueNumberValue, [...numbers, ...(valueNumberValue.numbers ?? [])]);
      }
    }
  });

  return result;
}
