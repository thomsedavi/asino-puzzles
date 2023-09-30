import Utils from "../../common/utils";
import { References } from "../References";
import { InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceColumnIndex, InterfaceRowIndex, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionCount, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionCount } from "../consts";
import { systemClassDefaults } from "../references/Classes";
import { AsinoClassReference } from "../types/Class";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObjectReference } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { getNumberResultFromNumberId, getValueFromNumberResult } from "./Number";

export const generateSudoku = (puzzle: AsinoPuzzle, update: (puzzle: AsinoPuzzle) => void) => {
  const collectionId = Utils.getRandomId(puzzle.collections !== undefined ? Object.keys(puzzle.collections) : []);
  const references = new References(puzzle);

  const outerHorizontalDivisionCount = getValueFromNumberResult(getNumberResultFromNumberId(OuterHorizontalDivisionCount, references));
  const innerHorizontalDivisionCount = getValueFromNumberResult(getNumberResultFromNumberId(InnerHorizontalDivisionCount, references));
  const outerVerticalDivisionCount = getValueFromNumberResult(getNumberResultFromNumberId(OuterVerticalDivisionCount, references));
  const innerVerticalDivisionCount = getValueFromNumberResult(getNumberResultFromNumberId(InnerVerticalDivisionCount, references));

  const objectIds: string[] = puzzle.objects !== undefined ? Object.keys(puzzle.objects) : [];
  const classIds: string[] = puzzle.classes !== undefined ? Object.keys(puzzle.classes) : [];
  const objects: { [id: string]: AsinoObjectReference } = {};
  const classes: { [id: string]: AsinoClassReference } = {};
  const layers: AsinoLayer[] = [];

  if (typeof outerHorizontalDivisionCount === 'number') {
    if (typeof innerHorizontalDivisionCount === 'number') {
      if (typeof outerVerticalDivisionCount === 'number') {
        if (typeof innerVerticalDivisionCount === 'number') {
          for (let r = 1; r < outerHorizontalDivisionCount; r++) {
            const layer: AsinoLayer = { rectangleId: 'a-db' };

            const numbers: { [id: string]: AsinoNumber } = {};
            r !== 1 && (numbers[OuterHorizontalDivisionBorderIndex] = { number: { value: r } });

            Object.entries(numbers).length !== 0 && (layer.numbers = numbers);

            layers.push(layer);
          }

          for (let c = 1; c < outerHorizontalDivisionCount; c++) {
            const layer: AsinoLayer = { rectangleId: 'e-cb' };

            const numbers: { [id: string]: AsinoNumber } = {};
            c !== 1 && (numbers[OuterVerticalDivisionBorderIndex] = { number: { value: c } });

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
              objects[objectId] = { name: { value: objectName }, value: { collectionId: collectionId } };

              const numbers: { [id: string]: AsinoNumber } = {};

              c !== 1 && (numbers[InterfaceColumnIndex] = { number: { value: c } });
              r !== 1 && (numbers[InterfaceRowIndex] = { number: { value: r } });

              Object.entries(numbers).length !== 0 && (layer.numbers = numbers);

              layers.push(layer);
            }
          }
        }
      }
    }
  }

  const classReferenceIds = ['b-de', 'f-de', 'e-eb', 'a-ae', 'c-ee', 'd-df', 'f-ce', 'f-ed', 'e-ff'];

  classReferenceIds.forEach(classRefId => {
    const classId = Utils.getRandomId(classIds);
    classIds.push(classId);

    classes[classId] = { name: systemClassDefaults[classRefId].name, value: { classId: classRefId, collectionId: collectionId } };
  });

  update(
    {
      ...puzzle,
      collections: { ...puzzle.collections, ...{ [collectionId]: { name: { value: 'Sudoku Collection' } } } },
      objects: { ...puzzle.objects, ...objects },
      classes: { ...puzzle.classes, ...classes },
      layers: [...(puzzle.layers ?? []), ...layers],
    }
  );
}
