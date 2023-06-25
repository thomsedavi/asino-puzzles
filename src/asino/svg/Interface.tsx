import React from "react"
import { AsinoInterface, AsinoLayer, AsinoNumber, AsinoPath, AsinoPuzzle, Solution } from "../interfaces"
import { getNumberFromLayer, getGridValue, getProduct, getNumberFromId, getSum } from "../utils";
import { Height, HeightId, L, M, Width, WidthId, X, XId, Y, YId, Z } from "../consts";
import { drawPath } from "./Path";
import { drawLayer } from "./Svg";

export const drawInterface = (puzzle: AsinoPuzzle, interfaces: (AsinoInterface | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], solution: Solution, numbers: AsinoNumber[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, key: string, selectedObjectId?: string): JSX.Element => {
  let interfaceCollectionId: string | undefined = undefined;
  let interfaceObjectId: string | undefined = undefined;

  objectIds.forEach((objectId: string | undefined) => {
    objectId !== undefined && (interfaceObjectId = objectId);
  });

  collectionIds.forEach((collectionId: string | undefined) => {
    collectionId !== undefined && (interfaceCollectionId = collectionId);
  });

  const x = getNumberFromLayer(interfaces, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, WidthId, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, HeightId, defaultInterfaceHeightValue);

  let fill = interfaceObjectId === selectedObjectId ? 'var(--accent-strong)' : 'var(--background-color-input)';

  const innards: JSX.Element[] = [];

  const collection = puzzle.collections?.filter(collection => collection.id === interfaceCollectionId)[0];

  if (collection !== undefined) {
    const selectedClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId;

    if (selectedClassId !== undefined) {
      const selectedClass = collection.classes?.filter(asinoClass => asinoClass.id === selectedClassId)[0];

      if (selectedClass !== undefined) {
        selectedClass.layers?.forEach((layer: AsinoLayer, classLayerIndex: number) => {
          innards.push(drawLayer(puzzle, solution, layer, { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, selectedObjectId));
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
  const x = getNumberFromLayer(interfaces, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, WidthId, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, HeightId, defaultInterfaceHeightValue);

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