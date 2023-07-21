import React from "react"
import { AsinoLayer, AsinoPuzzle, Solution } from "../interfaces"
import { getClassFromAsinoClass, getClassFromClassReference, getNumberFromLayer, getValueFromNumber } from "../utils";
import { Height, Width, X, Y } from "../consts";
import { drawLayer } from "./View";
import { AsinoInterfaceReference } from "../types/Interface";
import { AsinoNumberReference } from "../types/Number";
import { References } from "../References";

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
  });

  const x = getNumberFromLayer(interfaces, references.clone(), X, { value: 0 });
  const y = getNumberFromLayer(interfaces, references.clone(), Y, { value: 0 });
  const width = getNumberFromLayer(interfaces, references.clone(), Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, references.clone(), Height, defaultInterfaceHeightValue);

  let fill = interfaceObjectId === selectedObjectId ? 'var(--accent-strong)' : 'var(--background-color-input)';

  const innards: JSX.Element[] = [];

  const collection = puzzle.collections?.filter(collection => collection.id === interfaceCollectionId)[0];

  if (collection !== undefined) {
    interfaceClassId === undefined && (interfaceClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId);

    if (interfaceClassId !== undefined) {
      const selectedClassReference = collection.classes?.filter(asinoClass => asinoClass.id === interfaceClassId)[0];

      const selectedClass = getClassFromClassReference(selectedClassReference, references.clone().addClasses([puzzle.classes]));

      if (selectedClass !== undefined) {
        const asinoClass = getClassFromAsinoClass(selectedClass, references.clone().addClasses([puzzle.classes]));

        asinoClass?.layers?.forEach((layer: AsinoLayer, classLayerIndex: number) => {
          innards.push(drawLayer(puzzle, solution, layer, references.clone().addColors([layer?.colors]).setObject(interfaceObjectId), { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, selectedObjectId));
        });
      }
    }
  }

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${getValueFromNumber(x) ?? 0},${getValueFromNumber(y) ?? 0})`}
  >
    <rect
      width={getValueFromNumber(width)}
      height={getValueFromNumber(height)}
      stroke='var(--color)'
      fill={fill}
      strokeWidth={getValueFromNumber({ numerator: 1, denominator: 200 })}
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
    x={getValueFromNumber(x)}
    y={getValueFromNumber(y)}
    width={getValueFromNumber(width)}
    height={getValueFromNumber(height)}
    stroke='none'
    fill='transparent'
    cursor={interfaceObjectId === undefined ? 'auto' : 'pointer'}
    strokeWidth={getValueFromNumber({ numerator: 1, denominator: 200 })}
    onClick={() => {
      interfaceObjectId !== undefined && setSelectedObjectId(interfaceObjectId);
      interfaceCollectionId !== undefined && setSelectedCollectionId(interfaceCollectionId);
    }}
  />;
}