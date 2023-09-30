import { References } from "../References";
import { Addition, Division, Multiplication, Subtraction, Total } from "../consts";
import { AsinoNumber, NumberFormula, NumberResult } from "../types/Number";

export const getNumberResultFromNumberId = (numberId: string, references: References): NumberResult => {
  const numberReference = references.numbers[numberId];

  if (numberReference.value !== undefined) {
    if (numberReference.numbers !== undefined) {
      const newReferences = references.clone().addParameters(numberReference);

      return getNumberResultFromAsinoNumber(numberReference.value, newReferences);
    } else {
      return getNumberResultFromAsinoNumber(numberReference.value, references);
    }
  }

  return {};
}

export const getNumberResultFromAsinoNumber = (number: AsinoNumber, references: References): NumberResult => {
  if (number.number !== undefined) {
    return { number: number.number.value };
  } else if (number.numberId !== undefined) {
    return getNumberResultFromNumberId(number.numberId, references);
  } else if (number.formula !== undefined) {
    return getNumberResultFromFormula(number.formula, references);
  } else if (number.fraction !== undefined) {
    const numerator = getNumberResultFromAsinoNumber(number.fraction.numerator, references);
    const denominator = getNumberResultFromAsinoNumber(number.fraction.denominator, references);
    return getQuotient(numerator, denominator, references);
  }

  return {};
}

export const getValueFromNumberResult = (number: NumberResult): number | 'infinity' | 'negativeInfinity' | 'potato' => {
  let result: number | 'infinity' | 'negativeInfinity' | 'potato' = 0;

  if (number.number !== undefined) {
    result = number.number;
  } else if (number.isInfinity) {
    result = 'infinity';
  } else if (number.isNegativeInfinity) {
    result = 'negativeInfinity';
  } else if (number.fraction !== undefined) {
    return number.fraction.numerator / number.fraction.denominator;
  }

  return result;
}

export const getSum = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.number !== undefined) {
    if (right.number !== undefined) {
      return { number: left.number + right.number };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getSum(getProduct(left, { number: right.fraction.denominator }, references), { number: right.fraction.numerator }, references);
      const denominator = { number: right.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isNegativeInfinity) {
      return { number: 0 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { number: 0 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.number !== undefined) {
      const numerator = getSum(getProduct(right, { number: left.fraction.denominator }, references), { number: left.fraction.numerator }, references);
      const denominator = { number: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getSum(getProduct({ number: left.fraction.numerator }, { number: right.fraction.denominator }, references), getProduct({ number: right.fraction.numerator }, { number: left.fraction.denominator }, references), references);
      const denominator = getProduct({ number: left.fraction.denominator }, { number: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return right;
}

export const getProduct = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.number !== undefined) {
    if (right.number !== undefined) {
      return { number: left.number * right.number };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getProduct(left, { number: right.fraction.numerator }, references);
      const denominator = { number: right.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isNegativeInfinity) {
      return right;
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (left.isNegativeInfinity) {
      return { isInfinity: true };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.number !== undefined) {
      const numerator = getProduct({ number: left.fraction.numerator }, right, references);
      const denominator = { number: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getProduct({ number: left.fraction.numerator }, { number: right.fraction.numerator }, references);
      const denominator = getProduct({ number: left.fraction.denominator }, { number: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return right;
}

export const getQuotient = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.number !== undefined) {
    if (right.number !== undefined) {
      return { fraction: { numerator: left.number, denominator: right.number } };
    } else if (right.isInfinity) {
      return { number: 0 };
    } else if (right.isNegativeInfinity) {
      return { number: 0 };
    } else if (right.fraction !== undefined) {
      return { fraction: { numerator: left.number * right.fraction.denominator, denominator: right.fraction.numerator } };
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isInfinity) {
      return { number: 1 };
    } else if (right.isNegativeInfinity) {
      return { number: -1 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { number: -1 };
    } else if (right.isNegativeInfinity) {
      return { number: 1 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.number !== undefined) {
      const numerator = { number: left.fraction.numerator };
      const denominator = getProduct({ number: left.fraction.denominator }, right, references);
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return { number: 0 };
    } else if (right.isNegativeInfinity) {
      return { number: 0 };
    } else if (right.fraction !== undefined) {
      return { fraction: { numerator: left.fraction.numerator * right.fraction.denominator, denominator: left.fraction.denominator * right.fraction.numerator } };
    }

    return left;
  }

  return getQuotient({ number: 0 }, right, references);
}

export const getDifference = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.number !== undefined) {
    if (right.number !== undefined) {
      return { number: left.number - right.number };
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right.fraction !== undefined) {
      const numerator = getDifference(getProduct(left, { number: right.fraction.denominator }, references), { number: right.fraction.numerator }, references);
      const denominator = { number: right.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isNegativeInfinity) {
      return { number: 0 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { number: 0 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.number !== undefined) {
      const numerator = getSum(getProduct(right, { number: left.fraction.denominator }, references), { number: left.fraction.numerator }, references);
      const denominator = { number: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right.fraction !== undefined) {
      const numerator = getDifference(getProduct({ number: left.fraction.numerator }, { number: right.fraction.denominator }, references), getProduct({ number: right.fraction.numerator }, { number: left.fraction.denominator }, references), references);
      const denominator = getProduct({ number: left.fraction.denominator }, { number: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return getDifference({ number: 0 }, right, references);
}

export const getNumberResultFromFormula = (formula: NumberFormula, references: References): NumberResult => {
  let result: NumberResult = {};

  if (formula?.operator === Total) {
    formula.numberInputs?.forEach((number: AsinoNumber | undefined) => {
      if (number !== undefined) {
        const thisResult = getNumberResultFromAsinoNumber(number, references);
        result = getSum(result, thisResult, references);
      }
    });
  } else if (formula?.operator === undefined || formula.numberInputs?.[0] === undefined || formula.numberInputs?.[1] === undefined) {
    // david, what are you doing, rewrite this better please

    if (formula?.operator !== undefined && formula.numberInputs?.[0] !== undefined) {
      let left = getNumberResultFromAsinoNumber(formula.numberInputs[0], references);

      let evall = getValueFromNumberResult(left);

      if (formula.operator === 'FLOOR' && typeof evall === 'number') {
        result.number = Math.floor(evall);
      }
    }
  } else {
    let left = getNumberResultFromAsinoNumber(formula.numberInputs[0], references);
    let right = getNumberResultFromAsinoNumber(formula.numberInputs[1], references);

    if (formula.operator === Multiplication)
      result = getProduct(left, right, references);
    else if (formula.operator === Subtraction)
      result = getDifference(left, right, references);
    else if (formula.operator === Addition)
      result = getSum(left, right, references);
    else if (formula.operator === Division)
      result = getQuotient(left, right, references);
  }

  return result;
}
