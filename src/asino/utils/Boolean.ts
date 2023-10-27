import { Variables } from "../Variables";
import { AsinoBoolean, BooleanResult } from "../types/Boolean";
import { ObjectResult } from "../types/Object";
import { Solution } from "../types/Solution";
import { getClassResultListFromAsinoClassList } from "./Class";
import { getObjectListResultFromAsinoObjectList } from "./Object";
import { getSetsResultFromAsinoSets } from "./Sets";

export const getBooleanResultFromAsinoBoolean = (boolean: AsinoBoolean, variables: Variables, solution: Solution): BooleanResult => {
  let newVariables = variables;

  if (boolean.numberVariableDictionary !== undefined) {
    newVariables = variables.clone().addParameters(boolean);
  }

  if (boolean.booleanId !== undefined) {
    const booleanResult = variables.booleanDictionary[boolean.booleanId];

    if (booleanResult !== undefined) {
      return getBooleanResultFromAsinoBoolean(booleanResult, newVariables, solution);
    }
  } else if (boolean.operator !== undefined) {
    if (boolean.operator === 'IS_ANY_BOOLEAN') {
      let result: BooleanResult = { boolean: false };

      for (let i = 0; i < (boolean.booleanList?.length ?? 0) && result.boolean === false; i++) {
        const booleanResult = getBooleanResultFromAsinoBoolean(boolean.booleanList![i], newVariables, solution);

        result = booleanResult;
      }

      return result;
    } else if (boolean.operator === 'IS_CLASS_STATIC') {
      return ({ boolean: variables.object === undefined });
    } else if (boolean.operator === 'WITH_OBJECT_AS') {
      if (variables.object !== undefined && boolean.objectId !== undefined) {
        newVariables.addParameters({ objectVariableDictionary: { [boolean.objectId]: { objectId: variables.object.id } } });
      }

      return getBooleanResultFromAsinoBoolean(boolean.boolean ?? {}, newVariables, solution);
    } else if (boolean.operator === 'IS_EACH_SET') {
      const setsResult = getSetsResultFromAsinoSets(boolean.sets ?? {}, newVariables);

      const result: BooleanResult = { boolean: true };

      setsResult.setList?.forEach(set => {
        newVariables.setSet(set);

        const setResult = getBooleanResultFromAsinoBoolean(boolean.boolean ?? {}, newVariables, solution);

        setResult.boolean !== true && (result.boolean = false);
      });

      return result;
    } else if (boolean.operator === 'IS_EACH_OBJECT') {
      const objectsResult = getObjectListResultFromAsinoObjectList(boolean, newVariables);

      const thing = { boolean: true };

      objectsResult.objectList?.forEach((object: ObjectResult) => {
        newVariables.setObject(object);

        const objectResult = getBooleanResultFromAsinoBoolean(boolean.boolean ?? {}, newVariables, solution);

        thing.boolean &&= objectResult.boolean ?? false;
      });

      return thing;
    } else if (boolean.operator === 'IS_OBJECT_CLASS') {
      const classId = solution.objectClassDictionary?.[variables.object?.id ?? ''];

      newVariables.setClass({ id: classId });

      return getBooleanResultFromAsinoBoolean(boolean.boolean ?? {}, newVariables, solution);
    } else if (boolean.operator === 'IS_EACH_CLASS_DIFFERENT') {
      const classList = getClassResultListFromAsinoClassList(boolean, newVariables, solution);

      console.log(classList);

      const result = { boolean: true };

      for (let i = 0; i < (classList.classResultList?.length ?? 0) && result.boolean === true; i++) {
        for (let j = i + 1; j < (classList.classResultList?.length ?? 0) && result.boolean === true; j++) {
          if (classList.classResultList?.[i].id !== undefined && classList.classResultList?.[j].id !== undefined) {
            result.boolean &&= classList.classResultList?.[i].id !== classList.classResultList?.[j].id
          }
        }
      }

      console.log(result);

      return result;
    }
  }

  console.log(boolean);

  return {};
}
