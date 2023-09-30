import { References } from "../References";
import { AsinoColor, Color, ColorFormula, ColorResult } from "../types/Color";
import { Solution } from "../types/Solution";
import { getBooleanFromAsinoBoolean } from "../utils";
import { getNumberResultFromAsinoNumber } from "./Number";

export const getColorResultFromColorId = (colorId: string, references: References, solution: Solution): ColorResult => {
  const colorReference = references.colors[colorId];

  if (colorReference.value !== undefined) {
    if (colorReference.numbers !== undefined) {
      const newReferences = references.clone().addParameters(colorReference);

      return getColorResultFromAsinoColor(colorReference.value, newReferences, solution);
    } else {
      return getColorResultFromAsinoColor(colorReference.value, references, solution);
    }
  }

  return {};
}

export const getColorResultFromColor = (color: Color, references: References): ColorResult => {
  const result: ColorResult = {};

  color.blue !== undefined && (result.blue = getNumberResultFromAsinoNumber(color.blue, references));
  color.blueDark !== undefined && (result.blueDark = getNumberResultFromAsinoNumber(color.blueDark, references));
  color.red !== undefined && (result.red = getNumberResultFromAsinoNumber(color.red, references));
  color.redDark !== undefined && (result.redDark = getNumberResultFromAsinoNumber(color.redDark, references));
  color.green !== undefined && (result.green = getNumberResultFromAsinoNumber(color.green, references));
  color.greenDark !== undefined && (result.greenDark = getNumberResultFromAsinoNumber(color.greenDark, references));
  color.hue !== undefined && (result.hue = getNumberResultFromAsinoNumber(color.hue, references));
  color.hueDark !== undefined && (result.hueDark = getNumberResultFromAsinoNumber(color.hueDark, references));
  color.saturation !== undefined && (result.saturation = getNumberResultFromAsinoNumber(color.saturation, references));
  color.saturationDark !== undefined && (result.saturationDark = getNumberResultFromAsinoNumber(color.saturationDark, references));
  color.lightness !== undefined && (result.lightness = getNumberResultFromAsinoNumber(color.lightness, references));
  color.lightnessDark !== undefined && (result.lightnessDark = getNumberResultFromAsinoNumber(color.lightnessDark, references));

  return result;
}

export const getColorResultFromAsinoColor = (color: AsinoColor, references: References, solution: Solution): ColorResult => {
  if (color.color !== undefined) {
    return getColorResultFromColor(color.color, references);
  } else if (color.colorId !== undefined) {
    return getColorResultFromColorId(color.colorId, references, solution);
  } else if (color.formula !== undefined) {
    return getColorResultFromFormula(color.formula, references, solution);
  }

  return {};
}

export const getColorResultFromFormula = (formula: ColorFormula, references: References, solution: Solution): ColorResult => {
  let result: ColorResult = {};

  if (formula?.operator === 'IF_ELSE') {
    let index = 0;
    let match = false;
    while (!match && index < (formula.booleanInputs?.length ?? 0)) {
      const boolean = getBooleanFromAsinoBoolean(formula.booleanInputs![0], references, solution);

      if (boolean.boolean) {
        match = true;
        result = getColorResultFromAsinoColor(formula.colorInputs?.[index] ?? {}, references, solution);
      } else {
        index++;
      }
    }

    if (!match) {
      result = getColorResultFromAsinoColor(formula.colorInputs?.[formula.colorInputs?.length - 1] ?? {}, references, solution);
    }
  }

  return result;
}