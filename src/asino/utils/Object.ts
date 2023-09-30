import { References } from "../References";
import { AsinoObject } from "../types/Object";

export const getObjectFromObjectId = (objectId: string, references: References): AsinoObject => {
  const objectReference = references.objects[objectId];

  return objectReference?.value ?? {};
}