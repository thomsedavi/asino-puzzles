import React from "react"
import { AsinoColor, AsinoInterface, AsinoLayer, AsinoNumber, AsinoPuzzle, Solution } from "../interfaces"
import { getNumberFromLayer, getGridValue } from "../utils";
import { Height, Width, X, Y } from "../consts";
import { drawLayer } from "./Svg";

export const drawInterface = (puzzle: AsinoPuzzle, interfaces: (AsinoInterface | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], fixedClassIds: (string | undefined)[], solution: Solution, numbers: AsinoNumber[], colors: AsinoColor[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, key: string, selectedObjectId?: string): JSX.Element => {
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

  const x = getNumberFromLayer(interfaces, numbers, X, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, defaultInterfaceHeightValue);

  let fill = interfaceObjectId === selectedObjectId ? 'var(--accent-strong)' : 'var(--background-color-input)';

  const innards: JSX.Element[] = [];

  const collection = puzzle.collections?.filter(collection => collection.id === interfaceCollectionId)[0];

  if (collection !== undefined) {
    interfaceClassId === undefined && (interfaceClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId);

    if (interfaceClassId !== undefined) {
      const selectedClass = collection.classes?.filter(asinoClass => asinoClass.id === interfaceClassId)[0];

      if (selectedClass !== undefined) {
        selectedClass.layers?.forEach((layer: AsinoLayer, classLayerIndex: number) => {
          innards.push(drawLayer(puzzle, solution, layer, [...colors, ...(layer?.colors ?? [])], { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, selectedObjectId));
        });
      }
    }
  }

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${getGridValue(x)},${getGridValue(y)})`}
  >
    <rect
      width={getGridValue(width)}
      height={getGridValue(height)}
      stroke='var(--color)'
      fill={fill}
      strokeWidth={getGridValue({ numerator: 1, denominator: 200 })}
    />
    {innards}
  </g>;
}

export const drawInterfaceInteractive = (interfaces: (AsinoInterface | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], numbers: AsinoNumber[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, index: number, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void): JSX.Element => {
  const x = getNumberFromLayer(interfaces, numbers, X, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, defaultInterfaceHeightValue);

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
    x={getGridValue(x)}
    y={getGridValue(y)}
    width={getGridValue(width)}
    height={getGridValue(height)}
    stroke='none'
    fill='transparent'
    cursor={interfaceObjectId === undefined ? 'auto' : 'pointer'}
    strokeWidth={getGridValue({ numerator: 1, denominator: 200 })}
    onClick={() => {
      interfaceObjectId !== undefined && setSelectedObjectId(interfaceObjectId);
      interfaceCollectionId !== undefined && setSelectedCollectionId(interfaceCollectionId);
    }}
  />;
}