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
import { AsinoObject, AsinoObjectReference, AsinoObjects, ObjectThing, isObjectsFormula, isObjectsObjects } from "./types/Object";
import { AsinoCommand, AsinoCommandReference, AsinoPath, AsinoPathReference, Command } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoRectangle, AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSet, AsinoSetReference, AsinoSets, AsinoSetsReference, Set, SetsFormula, isSetSet, isSetsFormula, isSetsReference } from "./types/Set";
import { Solution } from "./types/Solution";
import { AsinoMatrix, AsinoRotate, AsinoScale, AsinoTransform, AsinoTranslate } from "./types/Transform";
import { ViewBox } from './types/ViewBox';
import { getColorResultFromAsinoColor, getColorResultFromColor, getColorResultFromColorId, getColorResultFromFormula } from "./utils/Color";
import { getNumberResultFromAsinoNumber, getNumberResultFromFormula, getProduct, getValueFromNumberResult } from "./utils/Number";

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

        if (references.object) {
          const object = getObjectIdFromAsinoObject(references.object, references);

          if (object !== undefined && getObjectIdsFromAsinoObjects(set?.objects, references)?.indexOf(object) !== -1) {
            set !== undefined && (result!.push(set));
          }
        }
      });
    }
  }

  return result;
}

export const getObjectFromAsinoObject = (asinoObject: AsinoObject | undefined, references: References): ObjectThing | undefined => {
  let result: ObjectThing | undefined = undefined;

  if (asinoObject === undefined) {
    // do nothing
  } else if (asinoObject.objectId !== undefined) {
    result = getObjectFromAsinoObject(references.objects[asinoObject.objectId].value, references);
  } else if (asinoObject.object !== undefined) {
    result = asinoObject.object;
  } else {
    result = getObjectFromAsinoObject(asinoObject.object, references);
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
        const objectResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setObject({ objectId: object }), solution);

        objectResult.boolean !== true && (result.boolean = false);
        result.usesSolution ||= objectResult.usesSolution;
      });
    } else if (formula.operator === 'IS_OBJECT') {
      //const newRefs = references.clone().addObjects([[{ id: getObjectIdFromAsinoObject(formula.objectOutput, references), object: references.object }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, references, solution);
    } else if (formula.operator === 'IS_OBJECT_CLASS') {
      const fixedObject = getObjectFromAsinoObject(references.object, references);
      const objectId = getObjectIdFromAsinoObject(references.object, references);
      const solutionClass = objectId !== undefined ? solution.selectedObjectClasses?.[objectId] : undefined;

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

export const minifyAsino = (asino: AsinoPuzzle): any => {
  const result: any = {};

  asino.userId !== undefined && (result[UserId] = asino.userId);
  asino.userName !== undefined && (result[UserName] = asino.userName);
  asino.title !== undefined && (result[Name] = asino.title);
  asino.dateCreated !== undefined && (result[DateCreated] = asino.dateCreated);
  asino.dateUpdated !== undefined && (result[DateUpdated] = asino.dateUpdated);
  asino.id !== undefined && (result[Id] = asino.id);
  //asino.classes !== undefined && (result[Classes] = asino.classes.map((c: AsinoClassReference) => minifyClassReference(c)));
  //asino.objects !== undefined && (result[Objects] = asino.objects.map((o: AsinoObjectReference) => minifyObjectReference(o)));
  //asino.booleans !== undefined && (result[Booleans] = asino.booleans.map((b: AsinoBooleanReference) => minifyBooleanReference(b)));
  //asino.numbers !== undefined && (result[Numbers] = asino.numbers.map((n: AsinoNumberReference) => minifyNumberReference(n)));
  //asino.interfaces !== undefined && (result[Interfaces] = asino.interfaces.map((i: AsinoInterfaceReference) => minifyInterfaceReference(i)));
  //asino.rectangles !== undefined && (result[Rectangles] = asino.rectangles.map((r: AsinoRectangleReference) => minifyRectangleReference(r)));
  //asino.circles !== undefined && (result[Circles] = asino.circles.map((c: AsinoCircleReference) => minifyCircleReference(c)));
  //asino.collections !== undefined && (result[Collections] = asino.collections.map((c: AsinoCollection) => minifyCollection(c)));
  //asino.colors !== undefined && (result[Colors] = asino.colors.map((c: AsinoColorReference) => minifyColorReference(c)));
  //asino.layers !== undefined && (result[Layers] = asino.layers.map((l: AsinoLayer) => minifyLayer(l)));
  //asino.lines !== undefined && (result[Lines] = asino.lines.map((l: AsinoLineReference) => minifyLineReference(l)));
  //asino.paths !== undefined && (result[Paths] = asino.paths.map((p: AsinoPathReference) => minifyPathReference(p)));
  //asino.groups !== undefined && (result[Groups] = asino.groups.map((g: AsinoGroupReference) => minifyGroupReference(g)));
  //asino.sets !== undefined && (result[Sets] = asino.sets.map(((s: AsinoSetReference) => minifySetReference(s))));
  //asino.commands !== undefined && (result[Commands] = asino.commands.map((c: AsinoCommandReference) => minifyCommandReference(c)));
  asino.viewBox !== undefined && (result[ViewBoxx] = minifyViewBox(asino.viewBox));

  return result;
}

const minifyViewBox = (viewBox: ViewBox): any => {
  const result: any = {};

  viewBox.minX !== undefined && (result[MinX] = minifyNumber(viewBox.minX));
  viewBox.minY !== undefined && (result[MinY] = minifyNumber(viewBox.minY));
  viewBox.width !== undefined && (result[Width] = minifyNumber(viewBox.width));
  viewBox.height !== undefined && (result[Height] = minifyNumber(viewBox.height));

  return result;
}

const minifyBooleanReference = (boolean: AsinoBooleanReference): any => {
  const result: any = {};

  //boolean.id !== undefined && (result[Id] = boolean.id);
  boolean.name !== undefined && boolean.name.value !== undefined && (result[Name] = boolean.name.value);
  //boolean.boolean !== undefined && (result[Booleann] = minifyBoolean(boolean.boolean));
  //boolean.parameters !== undefined && (result[Parameters] = boolean.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyClassReference = (asinoClass: AsinoClassReference): any => {
  const result: any = {};

  //asinoClass.id !== undefined && (result[Id] = asinoClass.id);
  asinoClass.name !== undefined && asinoClass.name.value !== undefined && (result[Name] = asinoClass.name.value);
  //asinoClass.class !== undefined && (result[Classs] = minifyClass(asinoClass.class));
  //asinoClass.classId !== undefined && asinoClass.classId !== 'NONE' && (result[ClassId] = asinoClass.classId);

  return result;
}

const minifyObjectReference = (object: AsinoObjectReference): any => {
  const result: any = {};

  //object.id !== undefined && (result[Id] = object.id);
  object.name !== undefined && object.name.value !== undefined && (result[Name] = object.name.value);
  //object.object !== undefined && (result[Objectt] = minifyObject(object.object));

  return result;
}

const minifyObject = (object: AsinoObject): any => {
  //if (typeof object === 'string') {
  //  return object;
  //} else if (isObjectObject(object)) {
  //  const result: any = {};

  //object.classFixedId !== undefined && (result[ClassFixedId] = object.classFixedId);
  //object.collectionId !== undefined && (result[CollectionId] = object.collectionId);

  //  return result;
  //} else {
  //  return minifyObjectReference(object);
  // }
}

const minifyCollection = (collection: AsinoCollectionReference): any => {
  const result: any = {};

  //collection.id !== undefined && (result[Id] = collection.id);
  collection.name !== undefined && collection.name.value !== undefined && (result[Name] = collection.name.value);

  return result;
}

const minifyLayer = (layer: AsinoLayer): any => {
  const result: any = {};

  //layer.circle !== undefined && (result[Circle] = minifyCircleReference(layer.circle));
  //layer.interface !== undefined && (result[Interface] = minifyInterface(layer.interface));
  layer.interfaceId !== undefined && layer.interfaceId !== 'NONE' && (result[InterfaceId] = layer.interfaceId)
  //layer.line !== undefined && (result[Line] = minifyLineReference(layer.line));
  layer.name !== undefined && layer.name.value !== undefined && (result[Name] = layer.name.value);
  layer.objectId !== undefined && (result[ObjectId] = layer.objectId);
  //layer.path !== undefined && (result[Path] = minifyPath(layer.path));
  layer.pathId !== undefined && layer.pathId !== 'NONE' && (result[PathId] = layer.pathId);
  //layer.group !== undefined && (result[Group] = minifyGroupReference(layer.group));
  //layer.rectangle !== undefined && (result[Rectangle] = minifyRectangle(layer.rectangle));
  layer.rectangleId !== undefined && layer.rectangleId !== 'NONE' && (result[RectangleId] = layer.rectangleId)
  //layer.parameters !== undefined && (result[Parameters] = layer.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyBoolean = (boolean: AsinoBoolean): any => {
  //if (typeof boolean === 'string') {
  //  return boolean;
  //} else if (typeof boolean === 'boolean') {
  //  return boolean;
  //} else if (isBooleanFormula(boolean)) {
  //  const result: any = {};

  //  boolean.boolean !== undefined && (result[Booleann] = minifyBoolean(boolean.boolean));
  //  boolean.classOutput !== undefined && (result[ClassOutput] = minifyClass(boolean.classOutput));
  //  boolean.classesInputs !== undefined && (result[ClassesInputs] = boolean.classesInputs.map(c => c !== undefined ? minifyClasses(c) : undefined));
  //  boolean.objectOutput !== undefined && (result[ObjectOutput] = minifyObject(boolean.objectOutput));
  //  boolean.objectsInputs !== undefined && (result[ObjectsInputs] = boolean.objectsInputs.map(o => o !== undefined ? minifyObjects(o) : undefined));
  //  boolean.operator !== undefined && boolean.operator !== 'NONE' && (result[Operator] = boolean.operator);
  //  boolean.setsInputs !== undefined && (result[SetsInputs] = boolean.setsInputs.map(s => s !== undefined ? minifySets(s) : undefined));

  //  return result;
  //} else {
  //  return minifyBooleanReference(boolean);
  //}
}

const minifyClasses = (classes: AsinoClasses): any => {
  if (typeof classes === 'string') {
    return classes;
  } else {
    classes.map((c: AsinoClass) => minifyClass(c));
  }
}

const minifyObjects = (objects: AsinoObjects): any => {
  if (typeof objects === 'string') {
    return objects;
  } else if (isObjectsFormula(objects)) {
    const result: any = {};

    objects.operator !== undefined && objects.operator !== 'NONE' && (result[Operator] = objects.operator);
    objects.objectsInputs !== undefined && (result[ObjectsInputs] = objects.objectsInputs.map(o => o !== undefined ? minifyObjects(o) : undefined));

    return result;
  } else if (isObjectsObjects(objects)) {
    return objects.map((c: AsinoObject) => minifyObject(c));
  } else {
    console.log('TODO');
  }
}

const minifySets = (sets: AsinoSets): any => {
  if (typeof sets === 'string') {
    return sets;
  } else if (isSetsFormula(sets)) {
    const result: any = {};

    sets.operator !== undefined && sets.operator !== 'NONE' && (result[Operator] = sets.operator);

    return result;
  } else if (isSetsReference(sets)) {
    return minifySetsReference(sets);
  } else {
    sets.map((s: AsinoSet) => minifySet(s));
  }
}

const minifySetsReference = (sets: AsinoSetsReference): any => {
  const result: any = {};

  //sets.id !== undefined && (result[Id] = sets.id);
  sets.name !== undefined && sets.name.value !== undefined && (result[Name] = sets.name.value);
  //sets.sets !== undefined && (result[Sets] = minifySets(sets.sets));

  return result;
}

const minifySet = (set: AsinoSet): any => {
  if (typeof set === 'string') {
    return set;
  } else if (isSetSet(set)) {
    const result: any = {};

    set.objects !== undefined && (result[Objects] = minifyObjects(set.objects));

    return result;
  } else {
    return minifySetReference(set);
  }
}

const minifyClass = (asinoClass: AsinoClass): any => {
  //if (typeof asinoClass === 'string') {
  //  return asinoClass;
  //} else if (isClassClass(asinoClass)) {
  //  const result: any = {};

  //  asinoClass.layers !== undefined && (result[Layers] = asinoClass.layers.map((l: AsinoLayer) => minifyLayer(l)));
  //asinoClass.collectionId !== undefined && asinoClass.collectionId !== 'NONE' && (result[CollectionId] = asinoClass.collectionId);
  //  asinoClass.viewBox !== undefined && (result[ViewBoxx] = minifyViewBox(asinoClass.viewBox));

  //  return result;
  //} else if (isClassFormula(asinoClass)) {
  //  const result: any = {};

  //  asinoClass.operator !== undefined && asinoClass.operator !== 'NONE' && (result[Operator] = asinoClass.operator);
  //  asinoClass.objectInputs !== undefined && (result[ObjectInputs] = asinoClass.objectInputs.map(o => o !== undefined ? minifyObject(o) : undefined));

  //  return result;
  //} else {
  //  return minifyClassReference(asinoClass);
  // }
}

const minifyNumber = (number: AsinoNumber): any => {
  return {};
}

const minifyRectangle = (rectangle: AsinoRectangle): any => {
  const result: any = {};

  //rectangle.x !== undefined && (result[X] = minifyNumber(rectangle.x));
  //rectangle.y !== undefined && (result[Y] = minifyNumber(rectangle.y));
  //rectangle.width !== undefined && (result[Width] = minifyNumber(rectangle.width));
  //rectangle.height !== undefined && (result[Height] = minifyNumber(rectangle.height));
  //rectangle.fill !== undefined && (result[Fill] = minifyColor(rectangle.fill));
  //rectangle.stroke !== undefined && (result[Stroke] = minifyColor(rectangle.stroke));
  //rectangle.strokeWidth !== undefined && (result[StrokeWidth] = minifyNumber(rectangle.strokeWidth));

  return result;
}

const minifyCircle = (circle: AsinoCircle): any => {
  const result: any = {};

  //circle.cx !== undefined && (result[CX] = minifyNumber(circle.cx));
  //circle.cy !== undefined && (result[CY] = minifyNumber(circle.cy));
  //circle.r !== undefined && (result[R] = minifyNumber(circle.r));
  //circle.fill !== undefined && (result[Fill] = minifyColor(circle.fill));
  //circle.stroke !== undefined && (result[Stroke] = minifyColor(circle.stroke));
  //circle.strokeWidth !== undefined && (result[StrokeWidth] = minifyNumber(circle.strokeWidth));

  return result;
}

const minifyColor = (color: AsinoColor): any => {
  //if (typeof color === 'string') {
  //  return color;
  //} else if (isColorFormula(color)) {
  //  const result: any = {};

  //  color.operator !== undefined && color.operator !== 'NONE' && (result[Operator] = color.operator);
  //  color.colorInputs !== undefined && (result[ColorInputs] = color.colorInputs.map(c => c !== undefined ? minifyColor(c) : undefined));
  //  color.booleanInputs !== undefined && (result[BooleanInputs] = color.booleanInputs.map(b => b !== undefined ? minifyBoolean(b) : undefined));

  //  return result;
  //} else {
  //  console.log('TODO');
  //}
}

const minifyNumberReference = (number: AsinoNumberReference): any => {
  const result: any = {};

  //number.id !== undefined && (result[Id] = number.id);
  number.name !== undefined && number.name.value !== undefined && (result[Name] = number.name.value);
  //number.number !== undefined && (result[Numberr] = minifyNumber(number.number));
  //number.parameters !== undefined && (result[Parameters] = number.parameters.map((p) => minifyParameter(p)));

  return result;
}

const minifyRectangleReference = (rectangle: AsinoRectangleReference): any => {
  const result: any = {};

  //rectangle.id !== undefined && (result[Id] = rectangle.id);
  rectangle.name !== undefined && rectangle.name.value !== undefined && (result[Name] = rectangle.name.value);
  //rectangle.rectangle !== undefined && (result[Rectangle] = minifyRectangle(rectangle.rectangle))
  //rectangle.rectangleId !== undefined && rectangle.rectangleId !== 'NONE' && (result[RectangleId] = rectangle.rectangleId);
  //rectangle.parameters !== undefined && (result[Parameters] = rectangle.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyCircleReference = (circle: AsinoCircleReference): any => {
  const result: any = {};

  //circle.id !== undefined && (result[Id] = circle.id);
  circle.name !== undefined && circle.name.value !== undefined && (result[Name] = circle.name.value);
  //circle.circle !== undefined && (result[Circle] = minifyCircle(circle.circle))
  //circle.parameters !== undefined && (result[Parameters] = circle.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyColorReference = (color: AsinoColorReference): any => {
  const result: any = {};

  //color.id !== undefined && (result[Id] = color.id);
  color.name !== undefined && color.name.value !== undefined && (result[Name] = color.name.value);
  //color.color !== undefined && (result[Colorr] = minifyColor(color.color));

  return result;
}

const minifyLineReference = (line: AsinoLineReference): any => {
  const result: any = {};

  //line.id !== undefined && (result[Id] = line.id);
  line.name !== undefined && line.name.value !== undefined && (result[Name] = line.name.value);
  //line.line !== undefined && (result[Line] = minifyLine(line.line))
  //line.parameters !== undefined && (result[Parameters] = line.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyLine = (line: AsinoLine): any => {
  const result: any = {};

  //line.x1 !== undefined && (result[X1] = minifyNumber(line.x1));
  //line.x2 !== undefined && (result[X2] = minifyNumber(line.x2));
  //line.y1 !== undefined && (result[Y1] = minifyNumber(line.y1));
  //line.y2 !== undefined && (result[Y2] = minifyNumber(line.y2));
  //line.stroke !== undefined && (result[Stroke] = minifyColor(line.stroke));
  //line.strokeWidth !== undefined && (result[StrokeWidth] = minifyNumber(line.strokeWidth));

  return result;
}

const minifyPathReference = (path: AsinoPathReference): any => {
  const result: any = {};

  //path.id !== undefined && (result[Id] = path.id);
  path.name !== undefined && path.name.value !== undefined && (result[Name] = path.name.value);
  //path.path !== undefined && (result[Path] = minifyPath(path.path))
  //path.parameters !== undefined && (result[Parameters] = path.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyGroupReference = (group: AsinoGroupReference): any => {
  const result: any = {};

  //group.id !== undefined && (result[Id] = group.id);
  group.name !== undefined && group.name.value !== undefined && (result[Name] = group.name.value);
  //group.group !== undefined && (result[Group] = minifyGroup(group.group))
  //group.parameters !== undefined && (result[Parameters] = group.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyPath = (path: AsinoPath): any => {
  const result: any = {};

  //path.commands !== undefined && (result[Commands] = path.commands.map(c => minifyCommand(c)));
  //path.fill !== undefined && (result[Fill] = minifyColor(path.fill));
  //path.stroke !== undefined && (result[Stroke] = minifyColor(path.stroke));
  //path.strokeWidth !== undefined && (result[StrokeWidth] = minifyNumber(path.strokeWidth));

  return result;
}

const minifyGroup = (group: AsinoGroup): any => {
  const result: any = {};

  //group.layers !== undefined && (result[Layers] = group.layers.map(l => minifyLayer(l)));
  //group.transform !== undefined && (result[Transform] = minifyTransform(group.transform));

  return result;
}

const minifyTransform = (transform: AsinoTransform): any => {
  const result: any = {};

  if (transform.matrix !== undefined) {
    const matrix: any = {};

    transform.matrix.a !== undefined && (matrix[A] = minifyNumber(transform.matrix.a));
    transform.matrix.b !== undefined && (matrix[B] = minifyNumber(transform.matrix.b));
    transform.matrix.c !== undefined && (matrix[C] = minifyNumber(transform.matrix.c));
    transform.matrix.d !== undefined && (matrix[D] = minifyNumber(transform.matrix.d));
    transform.matrix.e !== undefined && (matrix[E] = minifyNumber(transform.matrix.e));
    transform.matrix.f !== undefined && (matrix[F] = minifyNumber(transform.matrix.f));

    result[TransformMatrix] = matrix;
  }

  if (transform.rotate !== undefined) {
    const rotate: any = {};

    transform.rotate.a !== undefined && (rotate[A] = minifyNumber(transform.rotate.a));
    transform.rotate.x !== undefined && (rotate[X] = minifyNumber(transform.rotate.x));
    transform.rotate.y !== undefined && (rotate[Y] = minifyNumber(transform.rotate.y));

    result[TransformRotate] = rotate;
  }

  if (transform.scale !== undefined) {
    const scale: any = {};

    transform.scale.x !== undefined && (scale[X] = minifyNumber(transform.scale.x));
    transform.scale.y !== undefined && (scale[Y] = minifyNumber(transform.scale.y));

    result[TransformScale] = scale;
  }

  if (transform.translate !== undefined) {
    const translate: any = {};

    transform.translate.x !== undefined && (translate[X] = minifyNumber(transform.translate.x));
    transform.translate.y !== undefined && (translate[Y] = minifyNumber(transform.translate.y));

    result[TransformTranslate] = translate;
  }

  return result;
}

const minifyCommandReference = (command: AsinoCommandReference): any => {
  const result: any = {};

  //command.id !== undefined && (result[Id] = command.id);
  command.name !== undefined && command.name.value !== undefined && (result[Name] = command.name.value);
  console.log('todo', command);

  return result;
}

const minifyCommand = (command: AsinoCommand): any => {
  console.log('todo', command);
}

const minifySetReference = (set: AsinoSetReference): any => {
  const result: any = {};

  //set.id !== undefined && (result[Id] = set.id);
  set.name !== undefined && set.name.value !== undefined && (result[Name] = set.name.value);
  //set.set !== undefined && (result[Sett] = minifySet(set.set));

  return result;
}

const minifyInterfaceReference = (asinoInterface: AsinoInterfaceReference): any => {
  const result: any = {};

  //asinoInterface.id !== undefined && (result[Id] = asinoInterface.id);
  asinoInterface.name !== undefined && asinoInterface.name.value !== undefined && (result[Name] = asinoInterface.name.value);
  //asinoInterface.interface !== undefined && (result[Interface] = minifyInterface(asinoInterface.interface))
  //asinoInterface.interfaceId !== undefined && asinoInterface.interfaceId !== 'NONE' && (result[InterfaceId] = asinoInterface.interfaceId);
  //asinoInterface.parameters !== undefined && (result[Parameters] = asinoInterface.parameters.map((p) => minifyParameter(p)))

  return result;
}

const minifyInterface = (asinoInterface: AsinoInterface): any => {
  const result: any = {};

  //asinoInterface.x !== undefined && (result[X] = minifyNumber(asinoInterface.x));
  //asinoInterface.y !== undefined && (result[Y] = minifyNumber(asinoInterface.y));
  //asinoInterface.width !== undefined && (result[Width] = minifyNumber(asinoInterface.width));
  //asinoInterface.height !== undefined && (result[Height] = minifyNumber(asinoInterface.height));
  //asinoInterface.collectionId !== undefined && (result[CollectionId] = asinoInterface.collectionId);
  //asinoInterface.fixedClassId !== undefined && (result[FixedClassId] = asinoInterface.fixedClassId);
  //asinoInterface.objectId !== undefined && (result[ObjectId] = asinoInterface.objectId);
  //asinoInterface.borderTopHeight !== undefined && (result[BorderTopHeight] = minifyNumber(asinoInterface.borderTopHeight));
  //asinoInterface.borderRightWidth !== undefined && (result[BorderRightWidth] = minifyNumber(asinoInterface.borderRightWidth));
  //asinoInterface.borderBottomHeight !== undefined && (result[BorderBottomHeight] = minifyNumber(asinoInterface.borderBottomHeight));
  //asinoInterface.borderLeftWidth !== undefined && (result[BorderLeftWidth] = minifyNumber(asinoInterface.borderLeftWidth));
  //asinoInterface.borderTopFill !== undefined && (result[BorderTopFill] = minifyColor(asinoInterface.borderTopFill));
  //asinoInterface.borderRightFill !== undefined && (result[BorderRightFill] = minifyColor(asinoInterface.borderRightFill));
  //asinoInterface.borderBottomFill !== undefined && (result[BorderBottomFill] = minifyColor(asinoInterface.borderBottomFill));
  //asinoInterface.borderLeftFill !== undefined && (result[BorderLeftFill] = minifyColor(asinoInterface.borderLeftFill));
  //asinoInterface.paddingTopHeight !== undefined && (result[PaddingTopHeight] = minifyNumber(asinoInterface.paddingTopHeight));
  //asinoInterface.paddingRightWidth !== undefined && (result[PaddingRightWidth] = minifyNumber(asinoInterface.paddingRightWidth));
  //asinoInterface.paddingBottomHeight !== undefined && (result[PaddingBottomHeight] = minifyNumber(asinoInterface.paddingBottomHeight));
  //asinoInterface.paddingLeftWidth !== undefined && (result[PaddingLeftWidth] = minifyNumber(asinoInterface.paddingLeftWidth));
  //asinoInterface.alignmentHorizontal !== undefined && (result[AlignmentHorizonal] = minifyNumber(asinoInterface.alignmentHorizontal));
  //asinoInterface.alignmentVertical !== undefined && (result[AlignmentVertical] = minifyNumber(asinoInterface.alignmentVertical));
  //asinoInterface.fill !== undefined && (result[Fill] = minifyColor(asinoInterface.fill));
  //asinoInterface.fillSelected !== undefined && (result[FillSelected] = minifyColor(asinoInterface.fillSelected));

  return result;
}

export const unminifyAsino = (asino: any): AsinoPuzzle => {
  const result: AsinoPuzzle = {};

  asino[UserId] !== undefined && (result.userId = asino[UserId]);
  asino[UserName] !== undefined && (result.userName = asino[UserName]);
  asino[Name] !== undefined && (result.title = asino[Name]);
  asino[DateCreated] !== undefined && (result.dateCreated = asino[DateCreated]);
  asino[DateUpdated] !== undefined && (result.dateUpdated = asino[DateUpdated]);
  asino[Id] !== undefined && (result.id = asino[Id]);
  asino[Booleans] !== undefined && (result.booleans = asino[Booleans].map((b: any) => unminifyBooleanReference(b)));
  asino[Numbers] !== undefined && (result.numbers = asino[Numbers].map((n: any) => unminifyNumberReference(n)));
  asino[Rectangles] !== undefined && (result.rectangles = asino[Rectangles].map((r: any) => unminifyRectangleReference(r)));
  asino[Circles] !== undefined && (result.circles = asino[Circles].map((c: any) => unminifyCircleReference(c)));
  asino[Classes] !== undefined && (result.classes = asino[Classes].map((c: any) => unminifyClassReference(c)));
  asino[Collections] !== undefined && (result.collections = asino[Collections].map((c: any) => unminifyCollection(c)));
  asino[Colors] !== undefined && (result.colors = asino[Colors].map((c: any) => unminifyColorReference(c)));
  asino[Commands] !== undefined && (result.commands = asino[Commands].map((c: any) => unminifyCommandReference(c)));
  asino[Interfaces] !== undefined && (result.interfaces = asino[Interfaces].map((c: any) => unminifyInterfaceReference(c)));
  asino[Layers] !== undefined && (result.layers = asino[Layers].map((l: any) => unminifyLayer(l)));
  asino[Lines] !== undefined && (result.lines = asino[Lines].map((l: any) => unminifyLineReference(l)));
  asino[Objects] !== undefined && (result.objects = asino[Objects].map((o: any) => unminifyObjectReference(o)));
  asino[Paths] !== undefined && (result.paths = asino[Paths].map((p: any) => unminifyPathReference(p)));
  asino[Groups] !== undefined && (result.groups = asino[Groups].map((g: any) => unminifyGroupReference(g)));
  asino[Sets] !== undefined && (result.sets = asino[Sets].map((s: any) => unminifySetReference(s)));
  asino[ViewBoxx] !== undefined && (result.viewBox = unminifyViewBox(asino[ViewBoxx]));

  return result;
}

const unminifyBooleanReference = (boolean: any): AsinoBooleanReference => {
  const result: AsinoBooleanReference = {};

  //boolean[Id] !== undefined && (result.id = boolean[Id]);
  boolean[Name] !== undefined && (result.name = { value: boolean[Name] });
  //boolean[Booleann] !== undefined && (result.boolean = unminifyBoolean(boolean[Booleann]));
  //boolean[Parameters] !== undefined && (result.parameters = boolean[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyCollection = (collection: any): AsinoCollectionReference => {
  const result: AsinoCollectionReference = {};

  //collection[Id] !== undefined && (result.id = collection[Id]);
  collection[Name] !== undefined && (result.name = { value: collection[Name] });

  return result;
}

const unminifyLayer = (layer: any): AsinoLayer => {
  const result: AsinoLayer = {};

  layer[Name] !== undefined && (result.name = { value: layer[Name] });
  //layer[Circle] !== undefined && (result.circle = unminifyCircleReference(layer[Circle]));
  //layer[Interface] !== undefined && (result.interface = unminifyInterface(layer[Interface]));
  layer[InterfaceId] !== undefined && (result.interfaceId = layer[InterfaceId]);
  //layer[Line] !== undefined && (result.line = unminifyLineReference(layer[Line]));
  layer[ObjectId] !== undefined && (result.objectId = layer[ObjectId]);
  //layer[Path] !== undefined && (result.path = unminifyPath(layer[Path]));
  layer[PathId] !== undefined && (result.pathId = layer[PathId]);
  //layer[Group] !== undefined && (result.group = unminifyGroupReference(layer[Group]));
  //layer[Rectangle] !== undefined && (result.rectangle = unminifyRectangle(layer[Rectangle]));
  layer[RectangleId] !== undefined && (result.rectangleId = layer[RectangleId]);
  //layer[Parameters] !== undefined && (result.parameters = layer[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

// have got up to here, this is exhausting

const unminifyBoolean = (boolean: any): AsinoBoolean => {
  if (typeof boolean === 'string') {
    //return boolean;
  } else if (typeof boolean === 'boolean') {
    //return boolean;
  } else if (Operator in boolean) {
    const result: BooleanFormula = {};

    boolean[Operator] !== undefined && (result.operator = boolean[Operator]);
    boolean[Booleann] !== undefined && (result.boolean = unminifyBoolean(boolean[Booleann]));
    //boolean[ClassOutput] !== undefined && (result.classOutput = unminifyClass(boolean[ClassOutput]));
    boolean[ClassesInputs] !== undefined && (result.classesInputs = boolean[ClassesInputs].map((c: any) => unminifyClass(c)));
    boolean[ObjectOutput] !== undefined && (result.objectOutput = unminifyObject(boolean[ObjectOutput]));
    boolean[ObjectsInputs] !== undefined && (result.objectsInputs = boolean[ObjectsInputs].map((o: any) => unminifyObject(o)));
    boolean[SetsInputs] !== undefined && (result.setsInputs = boolean[SetsInputs].map((s: any) => unminifySet(s)));

    //return result;
  } else {
    //return unminifyBooleanReference(boolean);
  }

  return {};
}

const unminifyNumber = (number: any): AsinoNumber => {
  if (typeof number === 'string') {
    //return number;
  } else if (Integer in number) {
    return number[Integer];
  } else if (Operator in number) {
    const result: NumberFormula = {};

    number[Operator] !== undefined && (result.operator = number[Operator]);
    number[NumberInputs] !== undefined && (result.numberInputs = number[NumberInputs].map((n: any) => n !== undefined ? unminifyNumber(n) : undefined));

    //return result;
  } else if (Denominator in number && Numerator in number) {
    //const result: Fraction = {};

    //number[Numerator] !== undefined && (result.numerator = unminifyNumber(number[Numerator]));
    //number[Denominator] !== undefined && (result.denominator = unminifyNumber(number[Denominator]));

    //return result;
  } else {
    //return unminifyNumberReference(number);
  }

  return {};
}

const unminifyNumberReference = (number: any): AsinoNumberReference => {
  const result: AsinoNumberReference = {};

  //number[Id] !== undefined && (result.id = number[Id]);
  number[Name] !== undefined && (result.name = { value: number[Name] });
  //number[Numberr] !== undefined && (result.number = unminifyNumber(number[Numberr]));
  //number[Parameters] !== undefined && (result.parameters = number[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyRectangleReference = (rectangle: any): AsinoRectangleReference => {
  const result: AsinoRectangleReference = {};

  //rectangle[Id] !== undefined && (result.id = rectangle[Id]);
  rectangle[Name] !== undefined && (result.name = { value: rectangle[Name] });
  //rectangle[Rectangle] !== undefined && (result.rectangle = unminifyRectangle(rectangle[Rectangle]));
  //rectangle[RectangleId] !== undefined && (result.rectangleId = rectangle[RectangleId]);
  //rectangle[Parameters] !== undefined && (result.parameters = rectangle[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyRectangle = (rectangle: any): AsinoRectangle => {
  const result: AsinoRectangle = {};

  //rectangle[X] !== undefined && (result.x = unminifyNumber(rectangle[X]));
  //rectangle[Y] !== undefined && (result.y = unminifyNumber(rectangle[Y]));
  //rectangle[Width] !== undefined && (result.width = unminifyNumber(rectangle[Width]));
  //rectangle[Height] !== undefined && (result.height = unminifyNumber(rectangle[Height]));
  //rectangle[Fill] !== undefined && (result.fill = unminifyColor(rectangle[Fill]));
  //rectangle[Stroke] !== undefined && (result.stroke = unminifyColor(rectangle[Stroke]));
  //rectangle[StrokeWidth] !== undefined && (result.strokeWidth = unminifyNumber(rectangle[StrokeWidth]));

  return result;
}

const unminifyCircleReference = (circle: any): AsinoCircleReference => {
  const result: AsinoCircleReference = {};

  //circle[Id] !== undefined && (result.id = circle[Id]);
  circle[Name] !== undefined && (result.name = { value: circle[Name] });
  //circle[Parameters] !== undefined && (result.parameters = circle[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyClassReference = (asinoClass: any): AsinoClassReference => {
  const result: AsinoClassReference = {};

  //asinoClass[Id] !== undefined && (result.id = asinoClass[Id]);
  asinoClass[Name] !== undefined && (result.name = { value: asinoClass[Name] });
  //asinoClass[Classs] !== undefined && (result.class = unminifyClass(asinoClass[Classs]));
  //asinoClass[ClassId] !== undefined && (result.classId = asinoClass[ClassId]);

  return result;
}

const unminifyClass = (asinoClass: any): Class => {
  const result: Class = {};

  asinoClass[Layers] !== undefined && (result.layers = asinoClass[Layers].map((l: any) => unminifyLayer(l)));
  //asinoClass[CollectionId] !== undefined && (result.collectionId = asinoClass[CollectionId]);
  asinoClass[ViewBoxx] !== undefined && (result.viewBox = unminifyViewBox(asinoClass[ViewBoxx]));

  return result;
}

const unminifyViewBox = (viewBox: any): ViewBox => {
  const result: ViewBox = {};

  viewBox[MinX] !== undefined && (result.minX = unminifyNumber(viewBox[MinX]));
  viewBox[MinY] !== undefined && (result.minY = unminifyNumber(viewBox[MinY]));
  viewBox[Width] !== undefined && (result.width = unminifyNumber(viewBox[Width]));
  viewBox[Height] !== undefined && (result.height = unminifyNumber(viewBox[Height]));

  return result;
}

const unminifySet = (asinoSet: any): AsinoSet => {
  if (typeof asinoSet === 'string') {
    return asinoSet;
  } else if (Objects in asinoSet) {
    const result: Set = {};

    asinoSet[Objects] !== undefined && (result.objects = asinoSet[Objects].map((o: any) => o !== undefined ? unminifyObject(o) : undefined));

    return result;
  } else {
    return unminifySetReference(asinoSet);
  }
}

const unminifyObject = (asinoObject: any): AsinoObject => {
  if (typeof asinoObject === 'string') {
    //return asinoObject;
  } else if (CollectionId in asinoObject) {
    const result: ObjectThing = {};

    //asinoObject[ClassFixedId] !== undefined && (result.classFixedId = asinoObject[ClassFixedId]);
    //asinoObject[CollectionId] !== undefined && (result.collectionId = asinoObject[CollectionId]);

    //return result;
  } else {
    //return unminifyObjectReference(asinoObject);
  }

  return {};
}

const unminifyColorReference = (color: any): AsinoColorReference => {
  const result: AsinoColorReference = {};

  //color[Id] !== undefined && (result.id = color[Id]);
  color[Name] !== undefined && (result.name = { value: color[Name] });
  //color[Colorr] !== undefined && (result.color = unminifyColor(color[Colorr]));

  return result;
}

const unminifyCommandReference = (command: any): AsinoCommandReference => {
  const result: AsinoCommandReference = {};

  //command[Id] !== undefined && (result.id = command[Id]);
  command[Name] !== undefined && (result.name = { value: command[Name] });
  console.log('TODO');

  return result;
}

const unminifyInterfaceReference = (asinoInterface: any): AsinoInterfaceReference => {
  const result: AsinoInterfaceReference = {};

  //asinoInterface[Id] !== undefined && (result.id = asinoInterface[Id]);
  asinoInterface[Name] !== undefined && (result.name = { value: asinoInterface[Name] });
  //asinoInterface[Interface] !== undefined && (result.interface = unminifyInterface(asinoInterface[Interface]));
  //asinoInterface[InterfaceId] !== undefined && (result.interfaceId = asinoInterface[InterfaceId]);
  //asinoInterface[Parameters] !== undefined && (result.parameters = asinoInterface[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyInterface = (asinoInterface: any): AsinoInterface => {
  const result: AsinoInterface = {};

  //asinoInterface[CollectionId] !== undefined && (result.collectionId = asinoInterface[CollectionId]);
  //asinoInterface[FixedClassId] !== undefined && (result.fixedClassId = asinoInterface[FixedClassId]);
  //asinoInterface[Height] !== undefined && (result.height = unminifyNumber(asinoInterface[Height]));
  //asinoInterface[Width] !== undefined && (result.width = unminifyNumber(asinoInterface[Width]));
  //asinoInterface[X] !== undefined && (result.x = unminifyNumber(asinoInterface[X]));
  //asinoInterface[Y] !== undefined && (result.y = unminifyNumber(asinoInterface[Y]));
  //asinoInterface[ObjectId] !== undefined && (result.objectId = asinoInterface[ObjectId]);
  //asinoInterface[BorderTopHeight] !== undefined && (result.borderTopHeight = unminifyNumber(asinoInterface[BorderTopHeight]));
  //asinoInterface[BorderRightWidth] !== undefined && (result.borderRightWidth = unminifyNumber(asinoInterface[BorderRightWidth]));
  //asinoInterface[BorderBottomHeight] !== undefined && (result.borderBottomHeight = unminifyNumber(asinoInterface[BorderBottomHeight]));
  //asinoInterface[BorderLeftWidth] !== undefined && (result.borderLeftWidth = unminifyNumber(asinoInterface[BorderLeftWidth]));
  //asinoInterface[BorderTopFill] !== undefined && (result.borderTopFill = unminifyColor(asinoInterface[BorderTopFill]));
  //asinoInterface[BorderRightFill] !== undefined && (result.borderRightFill = unminifyColor(asinoInterface[BorderRightFill]));
  //asinoInterface[BorderBottomFill] !== undefined && (result.borderBottomFill = unminifyColor(asinoInterface[BorderBottomFill]));
  //asinoInterface[BorderLeftFill] !== undefined && (result.borderLeftFill = unminifyColor(asinoInterface[BorderLeftFill]));
  //asinoInterface[PaddingTopHeight] !== undefined && (result.paddingTopHeight = unminifyNumber(asinoInterface[PaddingTopHeight]));
  //asinoInterface[PaddingRightWidth] !== undefined && (result.paddingRightWidth = unminifyNumber(asinoInterface[PaddingRightWidth]));
  //asinoInterface[PaddingBottomHeight] !== undefined && (result.paddingBottomHeight = unminifyNumber(asinoInterface[PaddingBottomHeight]));
  //asinoInterface[PaddingLeftWidth] !== undefined && (result.paddingLeftWidth = unminifyNumber(asinoInterface[PaddingLeftWidth]));
  //asinoInterface[AlignmentHorizonal] !== undefined && (result.alignmentHorizontal = unminifyNumber(asinoInterface[AlignmentHorizonal]));
  //asinoInterface[AlignmentVertical] !== undefined && (result.alignmentVertical = unminifyNumber(asinoInterface[AlignmentVertical]));
  //asinoInterface[Fill] !== undefined && (result.fill = unminifyColor(asinoInterface[Fill]));
  //asinoInterface[FillSelected] !== undefined && (result.fillSelected = unminifyColor(asinoInterface[FillSelected]));

  return result;
}

const unminifyColor = (color: any): AsinoColorReference => {
  const result: AsinoColorReference = {};

  console.log('TODO');

  return result;
}

const unminifyLineReference = (line: any): AsinoLineReference => {
  const result: AsinoLineReference = {};

  //line[Id] !== undefined && (result.id = line[Id]);
  line[Name] !== undefined && (result.name = { value: line[Name] });
  //line[Line] !== undefined && (result.line = unminifyLine(line[Line]));
  //line[Parameters] !== undefined && (result.parameters = line[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyLine = (line: any): AsinoLine => {
  const result: AsinoLine = {};

  //line[X1] !== undefined && (result.x1 = unminifyNumber(line[X1]));
  //line[X2] !== undefined && (result.x2 = unminifyNumber(line[X2]));
  //line[Y1] !== undefined && (result.y1 = unminifyNumber(line[Y1]));
  //line[Y2] !== undefined && (result.y2 = unminifyNumber(line[Y2]));
  //line[Stroke] !== undefined && (result.stroke = unminifyColor(line[Stroke]));
  //line[StrokeWidth] !== undefined && (result.strokeWidth = unminifyNumber(line[StrokeWidth]));

  return result;
}

const unminifyObjectReference = (object: any): AsinoObjectReference => {
  const result: AsinoObjectReference = {};

  //object[Id] !== undefined && (result.id = object[Id]);
  object[Name] !== undefined && (result.name = { value: object[Name] });
  //object[Objectt] !== undefined && (result.object = unminifyObject(object[Objectt]));

  return result;
}

const unminifyPathReference = (path: any): AsinoPathReference => {
  const result: AsinoPathReference = {};

  //path[Id] !== undefined && (result.id = path[Id]);
  path[Name] !== undefined && (result.name = { value: path[Name] });
  //path[Path] !== undefined && (result.path = unminifyPath(path[Path]));
  //path[Parameters] !== undefined && (result.parameters = path[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyGroupReference = (group: any): AsinoGroupReference => {
  const result: AsinoGroupReference = {};

  //group[Id] !== undefined && (result.id = group[Id]);
  group[Name] !== undefined && (result.name = { value: group[Name] });
  //group[Group] !== undefined && (result.group = unminifyGroup(group[Group]));
  //group[Parameters] !== undefined && (result.parameters = group[Parameters].map((p: any) => unminifyParameter(p)));

  return result;
}

const unminifyPath = (path: any): AsinoPath => {
  const result: AsinoPath = {};

  console.log('TODO');

  return result;
}

const unminifyGroup = (group: any): AsinoGroup => {
  const result: AsinoGroup = {};

  //group[Layers] !== undefined && (result.layers = group[Layers].map((l: any) => unminifyLayer(l)));
  //group[Transform] !== undefined && (result.transform = unminifyTransform(group[Transform]));

  return result;
}

const unminifyTransform = (transform: any): AsinoTransform => {
  const result: AsinoTransform = {};

  if (transform[TransformMatrix] !== undefined) {
    const matrix: AsinoMatrix = {};

    transform[TransformMatrix][A] !== undefined && (matrix.a = minifyNumber(transform[TransformMatrix][A]));
    transform[TransformMatrix][B] !== undefined && (matrix.b = minifyNumber(transform[TransformMatrix][B]));
    transform[TransformMatrix][C] !== undefined && (matrix.c = minifyNumber(transform[TransformMatrix][C]));
    transform[TransformMatrix][D] !== undefined && (matrix.d = minifyNumber(transform[TransformMatrix][D]));
    transform[TransformMatrix][E] !== undefined && (matrix.e = minifyNumber(transform[TransformMatrix][E]));
    transform[TransformMatrix][F] !== undefined && (matrix.f = minifyNumber(transform[TransformMatrix][F]));

    result.matrix = matrix;
  }

  if (transform[TransformRotate] !== undefined) {
    const rotate: AsinoRotate = {};

    transform[TransformRotate][A] !== undefined && (rotate.a = minifyNumber(transform[TransformRotate][A]));
    transform[TransformRotate][X] !== undefined && (rotate.x = minifyNumber(transform[TransformRotate][X]));
    transform[TransformRotate][Y] !== undefined && (rotate.y = minifyNumber(transform[TransformRotate][Y]));

    result.rotate = rotate;
  }

  if (transform[TransformScale] !== undefined) {
    const scale: AsinoScale = {};

    transform[TransformScale][X] !== undefined && (scale.x = minifyNumber(transform[TransformScale][X]));
    transform[TransformScale][Y] !== undefined && (scale.y = minifyNumber(transform[TransformScale][Y]));

    result.scale = scale;
  }

  if (transform[TransformTranslate] !== undefined) {
    const translate: AsinoTranslate = {};

    transform[TransformTranslate][X] !== undefined && (translate.x = minifyNumber(transform[TransformTranslate][X]));
    transform[TransformTranslate][Y] !== undefined && (translate.y = minifyNumber(transform[TransformTranslate][Y]));

    result.translate = translate;
  }

  return result;
}

const unminifySetReference = (set: any): AsinoSetReference => {
  const result: AsinoSetReference = {};

  //set[Id] !== undefined && (result.id = set[Id]);
  set[Name] !== undefined && (result.name = { value: set[Name] });
  //set[Sett] !== undefined && (result.set = unminifySet(set[Sett]));

  return result;
}

const A = 'a';
const AlignmentHorizonal = 'athl';
const AlignmentVertical = 'atvl';

const B = 'b';
const Booleann = 'bn';
const Booleans = 'bns';
const BooleanInputs = 'bnits';
const BorderTopHeight = 'brtpht';
const BorderRightWidth = 'brrtwh';
const BorderBottomHeight = 'brbmht';
const BorderLeftWidth = 'brltwh';
const BorderTopFill = 'brtpfl';
const BorderRightFill = 'brrtfl';
const BorderBottomFill = 'brbtfl';
const BorderLeftFill = 'brltfl';

const C = 'c';
const Circle = 'ce';
const Circles = 'ces';
const Classs = 'cs';
const ClassId = 'csid';
const ClassOutput = 'csot';
const ClassFixedId = 'csfdid';
const ClassesInputs = 'cssits';
const Classes = 'css';
const Commands = 'cds';
const CollectionId = 'cnid';
const Collections = 'cns';
const ColorInputs = 'crits';
const Colorr = 'cr';
const ColorId = 'crid';
const Colors = 'crs';
const CX = 'cx';
const CY = 'cy';

const D = 'd';
const Denominator = 'dr';
const DateCreated = 'decd';
const DateUpdated = 'deud';

const E = 'e';

const F = 'f';
const Fill = 'fl';
const FillSelected = 'flsd';
const FixedClassId = 'fdcsid';

const Group = 'gp';
const Groups = 'gps';

const Height = 'ht';

const Id = 'id';
const Integer = 'ir';
const Interface = 'ie';
const InterfaceId = 'ieid';
const Interfaces = 'ies';

const Layers = 'lrs';
const Line = 'le';
const Lines = 'les';

const MinX = 'mnx';
const MinY = 'mny';

const Name = 'ne';
const Numberr = 'nr';
const NumberId = 'nrid';
const Numbers = 'nrs';
const NumberInputs = 'nrits';
const Numerator = 'nr';

const ObjectOutput = 'otot';
const ObjectInputs = 'otits';
const ObjectsInputs = 'otsits';
const ObjectId = 'otid';
const Objectt = 'ot';
const Objects = 'ots';
const Operator = 'or';

const PaddingTopHeight = 'pgtpht';
const PaddingRightWidth = 'pgrtwh';
const PaddingBottomHeight = 'pgbmht';
const PaddingLeftWidth = 'pgltwh';
const Path = 'ph';
const PathId = 'phid';
const Paths = 'phs';
const Parameters = 'prs';

const R = 'r';

const Rectangle = 're';
const RectangleId = 'reid';
const Rectangles = 'res';

const Sett = 'st';
const SetsInputs = 'stsits';
const Sets = 'sts';
const Stroke = 'se';
const StrokeWidth = 'sewh';

const Transform = 'tm';
const TransformMatrix = 'tmmx';
const TransformRotate = 'tmre';
const TransformScale = 'tmse';
const TransformTranslate = 'tmte';

const UserId = 'urid';
const UserName = 'urne';

const ViewBoxx = 'vwbx';

const Width = 'wh';

const X = 'x';
const X1 = 'x1';
const X2 = 'x2';

const Y = 'y';
const Y1 = 'y1';
const Y2 = 'y2';
