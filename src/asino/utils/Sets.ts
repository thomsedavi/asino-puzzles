import { Variables } from "../Variables";
import { AsinoSet, AsinoSets, SetsResult } from "../types/Set";

export const getSetsResultFromAsinoSets = (sets: AsinoSets, variables: Variables): SetsResult => {
  if (sets.operator !== undefined) {
    if (sets.operator === 'SETS_CONTAINING_OBJECT') {
      const sets: SetsResult = { setList: [] };

      variables.object?.id !== undefined && (Object.entries(variables.setDictionary).forEach((set: [string, AsinoSet]) => {
        if ((set[1].objectList?.filter(o => o.objectId === variables.object?.id) ?? []).length > 0) {
          sets.setList?.push({objectList: set[1].objectList});

        }
      }));

      return sets;
    }
  }

  console.log(sets);

  return {};
}
