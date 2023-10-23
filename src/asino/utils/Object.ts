import { Variables } from "../Variables";
import { AsinoObject, ObjectResult } from "../types/Object";

export const getObjectResultFromAsinoObject = (object: AsinoObject, variables: Variables): ObjectResult => {
  if (object.objectId !== undefined) {
    const asinoObject = variables.objects[object.objectId];

    if (asinoObject !== undefined)
      return getObjectResultFromAsinoObject(asinoObject, variables);
  };

  return { collectionId: object.collectionId, classFixedId: object.classFixedId };
}
