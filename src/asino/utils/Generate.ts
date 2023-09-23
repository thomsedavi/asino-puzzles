import Utils from "../../common/utils";
import { References } from "../References";
import { InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceColumnIndex, InterfaceRowIndex, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionCount, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionCount } from "../consts";
import { AsinoClassReference } from "../types/Class";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumberReference } from "../types/Number";
import { AsinoObjectReference } from "../types/Object";
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
            const layer: AsinoLayer = { rectangleId: 'a-db' };

            const numbers: { [id: string]: AsinoNumberReference } = {};
            r !== 1 && (numbers[OuterHorizontalDivisionBorderIndex] = { number: r });

            Object.entries(numbers).length !== 0 && (layer.numbers = numbers);

            layers.push(layer);
          }

          for (let c = 1; c < outerHorizontalDivisionCount; c++) {
            const layer: AsinoLayer = { rectangleId: 'e-cb' };

            const numbers: { [id: string]: AsinoNumberReference } = {};
            c !== 1 && (numbers[OuterVerticalDivisionBorderIndex] = { number: c });

            Object.entries(numbers).length !== 0 && (layer.numbers = numbers);

            layers.push(layer);
          }

          for (let r = 1; r <= (outerHorizontalDivisionCount * innerHorizontalDivisionCount); r++) {
            for (let c = 1; c <= (outerVerticalDivisionCount * innerVerticalDivisionCount); c++) {
              const objectId = Utils.getRandomId(objectIds);
              objectIds.push(objectId);

              const layer: AsinoLayer = {
                interfaceId: 'c-fe',
                objectId: objectId
              };

              const objectName = `Object R${r}C${c}`;
              objects.push({ id: objectId, name: { value: objectName }, object: { collectionId: collectionId } });

              const numbers: { [id: string]: AsinoNumberReference } = {};

              c !== 1 && (numbers[InterfaceColumnIndex] = { number: c });
              r !== 1 && (numbers[InterfaceRowIndex] = { number: r });

              Object.entries(numbers).length !== 0 && (layer.numbers = numbers);

              layers.push(layer);
            }
          }
        }
      }
    }
  }

  const classIds = ['b-de', 'f-de', 'e-eb', 'a-ae', 'c-ee', 'd-df', 'f-ce', 'f-ed', 'e-ff'];

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
