import { References } from "./References";
import { AsinoBoolean, AsinoBooleanReference, BooleanFormula } from "./types/Boolean";
import { AsinoCircle, AsinoCircleReference } from "./types/Circle";
import { AsinoClass, AsinoClassReference, AsinoClasses, Class, ClassFormula } from "./types/Class";
import { AsinoCollectionReference } from "./types/Collection";
import { AsinoColor, AsinoColorReference, Color, ColorFormula, ColorResult } from "./types/Color";
import { AsinoGroup, AsinoGroupReference } from "./types/Group";
import { AsinoInterface, AsinoInterfaceReference } from "./types/Interface";
import { AsinoLayer } from "./types/Layer";
import { AsinoLine, AsinoLineReference } from "./types/Line";
import { AsinoNumber, AsinoNumberReference, NumberFormula, NumberResult } from "./types/Number";
import { AsinoObject, AsinoObjectReference, AsinoObjects, isObjectsFormula, isObjectsObjects } from "./types/Object";
import { AsinoCommand, AsinoCommandReference, AsinoPath, AsinoPathReference, Command } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoRectangle, AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSet, AsinoSetReference, AsinoSets, AsinoSetsReference, Set, SetsFormula, isSetSet, isSetsFormula, isSetsReference } from "./types/Set";
import { Solution } from "./types/Solution";
import { AsinoMatrix, AsinoRotate, AsinoScale, AsinoTransform, AsinoTranslate } from "./types/Transform";
import { ViewBox } from './types/ViewBox';
import { getColorResultFromAsinoColor, getColorResultFromColor, getColorResultFromColorId, getColorResultFromFormula } from "./utils/Color";
import { getNumberResultFromAsinoNumber, getNumberResultFromFormula, getProduct, getValueFromNumberResult } from "./utils/Number";
import { getObjectFromObjectId } from "./utils/Object";

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

export const getValueFromColor = (color: ColorResult, references: References, idPrefix: string, isDark: boolean): { key: string, value: string } | undefined => {
  if (color !== undefined && 'red' in color) {
    const colorRed: NumberResult = isDark ? color?.redDark ?? color?.red ?? { number: 0 } : color?.lightness ?? { number: 1 };
    let red = getValueFromNumberResult(getProduct(colorRed, { number: 255 }, references));

    if (red === 'infinity') {
      red = 255;
    } else if (red === 'negativeInfinity') {
      red = 0;
    } else if (red === 'potato' || red === undefined) {
      red = 127;
    }

    red = Math.max(Math.min(Math.round(red), 255), 0);

    const colorGreen: NumberResult = isDark ? color?.greenDark ?? color?.green ?? { number: 0 } : color?.green ?? { number: 1 };
    let green = getValueFromNumberResult(getProduct(colorGreen, { number: 255 }, references));

    if (green === 'infinity') {
      green = 255;
    } else if (green === 'negativeInfinity') {
      green = 0;
    } else if (green === 'potato' || green === undefined) {
      green = 127;
    }

    green = Math.max(Math.min(Math.round(green), 255), 0);

    const colorBlue: NumberResult = isDark ? color?.blueDark ?? color?.blue ?? { number: 0 } : color?.blue ?? { number: 1 };
    let blue = getValueFromNumberResult(getProduct(colorBlue, { number: 255 }, references));

    if (blue === 'infinity') {
      blue = 255;
    } else if (blue === 'negativeInfinity') {
      blue = 0;
    } else if (blue === 'potato' || blue === undefined) {
      blue = 127;
    }

    blue = Math.max(Math.min(Math.round(blue), 255), 0);

    return { key: `${idPrefix}r${red}g${green}b${blue}a1`, value: `rgba(${red},${green},${blue},1)` };
  } else {
    const colorHue: NumberResult = (isDark ? (color?.hueDark ?? color?.hue) : color?.hue) ?? { number: 0 };
    let hue = getValueFromNumberResult(getProduct(colorHue, { number: 360 }, references));

    if (hue === 'infinity' || hue === 'negativeInfinity' || hue === 'potato' || hue === undefined) {
      hue = 0;
    }

    hue = Math.round(hue) % 360;

    const colorSaturation: NumberResult = (isDark ? (color?.saturationDark ?? color?.saturation) : color?.saturation) ?? { fraction: { numerator: 3, denominator: 4 } };
    let saturation = getValueFromNumberResult(getProduct(colorSaturation, { number: 100 }, references));

    if (saturation === 'infinity') {
      saturation = 100;
    } else if (saturation === 'negativeInfinity') {
      saturation = 0;
    } else if (saturation === 'potato' || saturation === undefined) {
      saturation = 75;
    }

    saturation = Math.max(Math.min(Math.round(saturation), 100), 0);

    const colorLightness: NumberResult = (isDark ? (color?.lightnessDark ?? color?.lightness) : color?.lightness) ?? { fraction: { numerator: 1, denominator: 2 } };
    let lightness = getValueFromNumberResult(getProduct(colorLightness, { number: 100 }, references));

    if (lightness === 'infinity') {
      lightness = 100;
    } else if (lightness === 'negativeInfinity') {
      lightness = 0;
    } else if (lightness === 'potato' || lightness === undefined) {
      lightness = 50;
    }

    lightness = Math.max(Math.min(Math.round(lightness), 100), 0);

    return { key: `${idPrefix}h${hue}s${saturation}l${lightness}a1`, value: `hsla(${hue},${saturation}%,${lightness}%,1)` };
  }
}

export const getObjectIdFromAsinoObject = (object: AsinoObject | undefined, references: References): string | undefined => {
  let result: string | undefined = undefined;

  if (object === undefined) {
    // do nothing
  } else if (typeof object === 'string') {
    result = object;

    Object.entries(references.objects).forEach(referenceObject => {
      referenceObject[0] === object && typeof referenceObject[1] === 'string' && (result = getObjectIdFromAsinoObject(referenceObject[1], references));
    });
  } else {
    console.log('object', object);
  }

  return result;
}

export const getClassIdFromAsinoClass = (asinoClass: AsinoClass | string | undefined, references: References, solution: Solution): { string: string | undefined, usesSolution: boolean } => {
  let result: { string: string | undefined, usesSolution: boolean } = { string: undefined, usesSolution: false };

  if (asinoClass === undefined) {
    // do nothing
  } else if (typeof asinoClass === 'string') {
    result.string = asinoClass;

    Object.entries(references.classes).forEach(referenceClass => {
      if (referenceClass[0] === asinoClass) {
        referenceClass[1] !== undefined && typeof referenceClass[1] === 'string' && (result = getClassIdFromAsinoClass(referenceClass[1], references, solution));
      }
    });
  } else if (asinoClass.formula !== undefined) {
    result = getClassIdFromFormula(asinoClass.formula, references, solution);
  } else {
    console.log('asinoClass', asinoClass);
  }

  return result;
}

export const getObjectIdsFromAsinoSet = (set: AsinoSet | undefined, references: References): string[] | undefined => {
  let result: string[] | undefined = undefined;

  if (set === undefined) {
    // do nothing
  } else if (typeof set === 'string') {
    console.log('set', set);
  } else if (isSetSet(set)) {
    result = getObjectIdsFromAsinoObjects(set.objects, references);
  } else {
    console.log('set', set);
  }

  return result;
}

export const getClassesFromAsinoClasses = (classes: AsinoClasses | undefined, references: References): AsinoClass[] | undefined => {
  let result: AsinoClass[] | undefined = undefined;

  if (classes === undefined) {
    // do nothing
  } else if (typeof classes === 'string') {
    console.log('classes', classes);
  } else {
    result = classes;
  }

  return result;
}

export const getObjectIdsFromAsinoObjects = (objects: AsinoObjects | undefined, references: References): string[] | undefined => {
  let result: string[] | undefined = undefined;

  if (objects === undefined) {
    // do nothing
  } else if (typeof objects === 'string') {
    console.log('objects', objects);
  } else if (isObjectsFormula(objects)) {
    if (objects.operator === '-') {
      result = getObjectIdsFromAsinoObjects(objects.objectsInputs?.[0], references);
      const rightObjects = getObjectIdsFromAsinoObjects(objects.objectsInputs?.[1], references);

      rightObjects?.forEach((rightObject: string) => {
        const index = result?.indexOf(rightObject);

        index !== undefined && index !== -1 && (result?.splice(index, 1));
      });
    } else if (objects.operator === 'OBJECTS_IN_SET') {
      result = getObjectIdsFromAsinoSet(references.set, references);
    } else {
      console.log('objects', objects);
    }
  } else if (isObjectsObjects(objects)) {
    result = [];

    objects.forEach(asinoObject => {
      const object = getObjectIdFromAsinoObject(asinoObject, references);

      object !== undefined && (result?.push(object));
    });
  } else {
    console.log('TODO');
  }

  return result;
}

export const getSetsFromFormula = (formula: SetsFormula | undefined, references: References): Set[] | undefined => {
  let result: Set[] | undefined = undefined;

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'SETS_CONTAINING_OBJECT') {
      result = []

      Object.entries(references.sets).forEach(setReference => {
        const asinoSet = setReference[1];
        const set = getSetFromAsinoSet(asinoSet, references);

        if (references.objectId !== undefined) {
          if (getObjectIdsFromAsinoObjects(set?.objects, references)?.indexOf(references.objectId) !== -1) {
            set !== undefined && (result!.push(set));
          }
        }
      });
    }
  }

  return result;
}

export const getClassFromAsinoClass = (asinoClass: AsinoClass | string | undefined, references: References, solution: Solution): Class | undefined => {
  let result: Class | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (typeof asinoClass === 'string') {
    references.classes[asinoClass] !== undefined && (result = getClassFromAsinoClass(references.classes[asinoClass].value, references, solution));
  } else if (asinoClass.class !== undefined) {
    result = asinoClass.class;
  } else if (asinoClass.formula !== undefined) {
    result = getClassFromFormula(asinoClass.formula, references, solution);
  } else {
    result = asinoClass.class;
  }

  return result;
}

export const getSetFromAsinoSet = (set: AsinoSet | undefined, references: References): Set | undefined => {
  let result: Set | undefined = undefined;

  if (set === undefined) {
    // do nothing
  } else if (typeof set === 'string') {
    console.log('set', set);
  } else if (isSetSet(set)) {
    result = set;
  } else {
    console.log('set', set);
  }

  return result;
}

export const getSetsFromAsinoSets = (sets: AsinoSets | undefined, references: References): Set[] | undefined => {
  let result: Set[] | undefined = undefined;

  if (sets === undefined) {
    // do nothing
  } else if (isSetsFormula(sets)) {
    result = getSetsFromFormula(sets, references);
  }

  return result;
}

export const getClassIdFromFormula = (formula: ClassFormula | undefined, references: References, solution: Solution): { string: string | undefined, usesSolution: boolean } => {
  let result: { string: string | undefined, usesSolution: boolean } = { string: undefined, usesSolution: false };

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'CLASS_OF_OBJECT') {
      const object = getObjectIdFromAsinoObject(formula.objectInputs?.[0], references);
      const solutionClass = object !== undefined ? solution.selectedObjectClasses?.[object] : undefined;
      result = getClassIdFromAsinoClass(solutionClass, references, solution);
    } else {
      console.log('formula', formula);
    }
  }

  return result;
}

export const getClassFromFormula = (formula: ClassFormula | undefined, references: References, solution: Solution): Class | undefined => {
  let result: Class | undefined = undefined;

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'CLASS_OF_OBJECT') {
      const object = getObjectIdFromAsinoObject(formula.objectInputs?.[0], references);
      const solutionClass = object !== undefined ? solution.selectedObjectClasses?.[object] : undefined;
      result = getClassFromAsinoClass(solutionClass, references, solution);
    } else {
      console.log('formula', formula);
    }
  }

  return result;
}

export const getBooleanFromFormula = (formula: BooleanFormula | undefined, references: References, solution: Solution): { boolean: boolean | undefined, usesSolution: boolean } => {
  let result: { boolean: boolean | undefined, usesSolution: boolean } = { boolean: undefined, usesSolution: false };

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'IS_EACH_SET') {
      const sets = getSetsFromAsinoSets(formula.setsInputs?.[0], references);

      result.boolean = true;

      sets?.forEach((set: Set) => {
        const setResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setSet(set), solution);

        setResult.boolean !== true && (result.boolean = false);
        result.usesSolution ||= setResult.usesSolution;
      });
    } else if (formula.operator === 'IS_EACH_OBJECT') {
      const objects = getObjectIdsFromAsinoObjects(formula.objectsInputs?.[0], references);

      result.boolean = true;

      objects?.forEach((object: string) => {
        const objectResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setObjectId(object), solution);

        objectResult.boolean !== true && (result.boolean = false);
        result.usesSolution ||= objectResult.usesSolution;
      });
    } else if (formula.operator === 'IS_OBJECT') {
      //const newRefs = references.clone().addObjects([[{ id: getObjectIdFromAsinoObject(formula.objectOutput, references), object: references.object }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, references, solution);
    } else if (formula.operator === 'IS_OBJECT_CLASS') {
      const fixedObject = getObjectFromObjectId(references.objectId ?? '', references);
      const solutionClass = references.objectId !== undefined ? solution.selectedObjectClasses?.[references.objectId] : undefined;

      const asinoClassId = fixedObject?.classFixedId ?? solutionClass;
      const newReferences = references.clone().setClassId(asinoClassId);
      //typeof formula.classOutput === 'string' && newReferences.addClasses([[{ id: formula.classOutput, classId: asinoClassId }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, newReferences, solution);
    } else if (formula.operator === 'IS_EACH_CLASS_DIFFERENT') {
      let classes: { string: string | undefined, usesSolution: boolean }[] = [];

      const asinoClasses = getClassesFromAsinoClasses(formula.classesInputs?.[0], references);

      asinoClasses?.forEach((asinoClass: AsinoClass) => {
        classes.push(getClassIdFromAsinoClass(asinoClass, references, solution));
      });

      classes.push({ string: references.fixedClassId, usesSolution: false });

      classes = classes.filter(asinoClass => asinoClass !== undefined);

      result.boolean = true;
      let index = 0;

      while (result.boolean === true && index < classes.length - 1) {
        const class1 = classes[index]!;
        const class2 = classes[index + 1]!;

        class1.string === class2.string && (result.boolean = false);

        index++;
      }
    } else {
      console.log('formula', formula);
    }
  }

  return result
}

export const getSetFromSetReference = (asinoSet: AsinoSetReference | undefined, references: References): AsinoSet | undefined => {
  let result: AsinoSet | undefined = undefined;

  if (asinoSet === undefined) {
    // do nothing
  } else if (asinoSet.value) {
    result = asinoSet.value;
  }

  return result;
}

export const getBooleanFromBooleanReference = (asinoBoolean: AsinoBooleanReference | undefined, references: References): AsinoBoolean | undefined => {
  let result: AsinoBoolean | undefined = undefined;

  if (asinoBoolean === undefined) {
    // do nothing
  } else if (asinoBoolean.value) {
    result = asinoBoolean.value;
  }

  return result;
}

export const getClassFromClassReference = (asinoClass: AsinoClassReference | undefined, references: References, solution: Solution): Class | undefined => {
  let result: Class | undefined = undefined;

  if (asinoClass?.value?.classId !== undefined) {
    references.classes[asinoClass?.value.classId] !== undefined && (result = getClassFromAsinoClass(references.classes[asinoClass!.value!.classId].value, references, solution));
  }

  if (asinoClass?.value?.class !== undefined) {
    result === undefined && (result = {});

    asinoClass?.value.class.layers !== undefined && (result.layers = asinoClass?.value.class.layers);
    asinoClass?.value.class.viewBox !== undefined && (result.viewBox = asinoClass?.value.class.viewBox);
  }

  return result;
}

export const getCommandFromCommandReference = (command: AsinoCommandReference | undefined, references: References): Command | undefined => {
  let result: Command | undefined = undefined;

  if (command === undefined) {
    // do nothing
  } else if (command.command) {
    result = command.command;
  }

  return result;
}

export const getBooleanFromAsinoBoolean = (boolean: AsinoBoolean | undefined, references: References, solution: Solution): { boolean: boolean | undefined, usesSolution: boolean } => {
  let result: { boolean: boolean | undefined, usesSolution: boolean } = { boolean: undefined, usesSolution: false };

  if (boolean === undefined) {
    // do nothing
  } else if (typeof boolean === 'boolean') {
    result.boolean = boolean;
  } else if (typeof boolean === 'string') {
    references.booleans[boolean] !== undefined && (result = getBooleanFromAsinoBoolean(references.booleans[boolean].value, references, solution));
  } else if (boolean.formula !== undefined) {
    result = getBooleanFromFormula(boolean.formula, references, solution);
  }

  return result;
}

export const getCommandFromAsinoCommand = (command: AsinoCommand | undefined, references: References, solution: Solution): Command | undefined => {
  let result: Command | undefined = undefined;

  if (command === undefined) {
    // do nothing
  } else if (command.commandId !== undefined) {
    references.commands[command.commandId] !== undefined && (result = references.commands[command.commandId].command);
  } else if (command.command !== undefined) {
    result = command.command;
  }

  return result;
}

export const getColorResultFromLayer = (layer: any, references: References, solution: Solution, valueName: string, valueNameAndId: string, colorDefault?: AsinoColor): ColorResult => {
  let result: ColorResult = getColorResultFromAsinoColor(colorDefault ?? {}, references, solution);

  const valueColorValue: AsinoColor = layer?.[valueNameAndId];

  if (valueColorValue !== undefined) {
    if (typeof valueColorValue === 'string') {
      references.colors[valueColorValue] !== undefined && (result = getColorResultFromAsinoColor(references.colors[valueColorValue].value ?? {}, references, solution));
    } else if (valueColorValue.formula !== undefined) {
      result = getColorResultFromFormula(valueColorValue.formula, references, solution);
    } else if (valueColorValue.color !== undefined) {
      result = getColorResultFromColor(valueColorValue.color, references);
    } else if (valueColorValue.colorId !== undefined) {
      return getColorResultFromColorId(valueColorValue.colorId, references, solution);
    }
  }

  return result;
}

export const getNumberFromLayer = (layer: any, references: References, valueName: string, valueNameAndId: string, numberDefault: AsinoNumber): NumberResult => {
  let result: NumberResult = getNumberResultFromAsinoNumber(numberDefault, references);

  const valueNumberValue: AsinoNumber | undefined = layer?.[valueNameAndId];

  if (valueNumberValue !== undefined) {
    if (valueNumberValue.number !== undefined) {
      result.number = valueNumberValue.number.value;
    } else if (valueNumberValue.formula !== undefined) {
      result = getNumberResultFromFormula(valueNumberValue.formula, references);
    } else {
      result = getNumberResultFromAsinoNumber(valueNumberValue, references.clone().addParameters(layer));
    }
  }

  return result;
}
