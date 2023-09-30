import React from "react"
import { getClassFromAsinoClass, getClassFromClassReference, getColorResultFromLayer, getNumberFromLayer, getValueFromColor } from "../utils";
import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected, PaddingTopHeight, PaddingRightWidth, PaddingBottomHeight, PaddingLeftWidth } from "../consts";
import { drawLayer } from "./View";
import { Interface } from "../types/Interface";
import { AsinoNumber } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import Utils from "../../common/utils";
import { systemClassDefaults } from "../references/Classes";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { Class } from "../types/Class";
import { getDifference, getNumberResultFromAsinoNumber, getProduct, getValueFromNumberResult } from "../utils/Number";

export const drawInterface = (asinoInterface: Interface, objectIds: (string | undefined)[], fixedClassIds: (string | undefined)[], references: References, solution: Solution, defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, key: string, styles: { [id: string]: Style }, selectedObjectId?: string): JSX.Element => {
  let interfaceObjectId: string | undefined = undefined;
  let interfaceClassId: string | undefined = undefined;

  objectIds.forEach((objectId: string | undefined) => {
    objectId !== undefined && (interfaceObjectId = objectId);
  });

  fixedClassIds.forEach((fixedClassId: string | undefined) => {
    fixedClassId !== undefined && (interfaceClassId = fixedClassId);
    references.setFixedClassId(fixedClassId);
  });

  const solutionClass = (interfaceObjectId !== undefined && solution.selectedObjectClasses !== undefined) ? solution.selectedObjectClasses[interfaceObjectId] : undefined;
  solutionClass !== undefined && (interfaceClassId = solutionClass);

  const x = getNumberFromLayer(asinoInterface, references, 'interface', X, { number: { value: 0 } });
  const y = getNumberFromLayer(asinoInterface, references, 'interface', Y, { number: { value: 0 } });
  const width = getNumberFromLayer(asinoInterface, references, 'interface', Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(asinoInterface, references, 'interface', Height, defaultInterfaceHeightValue);

  const borderTopHeight = getNumberFromLayer(asinoInterface, references, 'interface', BorderTopHeight, { number: { value: 0 } });
  const borderRightWidth = getNumberFromLayer(asinoInterface, references, 'interface', BorderRightWidth, { number: { value: 0 } });
  const borderBottomHeight = getNumberFromLayer(asinoInterface, references, 'interface', BorderBottomHeight, { number: { value: 0 } });
  const borderLeftWidth = getNumberFromLayer(asinoInterface, references, 'interface', BorderLeftWidth, { number: { value: 0 } });

  const paddingTopHeight = getNumberFromLayer(asinoInterface, references, 'interface', PaddingTopHeight, { number: { value: 0 } });
  const paddingRightWidth = getNumberFromLayer(asinoInterface, references, 'interface', PaddingRightWidth, { number: { value: 0 } });
  const paddingBottomHeight = getNumberFromLayer(asinoInterface, references, 'interface', PaddingBottomHeight, { number: { value: 0 } });
  const paddingLeftWidth = getNumberFromLayer(asinoInterface, references, 'interface', PaddingLeftWidth, { number: { value: 0 } });

  const fill = getColorResultFromLayer(asinoInterface, references, solution, 'interface', interfaceObjectId === selectedObjectId ? FillSelected : Fill);
  const borderTopFill = getColorResultFromLayer(asinoInterface, references, solution, 'interface', BorderTopFill);
  const borderRightFill = getColorResultFromLayer(asinoInterface, references, solution, 'interface', BorderRightFill);
  const borderBottomFill = getColorResultFromLayer(asinoInterface, references, solution, 'interface', BorderBottomFill);
  const borderLeftFill = getColorResultFromLayer(asinoInterface, references, solution, 'interface', BorderLeftFill);

  const fillClass = getValueFromColor(fill, references, 'f', false);
  const borderTopFillClass = getValueFromColor(borderTopFill, references, 'f', false);
  const borderRightFillClass = getValueFromColor(borderRightFill, references, 'f', false);
  const borderBottomFillClass = getValueFromColor(borderBottomFill, references, 'f', false);
  const borderLeftFillClass = getValueFromColor(borderLeftFill, references, 'f', false);

  const fillDarkClass = getValueFromColor(fill, references, 'fd', true);
  const borderTopFillDarkClass = getValueFromColor(borderTopFill, references, 'fd', true);
  const borderRightFillDarkClass = getValueFromColor(borderRightFill, references, 'fd', true);
  const borderBottomFillDarkClass = getValueFromColor(borderBottomFill, references, 'fd', true);
  const borderLeftFillDarkClass = getValueFromColor(borderLeftFill, references, 'fd', true);

  fillClass?.key !== undefined && styles[fillClass?.key] !== undefined && (styles[fillClass?.key].fill = fillClass?.value);
  fillClass?.key !== undefined && styles[fillClass.key] === undefined && (styles[fillClass?.key] = { fill: fillClass?.value });
  borderTopFillClass?.key !== undefined && styles[borderTopFillClass?.key] !== undefined && (styles[borderTopFillClass?.key].fill = borderTopFillClass?.value);
  borderRightFillClass?.key !== undefined && styles[borderRightFillClass?.key] !== undefined && (styles[borderRightFillClass?.key].fill = borderRightFillClass?.value);
  borderBottomFillClass?.key !== undefined && styles[borderBottomFillClass?.key] !== undefined && (styles[borderBottomFillClass?.key].fill = borderBottomFillClass?.value);
  borderLeftFillClass?.key !== undefined && styles[borderLeftFillClass?.key] !== undefined && (styles[borderLeftFillClass?.key].fill = borderLeftFillClass?.value);

  fillDarkClass?.key !== undefined && styles[fillDarkClass?.key] !== undefined && (styles[fillDarkClass?.key].fillDark = fillDarkClass?.value);
  fillDarkClass?.key !== undefined && styles[fillDarkClass.key] === undefined && (styles[fillDarkClass?.key] = { fillDark: fillDarkClass?.value });
  borderTopFillDarkClass?.key !== undefined && styles[borderTopFillDarkClass?.key] !== undefined && (styles[borderTopFillDarkClass?.key].fillDark = borderTopFillDarkClass?.value);
  borderRightFillDarkClass?.key !== undefined && styles[borderRightFillDarkClass?.key] !== undefined && (styles[borderRightFillDarkClass?.key].fillDark = borderRightFillDarkClass?.value);
  borderBottomFillDarkClass?.key !== undefined && styles[borderBottomFillDarkClass?.key] !== undefined && (styles[borderBottomFillDarkClass?.key].fillDark = borderBottomFillDarkClass?.value);
  borderLeftFillDarkClass?.key !== undefined && styles[borderLeftFillDarkClass?.key] !== undefined && (styles[borderLeftFillDarkClass?.key].fillDark = borderLeftFillDarkClass?.value);

  const outerTop = `0`;
  const outerRight = `${getValueFromNumberResult(width)}`;
  const outerBottom = `${getValueFromNumberResult(height)}`;
  const outerLeft = `0`;

  const innerTop = `${getValueFromNumberResult(getProduct(borderTopHeight, height, references))}`;
  const innerRight = `${getValueFromNumberResult(getDifference(width, getProduct(borderRightWidth, width, references), references))}`;
  const innerBottom = `${getValueFromNumberResult(getDifference(height, getProduct(borderBottomHeight, height, references), references))}`;
  const innerLeft = `${getValueFromNumberResult(getProduct(borderLeftWidth, width, references))}`;

  const paddingInnerTopScaled = `${getValueFromNumberResult(getProduct(paddingTopHeight, height, references))}`;
  const paddingInnerRightScaled = `${getValueFromNumberResult(getDifference(width, getProduct(paddingRightWidth, width, references), references))}`;
  const paddingInnerBottomScaled = `${getValueFromNumberResult(getDifference(height, getProduct(paddingBottomHeight, height, references), references))}`;
  const paddingInnerLeftScaled = `${getValueFromNumberResult(getProduct(paddingLeftWidth, width, references))}`;

  const paddingInnerTopRaw = `${getValueFromNumberResult(paddingTopHeight)}`;
  const paddingInnerRightRaw = `${getValueFromNumberResult(getDifference({ number: 1 }, paddingRightWidth, references))}`;
  const paddingInnerBottomRaw = `${getValueFromNumberResult(getDifference({ number: 1 }, paddingBottomHeight, references))}`;
  const paddingInnerLeftRaw = `${getValueFromNumberResult(paddingLeftWidth)}`;

  //console.log(innerTop);
  //console.log(innerRight);
  //console.log(innerBottom);
  //console.log(innerLeft);

  //console.log(paddingInnerTopScaled);
  //console.log(paddingInnerRightScaled);
  //console.log(paddingInnerBottomScaled);
  //console.log(paddingInnerLeftScaled);

  //console.log(paddingInnerTopRaw);
  //console.log(paddingInnerRightRaw);
  //console.log(paddingInnerBottomRaw);
  //console.log(paddingInnerLeftRaw);

  interfaceClassId === undefined && interfaceObjectId !== undefined && (interfaceClassId = solution.selectedObjectClasses?.[interfaceObjectId]);

  let asinoClass: Class | undefined = undefined

  if (interfaceClassId !== undefined) {
    const selectedClassReference = systemClassDefaults[interfaceClassId];

    const selectedClass = getClassFromClassReference(selectedClassReference, references, solution);

    if (selectedClass !== undefined) {
      asinoClass = selectedClass;
    }
  }

  const viewBoxThing1 = `${getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass?.viewBox?.minX ?? { number: { value: 0 } }, references))}`;
  const viewBoxThing2 = `${getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass?.viewBox?.minY ?? { number: { value: 0 } }, references))}`;
  const viewBoxThing3 = `${getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass?.viewBox?.width ?? { number: { value: 1 } }, references))}`;
  const viewBoxThing4 = `${getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass?.viewBox?.height ?? { number: { value: 1 } }, references))}`;

  //console.log(viewBoxThing1);
  //console.log(viewBoxThing2);
  //console.log(viewBoxThing3);
  //console.log(viewBoxThing4);

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${getValueFromNumberResult(x) ?? 0},${getValueFromNumberResult(y) ?? 0})`}
  >
    <rect
      width={getValueFromNumberResult(width)}
      height={getValueFromNumberResult(height)}
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
      {asinoClass.layers?.map((layer: AsinoLayer, classLayerIndex: number) => { return drawLayer(solution, layer, references.clone().addParameters(layer).setObject({ objectId: interfaceObjectId }), { fraction: { numerator: 1, denominator: 9 } }, `${key}clasLayer${classLayerIndex}`, styles, selectedObjectId) })}
    </g>}
  </g>;
}

export const drawInterfaceInteractive = (asinoInterface: Interface, collectionIds: (string | undefined)[], objectIds: (string | undefined)[], references: References, defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, index: number, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void): JSX.Element => {
  const x = getNumberFromLayer(asinoInterface, references, 'interface', X, { number: { value: 0 } });
  const y = getNumberFromLayer(asinoInterface, references, 'interface', Y, { number: { value: 0 } });
  const width = getNumberFromLayer(asinoInterface, references, 'interface', Width, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(asinoInterface, references, 'interface', Height, defaultInterfaceHeightValue);

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
    x={getValueFromNumberResult(x)}
    y={getValueFromNumberResult(y)}
    width={getValueFromNumberResult(width)}
    height={getValueFromNumberResult(height)}
    stroke='none'
    fill='transparent'
    cursor={interfaceObjectId === undefined ? 'auto' : 'pointer'}
    strokeWidth={getValueFromNumberResult({ fraction: { numerator: 1, denominator: 200 } })}
    onClick={() => {
      interfaceObjectId !== undefined && setSelectedObjectId(interfaceObjectId);
      interfaceCollectionId !== undefined && setSelectedCollectionId(interfaceCollectionId);
    }}
  />;
}