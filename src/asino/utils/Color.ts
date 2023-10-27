import { Variables } from "../Variables";
import { AsinoColor, ColorResult } from "../types/Color";
import { Solution } from "../types/Solution";
import { getBooleanResultFromAsinoBoolean } from "./Boolean";
import { getNumberResultFromAsinoNumber } from "./Number";

export const getColorResultFromAsinoColor = (color: AsinoColor, variables: Variables, solution: Solution): ColorResult => {
  let newReferences = variables;

  if (color.numberVariableDictionary !== undefined) {
    newReferences = variables.clone().addParameters(color);
  }

  if (color.colorId !== undefined) {
    const colorResult = variables.colorDictionary[color.colorId];

    if (colorResult !== undefined) {
      return getColorResultFromAsinoColor(colorResult, variables, solution);
    }
  } if (color.operator !== undefined) {
    if (color.operator === 'IF_ELSE') {
      let result: ColorResult | undefined = undefined

      for (let i = 0; i < (color.booleanList?.length ?? 0) && result === undefined; i++) {
        const booleanResult = getBooleanResultFromAsinoBoolean(color.booleanList![i], variables, solution);

        console.log(booleanResult);

        if (booleanResult.boolean === true) {
          return getColorResultFromAsinoColor(color.colorList?.[i] ?? {}, variables, solution);
        }
      }

      return result ?? {};
    } else {
      console.log('color', color);
    }
  }

  const result: ColorResult = {};

  color.blue !== undefined && (result.blue = getNumberResultFromAsinoNumber(color.blue, newReferences));
  color.blueDark !== undefined && (result.blueDark = getNumberResultFromAsinoNumber(color.blueDark, newReferences));
  color.red !== undefined && (result.red = getNumberResultFromAsinoNumber(color.red, newReferences));
  color.redDark !== undefined && (result.redDark = getNumberResultFromAsinoNumber(color.redDark, newReferences));
  color.green !== undefined && (result.green = getNumberResultFromAsinoNumber(color.green, newReferences));
  color.greenDark !== undefined && (result.greenDark = getNumberResultFromAsinoNumber(color.greenDark, newReferences));
  color.hue !== undefined && (result.hue = getNumberResultFromAsinoNumber(color.hue, newReferences));
  color.hueDark !== undefined && (result.hueDark = getNumberResultFromAsinoNumber(color.hueDark, newReferences));
  color.saturation !== undefined && (result.saturation = getNumberResultFromAsinoNumber(color.saturation, newReferences));
  color.saturationDark !== undefined && (result.saturationDark = getNumberResultFromAsinoNumber(color.saturationDark, newReferences));
  color.lightness !== undefined && (result.lightness = getNumberResultFromAsinoNumber(color.lightness, newReferences));
  color.lightnessDark !== undefined && (result.lightnessDark = getNumberResultFromAsinoNumber(color.lightnessDark, newReferences));

  return result;
}
