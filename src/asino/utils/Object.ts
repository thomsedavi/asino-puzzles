import { Variables } from "../Variables";
import { AsinoObject, AsinoObjects, ObjectResult, ObjectListResult as ObjectListResult, ObjectsListResult } from "../types/Object";

export const getObjectResultFromAsinoObject = (object: { object?: AsinoObject, objectId?: string }, variables: Variables): ObjectResult => {
  if (object.object !== undefined) {
    if (object.object.id !== undefined) {
      console.log(object.object.id);
    } else if (object.object.objectId !== undefined) {
      const baseObject = variables.objectDictionary[object.object.objectId];

      if (baseObject !== undefined) {
        if (baseObject.objectId === undefined) {
          return baseObject;
        } else {
          const baseBaseObject = getObjectResultFromAsinoObject({ objectId: baseObject.objectId }, variables);

          return { ...baseBaseObject, id: baseObject.id ?? baseObject.objectId };            
        }
      }
    }
  } else if (object.objectId !== undefined) {
    const baseObject = variables.objectDictionary[object.objectId];

    if (baseObject !== undefined) {
      if (baseObject.objectId === undefined) {
        return baseObject;
      } else {
        const baseBaseObject = getObjectResultFromAsinoObject({ objectId: baseObject.objectId }, variables);

        return { ...baseBaseObject, id: baseObject.id };
      }
    }
  } else if (variables.object !== undefined) {
    console.log(variables.object);
  }

  return {};
}

export const getObjectListResultFromAsinoObjectList = (objectList: { operator?: string, objectsId?: string, objects?: AsinoObjects, objectList?: AsinoObject[], objectsList?: AsinoObjects[] }, variables: Variables): ObjectListResult => {
  if (objectList.operator === '-') {
    const objectsList = getObjectsListResultFromAsinoObjectsList(objectList, variables);

    const result: ObjectListResult = { objectList: [] };

    const left: ObjectResult[] = objectsList.objectsList?.[0].objectList ?? [];
    const right: string[] = (objectsList.objectsList?.[1].objectList ?? []).filter(o => o.id !== undefined).map(o => o.id!);

    left.forEach((leftObject: ObjectResult) => {
      if (leftObject.id !== undefined && !right.includes(leftObject.id))
        result.objectList?.push(leftObject);
    });

    return result;
  }

  if (objectList.operator === 'OBJECTS_IN_SET') {
    return { objectList: variables.set?.objectList?.map(o => getObjectResultFromAsinoObject({ object: o }, variables)) };
  }

  if (objectList.objects !== undefined) {
    return getObjectListResultFromAsinoObjectList(objectList.objects, variables);
  }

  if (objectList.objectList !== undefined) {
    return { objectList: objectList.objectList.map(o => getObjectResultFromAsinoObject({ object: o }, variables)) };
  }

  return {};
}

export const getObjectsListResultFromAsinoObjectsList = (objectsList: { objectsList?: AsinoObjects[] }, variables: Variables): ObjectsListResult => {
  if (objectsList.objectsList !== undefined) {
    const result: ObjectsListResult = { objectsList: [] };

    objectsList.objectsList.forEach((objects: AsinoObjects) => {
      result.objectsList?.push(getObjectListResultFromAsinoObjectList(objects, variables));
    });

    return result;
  }

  console.log(objectsList);

  return {};
}