import { References } from "./References";
import { Addition, Division, Multiplication, Subtraction } from "./consts";
import { Solution } from "./interfaces";
import { AsinoBoolean, AsinoBooleanReference, BooleanFormula, isBooleanFormula } from "./types/Boolean";
import { AsinoClass, AsinoClassReference, AsinoClasses, Class, isClassClass } from "./types/Class";
import { AsinoColor, ColorFormula, isColorFormula } from "./types/Color";
import { AsinoNumber, AsinoNumberReference, Number, isNumberFormula, isAsinoNumberFraction, NumberFormula } from "./types/Number";
import { AsinoObject, AsinoObjects, isObjectsFormula } from "./types/Object";
import { AsinoSet, AsinoSetReference, AsinoSets, Set, SetsFormula, isSetSet, isSetsFormula } from "./types/Set";

export const getSum = (left: Number | undefined, right: Number | undefined): Number | undefined => {
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
      return { numerator: getSum(getProduct(left, right.denominator), right.numerator), denominator: right.denominator };
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
      return { numerator: getSum(getProduct(right, left.denominator), left.numerator), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getSum(getProduct(left.numerator, right.denominator), getProduct(right.numerator, left.denominator)), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getDifference = (left: Number | undefined, right: Number | undefined): Number | undefined => {
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
      return { numerator: getSum(getProduct(left, right.denominator), right.numerator), denominator: right.denominator };
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
      return { numerator: getSum(getProduct(right, left.denominator), left.numerator), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'negativeInfinity';
    } else if (right === 'negativeInfinity') {
      return 'infinity';
    } else {
      return { numerator: getDifference(getProduct(left.numerator, right.denominator), getProduct(right.numerator, left.denominator)), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getProduct = (left: Number | undefined, right: Number | undefined): Number | undefined => {
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
      return { numerator: getProduct(left, right.numerator), denominator: right.denominator };
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
      return { numerator: getProduct(left.denominator, right), denominator: left.denominator };
    } else if (right === 'infinity') {
      return 'infinity';
    } else if (right === 'negativeInfinity') {
      return 'negativeInfinity';
    } else {
      return { numerator: getProduct(left.numerator, right.numerator), denominator: getProduct(left.denominator, right.denominator) };
    }
  }
}

export const getQuotient = (left: Number | undefined, right: Number | undefined): Number | undefined => {
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
      return { numerator: left.numerator, denominator: getProduct(left.denominator, right) };
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

export const getValueFromNumber = (number: Number | undefined, doNotMultiply?: boolean): number | 'infinity' | 'negativeInfinity' | 'potato' | undefined => {
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
    const numerator = getValueFromNumber(number.numerator, true);
    const denominator = getValueFromNumber(number.denominator, true);

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

export const getObjectFromAsinoObject = (object: AsinoObject | undefined, references: References): string | undefined => {
  let result: string | undefined = undefined;

  if (object === undefined) {
    // do nothing
  } else if (typeof object === 'string') {
    result = object;

    references.objects.forEach(referenceObject => {
      referenceObject.id === object && (result = getObjectFromAsinoObject(referenceObject.value, references.clone()));
    });
  } else {
    console.log('object', object);
  }

  return result;
}

export const getObjectsFromAsinoSet = (set: AsinoSet | undefined, references: References): string[] | undefined => {
  let result: string[] | undefined = undefined;

  if (set === undefined) {
    // do nothing
  } else if (typeof set === 'string') {
    console.log('set', set);
  } else if (isSetSet(set)) {
    result = getObjectsFromAsinoObjects(set.objects, references.clone());
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

export const getObjectsFromAsinoObjects = (objects: AsinoObjects | undefined, references: References): string[] | undefined => {
  let result: string[] | undefined = undefined;

  if (objects === undefined) {
    // do nothing
  } else if (typeof objects === 'string') {
    console.log('objects', objects);
  } else if (isObjectsFormula(objects)) {
    if (objects.operator === '-') {
      result = getObjectsFromAsinoObjects(objects.objectsLeftInput, references.clone());
      const rightObjects = getObjectsFromAsinoObjects(objects.objectsRightInput, references.clone());

      rightObjects?.forEach((rightObject: string) => {
        const index = result?.indexOf(rightObject);

        index !== undefined && index !== -1 && (result?.splice(index, 1));
      });
    } else if (objects.operator === 'OBJECTS_IN_SET') {
      result = getObjectsFromAsinoSet(references.set, references.clone());
    } else {
      console.log('objects', objects);
    }
  } else {
    result = [];

    objects.forEach(asinoObject => {
      const object = getObjectFromAsinoObject(asinoObject, references.clone());

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
          const object = getObjectFromAsinoObject(references.object, references.clone());

          if (object !== undefined && getObjectsFromAsinoObjects(set?.objects, references.clone())?.indexOf(object) !== -1) {
            set !== undefined && (result!.push(set));
          }
        }
      });
    }
  }

  return result;
}

export const getClassFromAsinoClass = (asinoClass: AsinoClass | undefined, references: References): Class | undefined => {
  let result: Class | undefined = undefined;

  if (asinoClass === undefined) {
    // do nothing
  } else if (typeof asinoClass === 'string') {
    references.classes.forEach(classReference => {
      if (classReference.id === asinoClass) {
        result = getClassFromAsinoClass(classReference.value, references.clone());
      }
    });
  } else if (isClassClass(asinoClass)) {
    result = asinoClass;
  } else {
    const newAsinoClass = getClassFromClassReference(asinoClass, references.clone());

    result = getClassFromAsinoClass(newAsinoClass, references.clone());
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
      const objects = getObjectsFromAsinoObjects(formula.objectsInput, references.clone());

      result = true;

      objects?.forEach((object: string) => {
        const objectResult = getBooleanFromAsinoBoolean(formula.boolean, references.clone().setObject(object), solution);

        objectResult !== true && (result = false);
      });
    } else if (formula.operator === 'IS_OBJECT') {
      const newRefs = references.clone().addObjects([[{ id: getObjectFromAsinoObject(formula.objectOutput, references.clone()), value: references.object }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, newRefs, solution);
    } else if (formula.operator === 'IS_OBJECT_CLASS') {
      const solutionClass = solution.selectedClasses?.filter(selectedClass => selectedClass.objectId === getObjectFromAsinoObject(references.object, references.clone()))[0];
      const asinoClass = getClassFromAsinoClass(solutionClass?.classId, references.clone());
      const newReferences = references.clone().setClass(asinoClass);
      typeof formula.classOutput === 'string' && newReferences.addClasses([[{ id: formula.classOutput, value: asinoClass }]]);

      result = getBooleanFromAsinoBoolean(formula.boolean, newReferences, solution);
    } else if (formula.operator === 'IS_EACH_CLASS_DIFFERENT') {
      const classes: (Class | undefined)[] = [];

      const asinoClasses = getClassesFromAsinoClasses(formula.classesInput, references.clone());

      asinoClasses?.forEach((asinoClass: AsinoClass) => {
        classes.push(getClassFromAsinoClass(asinoClass, references.clone()));
      });

      console.log('classes', classes);
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
        result = getProduct(left, right);
      else if (formula.operator === Subtraction)
        result = getDifference(left, right);
      else if (formula.operator === Addition)
        result = getSum(left, right);
      else if (formula.operator === Division)
        result = getQuotient(left, right);
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
      } else {
        result = getNumberFromAsinoNumber(valueNumberValue, references.clone().addNumbers([valueNumberValue.numbers]));
      }
    }
  });

  return result;
}
