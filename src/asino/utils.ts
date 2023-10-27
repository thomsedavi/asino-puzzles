import { Variables } from "./Variables";
import { ColorResult } from "./types/Color";
import { NumberResult } from "./types/Number";
import { AsinoObject } from "./types/Object";
import { AsinoSet } from "./types/Set";
import { getProduct, getValueFromNumberResult } from "./utils/Number";

//export const getValueFromAsinoColor = (color: AsinoColor | undefined, references: References, solution: Solution): string | undefined => {
//  let result: string | undefined = undefined;
//
//  if (color === undefined) {
//    // do nothing
//  } else if (typeof color === 'string') {
//    references.colors.forEach(colorReference => {
//      if (colorReference.id === color) {
//        console.log('REF', colorReference);
//        result = 'red';
//      }
//    });
//  } else {
//    if (isColorFormula(color)) {
//      result = getColorFromFormula(color, references, solution);
//    } else {
//      references.colors.forEach(colorReference => {
//        result = 'cyan';
//      });
//    }
//  }
//
//  return result;
//}

export const getValueFromColor = (color: ColorResult, variables: Variables, idPrefix: string, isDark: boolean): { key: string, value: string } | undefined => {
  if (color !== undefined && 'red' in color) {
    const colorRed: NumberResult = isDark ? color?.redDark ?? color?.red ?? { integer: 0 } : color?.lightness ?? { integer: 1 };
    let red = getValueFromNumberResult(getProduct(colorRed, { integer: 255 }, variables));

    if (red === Math.max()) {
      red = 255;
    } else if (red === Math.min()) {
      red = 0;
    } else if (red === undefined) {
      red = 127;
    }

    red = Math.max(Math.min(Math.round(red), 255), 0);

    const colorGreen: NumberResult = isDark ? color?.greenDark ?? color?.green ?? { integer: 0 } : color?.green ?? { integer: 1 };
    let green = getValueFromNumberResult(getProduct(colorGreen, { integer: 255 }, variables));

    if (green === Math.max()) {
      green = 255;
    } else if (green === Math.min()) {
      green = 0;
    } else if (green === undefined) {
      green = 127;
    }

    green = Math.max(Math.min(Math.round(green), 255), 0);

    const colorBlue: NumberResult = isDark ? color?.blueDark ?? color?.blue ?? { integer: 0 } : color?.blue ?? { integer: 1 };
    let blue = getValueFromNumberResult(getProduct(colorBlue, { integer: 255 }, variables));

    if (blue === Math.max()) {
      blue = 255;
    } else if (blue === Math.min()) {
      blue = 0;
    } else if (blue === undefined) {
      blue = 127;
    }

    blue = Math.max(Math.min(Math.round(blue), 255), 0);

    return { key: `${idPrefix}r${red}g${green}b${blue}a1`, value: `rgba(${red},${green},${blue},1)` };
  } else {
    const colorHue: NumberResult = (isDark ? (color?.hueDark ?? color?.hue) : color?.hue) ?? { integer: 0 };
    let hue = getValueFromNumberResult(getProduct(colorHue, { integer: 360 }, variables));

    if (hue === Math.max() || hue === Math.min() || hue === undefined) {
      hue = 0;
    }

    hue = Math.round(hue) % 360;

    const colorSaturation: NumberResult = (isDark ? (color?.saturationDark ?? color?.saturation) : color?.saturation) ?? { numerator: 3, denominator: 4 };
    let saturation = getValueFromNumberResult(getProduct(colorSaturation, { integer: 100 }, variables));

    if (saturation === Math.max()) {
      saturation = 100;
    } else if (saturation === Math.min()) {
      saturation = 0;
    } else if (saturation === undefined) {
      saturation = 75;
    }

    saturation = Math.max(Math.min(Math.round(saturation), 100), 0);

    const colorLightness: NumberResult = (isDark ? (color?.lightnessDark ?? color?.lightness) : color?.lightness) ?? { numerator: 1, denominator: 2 };
    let lightness = getValueFromNumberResult(getProduct(colorLightness, { integer: 100 }, variables));

    if (lightness === Math.max()) {
      lightness = 100;
    } else if (lightness === Math.min()) {
      lightness = 0;
    } else if (lightness === undefined) {
      lightness = 50;
    }

    lightness = Math.max(Math.min(Math.round(lightness), 100), 0);

    return { key: `${idPrefix}h${hue}s${saturation}l${lightness}a1`, value: `hsla(${hue},${saturation}%,${lightness}%,1)` };
  }
}

export const getObjectIdFromAsinoObject = (object: AsinoObject | undefined, variables: Variables): string | undefined => {
  let result: string | undefined = undefined;

  if (object === undefined) {
    // do nothing
  } else if (typeof object === 'string') {
    result = object;

    Object.entries(variables.objectDictionary).forEach(referenceObject => {
      referenceObject[0] === object && typeof referenceObject[1] === 'string' && (result = getObjectIdFromAsinoObject(referenceObject[1], variables));
    });
  } else {
    console.log('object', object);
  }

  return result;
}

export const getSetFromSetReference = (asinoSet: AsinoSet | undefined, variables: Variables): AsinoSet | undefined => {
  let result: AsinoSet | undefined = undefined;

  if (asinoSet === undefined) {
    // do nothing
  } else if (asinoSet) {
    result = asinoSet;
  }

  return result;
}
