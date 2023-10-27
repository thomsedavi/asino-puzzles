import { Variables } from "../Variables";
import { AsinoClass, ClassResult, ClassResultList } from "../types/Class";
import { Solution } from "../types/Solution";
import { getObjectResultFromAsinoObject } from "./Object";

export const getClassResultListFromAsinoClassList = (classList: { classList?: AsinoClass[] }, variables: Variables, solution: Solution): ClassResultList => {
  if (classList.classList !== undefined) {
    return { classResultList: classList.classList.map(c => getClassResultFromAsinoClass({ class: c }, variables, solution)) };
  }

  console.log(classList);

  return {};
}

export const getClassResultFromAsinoClass = (asinoClass: { classId?: string, class?: AsinoClass }, variables: Variables, solution: Solution): ClassResult => {
  if (asinoClass.class !== undefined) {
    if (asinoClass.class.id !== undefined) {
      if (asinoClass.class.classId === undefined) {
        return { id: asinoClass.class.id, viewBox: asinoClass.class.viewBox, layers: asinoClass.class.layerList };
      } else {
        const baseClass = getClassResultFromAsinoClass({ classId: asinoClass.class.classId }, variables, solution);

        return { ...baseClass, id: asinoClass.class.id };
      }
    } else if (asinoClass.class.operator !== undefined) {
      if (asinoClass.class.operator === 'CLASS_OF_OBJECT') {
        const object = getObjectResultFromAsinoObject({ object: asinoClass.class.object }, variables);

        if (object.classFixedId !== undefined) {
          return getClassResultFromAsinoClass({classId: object.classFixedId}, variables, solution);
        }

        if (object.id !== undefined) {
          var solutionClass = solution.objectClassDictionary?.[object.id];

          if (solutionClass !== undefined) {
            return getClassResultFromAsinoClass({ classId: solutionClass }, variables, solution);
          }
        }
      }
    } else if (variables.class !== undefined) {
      if (variables.class.id !== undefined) {
        return { id: variables.class.id, viewBox: variables.class.viewBox, layers: variables.class.layerList };
      }
    }
  } else if (asinoClass.classId !== undefined) {
    const baseClass = variables.classDictionary[asinoClass.classId];

    if (baseClass !== undefined) {
      if (baseClass.classId === undefined) {
        return baseClass;
      } else {
        const baseBaseClass = getClassResultFromAsinoClass({ classId: baseClass.classId }, variables, solution);

        return { ...baseBaseClass, id: baseClass.id };
      }
    }
  }

  return {};
}
