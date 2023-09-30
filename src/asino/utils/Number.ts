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
  if (number.integer !== undefined) {
    return { integer: number.integer.value };
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

  if (number.integer !== undefined) {
    result = number.integer;
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
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer + right.integer };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getSum(getProduct(left, { integer: right.fraction.denominator }, references), { integer: right.fraction.numerator }, references);
      const denominator = { integer: right.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isNegativeInfinity) {
      return { integer: 0 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { integer: 0 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.integer !== undefined) {
      const numerator = getSum(getProduct(right, { integer: left.fraction.denominator }, references), { integer: left.fraction.numerator }, references);
      const denominator = { integer: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getSum(getProduct({ integer: left.fraction.numerator }, { integer: right.fraction.denominator }, references), getProduct({ integer: right.fraction.numerator }, { integer: left.fraction.denominator }, references), references);
      const denominator = getProduct({ integer: left.fraction.denominator }, { integer: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return right;
}

export const getProduct = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer * right.integer };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getProduct(left, { integer: right.fraction.numerator }, references);
      const denominator = { integer: right.fraction.denominator };
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
    if (right.integer !== undefined) {
      const numerator = getProduct({ integer: left.fraction.numerator }, right, references);
      const denominator = { integer: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.fraction !== undefined) {
      const numerator = getProduct({ integer: left.fraction.numerator }, { integer: right.fraction.numerator }, references);
      const denominator = getProduct({ integer: left.fraction.denominator }, { integer: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return right;
}

export const getQuotient = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { fraction: { numerator: left.integer, denominator: right.integer } };
    } else if (right.isInfinity) {
      return { integer: 0 };
    } else if (right.isNegativeInfinity) {
      return { integer: 0 };
    } else if (right.fraction !== undefined) {
      return { fraction: { numerator: left.integer * right.fraction.denominator, denominator: right.fraction.numerator } };
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isInfinity) {
      return { integer: 1 };
    } else if (right.isNegativeInfinity) {
      return { integer: -1 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { integer: -1 };
    } else if (right.isNegativeInfinity) {
      return { integer: 1 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.integer !== undefined) {
      const numerator = { integer: left.fraction.numerator };
      const denominator = getProduct({ integer: left.fraction.denominator }, right, references);
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return { integer: 0 };
    } else if (right.isNegativeInfinity) {
      return { integer: 0 };
    } else if (right.fraction !== undefined) {
      return { fraction: { numerator: left.fraction.numerator * right.fraction.denominator, denominator: left.fraction.denominator * right.fraction.numerator } };
    }

    return left;
  }

  return getQuotient({ integer: 0 }, right, references);
}

export const getDifference = (left: NumberResult, right: NumberResult, references: References): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer - right.integer };
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right.fraction !== undefined) {
      const numerator = getDifference(getProduct(left, { integer: right.fraction.denominator }, references), { integer: right.fraction.numerator }, references);
      const denominator = { integer: right.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    }

    return left;
  } else if (left.isInfinity) {
    if (right.isNegativeInfinity) {
      return { integer: 0 };
    }

    return left;
  } else if (left.isNegativeInfinity) {
    if (right.isInfinity) {
      return { integer: 0 };
    }

    return left;
  } else if (left.fraction !== undefined) {
    if (right.integer !== undefined) {
      const numerator = getSum(getProduct(right, { integer: left.fraction.denominator }, references), { integer: left.fraction.numerator }, references);
      const denominator = { integer: left.fraction.denominator };
      return getQuotient(numerator, denominator, references);
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right.fraction !== undefined) {
      const numerator = getDifference(getProduct({ integer: left.fraction.numerator }, { integer: right.fraction.denominator }, references), getProduct({ integer: right.fraction.numerator }, { integer: left.fraction.denominator }, references), references);
      const denominator = getProduct({ integer: left.fraction.denominator }, { integer: right.fraction.denominator }, references);
      return getQuotient(numerator, denominator, references);
    }

    return left;
  }

  return getDifference({ integer: 0 }, right, references);
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
        result.integer = Math.floor(evall);
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
