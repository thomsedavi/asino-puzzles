import { Variables } from "../Variables";
import { AsinoClass, ClassResult } from "../types/Class";

export const getClassResultFromAsinoClass = (asinoClass: AsinoClass, variables: Variables): ClassResult => {
  let newReferences = variables;

  if (asinoClass.numberVariables !== undefined) {
    newReferences = variables.clone().addParameters(asinoClass);
  }

  if (asinoClass.classId !== undefined) {
    const classResult = variables.classes[asinoClass.classId];

    if (classResult !== undefined)
      return getClassResultFromAsinoClass(classResult, newReferences);
  } else if (asinoClass.operator !== undefined) {
    console.log('asinoClass', asinoClass);
  }

  return { viewBox: asinoClass.viewBox, layers: asinoClass.layers };
}
