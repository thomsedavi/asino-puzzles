import React from "react"
import { getValueFromColor } from "../utils";
import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected, PaddingTopHeight, PaddingRightWidth, PaddingBottomHeight, PaddingLeftWidth } from "../consts";
import { drawLayer } from "./View";
import { NumberResult } from "../types/Number";
import { Variables } from "../Variables";
import { AsinoLayer } from "../types/Layer";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getDifference, getNumberResultFromAsinoNumber, getProduct, getValueFromNumberResult } from "../utils/Number";
import { AsinoInterface } from "../types/Interface";
import { ClassResult } from "../types/Class";
import { AsinoObject } from "../types/Object";
import { getClassResultFromAsinoClass } from "../utils/Class";
import { getColorResultFromLayer, getNumberResultFromLayer } from "../utils/Layer";

export const drawInterface = (asinoInterface: AsinoInterface, objects: (AsinoObject | undefined)[], fixedClassIds: (string | undefined)[], variables: Variables, solution: Solution, defaultInterfaceWidthValue: NumberResult, defaultInterfaceHeightValue: NumberResult, key: string, styles: { [id: string]: Style }, selectedObject?: AsinoObject): JSX.Element => {
  let interfaceClassId: string | undefined = undefined;
  let interfaceObjectId: string | undefined = undefined;

  objects.forEach((object: AsinoObject | undefined) => {
    object !== undefined && (interfaceObjectId = object.objectId);
  });

  fixedClassIds.forEach((fixedClassId: string | undefined) => {
    fixedClassId !== undefined && (interfaceClassId = fixedClassId);
    variables.setFixedClassId(fixedClassId);
  });

  const solutionClassId = (interfaceObjectId !== undefined && solution.objectClassDictionary !== undefined) ? solution.objectClassDictionary[interfaceObjectId] : undefined;
  solutionClassId !== undefined && (interfaceClassId = solutionClassId);

  const x = Number(getValueFromNumberResult(getNumberResultFromLayer(asinoInterface, variables, 'interface', X, { integer: 0 })));
  const y = Number(getValueFromNumberResult(getNumberResultFromLayer(asinoInterface, variables, 'interface', Y, { integer: 0 })));
  const width = Number(getValueFromNumberResult(getNumberResultFromLayer(asinoInterface, variables, 'interface', Width, defaultInterfaceWidthValue)));
  const height = Number(getValueFromNumberResult(getNumberResultFromLayer(asinoInterface, variables, 'interface', Height, defaultInterfaceHeightValue)));

  const borderTopHeight = getNumberResultFromLayer(asinoInterface, variables, 'interface', BorderTopHeight, { integer: 0 });
  const borderRightWidth = getNumberResultFromLayer(asinoInterface, variables, 'interface', BorderRightWidth, { integer: 0 });
  const borderBottomHeight = getNumberResultFromLayer(asinoInterface, variables, 'interface', BorderBottomHeight, { integer: 0 });
  const borderLeftWidth = getNumberResultFromLayer(asinoInterface, variables, 'interface', BorderLeftWidth, { integer: 0 });

  const paddingTopHeight = getNumberResultFromLayer(asinoInterface, variables, 'interface', PaddingTopHeight, { integer: 0 });
  const paddingRightWidth = getNumberResultFromLayer(asinoInterface, variables, 'interface', PaddingRightWidth, { integer: 0 });
  const paddingBottomHeight = getNumberResultFromLayer(asinoInterface, variables, 'interface', PaddingBottomHeight, { integer: 0 });
  const paddingLeftWidth = getNumberResultFromLayer(asinoInterface, variables, 'interface', PaddingLeftWidth, { integer: 0 });

  const fill = getColorResultFromLayer(asinoInterface, variables, solution, 'interface', interfaceObjectId === selectedObject?.objectId ? FillSelected : Fill);
  const borderTopFill = getColorResultFromLayer(asinoInterface, variables, solution, 'interface', BorderTopFill);
  const borderRightFill = getColorResultFromLayer(asinoInterface, variables, solution, 'interface', BorderRightFill);
  const borderBottomFill = getColorResultFromLayer(asinoInterface, variables, solution, 'interface', BorderBottomFill);
  const borderLeftFill = getColorResultFromLayer(asinoInterface, variables, solution, 'interface', BorderLeftFill);

  const fillClass = getValueFromColor(fill, variables, 'f', false);
  const borderTopFillClass = getValueFromColor(borderTopFill, variables, 'f', false);
  const borderRightFillClass = getValueFromColor(borderRightFill, variables, 'f', false);
  const borderBottomFillClass = getValueFromColor(borderBottomFill, variables, 'f', false);
  const borderLeftFillClass = getValueFromColor(borderLeftFill, variables, 'f', false);

  const fillDarkClass = getValueFromColor(fill, variables, 'fd', true);
  const borderTopFillDarkClass = getValueFromColor(borderTopFill, variables, 'fd', true);
  const borderRightFillDarkClass = getValueFromColor(borderRightFill, variables, 'fd', true);
  const borderBottomFillDarkClass = getValueFromColor(borderBottomFill, variables, 'fd', true);
  const borderLeftFillDarkClass = getValueFromColor(borderLeftFill, variables, 'fd', true);

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
  const outerRight = `${width}`;
  const outerBottom = `${height}`;
  const outerLeft = `0`;

  const innerTop = `${getValueFromNumberResult(getProduct(borderTopHeight, { integer: height }, variables))}`;
  const innerRight = `${getValueFromNumberResult(getDifference({ integer: width }, getProduct(borderRightWidth, { integer: width }, variables), variables))}`;
  const innerBottom = `${getValueFromNumberResult(getDifference({ integer: height }, getProduct(borderBottomHeight, { integer: height }, variables), variables))}`;
  const innerLeft = `${getValueFromNumberResult(getProduct(borderLeftWidth, { integer: width }, variables))}`;

  const paddingInnerTopScaled = Number(getValueFromNumberResult(getProduct(paddingTopHeight, { integer: height }, variables)));
  const paddingInnerRightScaled = Number(getValueFromNumberResult(getProduct(paddingRightWidth, { integer: width }, variables)));
  //const paddingInnerBottomScaled = Number(getValueFromNumberResult(getDifference({ integer: height }, getProduct(paddingBottomHeight, { integer: height }, references), references)));
  const paddingInnerLeftScaled = Number(getValueFromNumberResult(getProduct(paddingLeftWidth, { integer: width }, variables)));

  const paddingInnerTopRaw = `${getValueFromNumberResult(paddingTopHeight)}`;
  const paddingInnerRightRaw = `${getValueFromNumberResult(getDifference({ integer: 1 }, paddingRightWidth, variables))}`;
  const paddingInnerBottomRaw = `${getValueFromNumberResult(getDifference({ integer: 1 }, paddingBottomHeight, variables))}`;
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

  interfaceClassId === undefined && interfaceObjectId !== undefined && (interfaceClassId = solution.objectClassDictionary?.[interfaceObjectId]);

  let asinoClass: ClassResult | undefined = undefined

  if (interfaceClassId !== undefined) {
    const selectedClass = getClassResultFromAsinoClass({ classId: interfaceClassId }, variables, solution);

    if (selectedClass !== undefined) {
      asinoClass = selectedClass;
    }
  }

  let classLayers: JSX.Element | undefined = undefined;

  if (asinoClass !== undefined) {
    //const viewBoxMinX = getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass.viewBox?.minX ?? { integer: 0 }, references));
    //const viewBoxMinY = getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass.viewBox?.minY ?? { integer: 0 }, references));
    const viewBoxWidth = Number(getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass.viewBox?.width ?? { integer: 1 }, variables)));
    const viewBoxHeight = getValueFromNumberResult(getNumberResultFromAsinoNumber(asinoClass.viewBox?.height ?? { integer: 1 }, variables));

    if (typeof viewBoxHeight === 'number') {
      if (viewBoxWidth > viewBoxHeight) {
        console.group('here');
      } else {
        classLayers = <>
          <g transform={`translate(${(width / 2) - ((viewBoxWidth / 2) * (width - (paddingInnerLeftScaled + paddingInnerRightScaled)))},${paddingInnerTopScaled}) scale(${(Number(paddingInnerRightRaw) ?? 1) - (Number(paddingInnerLeftRaw) ?? 1)},${(Number(paddingInnerBottomRaw) ?? 1) - (Number(paddingInnerTopRaw) ?? 1)})`}>
            {asinoClass.layers?.map((layer: AsinoLayer, classLayerIndex: number) => { return drawLayer(solution, layer, variables.clone().addParameters(layer).setObject({ id: interfaceObjectId }), { numerator: 1, denominator: 9 }, `${key}clasLayer${classLayerIndex}`, styles, selectedObject?.id) })}
          </g>
        </>;
      }
    }
  }

  return <g
    id={`layer${key}`}
    key={`layer${key}`}
    transform={`translate(${x},${y})`}
  >
    <rect
      width={width}
      height={height}
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
    {classLayers}
  </g>;
}

export const drawInterfaceInteractive = (asinoInterface: AsinoInterface, collectionIds: (string | undefined)[], objectIds: (string | undefined)[], variables: Variables, defaultInterfaceWidthValue: NumberResult, defaultInterfaceHeightValue: NumberResult, index: number, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void): JSX.Element => {
  const x = getNumberResultFromLayer(asinoInterface, variables, 'interface', X, { integer: 0 });
  const y = getNumberResultFromLayer(asinoInterface, variables, 'interface', Y, { integer: 0 });
  const width = getNumberResultFromLayer(asinoInterface, variables, 'interface', Width, defaultInterfaceWidthValue);
  const height = getNumberResultFromLayer(asinoInterface, variables, 'interface', Height, defaultInterfaceHeightValue);

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
    strokeWidth={getValueFromNumberResult({ numerator: 1, denominator: 200 })}
    onClick={() => {
      interfaceObjectId !== undefined && setSelectedObjectId(interfaceObjectId);
      interfaceCollectionId !== undefined && setSelectedCollectionId(interfaceCollectionId);
    }}
  />;
}