import { Variables } from "../Variables";
import { AsinoNumber, NumberResult } from "../types/Number";

export const getNumberResultFromAsinoNumber = (number: AsinoNumber, variables: Variables): NumberResult => {
  let newReferences = variables;

  if (number.numberVariables !== undefined) {
    newReferences = variables.clone().addParameters(number);
  }

  if (number.integer !== undefined) {
    return { integer: number.integer };
  } else if (number.numberId !== undefined) {
    const asinoNumber = variables.numbers[number.numberId];

    if (asinoNumber !== undefined) {
      return getNumberResultFromAsinoNumber(asinoNumber, newReferences);
    }
  } else if (number.operator !== undefined) {
    const numbers: NumberResult[] = [];

    number.numbers?.forEach(number => {
      numbers.push(getNumberResultFromAsinoNumber(number, newReferences));
    });

    if (number.operator === '+') {
      return getSum(numbers[0] ?? {}, numbers[1] ?? {}, newReferences);
    } else if (number.operator === '-') {
      return getDifference(numbers[0] ?? {}, numbers[1] ?? {}, newReferences);
    } else if (number.operator === '*') {
      return getProduct(numbers[0] ?? {}, numbers[1] ?? {}, newReferences);
    } else if (number.operator === '/') {
      return getQuotient(numbers[0] ?? {}, numbers[1] ?? {}, newReferences);
    } else if (number.operator === 'FLOOR') {
      const number = numbers[0] ?? {};

      if (number.integer !== undefined) {
        return { integer: number.integer };
      } else if (number.numerator !== undefined && number.denominator !== undefined) {
        return { integer: Math.floor(number.numerator / number.denominator) };
      }
    }
    else if (number.operator === 'TOTAL') {
      let result = numbers[0] ?? {};

      for (let i = 1; i < numbers.length; i++) {
        result = getSum(result, numbers[i], newReferences);
      }

      return result;
    }
  } else if (number.numerator !== undefined && number.denominator !== undefined) {
    const numerator = getNumberResultFromAsinoNumber(number.numerator, newReferences);
    const denominator = getNumberResultFromAsinoNumber(number.denominator, newReferences);

    if (numerator.integer !== undefined) {
      if (denominator.integer !== undefined) {
        return { numerator: numerator.integer, denominator: denominator.integer };
      }
    }
  }

  console.log('number', number);

  return {};
}

export const getValueFromNumberResult = (number: NumberResult): number => {
  if (number.integer !== undefined) {
    return number.integer;
  } else if (number.isInfinity) {
    return Math.max();
  } else if (number.isNegativeInfinity) {
    return Math.min();
  } else if (number.numerator !== undefined && number.denominator !== undefined) {
    return number.numerator / number.denominator;
  }

  return 0;
}

export const getSum = (left: NumberResult, right: NumberResult, variables: Variables): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer + right.integer };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      const numerator = getSum(getProduct(left, { integer: right.denominator }, variables), { integer: right.numerator }, variables);
      const denominator = { integer: right.denominator };
      return getQuotient(numerator, denominator, variables);
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
  } else if (left.numerator !== undefined && left.denominator !== undefined) {
    if (right.integer !== undefined) {
      const numerator = getSum(getProduct(right, { integer: left.denominator }, variables), { integer: left.numerator }, variables);
      const denominator = { integer: left.denominator };
      return getQuotient(numerator, denominator, variables);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      const numerator = getSum(getProduct({ integer: left.numerator }, { integer: right.denominator }, variables), getProduct({ integer: right.numerator }, { integer: left.denominator }, variables), variables);
      const denominator = getProduct({ integer: left.denominator }, { integer: right.denominator }, variables);
      return getQuotient(numerator, denominator, variables);
    }

    return left;
  }

  return right;
}


export const getProduct = (left: NumberResult, right: NumberResult, variables: Variables): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer * right.integer };
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      const numerator = getProduct(left, { integer: right.numerator }, variables);
      const denominator = { integer: right.denominator };
      return getQuotient(numerator, denominator, variables);
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
  } else if (left.numerator !== undefined && left.denominator !== undefined) {
    if (right.integer !== undefined) {
      const numerator = getProduct({ integer: left.numerator }, right, variables);
      const denominator = { integer: left.denominator };
      return getQuotient(numerator, denominator, variables);
    } else if (right.isInfinity) {
      return right;
    } else if (right.isNegativeInfinity) {
      return right;
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      const numerator = getProduct({ integer: left.numerator }, { integer: right.numerator }, variables);
      const denominator = getProduct({ integer: left.denominator }, { integer: right.denominator }, variables);
      return getQuotient(numerator, denominator, variables);
    }

    return left;
  }

  return right;
}

export const getQuotient = (left: NumberResult, right: NumberResult, variables: Variables): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { numerator: left.integer, denominator: right.integer };
    } else if (right.isInfinity) {
      return { integer: 0 };
    } else if (right.isNegativeInfinity) {
      return { integer: 0 };
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      return { numerator: left.integer * right.denominator, denominator: right.numerator };
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
  } else if (left.numerator !== undefined && left.denominator !== undefined) {
    if (right.integer !== undefined) {
      const numerator = { integer: left.numerator };
      const denominator = getProduct({ integer: left.denominator }, right, variables);
      return getQuotient(numerator, denominator, variables);
    } else if (right.isInfinity) {
      return { integer: 0 };
    } else if (right.isNegativeInfinity) {
      return { integer: 0 };
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      return { numerator: left.numerator * right.denominator, denominator: left.denominator * right.numerator };
    }

    return left;
  }

  return getQuotient({ integer: 0 }, right, variables);
}

export const getDifference = (left: NumberResult, right: NumberResult, variables: Variables): NumberResult => {
  if (left.integer !== undefined) {
    if (right.integer !== undefined) {
      return { integer: left.integer - right.integer };
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right.numerator !== undefined && right.denominator !== undefined) {
      const numerator = getDifference(getProduct(left, { integer: right.denominator }, variables), { integer: right.numerator }, variables);
      const denominator = { integer: right.denominator };
      return getQuotient(numerator, denominator, variables);
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
  } else if (left.numerator !== undefined && left.denominator !== undefined) {
    if (right.integer !== undefined) {
      const numerator = getSum(getProduct(right, { integer: left.denominator }, variables), { integer: left.numerator }, variables);
      const denominator = { integer: left.denominator };
      return getQuotient(numerator, denominator, variables);
    } else if (right.isInfinity) {
      return { isNegativeInfinity: true };
    } else if (right.isNegativeInfinity) {
      return { isInfinity: true };
    } else if (right !== undefined) {
      const numerator = getDifference(getProduct({ integer: left.numerator }, { integer: right.denominator }, variables), getProduct({ integer: right.numerator }, { integer: left.denominator }, variables), variables);
      const denominator = getProduct({ integer: left.denominator }, { integer: right.denominator }, variables);
      return getQuotient(numerator, denominator, variables);
    }

    return left;
  }

  return getDifference({ integer: 0 }, right, variables);
}
