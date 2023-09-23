import { CurveFraction, HueAzure, HueBlue, HueChartreuse, HueCyan, HueGreen, HueMagenta, HueMint, HueOrange, HuePink, HueRed, HueViolet, HueYellow, InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderRightWidth, InterfaceBorderSize, InterfaceBorderTopHeight, InterfaceRowIndex, InterfaceHeight, InterfaceColumnIndex, InterfaceWidth, InterfaceX, InterfaceY, OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionBorderX, OuterHorizontalDivisionCount, OuterVerticalBorderHeight, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionBorderY, OuterVerticalDivisionCount, PathSize, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth, InterfacePaddingTopHeight, InterfacePaddingRightWidth, InterfacePaddingBottomHeight, InterfacePaddingLeftWidth, InterfacePaddingSize, FontSize, FontSizeHorizontal, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical, FontSizeVertical3, FontSizeVertical2, FontSizeVertical1, FontCurve, FontCurveHorizontal, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLength, FontLengthHorizontal, FontLengthVertical, FontLengthVertical1, FontLengthVertical2 } from "../consts";
import { AsinoNumberReference } from "../types/Number";

export const systemNumberDefaults: { [id: string]: AsinoNumberReference; } = {
  [ViewBoxMinimumX]: {
    name: { value: 'View Box Minimum X' },
    number: 0
  },
  [ViewBoxMinimumY]: {
    name: { value: 'View Box Minimum Y' },
    number: 0
  },
  [ViewBoxWidth]: {
    name: { value: 'View Box Width' },
    number: 1
  },
  [ViewBoxHeight]: {
    name: { value: 'View Box Height' },
    number: 1
  },
  [OuterHorizontalBorderWidth]: {
    name: { value: 'Outer Horizontal Border Width' },
    number: { numerator: 1, denominator: 200 }
  },
  [OuterVerticalBorderHeight]: {
    name: { value: 'Outer Vertical Border Height' },
    number: { numerator: 1, denominator: 200 }
  },
  [OuterHorizontalDivisionCount]: {
    name: { value: 'Outer Horizontal Division Count' },
    number: 3
  },
  [InnerHorizontalDivisionCount]: {
    name: { value: 'Inner Horizontal Division Count' },
    number: 3
  },
  [OuterVerticalDivisionCount]: {
    name: { value: 'Outer Vertical Division Count' },
    number: 3
  },
  [InnerVerticalDivisionCount]: {
    name: { value: 'Inner Vertical Division Count' },
    number: 3
  },
  [InterfaceBorderSize]: {
    name: { value: 'Interface Border Size' },
    number: { numerator: 1, denominator: 40 }
  },
  [InterfacePaddingSize]: {
    name: { value: 'Interface Padding Size' },
    number: { numerator: 1, denominator: 10 }
  },
  [InterfaceBorderTopHeight]: {
    name: { value: 'Interface Border Top Height' },
    number: InterfaceBorderSize
  },
  [InterfaceBorderRightWidth]: {
    name: { value: 'Interface Border Right Width' },
    number: InterfaceBorderSize
  },
  [InterfaceBorderBottomHeight]: {
    name: { value: 'Interface Border Bottom Height' },
    number: InterfaceBorderSize
  },
  [InterfaceBorderLeftWidth]: {
    name: { value: 'Interface Border Left Width' },
    number: InterfaceBorderSize
  },
  [InterfacePaddingTopHeight]: {
    name: { value: 'Interface Padding Top Height' },
    number: InterfacePaddingSize
  },
  [InterfacePaddingRightWidth]: {
    name: { value: 'Interface Padding Right Width' },
    number: InterfacePaddingSize
  },
  [InterfacePaddingBottomHeight]: {
    name: { value: 'Interface Padding Bottom Height' },
    number: InterfacePaddingSize
  },
  [InterfacePaddingLeftWidth]: {
    name: { value: 'Interface Padding Left Width' },
    number: InterfacePaddingSize
  },
  [PathSize]: {
    name: { value: 'Path Size' },
    number: { numerator: 1, denominator: 10 }
  },
  [CurveFraction]: {
    name: { value: 'Curve Fraction' },
    number: { numerator: 11, denominator: 20 }
  },
  [InterfaceX]: {
    name: { value: 'Interface X' },
    number: {
      operator: '+',
      numberInputs: [
        {
          operator: '*',
          numberInputs: [
            {
              operator: '-',
              numberInputs: [
                InterfaceColumnIndex,
                1
              ]
            },
            InterfaceWidth
          ]
        },
        {
          operator: '*',
          numberInputs: [
            {
              operator: 'FLOOR',
              numberInputs: [
                {
                  operator: '/',
                  numberInputs: [
                    {
                      operator: '-',
                      numberInputs: [
                        InterfaceColumnIndex,
                        1
                      ]
                    },
                    InnerHorizontalDivisionCount
                  ]
                }
              ]
            },
            OuterHorizontalBorderWidth
          ]
        }
      ]
    }
  },
  [InterfaceY]: {
    name: { value: 'Interface Y' },
    number: {
      operator: '+',
      numberInputs: [
        {
          operator: '*',
          numberInputs: [
            {
              operator: '-',
              numberInputs: [
                InterfaceRowIndex,
                1
              ]
            },
            InterfaceHeight
          ]
        },
        {
          operator: '*',
          numberInputs: [
            {
              operator: 'FLOOR',
              numberInputs: [
                {
                  operator: '/',
                  numberInputs: [
                    {
                      operator: '-',
                      numberInputs: [
                        InterfaceRowIndex,
                        1
                      ]
                    },
                    InnerVerticalDivisionCount
                  ]
                }
              ]
            },
            OuterVerticalBorderHeight
          ]
        }
      ]
    }
  },
  [InterfaceWidth]: {
    name: { value: 'Interface Width' },
    number: {
      operator: '/',
      numberInputs: [
        {
          operator: '-',
          numberInputs: [
            ViewBoxWidth,
            {
              operator: '*',
              numberInputs: [
                OuterHorizontalBorderWidth,
                {
                  operator: '-',
                  numberInputs: [
                    OuterHorizontalDivisionCount,
                    1
                  ]
                }
              ]
            }
          ]
        },
        {
          operator: '*',
          numberInputs: [
            OuterHorizontalDivisionCount,
            InnerHorizontalDivisionCount
          ]
        }
      ]
    }
  },
  [InterfaceHeight]: {
    name: { value: 'Interface Height' },
    number: {
      operator: '/',
      numberInputs: [
        {
          operator: '-',
          numberInputs: [
            ViewBoxHeight,
            {
              operator: '*',
              numberInputs: [
                OuterVerticalBorderHeight,
                {
                  operator: '-',
                  numberInputs: [
                    OuterVerticalDivisionCount,
                    1
                  ]
                }
              ]
            }
          ]
        },
        {
          operator: '*',
          numberInputs: [
            OuterVerticalDivisionCount,
            InnerVerticalDivisionCount
          ]
        }
      ]
    }
  },
  [OuterHorizontalDivisionBorderX]: {
    name: { value: 'Outer Horizontal Division Border X' },
    number: {
      operator: '+',
      numberInputs: [
        {
          operator: '*',
          numberInputs: [
            InnerHorizontalDivisionCount,
            {
              operator: '*',
              numberInputs: [
                InterfaceWidth,
                OuterHorizontalDivisionBorderIndex
              ]
            }
          ]
        },
        {
          operator: '*',
          numberInputs: [
            OuterHorizontalBorderWidth,
            {
              operator: '-',
              numberInputs: [
                OuterHorizontalDivisionBorderIndex,
                1
              ]
            }
          ]
        }
      ]
    }
  },
  [OuterVerticalDivisionBorderY]: {
    name: { value: 'Outer Horizontal Division Border Y' },
    number: {
      operator: '+',
      numberInputs: [
        {
          operator: '*',
          numberInputs: [
            InnerVerticalDivisionCount,
            {
              operator: '*',
              numberInputs: [
                InterfaceHeight,
                OuterVerticalDivisionBorderIndex
              ]
            }
          ]
        },
        {
          operator: '*',
          numberInputs: [
            OuterVerticalBorderHeight,
            {
              operator: '-',
              numberInputs: [
                OuterVerticalDivisionBorderIndex,
                1
              ]
            }
          ]
        }
      ]
    }
  },
  [HueRed]: {
    name: { value: 'Hue Red' },
    number: 0
  },
  [HueOrange]: {
    name: { value: 'Hue Orange' },
    number: { numerator: 1, denominator: 12 }
  },
  [HueYellow]: {
    name: { value: 'Hue Yellow' },
    number: { numerator: 1, denominator: 6 }
  },
  [HueChartreuse]: {
    name: { value: 'Hue Chartreuse' },
    number: { numerator: 1, denominator: 4 }
  },
  [HueGreen]: {
    name: { value: 'Hue Green' },
    number: { numerator: 1, denominator: 3 }
  },
  [HueMint]: {
    name: { value: 'Hue Mint' },
    number: { numerator: 5, denominator: 12 }
  },
  [HueCyan]: {
    name: { value: 'Hue Cyan' },
    number: { numerator: 1, denominator: 2 }
  },
  [HueAzure]: {
    name: { value: 'Hue Azure' },
    number: { numerator: 7, denominator: 12 }
  },
  [HueBlue]: {
    name: { value: 'Hue Blue' },
    number: { numerator: 2, denominator: 3 }
  },
  [HueViolet]: {
    name: { value: 'Hue Violet' },
    number: { numerator: 3, denominator: 4 }
  },
  [HueMagenta]: {
    name: { value: 'Hue Magenta' },
    number: { numerator: 5, denominator: 6 }
  },
  [HuePink]: {
    name: { value: 'Hue Pink' },
    number: { numerator: 11, denominator: 12 }
  },
  [OuterHorizontalDivisionBorderIndex]: {
    name: { value: 'Outer Horizontal Division Border Index' },
    number: 1
  },
  [OuterVerticalDivisionBorderIndex]: {
    name: { value: 'Outer Vertical Division Border Index' },
    number: 1
  },
  [InterfaceColumnIndex]: {
    name: { value: 'Interface Column Index' },
    number: 1
  },
  [InterfaceRowIndex]: {
    name: { value: 'Interface Row Index' },
    number: 1
  },
  [FontSize]: {
    name: { value: 'Font Size' },
    number: { numerator: 1, denominator: 9 }
  },
  [FontSizeHorizontal]: {
    name: { value: 'Font Size Horizontal' },
    number: FontSize
  },
  [FontSizeHorizontal1]: {
    name: { value: 'Font Size Horizontal 1' },
    number: FontSizeHorizontal
  },
  [FontSizeHorizontal2]: {
    name: { value: 'Font Size Horizontal 2' },
    number: FontSizeHorizontal
  },
  [FontSizeVertical]: {
    name: { value: 'Font Size Vertical' },
    number: FontSize
  },
  [FontSizeVertical1]: {
    name: { value: 'Font Size Vertical 1' },
    number: FontSizeVertical
  },
  [FontSizeVertical2]: {
    name: { value: 'Font Size Vertical 2' },
    number: FontSizeVertical
  },
  [FontSizeVertical3]: {
    name: { value: 'Font Size Vertical 3' },
    number: FontSizeVertical
  },
  [FontCurve]: {
    name: { value: 'Font Curve' },
    number: { numerator: 1, denominator: 9 }
  },
  [FontCurveHorizontal]: {
    name: { value: 'Font Curve Horizontal' },
    number: FontCurve
  },
  [FontCurveHorizontal1]: {
    name: { value: 'Font Curve Horizontal 1' },
    number: FontCurveHorizontal
  },
  [FontCurveHorizontal2]: {
    name: { value: 'Font Curve Horizontal 2' },
    number: FontCurveHorizontal
  },
  [FontCurveVertical]: {
    name: { value: 'Font Curve Vertical' },
    number: FontCurve
  },
  [FontCurveVertical1]: {
    name: { value: 'Font Curve Vertical 1' },
    number: FontCurveVertical
  },
  [FontCurveVertical2]: {
    name: { value: 'Font Curve Vertical 2' },
    number: FontCurveVertical
  },
  [FontCurveVertical3]: {
    name: { value: 'Font Curve Vertical 3' },
    number: FontCurveVertical
  },
  [FontCurveVertical4]: {
    name: { value: 'Font Curve Vertical 4' },
    number: FontCurveVertical
  },
  [FontLength]: {
    name: { value: 'Font Length' },
    number: { numerator: 1, denominator: 9 }
  },
  [FontLengthHorizontal]: {
    name: { value: 'Font Length Horizontal' },
    number: FontLength
  },
  [FontLengthVertical]: {
    name: { value: 'Font Length Vertical' },
    number: FontLength
  },
  [FontLengthVertical1]: {
    name: { value: 'Font Length Vertical 1' },
    number: FontLengthVertical
  },
  [FontLengthVertical2]: {
    name: { value: 'Font Length Vertical 2' },
    number: FontLengthVertical
  }
};
