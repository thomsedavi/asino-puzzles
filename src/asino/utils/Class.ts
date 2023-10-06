import { References } from "../References";
import { AsinoClass, Class } from "../types/Class";

export const getClassResultFromClassId = (classId: string, references: References): Class => {
  const classReference = references.classes[classId];

  if (classReference.value !== undefined) {
    if (classReference.numbers !== undefined) {
      const newReferences = references.clone().addParameters(classReference);

      return getClassResultFromAsinoClass(classReference.value, newReferences);
    } else {
      return getClassResultFromAsinoClass(classReference.value, references);
    }
  }

  return {};
}

export const getClassResultFromAsinoClass = (asinoClass: AsinoClass, references: References): Class => {
  if (asinoClass.class !== undefined) {
    return asinoClass.class;
  } else if (asinoClass.classId !== undefined) {
    return getClassResultFromClassId(asinoClass.classId, references);
  } else if (asinoClass.formula !== undefined) {
    console.log('TODO');
  }

  return {};
}
