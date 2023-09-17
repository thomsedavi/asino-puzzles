import React from "react"
import { getClassFromAsinoClass, getClassFromClassReference, getColorFromLayer, getDifference, getNumberFromAsinoNumber, getNumberFromLayer, getProduct, getValueFromColor, getValueFromNumber } from "../utils";
import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected, PaddingTopHeight, PaddingRightWidth, PaddingBottomHeight, PaddingLeftWidth } from "../consts";
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
import { ViewBox } from "../types/ViewBox";
import { Class } from "../types/Class";

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

  const paddingTopHeight = getNumberFromLayer(interfaces, references.clone(), 'interface', PaddingTopHeight, { number: 0 });
  const paddingRightWidth = getNumberFromLayer(interfaces, references.clone(), 'interface', PaddingRightWidth, { number: 0 });
  const paddingBottomHeight = getNumberFromLayer(interfaces, references.clone(), 'interface', PaddingBottomHeight, { number: 0 });
  const paddingLeftWidth = getNumberFromLayer(interfaces, references.clone(), 'interface', PaddingLeftWidth, { number: 0 });

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

  const outerTop = `0`;
  const outerRight = `${getValueFromNumber(width.number, references.clone())}`;
  const outerBottom = `${getValueFromNumber(height.number, references.clone())}`;
  const outerLeft = `0`;

  const innerTop = `${getValueFromNumber(getProduct(borderTopHeight.number, height.number, references.clone()).number, references.clone())}`;
  const innerRight = `${getValueFromNumber(getDifference(width.number, getProduct(borderRightWidth.number, width.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const innerBottom = `${getValueFromNumber(getDifference(height.number, getProduct(borderBottomHeight.number, height.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const innerLeft = `${getValueFromNumber(getProduct(borderLeftWidth.number, width.number, references.clone()).number, references.clone())}`;

  const paddingInnerTopScaled = `${getValueFromNumber(getProduct(paddingTopHeight.number, height.number, references.clone()).number, references.clone())}`;
  const paddingInnerRightScaled = `${getValueFromNumber(getDifference(width.number, getProduct(paddingRightWidth.number, width.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const paddingInnerBottomScaled = `${getValueFromNumber(getDifference(height.number, getProduct(paddingBottomHeight.number, height.number, references.clone()).number, references.clone()).number, references.clone())}`;
  const paddingInnerLeftScaled = `${getValueFromNumber(getProduct(paddingLeftWidth.number, width.number, references.clone()).number, references.clone())}`;

  const paddingInnerTopRaw = `${getValueFromNumber(paddingTopHeight.number, references.clone())}`;
  const paddingInnerRightRaw = `${getValueFromNumber(getDifference(1, paddingRightWidth.number, references.clone()).number, references.clone())}`;
  const paddingInnerBottomRaw = `${getValueFromNumber(getDifference(1, paddingBottomHeight.number, references.clone()).number, references.clone())}`;
  const paddingInnerLeftRaw = `${getValueFromNumber(paddingLeftWidth.number, references.clone())}`;

  console.log(innerTop);
  console.log(innerRight);
  console.log(innerBottom);
  console.log(innerLeft);

  console.log(paddingInnerTopScaled);
  console.log(paddingInnerRightScaled);
  console.log(paddingInnerBottomScaled);
  console.log(paddingInnerLeftScaled);

  console.log(paddingInnerTopRaw);
  console.log(paddingInnerRightRaw);
  console.log(paddingInnerBottomRaw);
  console.log(paddingInnerLeftRaw);

  interfaceClassId === undefined && (interfaceClassId = solution.selectedClasses?.filter(aClass => aClass.objectId === interfaceObjectId)[0]?.classId);

  let asinoClass: Class | undefined = undefined

  if (interfaceClassId !== undefined) {
    const selectedClassReference = systemClassDefaults.filter(asinoClass => asinoClass.id === interfaceClassId)[0];

    const selectedClass = getClassFromClassReference(selectedClassReference, references.clone().addClasses([puzzle.classes]));

    if (selectedClass !== undefined) {
      asinoClass = getClassFromAsinoClass(selectedClass, references.clone().addClasses([puzzle.classes]), solution);
    }
  }

  const viewBoxThing1 = `${getValueFromNumber(getNumberFromAsinoNumber(asinoClass?.viewBox?.minX, references.clone()).number, references.clone())}`;
  const viewBoxThing2 = `${getValueFromNumber(getNumberFromAsinoNumber(asinoClass?.viewBox?.minY, references.clone()).number, references.clone())}`;
  const viewBoxThing3 = `${getValueFromNumber(getNumberFromAsinoNumber(asinoClass?.viewBox?.width, references.clone()).number, references.clone())}`;
  const viewBoxThing4 = `${getValueFromNumber(getNumberFromAsinoNumber(asinoClass?.viewBox?.height, references.clone()).number, references.clone())}`;

  console.log(viewBoxThing1);
  console.log(viewBoxThing2);
  console.log(viewBoxThing3);
  console.log(viewBoxThing4);

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
    {asinoClass !== undefined && <g transform={`translate(${paddingInnerLeftScaled},${paddingInnerTopScaled}) scale(${(Number(paddingInnerRightRaw) ?? 1) - (Number(paddingInnerLeftRaw) ?? 1)},${(Number(paddingInnerBottomRaw) ?? 1) - (Number(paddingInnerTopRaw) ?? 1)})`}>
      {asinoClass.layers?.map((layer: AsinoLayer, classLayerIndex: number) => { return drawLayer(puzzle, solution, layer, references.clone().addParameters([layer?.parameters]).setObject(interfaceObjectId), { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, styles, selectedObjectId) })}
    </g>}
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