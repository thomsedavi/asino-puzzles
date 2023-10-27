import { CurveFraction, HueAzure, HueBlue, HueChartreuse, HueCyan, HueGreen, HueMagenta, HueMint, HueOrange, HuePink, HueRed, HueViolet, HueYellow, InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderRightWidth, InterfaceBorderSize, InterfaceBorderTopHeight, InterfaceRowIndex, InterfaceHeight, InterfaceColumnIndex, InterfaceWidth, InterfaceX, InterfaceY, OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionBorderX, OuterHorizontalDivisionCount, OuterVerticalBorderHeight, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionBorderY, OuterVerticalDivisionCount, PathSize, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth, InterfacePaddingTopHeight, InterfacePaddingRightWidth, InterfacePaddingBottomHeight, InterfacePaddingLeftWidth, InterfacePaddingSize, FontSize, FontSizeHorizontal, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical, FontSizeVertical3, FontSizeVertical2, FontSizeVertical1, FontCurve, FontCurveHorizontal, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLength, FontLengthHorizontal, FontLengthVertical, FontLengthVertical1, FontLengthVertical2 } from "../consts";
import { AsinoNumber } from "../types/Number";

export const systemNumberDefaults: { [id: string]: AsinoNumber; } = {
  [ViewBoxMinimumX]: {
    id: ViewBoxMinimumX,
    name: 'View Box Minimum X',
    integer: 0,
  },
  [ViewBoxMinimumY]: {
    id: ViewBoxMinimumY,
    name: 'View Box Minimum Y',
    integer: 0,
  },
  [ViewBoxWidth]: {
    id: ViewBoxWidth,
    name: 'View Box Width',
    integer: 1
  },
  [ViewBoxHeight]: {
    id: ViewBoxHeight,
    name: 'View Box Height',
    integer: 1
  },
  [OuterHorizontalBorderWidth]: {
    id: OuterHorizontalBorderWidth,
    name: 'Outer Horizontal Border Width',
    numerator: { integer: 1 },
    denominator: { integer: 200 }
  },
  [OuterVerticalBorderHeight]: {
    id: OuterVerticalBorderHeight,
    name: 'Outer Vertical Border Height',
    numerator: { integer: 1 },
    denominator: { integer: 200 }
  },
  [OuterHorizontalDivisionCount]: {
    id: OuterHorizontalDivisionCount,
    name: 'Outer Horizontal Division Count',
    integer: 3
  },
  [InnerHorizontalDivisionCount]: {
    id: InnerHorizontalDivisionCount,
    name: 'Inner Horizontal Division Count',
    integer: 3
  },
  [OuterVerticalDivisionCount]: {
    id: OuterVerticalDivisionCount,
    name: 'Outer Vertical Division Count',
    integer: 3
  },
  [InnerVerticalDivisionCount]: {
    id: InnerVerticalDivisionCount,
    name: 'Inner Vertical Division Count',
    integer: 3
  },
  [InterfaceBorderSize]: {
    id: InterfaceBorderSize,
    name: 'Interface Border Size',
    numerator: { integer: 1 },
    denominator: { integer: 40 }
  },
  [InterfacePaddingSize]: {
    id: InterfacePaddingSize,
    name: 'Interface Padding Size',
    numerator: { integer: 1 },
    denominator: { integer: 5 }
  },
  [InterfaceBorderTopHeight]: {
    id: InterfaceBorderTopHeight,
    name: 'Interface Border Top Height',
    numberId: InterfaceBorderSize
  },
  [InterfaceBorderRightWidth]: {
    id: InterfaceBorderRightWidth,
    name: 'Interface Border Right Width',
    numberId: InterfaceBorderSize
  },
  [InterfaceBorderBottomHeight]: {
    id: InterfaceBorderBottomHeight,
    name: 'Interface Border Bottom Height',
    numberId: InterfaceBorderSize
  },
  [InterfaceBorderLeftWidth]: {
    id: InterfaceBorderLeftWidth,
    name: 'Interface Border Left Width',
    numberId: InterfaceBorderSize
  },
  [InterfacePaddingTopHeight]: {
    id: InterfacePaddingTopHeight,
    name: 'Interface Padding Top Height',
    numberId: InterfacePaddingSize
  },
  [InterfacePaddingRightWidth]: {
    id: InterfacePaddingRightWidth,
    name: 'Interface Padding Right Width',
    numberId: InterfacePaddingSize
  },
  [InterfacePaddingBottomHeight]: {
    id: InterfacePaddingBottomHeight,
    name: 'Interface Padding Bottom Height',
    numberId: InterfacePaddingSize
  },
  [InterfacePaddingLeftWidth]: {
    id: InterfacePaddingLeftWidth,
    name: 'Interface Padding Left Width',
    numberId: InterfacePaddingSize
  },
  [PathSize]: {
    id: PathSize,
    name: 'Path Size',
    numerator: { integer: 1 },
    denominator: { integer: 10 }
  },
  [CurveFraction]: {
    id: CurveFraction,
    name: 'Curve Fraction',
    numerator: { integer: 11 },
    denominator: { integer: 20 }
  },
  [InterfaceX]: {
    id: InterfaceX,
    name: 'Interface X',
    operator: '+',
    numberList: [
      {
        operator: '*',
        numberList: [
          {
            operator: '-',
            numberList: [
              { numberId: InterfaceColumnIndex },
              { integer: 1 }
            ]
          },
          { numberId: InterfaceWidth }
        ]
      },
      {
        operator: '*',
        numberList: [
          {
            operator: 'FLOOR',
            numberList: [
              {
                operator: '/',
                numberList: [
                  {
                    operator: '-',
                    numberList: [
                      { numberId: InterfaceColumnIndex },
                      { integer: 1 }
                    ]
                  },
                  { numberId: InnerHorizontalDivisionCount }
                ]
              }
            ]
          },
          { numberId: OuterHorizontalBorderWidth }
        ]
      }
    ]
  },
  [InterfaceY]: {
    id: InterfaceY,
    name: 'Interface Y',
    operator: '+',
    numberList: [
      {
        operator: '*',
        numberList: [
          {
            operator: '-',
            numberList: [
              { numberId: InterfaceRowIndex },
              { integer: 1 }
            ]
          },
          { numberId: InterfaceHeight }
        ]
      },
      {
        operator: '*',
        numberList: [
          {
            operator: 'FLOOR',
            numberList: [
              {
                operator: '/',
                numberList: [
                  {
                    operator: '-',
                    numberList: [
                      { numberId: InterfaceRowIndex },
                      { integer: 1 }
                    ]
                  },
                  { numberId: InnerVerticalDivisionCount }
                ]
              }
            ]
          },
          { numberId: OuterVerticalBorderHeight }
        ]
      }
    ]
  },
  [InterfaceWidth]: {
    id: InterfaceWidth,
    name: 'Interface Width',
    operator: '/',
    numberList: [
      {
        operator: '-',
        numberList: [
          { numberId: ViewBoxWidth },
          {
            operator: '*',
            numberList: [
              { numberId: OuterHorizontalBorderWidth },
              {
                operator: '-',
                numberList: [
                  { numberId: OuterHorizontalDivisionCount },
                  { integer: 1 }
                ]
              }
            ]
          }
        ]
      },
      {
        operator: '*',
        numberList: [
          { numberId: OuterHorizontalDivisionCount },
          { numberId: InnerHorizontalDivisionCount }
        ]
      }
    ]
  },
  [InterfaceHeight]: {
    id: InterfaceHeight,
    name: 'Interface Height',
    operator: '/',
    numberList: [
      {
        operator: '-',
        numberList: [
          { numberId: ViewBoxHeight },
          {
            operator: '*',
            numberList: [
              { numberId: OuterVerticalBorderHeight },
              {
                operator: '-',
                numberList: [
                  { numberId: OuterVerticalDivisionCount },
                  { integer: 1 }
                ]
              }
            ]
          }
        ]
      },
      {
        operator: '*',
        numberList: [
          { numberId: OuterVerticalDivisionCount },
          { numberId: InnerVerticalDivisionCount }
        ]
      }
    ]
  },
  [OuterHorizontalDivisionBorderX]: {
    id: OuterHorizontalDivisionBorderX,
    name: 'Outer Horizontal Division Border X',
    operator: '+',
    numberList: [
      {
        operator: '*',
        numberList: [
          { numberId: InnerHorizontalDivisionCount },
          {
            operator: '*',
            numberList: [
              { numberId: InterfaceWidth },
              { numberId: OuterHorizontalDivisionBorderIndex }
            ]
          }
        ]
      },
      {
        operator: '*',
        numberList: [
          { numberId: OuterHorizontalBorderWidth },
          {
            operator: '-',
            numberList: [
              { numberId: OuterHorizontalDivisionBorderIndex },
              { integer: 1 }
            ]
          }
        ]
      }
    ]
  },
  [OuterVerticalDivisionBorderY]: {
    id: OuterVerticalDivisionBorderY,
    name: 'Outer Horizontal Division Border Y',
    operator: '+',
    numberList: [
      {
        operator: '*',
        numberList: [
          { numberId: InnerVerticalDivisionCount },
          {
            operator: '*',
            numberList: [
              { numberId: InterfaceHeight },
              { numberId: OuterVerticalDivisionBorderIndex }
            ]
          }
        ]
      },
      {
        operator: '*',
        numberList: [
          { numberId: OuterVerticalBorderHeight },
          {
            operator: '-',
            numberList: [
              { numberId: OuterVerticalDivisionBorderIndex },
              { integer: 1 }
            ]
          }
        ]
      }
    ]
  },
  [HueRed]: {
    id: HueRed,
    name: 'Hue Red',
    integer: 0
  },
  [HueOrange]: {
    id: HueOrange,
    name: 'Hue Orange',
    numerator: { integer: 1 },
    denominator: { integer: 12 }
  },
  [HueYellow]: {
    id: HueYellow,
    name: 'Hue Yellow',
    numerator: { integer: 1 },
    denominator: { integer: 6 }
  },
  [HueChartreuse]: {
    id: HueChartreuse,
    name: 'Hue Chartreuse',
    numerator: { integer: 1 },
    denominator: { integer: 4 }
  },
  [HueGreen]: {
    id: HueGreen,
    name: 'Hue Green',
    numerator: { integer: 1 },
    denominator: { integer: 3 }
  },
  [HueMint]: {
    id: HueMint,
    name: 'Hue Mint',
    numerator: { integer: 5 },
    denominator: { integer: 12 }
  },
  [HueCyan]: {
    id: HueCyan,
    name: 'Hue Cyan',
    numerator: { integer: 1 },
    denominator: { integer: 2 }
  },
  [HueAzure]: {
    id: HueAzure,
    name: 'Hue Azure',
    numerator: { integer: 7 },
    denominator: { integer: 12 }
  },
  [HueBlue]: {
    id: HueBlue,
    name: 'Hue Blue',
    numerator: { integer: 2 },
    denominator: { integer: 3 }
  },
  [HueViolet]: {
    id: HueViolet,
    name: 'Hue Violet',
    numerator: { integer: 3 },
    denominator: { integer: 4 }
  },
  [HueMagenta]: {
    id: HueMagenta,
    name: 'Hue Magenta',
    numerator: { integer: 5 },
    denominator: { integer: 6 }
  },
  [HuePink]: {
    id: HuePink,
    name: 'Hue Pink',
    numerator: { integer: 11 },
    denominator: { integer: 12 }
  },
  [OuterHorizontalDivisionBorderIndex]: {
    id: OuterHorizontalDivisionBorderIndex,
    name: 'Outer Horizontal Division Border Index',
    integer: 1
  },
  [OuterVerticalDivisionBorderIndex]: {
    id: OuterVerticalDivisionBorderIndex,
    name: 'Outer Vertical Division Border Index',
    integer: 1
  },
  [InterfaceColumnIndex]: {
    id: InterfaceColumnIndex,
    name: 'Interface Column Index',
    integer: 1
  },
  [InterfaceRowIndex]: {
    id: InterfaceRowIndex,
    name: 'Interface Row Index',
    integer: 1
  },
  [FontSize]: {
    id: FontSize,
    name: 'Font Size',
    numerator: { integer: 1 },
    denominator: { integer: 9 }
  },
  [FontSizeHorizontal]: {
    id: FontSizeHorizontal,
    name: 'Font Size Horizontal',
    numberId: FontSize
  },
  [FontSizeHorizontal1]: {
    id: FontSizeHorizontal1,
    name: 'Font Size Horizontal 1',
    numberId: FontSizeHorizontal
  },
  [FontSizeHorizontal2]: {
    id: FontSizeHorizontal2,
    name: 'Font Size Horizontal 2',
    numberId: FontSizeHorizontal
  },
  [FontSizeVertical]: {
    id: FontSizeVertical,
    name: 'Font Size Vertical',
    numberId: FontSize
  },
  [FontSizeVertical1]: {
    id: FontSizeVertical1,
    name: 'Font Size Vertical 1',
    numberId: FontSizeVertical
  },
  [FontSizeVertical2]: {
    id: FontSizeVertical2,
    name: 'Font Size Vertical 2',
    numberId: FontSizeVertical
  },
  [FontSizeVertical3]: {
    id: FontSizeVertical3,
    name: 'Font Size Vertical 3',
    numberId: FontSizeVertical
  },
  [FontCurve]: {
    id: FontCurve,
    name: 'Font Curve',
    numerator: { integer: 1 },
    denominator: { integer: 9 }
  },
  [FontCurveHorizontal]: {
    id: FontCurveHorizontal,
    name: 'Font Curve Horizontal',
    numberId: FontCurve
  },
  [FontCurveHorizontal1]: {
    id: FontCurveHorizontal1,
    name: 'Font Curve Horizontal 1',
    numberId: FontCurveHorizontal
  },
  [FontCurveHorizontal2]: {
    id: FontCurveHorizontal2,
    name: 'Font Curve Horizontal 2',
    numberId: FontCurveHorizontal
  },
  [FontCurveVertical]: {
    id: FontCurveVertical,
    name: 'Font Curve Vertical',
    numberId: FontCurve
  },
  [FontCurveVertical1]: {
    id: FontCurveVertical1,
    name: 'Font Curve Vertical 1',
    numberId: FontCurveVertical
  },
  [FontCurveVertical2]: {
    id: FontCurveVertical2,
    name: 'Font Curve Vertical 2',
    numberId: FontCurveVertical
  },
  [FontCurveVertical3]: {
    id: FontCurveVertical3,
    name: 'Font Curve Vertical 3',
    numberId: FontCurveVertical
  },
  [FontCurveVertical4]: {
    id: FontCurveVertical4,
    name: 'Font Curve Vertical 4',
    numberId: FontCurveVertical
  },
  [FontLength]: {
    id: FontLength,
    name: 'Font Length',
    numerator: { integer: 1 },
    denominator: { integer: 9 }
  },
  [FontLengthHorizontal]: {
    id: FontLengthHorizontal,
    name: 'Font Length Horizontal',
    numberId: FontLength
  },
  [FontLengthVertical]: {
    id: FontLengthVertical,
    name: 'Font Length Vertical',
    numberId: FontLength
  },
  [FontLengthVertical1]: {
    id: FontLengthVertical1,
    name: 'Font Length Vertical 1',
    numberId: FontLengthVertical
  },
  [FontLengthVertical2]: {
    id: FontLengthVertical2,
    name: 'Font Length Vertical 2',
    numberId: FontLengthVertical
  }
};
