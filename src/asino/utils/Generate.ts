import Utils from "../../common/utils";
import { References } from "../References";
import { InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceColumnIndex, InterfaceRowIndex, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionCount, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionCount } from "../consts";
import { AsinoClassReference } from "../types/Class";
import { AsinoLayer } from "../types/Layer";
import { AsinoObjectReference } from "../types/Object";
import { AsinoParameter } from "../types/Parameter";
import { AsinoPuzzle } from "../types/Puzzle";
import { getNumberFromAsinoNumber, getValueFromNumber } from "../utils";

export const generateSudoku = (puzzle: AsinoPuzzle, update: (puzzle: AsinoPuzzle) => void) => {
  const collectionId = Utils.getRandomId(puzzle.collections?.filter(c => c.id !== undefined).map(c => c.id!) ?? []);

  const outerHorizontalDivisionCount = getValueFromNumber(getNumberFromAsinoNumber(OuterHorizontalDivisionCount, new References(puzzle)).number, new References(puzzle));
  const innerHorizontalDivisionCount = getValueFromNumber(getNumberFromAsinoNumber(InnerHorizontalDivisionCount, new References(puzzle)).number, new References(puzzle));
  const outerVerticalDivisionCount = getValueFromNumber(getNumberFromAsinoNumber(OuterVerticalDivisionCount, new References(puzzle)).number, new References(puzzle));
  const innerVerticalDivisionCount = getValueFromNumber(getNumberFromAsinoNumber(InnerVerticalDivisionCount, new References(puzzle)).number, new References(puzzle));

  const objectIds: string[] = [...puzzle.objects?.filter(o => o.id !== undefined).map(o => o.id!) ?? []];
  const objects: AsinoObjectReference[] = [];
  const classes: AsinoClassReference[] = []
  const layers: AsinoLayer[] = [];

  if (typeof outerHorizontalDivisionCount === 'number') {
    if (typeof innerHorizontalDivisionCount === 'number') {
      if (typeof outerVerticalDivisionCount === 'number') {
        if (typeof innerVerticalDivisionCount === 'number') {
          for (let r = 1; r < outerHorizontalDivisionCount; r++) {
            const parameters: AsinoParameter[] = [];

            r !== 1 && (parameters.push({ numberId: OuterHorizontalDivisionBorderIndex, number: r }));

            layers.push({ rectangleId: 'a-db', parameters: parameters.length === 0 ? undefined : parameters });
          }

          for (let c = 1; c < outerHorizontalDivisionCount; c++) {
            const parameters: AsinoParameter[] = [];

            c !== 1 && (parameters.push({ numberId: OuterVerticalDivisionBorderIndex, number: c }));

            layers.push({ rectangleId: 'e-cb', parameters: parameters.length === 0 ? undefined : parameters });
          }

          for (let r = 1; r <= (outerHorizontalDivisionCount * innerHorizontalDivisionCount); r++) {
            for (let c = 1; c <= (outerVerticalDivisionCount * innerVerticalDivisionCount); c++) {
              const objectId = Utils.getRandomId(objectIds);
              const objectName = `Object R${r}C${c}`;

              objectIds.push(objectId);
              objects.push({ id: objectId, name: { value: objectName }, object: { collectionId: collectionId } });

              const parameters: AsinoParameter[] = [];

              c !== 1 && (parameters.push({ numberId: InterfaceColumnIndex, number: c }));
              r !== 1 && (parameters.push({ numberId: InterfaceRowIndex, number: r }));

              layers.push({ interfaceId: 'c-fe', objectId: objectId, parameters: parameters.length === 0 ? undefined : parameters });
            }
          }
        }
      }
    }
  }

  const classIds = ['b-de', 'f-de', 'e-eb', 'a-ae', 'f-ce'];

  classIds.forEach(asinoClass => {
    classes.push({ classId: asinoClass, class: { collectionId: collectionId } });
  });

  update(
    {
      ...puzzle,
      collections: [...(puzzle.collections ?? []), { id: collectionId, name: { value: 'Sudoku Collection' } }],
      objects: [...(puzzle.objects ?? []), ...objects],
      layers: [...(puzzle.layers ?? []), ...layers],
      classes: [...(puzzle.classes ?? []), ...classes]
    }
  );
}
