import { AsinoPuzzle, Number } from "./interfaces";

export const getNumberValue = (value: Number): number => {
  if (typeof value === 'number') return value;

  return 0;
}

export const getNumber = (array: (any | undefined)[], puzzle: AsinoPuzzle, valueName: string, valueId: string, numberDefault: Number): Number => {
  let numberResult: Number = numberDefault;

  array.forEach(value => {
    const numberValue = value && puzzle.numbers?.filter(number => number.id === value[valueId])[0]?.value;
    numberValue !== undefined && (numberResult = numberValue);

    const valueValue = value && value[valueName];
    valueValue !== undefined && (numberResult = valueValue);
  });

  return numberResult;
}
