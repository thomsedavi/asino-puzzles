import { References } from "./References";
import { Addition, Division, Multiplication, Subtraction } from "./consts";
import { AsinoCollection, AsinoPuzzle, Solution } from "./interfaces";
import { AsinoBoolean, AsinoBooleanReference, BooleanFormula, isBooleanFormula } from "./types/Boolean";
import { AsinoCircle, AsinoCircleReference } from "./types/Circle";
import { AsinoClass, AsinoClassReference, AsinoClasses, Class, ClassFormula, isClassClass, isClassFormula } from "./types/Class";
import { AsinoColor, AsinoColorReference, ColorFormula, isColorFormula } from "./types/Color";
import { AsinoInterfaceReference } from "./types/Interface";
import { AsinoLayer } from "./types/Layer";
import { AsinoLineReference } from "./types/Line";
import { AsinoNumber, AsinoNumberReference, Number, isNumberFormula, isAsinoNumberFraction, NumberFormula, isNumberEditedNumber } from "./types/Number";
import { AsinoObject, AsinoObjectReference, AsinoObjects, Object, isObjectObject, isObjectsFormula } from "./types/Object";
import { AsinoPathReference } from "./types/Path";
import { AsinoRectangle, AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSet, AsinoSetReference, AsinoSets, Set, SetsFormula, isSetSet, isSetsFormula } from "./types/Set";

export const getSum = (left: Number | undefined, right: Number | undefined, references: References): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left + right;
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getSum(getProduct(left, getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()), getNumberFromAsinoNumber(right.numerator, references.clone()), references.clone()), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 0;
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return 0;
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getSum(getProduct(right, getNumberFromAsinoNumber(left.denominator, references.clone()), references.clone()), getNumberFromAsinoNumber(left.numerator, references.clone()), references.clone()), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getSum(getProduct(getNumberFromAsinoNumber(left.numerator, references.clone()), getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()), getProduct(getNumberFromAsinoNumber(right.numerator, references.clone()), getNumberFromAsinoNumber(left.denominator, references.clone()), references.clone()), references.clone()), denominator: getProduct(getNumberFromAsinoNumber(left.denominator, references.clone()), getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()) };
    }
  }
}

export const getDifference = (left: Number | undefined, right: Number | undefined, references: References): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left - right;
    } else if (right === 'infinity') {
      return 'negativeInfinity';
    } else if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return { numerator: getSum(getProduct(left, getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()), getNumberFromAsinoNumber(right.numerator, references.clone()), references.clone()), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 0
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return 0
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getSum(getProduct(right, getNumberFromAsinoNumber(left.denominator, references.clone()), references.clone()), getNumberFromAsinoNumber(left.numerator, references.clone()), references.clone()), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'negativeInfinity';
    } else if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return { numerator: getDifference(getProduct(getNumberFromAsinoNumber(left.numerator, references.clone()), getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()), getProduct(getNumberFromAsinoNumber(right.numerator, references.clone()), getNumberFromAsinoNumber(left.denominator, references.clone()), references.clone()), references.clone()), denominator: getProduct(getNumberFromAsinoNumber(left.denominator, references.clone()), getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()) };
    }
  }
}

export const getProduct = (left: Number | undefined, right: Number | undefined, references: References): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return left * right;
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getProduct(left, getNumberFromAsinoNumber(right.numerator, references.clone()), references.clone()), denominator: right.denominator };
    }
  } else if (left === 'infinity') {
    if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: getProduct(getNumberFromAsinoNumber(left.denominator, references.clone()), right, references.clone()), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getProduct(getNumberFromAsinoNumber(left.numerator, references.clone()), getNumberFromAsinoNumber(right.numerator, references.clone()), references.clone()), denominator: getProduct(getNumberFromAsinoNumber(left.denominator, references.clone()), getNumberFromAsinoNumber(right.denominator, references.clone()), references.clone()) };
    }
  }
}

export const getQuotient = (left: Number | undefined, right: Number | undefined, references: References): Number | undefined => {
  if (left === undefined || right === undefined)
    return undefined;

  if (typeof left === 'number') {
    if (typeof right === 'number') {
      return { numerator: left, denominator: right };
    } else if (right === 'infinity') {
      return 0;
    } else if (right === 'negativeInfinity') {
      return 0;
    } else {
      return { numerator: left, denominator: right };
    }
  } else if (left === 'infinity') {
    if (right === 'infinity') {
      return 1;
    } else if (right === 'negativeInfinity') {
      return -1;
    } else {
      return 'infinity';
    }
  } else if (left === 'negativeInfinity') {
    if (right === 'infinity') {
      return -1;
    } else if (right === 'negativeInfinity') {
      return 1;
    } else {
      return 'negativeInfinity';
    }
  } else {
    if (typeof right === 'number') {
      return { numerator: left.numerator, denominator: getProduct(getNumberFromAsinoNumber(left.denominator, references.clone()), right, references.clone()) };
    } else if (right === 'infinity') {
      return 0;
    } else if (right === 'negativeInfinity') {
      return 0;
    } else {
      return { numerator: left, denominator: right };
    }
  }
}

export const getValueFromAsinoColor = (color: AsinoColor | undefined, references: References, solution: Solution): string | undefined => {
  let result: string | undefined = undefined;

  if (color === undefined) {
    // do nothing
  } else if (typeof color === 'string') {
    references.colors.forEach(colorReference => {
      if (colorReference.id === color) {
        if (typeof colorReference.value === 'string') {
          result = colorReference.value;
        }
      }
    });
  } else {
    if (isColorFormula(color)) {
      result = getColorFromFormula(color, references.clone(), solution);
    } else {
      references.colors.forEach(colorReference => {
        if (colorReference.id === color.id) {
          if (typeof colorReference.value === 'string') {
            result = colorReference.value;
          }
        }
      });
    }
  }

  return result;
}

export const getValueFromNumber = (number: Number | undefined, references: References, doNotMultiply?: boolean): number | 'infinity' | 'negativeInfinity' | 'potato' | undefined => {
  let result: number | 'infinity' | 'negativeInfinity' | 'potato' | undefined = undefined;

  if (number === undefined) {
    // do nothing
  } else if (typeof number === 'number') {
    result = number * (doNotMultiply ? 1 : 5040);
  } else if (number === 'infinity') {
    result = 'infinity';
  } else if (number === 'negativeInfinity') {
    result = 'negativeInfinity';
  } else {
    const numerator = getValueFromNumber(getNumberFromAsinoNumber(number.numerator, references.clone()), references.clone(), true);
    const denominator = getValueFromNumber(getNumberFromAsinoNumber(number.denominator, references.clone()), references.clone(), true);

    if (numerator === undefined || denominator === undefined) {
      // do nothing
    } else if (numerator === 'infinity') {
      if (denominator === 'infinity') {
        result = 'potato';
      } else if (denominator === 'negativeInfinity') {
        result = 'potato';
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = 'infinity';
      }
    } else if (numerator === 'negativeInfinity') {
      if (denominator === 'infinity') {
        result = 'potato';
      } else if (denominator === 'negativeInfinity') {
        result = 'potato';
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = 'infinity';
      }
    } else if (numerator === 'potato') {
      result = 'potato';
    } else {
      if (denominator === 'infinity') {
        result = 0;
      } else if (denominator === 'negativeInfinity') {
        result = 0;
      } else if (denominator === 'potato') {
        result = 'potato';
      } else {
        result = (numerator * (doNotMultiply ? 1 : 5040)) / denominator;
      }
    }
  }

  return result;
}

export const getColorFromFormula = (formula: ColorFormula | undefined, references: References, solution: Solution): string | undefined => {
  let result: string | undefined = undefined;

  if (formula?.operator === 'IF_ELSE') {
    let index = 0;
    let match = false;

    while (!match && index < (formula.booleanInputs?.length ?? 0)) {
      const boolean = getBooleanFromAsinoBoolean(formula.booleanInputs![0], references.clone(), solution);

      if (boolean) {
        match = true;
        result = getValueFromAsinoColor(formula.colorInputs?.[index], references.clone(), solution);
      } else {
        index++;
      }
    }

    if (!match) {
      result = getValueFromAsinoColor(formula.colorInputs?.[formula.colorInputs?.length - 1], references.clone(), solution);
    }
  }

  return result;
}

export const getObjectIdFromAsinoObject = (object: AsinoObject | undefined, references: References): string | undefined => {
  let result: string | undefined = undefined;

  if (object === undefined) {
    // do nothing
  } else if (typeof object === 'string') {
    result = object;

    references.objects.forEach(referenceObject => {
      referenceObject.id === object && typeof referenceObject.value === 'string' && (result = getObjectIdFromAsinoObject(referenceObject.value, references.clone()));
    });
  } else {
    console.log('object', object);
  }

  return result;
}

export const getClassIdFromAsinoClass = (asinoClass: AsinoClass | undefined, references: References, solution: Solution): string | undefined => {
  let result: string | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (typeof asinoClass === 'string') {
    result = asinoClass;

    references.classes.forEach(referenceClass => {
      if (referenceClass.id === asinoClass) {
        referenceClass.value !== undefined && typeof referenceClass.value === 'string' && (result = getClassIdFromAsinoClass(referenceClass.value, references.clone(), solution));
      }
    });
  } else if (isClassFormula(asinoClass)) {
    result = getClassIdFromFormula(asinoClass, references.clone(), solution);
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
    result = getObjectIdsFromAsinoObjects(set.objects, references.clone());
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
      result = getObjectIdsFromAsinoObjects(objects.objectsLeftInput, references.clone());
      const rightObjects = getObjectIdsFromAsinoObjects(objects.objectsRightInput, references.clone());

      rightObjects?.forEach((rightObject: string) => {
        const index = result?.indexOf(rightObject);

        index !== undefined && index !== -1 && (result?.splice(index, 1));
      });
    } else if (objects.operator === 'OBJECTS_IN_SET') {
      result = getObjectIdsFromAsinoSet(references.set, references.clone());
    } else {
      console.log('objects', objects);
    }
  } else {
    result = [];

    objects.forEach(asinoObject => {
      const object = getObjectIdFromAsinoObject(asinoObject, references.clone());

      object !== undefined && (result?.push(object));
    });
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

      references.sets.forEach(setReference => {
        const asinoSet = getSetFromSetReference(setReference, references.clone());
        const set = getSetFromAsinoSet(asinoSet, references.clone());

        if (references.object) {
          const object = getObjectIdFromAsinoObject(references.object, references.clone());

          if (object !== undefined && getObjectIdsFromAsinoObjects(set?.objects, references.clone())?.indexOf(object) !== -1) {
            set !== undefined && (result!.push(set));
          }
        }
      });
    }
  }

  return result;
}

export const getObjectFromAsinoObject = (asinoObject: AsinoObject | undefined, references: References): Object | undefined => {
  let result: Object | undefined = undefined;

  if (asinoObject === undefined) {
    // do nothing
  } else if (typeof asinoObject === 'string') {
    references.objects.forEach(objectReference => {
      if (objectReference.id === asinoObject) {
        result = getObjectFromAsinoObject(objectReference.value, references.clone());
      }
    });
  } else if (isObjectObject(asinoObject)) {
    result = asinoObject;
  } else {
    console.log('asinoObject', asinoObject);
  }

  return result;
}

export const getClassFromAsinoClass = (asinoClass: AsinoClass | undefined, references: References, solution: Solution): Class | undefined => {
  let result: Class | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (typeof asinoClass === 'string') {
    references.classes.forEach(classReference => {
      if (classReference.id === asinoClass) {
        result = getClassFromAsinoClass(classReference.value, references.clone(), solution);
      }
    });
  } else if (isClassClass(asinoClass)) {
    result = asinoClass;
  } else if (isClassFormula(asinoClass)) {
    result = getClassFromFormula(asinoClass, references.clone(), solution);
  } else {
    const newAsinoClass = getClassFromClassReference(asinoClass, references.clone());

    result = getClassFromAsinoClass(newAsinoClass, references.clone(), solution);
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
    result = getSetsFromFormula(sets, references.clone());
  }

  return result;
}

export const getClassIdFromFormula = (formula: ClassFormula | undefined, references: References, solution: Solution): string | undefined => {
  let result: string | undefined = undefined;

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'CLASS_OF_OBJECT') {
      const object = getObjectIdFromAsinoObject(formula.objectInput, references.clone());
      const solutionClass = solution.selectedClasses?.filter(selectedClass => selectedClass.objectId === object)[0];
      result = getClassIdFromAsinoClass(solutionClass?.classId, references.clone(), solution);
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
      const object = getObjectIdFromAsinoObject(formula.objectInput, references.clone());
      const solutionClass = solution.selectedClasses?.filter(selectedClass => selectedClass.objectId === object)[0];
      result = getClassFromAsinoClass(solutionClass?.classId, references.clone(), solution);
    } else {
      console.log('formula', formula);
    }
  }

  return result;
}

export const getBooleanFromFormula = (formula: BooleanFormula | undefined, references: References, solution: Solution): boolean | undefined => {
  let result: boolean | undefined = undefined;

  if (formula?.operator === undefined) {
    // do nothing
  } else {
    if (formula.operator === 'IS_EACH_SET') {
      const sets = getSetsFromAsinoSets(formula.setsInput, references.clone());

      result = true;

      sets?.forEach((set: Set) => {
        const setResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setSet(set), solution);

        setResult !== true && (result = false);
      });
    } else if (formula.operator === 'IS_EACH_OBJECT') {
      const objects = getObjectIdsFromAsinoObjects(formula.objectsInput, references.clone());

      result = true;

      objects?.forEach((object: string) => {
        const objectResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setObject(object), solution);

        objectResult !== true && (result = false);
      });
    } else if (formula.operator === 'IS_OBJECT') {
      const newRefs = references.clone().addObjects([[{ id: getObjectIdFromAsinoObject(formula.objectOutput, references.clone()), value: references.object }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, newRefs, solution);
    } else if (formula.operator === 'IS_OBJECT_CLASS') {
      const fixedObject = getObjectFromAsinoObject(references.object, references.clone());
      const solutionObject = solution.selectedClasses?.filter(selectedClass => selectedClass.objectId === getObjectIdFromAsinoObject(references.object, references.clone()))[0];

      const asinoClass = getClassIdFromAsinoClass(fixedObject?.class ?? solutionObject?.classId, references.clone(), solution);
      const newReferences = references.clone().setClass(asinoClass);
      typeof formula.classOutput === 'string' && newReferences.addClasses([[{ id: formula.classOutput, value: asinoClass }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, newReferences, solution);
    } else if (formula.operator === 'IS_EACH_CLASS_DIFFERENT') {
      let classes: (string | undefined)[] = [];

      const asinoClasses = getClassesFromAsinoClasses(formula.classesInput, references.clone());

      asinoClasses?.forEach((asinoClass: AsinoClass) => {
        classes.push(getClassIdFromAsinoClass(asinoClass, references.clone(), solution));
      });

      classes.push(references.fixedClassId);

      classes = classes.filter(asinoClass => asinoClass !== undefined);

      result = true;
      let index = 0;

      while (result && index < classes.length - 1) {
        const class1 = classes[index]!;
        const class2 = classes[index + 1]!;

        class1 === class2 && (result = false);

        index++;
      }
    } else {
      console.log('formula', formula);
    }
  }

  return result
}

export const getNumberFromFormula = (formula: NumberFormula | undefined, references: References): Number | undefined => {
  let result: Number | undefined = undefined;

  if (formula?.operator === undefined || formula.numberInputs?.[0] === undefined || formula.numberInputs?.[1] === undefined) {
    // do nothing
  } else {
    let left = getNumberFromAsinoNumber(formula.numberInputs[0], references.clone());
    let right = getNumberFromAsinoNumber(formula.numberInputs[1], references.clone());

    if (left === undefined || right === undefined) {
      // do nothing
    } else {
      if (formula.operator === Multiplication)
        result = getProduct(left, right, references.clone());
      else if (formula.operator === Subtraction)
        result = getDifference(left, right, references.clone());
      else if (formula.operator === Addition)
        result = getSum(left, right, references.clone());
      else if (formula.operator === Division)
        result = getQuotient(left, right, references.clone());
    }
  }

  return result;
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
  } else {
    references.booleans.forEach(booleanReference => {
      if (booleanReference.id === asinoBoolean.id) {
        result = getBooleanFromBooleanReference(booleanReference, references.clone());
      }
    });
  }

  return result;
}

export const getClassFromClassReference = (asinoClass: AsinoClassReference | undefined, references: References): AsinoClass | undefined => {
  let result: AsinoClass | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (asinoClass.value) {
    result = asinoClass.value;
  } else {
    references.classes.forEach(classReference => {
      if (classReference.id === asinoClass.id) {
        result = getClassFromClassReference(classReference, references.clone());
      }
    });
  }

  return result;
}

export const getBooleanFromAsinoBoolean = (boolean: AsinoBoolean | undefined, references: References, solution: Solution): boolean | undefined => {
  let result: boolean | undefined = undefined;

  if (boolean === undefined) {
    // do nothing
  } else if (typeof boolean === 'boolean') {
    result = boolean;
  } else if (typeof boolean === 'string') {
    references.booleans.forEach(booleanReference => {
      if (booleanReference.id === boolean) {
        result = getBooleanFromAsinoBoolean(booleanReference.value, references.clone(), solution);
      }
    });
  } else if (isBooleanFormula(boolean)) {
    result = getBooleanFromFormula(boolean, references.clone(), solution);
  }

  return result;
}

export const getNumberFromAsinoNumber = (number: AsinoNumber | undefined, references: References): Number | undefined => {
  let result: Number | undefined = undefined;

  if (number === undefined) {
    // do nothing
  } else if (typeof number === 'number') {
    result = number;
  } else if (typeof number === 'string') {
    references.numbers.forEach(numberReference => {
      if (numberReference.id === number) {
        result = getNumberFromAsinoNumber(numberReference.value, references.clone());
      }
    });
  } else if (isAsinoNumberFraction(number)) {
    result = number;
  } else if (isNumberFormula(number)) {
    result = getNumberFromFormula(number, references.clone());
  } else if (isNumberEditedNumber(number)) {
    result = number.originalValue;
  } else {
    if (number.id === undefined && number.value !== undefined) {
      result = getNumberFromAsinoNumber(number.value, references.clone().addNumbers([number.numbers]));
    } else {
      result = getNumberFromAsinoNumber(number.id, references.clone().addNumbers([number.numbers]));
    }
  }

  return result;
}

export const getNumberFromLayer = (array: (any | undefined)[], references: References, valueNameAndId: string, numberDefault: AsinoNumberReference): Number | undefined => {
  let result: Number | undefined = getNumberFromAsinoNumber(numberDefault, references.clone());

  array.forEach(value => {
    const valueNumberValue: number | string | AsinoNumber | undefined = value?.value?.[valueNameAndId];

    if (valueNumberValue !== undefined) {
      if (typeof valueNumberValue === 'number') {
        result = valueNumberValue;
      } else if (typeof valueNumberValue === 'string') {
        references.numbers.forEach((number: AsinoNumberReference) => {
          if (number.id === valueNumberValue) {
            result = getNumberFromAsinoNumber(number, references.clone().addNumbers([value?.[valueNameAndId]?.numbers]));
          }
        });
      } else if (isAsinoNumberFraction(valueNumberValue)) {
        result = valueNumberValue;
      } else if (isNumberFormula(valueNumberValue)) {
        console.log('TODO');
      } else if (isNumberEditedNumber(valueNumberValue)) {
        result = valueNumberValue.originalValue;
      } else {
        result = getNumberFromAsinoNumber(valueNumberValue, references.clone().addNumbers([valueNumberValue.numbers]));
      }
    }
  });

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
  asino.classes !== undefined && (result[Classes] = asino.classes.map((c: AsinoClassReference) => minifyClassReference(c)));
  asino.objects !== undefined && (result[Objects] = asino.objects.map((o: AsinoObjectReference) => minifyObjectReference(o)));
  asino.booleans !== undefined && (result[Booleans] = asino.booleans.map((b: AsinoBooleanReference) => minifyBooleanReference(b)));
  asino.numbers !== undefined && (result[Numbers] = asino.numbers.map((n: AsinoNumberReference) => minifyNumberReference(n)));
  asino.interfaces !== undefined && (result[Interfaces] = asino.interfaces.map((i: AsinoInterfaceReference) => minifyInterfaceReference(i)));
  asino.rectangles !== undefined && (result[Rectangles] = asino.rectangles.map((r: AsinoRectangleReference) => minifyRectangleReference(r)));
  asino.circles !== undefined && (result[Circles] = asino.circles.map((c: AsinoCircleReference) => minifyCircleReference(c)));
  asino.collections !== undefined && (result[Collections] = asino.collections.map((c: AsinoCollection) => minifyCollection(c)));
  asino.colors !== undefined && (result[Colors] = asino.colors.map((c: AsinoColorReference) => minifyColorReference(c)));
  asino.layers !== undefined && (result[Layers] = asino.layers.map((l: AsinoLayer) => minifyLayer(l)));
  asino.lines !== undefined && (result[Lines] = asino.lines.map((l: AsinoLineReference) => minifyLineReference(l)));
  asino.paths !== undefined && (result[Paths] = asino.paths.map((p: AsinoPathReference) => minifyPathReference(p)));
  asino.sets !== undefined && (result[Sets] = asino.sets.map(((s: AsinoSetReference) => minifySetReference(s))));

  return result;
}

const minifyBooleanReference = (boolean: AsinoBooleanReference): any => {
  const result: any = {};

  boolean.id !== undefined && (result[Id] = boolean.id);
  boolean.name !== undefined && boolean.name.value !== undefined && (result[Name] = boolean.name.value);
  boolean.value !== undefined && (result[Value] = minifyBoolean(boolean.value));
  boolean.numbers !== undefined && (result[Numbers] = boolean.numbers.map((n: AsinoNumberReference) => minifyNumberReference(n)))

  return result;
}

const minifyClassReference = (asinoClass: AsinoClassReference): any => {
  const result: any = {};

  asinoClass.id !== undefined && (result[Id] = asinoClass.id);
  asinoClass.name !== undefined && asinoClass.name.value !== undefined && (result[Name] = asinoClass.name.value);
  asinoClass.value !== undefined && (result[Value] = minifyClass(asinoClass));

  return result;
}

const minifyObjectReference = (object: AsinoObjectReference): any => {
  const result: any = {};

  object.id !== undefined && (result[Id] = object.id);
  object.name !== undefined && object.name.value !== undefined && (result[Name] = object.name.value);
  object.value !== undefined && (result[Value] = minifyObject(object.value));

  return result;
}

const minifyObject = (object: AsinoObject): any => {
  if (typeof object === 'string') {
    return object;
  } else if (isObjectObject(object)) {
    const result: any = {};

    object.class !== undefined && (result[Classs] = minifyClass(object.class));

    return result;
  } else {
    return minifyObjectReference(object);
  }
}

const minifyCollection = (collection: AsinoCollection): any => {
  const result: any = {};

  collection.id !== undefined && (result[Id] = collection.id);
  collection.name !== undefined && collection.name.value !== undefined && (result[Name] = collection.name.value);
  collection.classes !== undefined && (result[Classes] = collection.classes.map((c: AsinoClassReference) => minifyClassReference(c)));
  collection.objects !== undefined && (result[Objects] = collection.objects.map((o: AsinoObjectReference) => minifyObjectReference(o)));

  return result;
}

const minifyLayer = (layer: AsinoLayer): any => {
  const result: any = {};

  layer.circle !== undefined && (result[Circle] = minifyCircleReference(layer.circle));
  layer.collectionId !== undefined && (result[CollectionId] = layer.collectionId);
  layer.colors !== undefined && (result[Colors] = layer.colors.map((c: AsinoColorReference) => minifyColorReference(c)));
  layer.interface !== undefined && (result[Interface] = minifyInterfaceReference(layer.interface));
  layer.line !== undefined && (result[Line] = minifyLineReference(layer.line));
  layer.name !== undefined && layer.name.value !== undefined && (result[Name] = layer.name.value);
  layer.numbers !== undefined && (result[Numbers] && layer.numbers.map((n: AsinoNumberReference) => minifyNumberReference(n)));
  layer.objectId !== undefined && (result[ObjectId] = layer.objectId);
  layer.path !== undefined && (result[Path] = minifyPathReference(layer.path));
  layer.rectangle !== undefined && (result[Rectangle] = minifyRectangleReference(layer.rectangle));

  return result;
}

// here

const minifyBoolean = (boolean: AsinoBoolean): any => {

}

const minifyClass = (asinoClass: AsinoClass): any => {

}

const minifyNumber = (number: AsinoNumber): any => {
  if (typeof number === 'string') {
    return number;
  } else if (typeof number === 'number') {
    return number;
  } else if (isNumberFormula(number)) {
    const result: any = {};

    number.operator !== undefined && number.operator !== 'NONE' && (result.n = number.operator);
    number.numberInputs !== undefined && (result.o = number.numberInputs.map(n => n !== undefined ? minifyNumber(n) : undefined));

    return result;
  } else if (isAsinoNumberFraction(number)) {
    const result: any = {};

    number.denominator !== undefined && (result.p = minifyNumber(number.denominator));
    number.numerator !== undefined && (result.q = minifyNumber(number.numerator));

    return result;
  } else if (isNumberEditedNumber(number)) {
    return number.originalValue;
  } else {
    return minifyNumberReference(number);
  }
}

const minifyRectangle = (rectangle: AsinoRectangle): any => {
  const result: any = {};

  rectangle.x !== undefined && (result[X] = minifyNumber(rectangle.x));
  rectangle.y !== undefined && (result[Y] = minifyNumber(rectangle.y));
  rectangle.width !== undefined && (result[Width] = minifyNumber(rectangle.width));
  rectangle.height !== undefined && (result[Height] = minifyNumber(rectangle.height));

  return result;
}

const minifyCircle = (circle: AsinoCircle): any => {
  const result: any = {};

  circle.cx !== undefined && (result[X] = minifyNumber(circle.cx));
  circle.cy !== undefined && (result[Y] = minifyNumber(circle.cy));
  circle.r !== undefined && (result[R] = minifyNumber(circle.r));

  return result;
}

const minifyColor = (color: AsinoColor): any => {
  const result: any = {};

  return result;
}

const minifyNumberReference = (number: AsinoNumberReference): any => {
  const result: any = {};

  number.id !== undefined && (result[Id] = number.id);
  number.name !== undefined && number.name.value !== undefined && (result[Name] = number.name.value);
  number.value !== undefined && (result[Value] = minifyNumber(number.value))

  return result;
}

const minifyRectangleReference = (rectangle: AsinoRectangleReference): any => {
  const result: any = {};

  rectangle.id !== undefined && (result[Id] = rectangle.id);
  rectangle.name !== undefined && rectangle.name.value !== undefined && (result[Name] = rectangle.name.value);
  rectangle.value !== undefined && (result[Value] = minifyRectangle(rectangle.value))

  return result;
}

const minifyCircleReference = (circle: AsinoCircleReference): any => {
  const result: any = {};

  circle.id !== undefined && (result[Id] = circle.id);
  circle.name !== undefined && circle.name.value !== undefined && (result[Name] = circle.name.value);
  circle.value !== undefined && (result[Value] = minifyCircle(circle.value))

  return result;
}

const minifyColorReference = (color: AsinoColorReference): any => {
  const result: any = {};

  color.id !== undefined && (result[Id] = color.id);
  color.name !== undefined && color.name.value !== undefined && (result[Name] = color.name.value);
  color.value !== undefined && (result[Value] = minifyColor(color.value))

  return result;
}

const minifyLineReference = (line: AsinoLineReference): any => {
  const result: any = {};

  return result;
}

const minifyPathReference = (path: AsinoPathReference): any => {
  const result: any = {};

  return result;
}

const minifySetReference = (set: AsinoSetReference): any => {
  const result: any = {};

  return result;
}

const minifyInterfaceReference = (asinoInterface: AsinoInterfaceReference): any => {
  const result: any = {};

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

  return result;
}

const unminifyBooleanReference = (boolean: any): AsinoBooleanReference => {
  const result: AsinoBooleanReference = {};

  boolean[Id] !== undefined && (result.id = boolean[Id]);
  boolean[Name] !== undefined && (result.name = { value: boolean[Name] });

  return result;
}

const unminifyNumber = (number: any): AsinoNumber => {
  if (typeof number === 'string') {
    return number;
  } else if (typeof number === 'number') {
    return number;
  } else if ('n' in number) {
    const result: NumberFormula = {};

    number[Operator] !== undefined && number[Operator] !== 'NONE' && (result.operator = number[Operator]);
    number.o !== undefined && (result.numberInputs = number.o.map((n: any) => n !== undefined ? unminifyNumber(n) : undefined));

    return result;
  } else {
    console.log('TODO unminify fraction, reference', number);
    return {};
  }
}

const unminifyNumberReference = (number: any): AsinoNumberReference => {
  const result: AsinoNumberReference = {};

  number[Id] !== undefined && (result.id = number[Id]);
  number[Name] !== undefined && (result.name = { value: number[Name] });
  number[Value] !== undefined && (result.value = unminifyNumber(number[Value]))

  return result;
}

const unminifyRectangleReference = (rectangle: any): AsinoRectangleReference => {
  const result: AsinoRectangleReference = {};

  return result;
}

const Booleans = 'bos';
const Circle = 'ci';
const Circles = 'cis';
const Classs = 'c';
const Classes = 'cls';
const CollectionId = 'coi';
const Collections = 'cos';
const Colors = 'cos';
const CX = 'cx';
const CY = 'cy';
const DateCreated = 'dac';
const DateUpdated = 'dau';
const Height = 'he';
const Id = 'id';
const Interface = 'in';
const Interfaces = 'ins';
const Layers = 'las';
const Line = 'li';
const Lines = 'lis';
const Name = 'na';
const Numbers = 'nus';
const ObjectId = 'oi';
const Objects = 'obs';
const Operator = 'op';
const Path = 'pa';
const Paths = 'pas';
const R = 'r';
const Rectangle = 're';
const Rectangles = 'res';
const Sets = 'ses';
const UserId = 'usi';
const UserName = 'usn';
const Value = 'va';
const Width = 'wi';
const X = 'x';
const Y = 'y';
