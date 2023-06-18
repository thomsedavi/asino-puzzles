import { Multiplication } from "./consts";
import { AsinoNumber } from "./interfaces";
import { Number } from "./types";

const GetProduct = (left: Number, right: Number): Number => {
  if (typeof left === 'number' && typeof right === 'number') return left * right;

  return 0;
}

export const getNumberValue = (value: Number): number => {
  if (typeof value === 'number') return value;

  return 0;
}

const getNumberFromNumber = (number: AsinoNumber, numbers: AsinoNumber[]): Number => {
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

    numberResult = GetProduct(left, right);
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
