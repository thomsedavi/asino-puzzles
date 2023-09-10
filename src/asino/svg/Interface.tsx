import React from "react"
import { getClassFromAsinoClass, getClassFromClassReference, getColorFromLayer, getDifference, getNumberFromLayer, getProduct, getValueFromColor, getValueFromNumber } from "../utils";
import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected } from "../consts";
import { drawLayer } from "./View";
import { AsinoInterfaceReference } from "../types/Interface";
import { AsinoNumberReference } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import Utils from "../../common/utils";
import { systemClassDefaults } from "../references/Classes";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawInterface = (puzzle: AsinoPuzzle, interfaces: (AsinoInterfaceReference | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], fixedClassIds: (string | undefined)[], solution: Solution, references: References, defaultInterfaceWidthValue: AsinoNumberReference, defaultInterfaceHeightValue: AsinoNumberReference, key: string, styles: Style[], selectedObjectId?: string): JSX.Element => {
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

  const solutionClass = solution.selectedClasses?.filter(c => c.objectId === interfaceObjectId)[0]?.classId;
  solutionClass !== undefined && (interfaceClassId = solutionClass);

  const x = getNumberFromLayer(interfaces, references.clone(), 'interface', X, { number: 0 });
  const y = getNumberFromLayer(interfaces, references.clone(), 'interface', Y, { number: 0 });
  const width = getNumberFromLayer(interfaces, references.clone(), 'interface', Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, references.clone(), 'interface', Height, defaultInterfaceHeightValue);

  const borderTopHeight = getNumberFromLayer(interfaces, references.clone(), 'interface', BorderTopHeight, { number: 0 });
  const borderRightWidth = getNumberFromLayer(interfaces, references.clone(), 'interface', BorderRightWidth, { number: 0 });
  const borderBottomHeight = getNumberFromLayer(interfaces, references.clone(), 'interface', BorderBottomHeight, { number: 0 });
  const borderLeftWidth = getNumberFromLayer(interfaces, references.clone(), 'interface', BorderLeftWidth, { number: 0 });

  const fill = getColorFromLayer(interfaces, references.clone(), solution, 'interface', interfaceObjectId === selectedObjectId ? FillSelected : Fill);
  const borderTopFill = getColorFromLayer(interfaces, references.clone(), solution, 'interface', BorderTopFill);
  const borderRightFill = getColorFromLayer(interfaces, references.clone(), solution, 'interface', BorderRightFill);
  const borderBottomFill = getColorFromLayer(interfaces, references.clone(), solution, 'interface', BorderBottomFill);
  const borderLeftFill = getColorFromLayer(interfaces, references.clone(), solution, 'interface', BorderLeftFill);

  const fillClass = getValueFromColor(fill.color, references.clone(), 'f', false);
  const borderTopFillClass = getValueFromColor(borderTopFill.color, references.clone(), 'f', false);
  const borderRightFillClass = getValueFromColor(borderRightFill.color, references.clone(), 'f', false);
  const borderBottomFillClass = getValueFromColor(borderBottomFill.color, references.clone(), 'f', false);
  const borderLeftFillClass = getValueFromColor(borderLeftFill.color, references.clone(), 'f', false);

  const fillDarkClass = getValueFromColor(fill.color, references.clone(), 'fd', true);
  const borderTopFillDarkClass = getValueFromColor(borderTopFill.color, references.clone(), 'fd', true);
  const borderRightFillDarkClass = getValueFromColor(borderRightFill.color, references.clone(), 'fd', true);
  const borderBottomFillDarkClass = getValueFromColor(borderBottomFill.color, references.clone(), 'fd', true);
  const borderLeftFillDarkClass = getValueFromColor(borderLeftFill.color, references.clone(), 'fd', true);

  styles.filter(s => s.id === fillClass?.key).length === 0 && (styles.push({ id: fillClass?.key, fill: fillClass?.value }));
  styles.filter(s => s.id === borderTopFillClass?.key).length === 0 && (styles.push({ id: borderTopFillClass?.key, fill: borderTopFillClass?.value }));
  styles.filter(s => s.id === borderRightFillClass?.key).length === 0 && (styles.push({ id: borderRightFillClass?.key, fill: borderRightFillClass?.value }));
  styles.filter(s => s.id === borderBottomFillClass?.key).length === 0 && (styles.push({ id: borderBottomFillClass?.key, fill: borderBottomFillClass?.value }));
  styles.filter(s => s.id === borderLeftFillClass?.key).length === 0 && (styles.push({ id: borderLeftFillClass?.key, fill: borderLeftFillClass?.value }));

  styles.filter(s => s.id === fillDarkClass?.key).length === 0 && (styles.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styles.filter(s => s.id === borderTopFillDarkClass?.key).length === 0 && (styles.push({ id: borderTopFillDarkClass?.key, fillDark: borderTopFillDarkClass?.value }));
  styles.filter(s => s.id === borderRightFillDarkClass?.key).length === 0 && (styles.push({ id: borderRightFillDarkClass?.key, fillDark: borderRightFillDarkClass?.value }));
  styles.filter(s => s.id === borderBottomFillDarkClass?.key).length === 0 && (styles.push({ id: borderBottomFillDarkClass?.key, fillDark: borderBottomFillDarkClass?.value }));
  styles.filter(s => s.id === borderLeftFillDarkClass?.key).length === 0 && (styles.push({ id: borderLeftFillDarkClass?.key, fillDark: borderLeftFillDarkClass?.value }));

  const innards: (JSX.Element | undefined)[] = [];

  interfaceClassId === undefined && (interfaceClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId);

  if (interfaceClassId !== undefined) {
    const selectedClassReference = systemClassDefaults.filter(asinoClass => asinoClass.id === interfaceClassId)[0];

    const selectedClass = getClassFromClassReference(selectedClassReference, references.clone().addClasses([puzzle.classes]));

    if (selectedClass !== undefined) {
      const asinoClass = getClassFromAsinoClass(selectedClass, references.clone().addClasses([puzzle.classes]), solution);

      asinoClass?.layers?.forEach((layer: AsinoLayer, classLayerIndex: number) => {
        innards.push(drawLayer(puzzle, solution, layer, references.clone().addParameters([layer?.parameters]).setObject(interfaceObjectId), { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, styles, selectedObjectId));
      });
    }
  }

  const outerTop = `0`;
  const outerRight = `${getValueFromNumber(width.number, references.clone())}`;
  const outerBottom = `${getValueFromNumber(height.number, references.clone())}`;
  const outerLeft = `0`;

  const innerTop = `${getValueFromNumber(getProduct(borderTopHeight.number, height.number, references.clone()).number, references.clone())}`;
  const innerRight = `${getValueFromNumber(getDifference(width.number, getProduct(borderRightWidth.number, width.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const innerBottom = `${getValueFromNumber(getDifference(height.number, getProduct(borderBottomHeight.number, height.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const innerLeft = `${getValueFromNumber(getProduct(borderLeftWidth.number, width.number, references.clone()).number, references.clone())}`;

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${getValueFromNumber(x.number, references.clone()) ?? 0},${getValueFromNumber(y.number, references.clone()) ?? 0})`}
  >
    <rect
      width={getValueFromNumber(width.number, references.clone())}
      height={getValueFromNumber(height.number, references.clone())}
      className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''}`)}
    />
    <path
      d={`M${outerLeft},${outerTop}L${outerRight},${outerTop}L${innerRight},${innerTop}L${innerLeft},${innerTop}Z`}
      className={Utils.tidyString(`${borderTopFillClass?.key ?? ''} ${borderTopFillDarkClass?.key ?? ''}`)}
    />
    <path
      d={`M${outerRight},${outerTop}L${outerRight},${outerBottom}L${innerRight},${innerBottom}L${innerRight},${innerTop}Z`}
      className={Utils.tidyString(`${borderRightFillClass?.key ?? ''} ${borderRightFillDarkClass?.key ?? ''}`)}
    />
    <path
      d={`M${outerRight},${outerBottom}L${outerLeft},${outerBottom}L${innerLeft},${innerBottom}L${innerRight},${innerBottom}Z`}
      className={Utils.tidyString(`${borderBottomFillClass?.key ?? ''} ${borderBottomFillDarkClass?.key ?? ''}`)}
    />
    <path
      d={`M${outerLeft},${outerBottom}L${outerLeft},${outerTop}L${innerLeft},${innerTop}L${innerLeft},${innerBottom}Z`}
      className={Utils.tidyString(`${borderLeftFillClass?.key ?? ''} ${borderLeftFillDarkClass?.key ?? ''}`)}
    />
    {innards}
  </g>;
}

export const drawInterfaceInteractive = (interfaces: (AsinoInterfaceReference | undefined)[], collectionIds: (string | undefined)[], objectIds: (string | undefined)[], references: References, defaultInterfaceWidthValue: AsinoNumberReference, defaultInterfaceHeightValue: AsinoNumberReference, index: number, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void): JSX.Element => {
  const x = getNumberFromLayer(interfaces, references.clone(), 'interface', X, { number: 0 });
  const y = getNumberFromLayer(interfaces, references.clone(), 'interface', Y, { number: 0 });
  const width = getNumberFromLayer(interfaces, references.clone(), 'interface', Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, references.clone(), 'interface', Height, defaultInterfaceHeightValue);

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
    x={getValueFromNumber(x.number, references.clone())}
    y={getValueFromNumber(y.number, references.clone())}
    width={getValueFromNumber(width.number, references.clone())}
    height={getValueFromNumber(height.number, references.clone())}
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