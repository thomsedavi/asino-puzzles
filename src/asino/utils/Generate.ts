import Utils from "../../common/utils";
import { Variables } from "../Variables";
import { InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceColumnIndex, InterfaceRowIndex, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionCount, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionCount } from "../consts";
import { systemClassDefaults } from "../system/Classes";
import { AsinoClass } from "../types/Class";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObject } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { AsinoSet } from "../types/Set";
import { getNumberResultFromAsinoNumber, getValueFromNumberResult } from "./Number";

export const generateSudoku = (puzzle: AsinoPuzzle, update: (puzzle: AsinoPuzzle) => void) => {
  const collectionId = Utils.getRandomId(puzzle.collections !== undefined ? Object.keys(puzzle.collections) : []);
  const variables = new Variables(puzzle);

  const outerHorizontalDivisionCount = getValueFromNumberResult(getNumberResultFromAsinoNumber({ numberId: OuterHorizontalDivisionCount }, variables));
  const innerHorizontalDivisionCount = getValueFromNumberResult(getNumberResultFromAsinoNumber({ numberId: InnerHorizontalDivisionCount }, variables));
  const outerVerticalDivisionCount = getValueFromNumberResult(getNumberResultFromAsinoNumber({ numberId: OuterVerticalDivisionCount }, variables));
  const innerVerticalDivisionCount = getValueFromNumberResult(getNumberResultFromAsinoNumber({ numberId: InnerVerticalDivisionCount }, variables));

  const objectIds: string[] = puzzle.objects !== undefined ? Object.keys(puzzle.objects) : [];
  const classIds: string[] = puzzle.classes !== undefined ? Object.keys(puzzle.classes) : [];
  const setIds: string[] = puzzle.sets !== undefined ? Object.keys(puzzle.sets) : [];
  const objects: { [id: string]: AsinoObject } = {};
  const classes: { [id: string]: AsinoClass } = {};
  const sets: { [id: string]: AsinoSet } = {};
  const layers: AsinoLayer[] = [];

  if (typeof outerHorizontalDivisionCount === 'number') {
    if (typeof innerHorizontalDivisionCount === 'number') {
      if (typeof outerVerticalDivisionCount === 'number') {
        if (typeof innerVerticalDivisionCount === 'number') {
          for (let r = 1; r < outerHorizontalDivisionCount; r++) {
            const layer: AsinoLayer = { rectangleId: 'a-db' };

            const numbers: { [id: string]: AsinoNumber } = {};
            r !== 1 && (numbers[OuterHorizontalDivisionBorderIndex] = { integer: r });

            Object.entries(numbers).length !== 0 && (layer.numberVariables = numbers);

            layers.push(layer);
          }

          for (let c = 1; c < outerHorizontalDivisionCount; c++) {
            const layer: AsinoLayer = { rectangleId: 'e-cb' };

            const numbers: { [id: string]: AsinoNumber } = {};
            c !== 1 && (numbers[OuterVerticalDivisionBorderIndex] = { integer: c });

            Object.entries(numbers).length !== 0 && (layer.numberVariables = numbers);

            layers.push(layer);
          }

          for (let r = 1; r <= (outerHorizontalDivisionCount * innerHorizontalDivisionCount); r++) {
            const horizontalSetObjects: AsinoObject[] = [];

            for (let c = 1; c <= (outerVerticalDivisionCount * innerVerticalDivisionCount); c++) {
              const objectId = Utils.getRandomId(objectIds);
              objectIds.push(objectId);

              const layer: AsinoLayer = {
                interfaceId: 'c-fe',
                objectId: objectId
              };

              const objectName = `Object R${r}C${c}`;
              objects[objectId] = { id: objectId, name: objectName, collectionId: collectionId };

              horizontalSetObjects.push({ objectId: objectId });

              const numbers: { [id: string]: AsinoNumber } = {};

              c !== 1 && (numbers[InterfaceColumnIndex] = { integer: c });
              r !== 1 && (numbers[InterfaceRowIndex] = { integer: r });

              Object.entries(numbers).length !== 0 && (layer.numberVariables = numbers);

              layers.push(layer);
            }

            const horizontalSetId = Utils.getRandomId(setIds);
            setIds.push(horizontalSetId);

            sets[horizontalSetId] = { id: horizontalSetId, objects: { objects: horizontalSetObjects } };
          }
        }
      }
    }
  }

  const classReferenceIds = ['b-de', 'f-de', 'e-eb', 'a-ae', 'c-ee', 'd-df', 'f-ce', 'f-ed', 'e-ff'];

  classReferenceIds.forEach(classRefId => {
    const classId = Utils.getRandomId(classIds);
    classIds.push(classId);

    classes[classId] = { id: classId, name: systemClassDefaults[classRefId].name, classId: classRefId, collectionId: collectionId };
  });

  update(
    {
      ...puzzle,
      collections: { ...puzzle.collections, ...{ [collectionId]: { name: 'Sudoku Collection' } } },
      objects: { ...puzzle.objects, ...objects },
      classes: { ...puzzle.classes, ...classes },
      layers: [...(puzzle.layers ?? []), ...layers],
      sets: { ...puzzle.sets, ...sets },
    }
  );
}
