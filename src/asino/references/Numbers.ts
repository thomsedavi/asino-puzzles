import { CurveFraction, HueAzure, HueBlue, HueChartreuse, HueCyan, HueGreen, HueMagenta, HueMint, HueOrange, HuePink, HueRed, HueViolet, HueYellow, InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderRightWidth, InterfaceBorderSize, InterfaceBorderTopHeight, InterfaceRowIndex, InterfaceHeight, InterfaceColumnIndex, InterfaceWidth, InterfaceX, InterfaceY, OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionBorderX, OuterHorizontalDivisionCount, OuterVerticalBorderHeight, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionBorderY, OuterVerticalDivisionCount, PathSize, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth, FontPathWidth, FontPathHeight, FontHorizontalSerifWidth, FontVerticalSerifHeight, FontWidth, FontHalfHeight } from "../consts";
import { AsinoNumberReference } from "../types/Number";

export const systemNumberDefaults: AsinoNumberReference[] = [
  {
    id: ViewBoxMinimumX,
    name: { value: 'View Box Minimum X' },
    number: 0
  },
  {
    id: ViewBoxMinimumY,
    name: { value: 'View Box Minimum Y' },
    number: 0
  },
  {
    id: ViewBoxWidth,
    name: { value: 'View Box Width' },
    number: 1
  },
  {
    id: ViewBoxHeight,
    name: { value: 'View Box Height' },
    number: 1
  },
  {
    id: OuterHorizontalBorderWidth,
    name: { value: 'Outer Horizontal Border Width' },
    number: { numerator: 1, denominator: 200 }
  },
  {
    id: OuterVerticalBorderHeight,
    name: { value: 'Outer Vertical Border Height' },
    number: { numerator: 1, denominator: 200 }
  },
  {
    id: OuterHorizontalDivisionCount,
    name: { value: 'Outer Horizontal Division Count' },
    number: 3
  },
  {
    id: InnerHorizontalDivisionCount,
    name: { value: 'Inner Horizontal Division Count' },
    number: 3
  },
  {
    id: OuterVerticalDivisionCount,
    name: { value: 'Outer Vertical Division Count' },
    number: 3
  },
  {
    id: InnerVerticalDivisionCount,
    name: { value: 'Inner Vertical Division Count' },
    number: 3
  },
  {
    id: InterfaceBorderSize,
    name: { value: 'Interface Border Size' },
    number: { numerator: 1, denominator: 40 }
  },
  {
    id: InterfaceBorderTopHeight,
    name: { value: 'Interface Border Top Height' },
    number: InterfaceBorderSize
  },
  {
    id: InterfaceBorderRightWidth,
    name: { value: 'Interface Border Right Width' },
    number: InterfaceBorderSize
  },
  {
    id: InterfaceBorderBottomHeight,
    name: { value: 'Interface Border Bottom Height' },
    number: InterfaceBorderSize
  },
  {
    id: InterfaceBorderLeftWidth,
    name: { value: 'Interface Border Left Width' },
    number: InterfaceBorderSize
  },
  {
    id: PathSize,
    name: { value: 'Path Size' },
    number: { numerator: 1, denominator: 10 }
  },
  {
    id: CurveFraction,
    name: { value: 'Curve Fraction' },
    number: { numerator: 11, denominator: 20 }
  },
  {
    id: InterfaceX,
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
  {
    id: InterfaceY,
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
  {
    id: InterfaceWidth,
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
  {
    id: InterfaceHeight,
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
  {
    id: OuterHorizontalDivisionBorderX,
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
  {
    id: OuterVerticalDivisionBorderY,
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
  {
    id: HueRed,
    name: { value: 'Hue Red' },
    number: 0
  },
  {
    id: HueOrange,
    name: { value: 'Hue Orange' },
    number: { numerator: 1, denominator: 12 }
  },
  {
    id: HueYellow,
    name: { value: 'Hue Yellow' },
    number: { numerator: 1, denominator: 6 }
  },
  {
    id: HueChartreuse,
    name: { value: 'Hue Chartreuse' },
    number: { numerator: 1, denominator: 4 }
  },
  {
    id: HueGreen,
    name: { value: 'Hue Green' },
    number: { numerator: 1, denominator: 3 }
  },
  {
    id: HueMint,
    name: { value: 'Hue Mint' },
    number: { numerator: 5, denominator: 12 }
  },
  {
    id: HueCyan,
    name: { value: 'Hue Cyan' },
    number: { numerator: 1, denominator: 2 }
  },
  {
    id: HueAzure,
    name: { value: 'Hue Azure' },
    number: { numerator: 7, denominator: 12 }
  },
  {
    id: HueBlue,
    name: { value: 'Hue Blue' },
    number: { numerator: 2, denominator: 3 }
  },
  {
    id: HueViolet,
    name: { value: 'Hue Violet' },
    number: { numerator: 3, denominator: 4 }
  },
  {
    id: HueMagenta,
    name: { value: 'Hue Magenta' },
    number: { numerator: 5, denominator: 6 }
  },
  {
    id: HuePink,
    name: { value: 'Hue Pink' },
    number: { numerator: 11, denominator: 12 }
  },
  {
    id: OuterHorizontalDivisionBorderIndex,
    name: { value: 'Outer Horizontal Division Border Index' },
    number: 1
  },
  {
    id: OuterVerticalDivisionBorderIndex,
    name: { value: 'Outer Vertical Division Border Index' },
    number: 1
  },
  {
    id: InterfaceColumnIndex,
    name: { value: 'Interface Column Index' },
    number: 1
  },
  {
    id: InterfaceRowIndex,
    name: { value: 'Interface Row Index' },
    number: 1
  },
  {
    id: FontWidth,
    name: { value: 'Font Width' },
    number: { numerator: 1, denominator: 3 }
  },
  {
    id: FontPathWidth,
    name: { value: 'Font Path Width' },
    number: { numerator: 1, denominator: 10 }
  },
  {
    id: FontPathHeight,
    name: { value: 'Font Path Height' },
    number: { numerator: 1, denominator: 10 }
  },
  {
    id: FontHorizontalSerifWidth,
    name: { value: 'Font Horizontal Serif Width' },
    number: { numerator: 1, denominator: 12 }
  },
  {
    id: FontVerticalSerifHeight,
    name: { value: 'Font Vertical Serif Height' },
    number: { numerator: 1, denominator: 12 }
  },
  {
    id: FontHalfHeight,
    name: { value: 'Font Half Height' },
    number: { numerator: 1, denominator: 2 }
  }
];
