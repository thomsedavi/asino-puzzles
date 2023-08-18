import React from "react"
import { AsinoPuzzle, Solution } from "../interfaces"
import { getClassFromAsinoClass, getClassFromClassReference, getDifference, getNumberFromLayer, getProduct, getValueFromNumber } from "../utils";
import { BorderBottomHeight, BorderLeftWidth, BorderRightWidth, BorderTopHeight, height as Height, width as Width, x as X, y as Y } from "../consts";
import { drawLayer } from "./View";
import { AsinoInterfaceReference } from "../types/Interface";
import { AsinoNumberReference } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";

export const drawInterface = (puzzle: AsinoPuzzle, interfaces: (AsinoInterfaceReference | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], fixedClassIds: (string | undefined)[], solution: Solution, references: References, defaultInterfaceWidthValue: AsinoNumberReference, defaultInterfaceHeightValue: AsinoNumberReference, key: string, selectedObjectId?: string): JSX.Element => {
  let interfaceCollectionId: string | undefined = undefined;
  let interfaceObjectId: string | undefined = undefined;
  let interfaceClassId: string | undefined = undefined;

  objectIds.forEach((objectId: string | undefined) => {
    objectId !== undefined && (interfaceObjectId = objectId);
  });

  collectionIds.forEach((collectionId: string | undefined) => {
    collectionId !== undefined && (interfaceCollectionId = collectionId);
  });

  fixedClassIds.forEach((fixedClassId: string | undefined) => {
    fixedClassId !== undefined && (interfaceClassId = fixedClassId);
    references.setFixedClassId(fixedClassId);
  });

  const x = getNumberFromLayer(interfaces, references.clone(), X, { value: 0 });
  const y = getNumberFromLayer(interfaces, references.clone(), Y, { value: 0 });
  const width = getNumberFromLayer(interfaces, references.clone(), Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, references.clone(), Height, defaultInterfaceHeightValue);

  const borderTopHeight = getNumberFromLayer(interfaces, references.clone(), BorderTopHeight, { value: 0 });
  const borderRightWidth = getNumberFromLayer(interfaces, references.clone(), BorderRightWidth, { value: 0 });
  const borderBottomHeight = getNumberFromLayer(interfaces, references.clone(), BorderBottomHeight, { value: 0 });
  const borderLeftWidth = getNumberFromLayer(interfaces, references.clone(), BorderLeftWidth, { value: 0 });

  let fill = interfaceObjectId === selectedObjectId ? 'var(--accent-strong)' : 'var(--background-color-input)';

  const innards: (JSX.Element | undefined)[] = [];

  const collection = puzzle.collections?.filter(collection => collection.id === interfaceCollectionId)[0];

  if (collection !== undefined) {
    interfaceClassId === undefined && (interfaceClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId);

    if (interfaceClassId !== undefined) {
      const selectedClassReference = collection.classes?.filter(asinoClass => asinoClass.id === interfaceClassId)[0];

      const selectedClass = getClassFromClassReference(selectedClassReference, references.clone().addClasses([puzzle.classes]));

      if (selectedClass !== undefined) {
        const asinoClass = getClassFromAsinoClass(selectedClass, references.clone().addClasses([puzzle.classes]), solution);

        asinoClass?.layers?.forEach((layer: AsinoLayer, classLayerIndex: number) => {
          innards.push(drawLayer(puzzle, solution, layer, references.clone().addColors([layer?.colors]).setObject(interfaceObjectId), { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, selectedObjectId));
        });
      }
    }
  }

  const outerTop = `0`;
  const outerRight = `${getValueFromNumber(width, references.clone())}`;
  const outerBottom = `${getValueFromNumber(height, references.clone())}`;
  const outerLeft = `0`;

  const innerTop = `${getValueFromNumber(getProduct(borderTopHeight, height, references.clone()), references.clone())}`;
  const innerRight = `${getValueFromNumber(getDifference(width, getProduct(borderRightWidth, width, references.clone()), references.clone()), references.clone())}`;
  const innerBottom = `${getValueFromNumber(getDifference(height, getProduct(borderBottomHeight, height, references.clone()), references.clone()), references.clone())}`;
  const innerLeft = `${getValueFromNumber(getProduct(borderLeftWidth, width, references.clone()), references.clone())}`;

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${getValueFromNumber(x, references.clone()) ?? 0},${getValueFromNumber(y, references.clone()) ?? 0})`}
  >
    <rect
      width={getValueFromNumber(width, references.clone())}
      height={getValueFromNumber(height, references.clone())}
      fill='red'
    />
    <path
      d={`M${outerLeft},${outerTop}L${outerRight},${outerTop}L${innerRight},${innerTop}L${innerLeft},${innerTop}Z`}
      fill={fill}
    />
    <path
      d={`M${outerRight},${outerTop}L${outerRight},${outerBottom}L${innerRight},${innerBottom}L${innerRight},${innerTop}Z`}
      fill={fill}
    />
    <path
      d={`M${outerRight},${outerBottom}L${outerLeft},${outerBottom}L${innerLeft},${innerBottom}L${innerRight},${innerBottom}Z`}
      fill={fill}
    />
    <path
      d={`M${outerLeft},${outerBottom}L${outerLeft},${outerTop}L${innerLeft},${innerTop}L${innerLeft},${innerBottom}Z`}
      fill={fill}
    />
    {innards}
  </g>;
}

export const drawInterfaceInteractive = (interfaces: (AsinoInterfaceReference | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], references: References, defaultInterfaceWidthValue: AsinoNumberReference, defaultInterfaceHeightValue: AsinoNumberReference, index: number, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void): JSX.Element => {
  const x = getNumberFromLayer(interfaces, references.clone(), X, { value: 0 });
  const y = getNumberFromLayer(interfaces, references.clone(), Y, { value: 0 });
  const width = getNumberFromLayer(interfaces, references.clone(), Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, references.clone(), Height, defaultInterfaceHeightValue);

  let interfaceObjectId: string | undefined = undefined;
  let interfaceCollectionId: string | undefined = undefined;

  objectIds.forEach((objectId: string | undefined) => {
    objectId !== undefined && (interfaceObjectId = objectId);
  });
  collectionIds.forEach((collectionId: string | undefined) => {
    collectionId !== undefined && (interfaceCollectionId = collectionId);
  });

  return <rect
    id={`layerInteractive${index}`}
    key={`layerInteractive${index}`}
    x={getValueFromNumber(x, references.clone())}
    y={getValueFromNumber(y, references.clone())}
    width={getValueFromNumber(width, references.clone())}
    height={getValueFromNumber(height, references.clone())}
    stroke='none'
    fill='transparent'
    cursor={interfaceObjectId === undefined ? 'auto' : 'pointer'}
    strokeWidth={getValueFromNumber({ numerator: 1, denominator: 200 }, references.clone())}
    onClick={() => {
      interfaceObjectId !== undefined && setSelectedObjectId(interfaceObjectId);
      interfaceCollectionId !== undefined && setSelectedCollectionId(interfaceCollectionId);
    }}
  />;
}