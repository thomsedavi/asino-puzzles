import { AsinoColorReference } from "./types/Color";
import { AsinoInterfaceReference } from "./types/Interface";
import { AsinoNumberReference } from "./types/Number";
import { AsinoRectangleReference } from "./types/Rectangle";

export const a = 'a';
export const b = 'b';
export const c = 'c';
export const d = 'd';
export const e = 'e';
export const f = 'f';
export const x = 'x';
export const x1 = 'x1';
export const x2 = 'x2';
export const y = 'y';
export const y1 = 'y1';
export const y2 = 'y2';
export const width = 'width';
export const height = 'height';
export const BorderTopHeight = 'borderTopHeight';
export const BorderRightWidth = 'borderRightWidth';
export const BorderBottomHeight = 'borderBottomHeight';
export const BorderLeftWidth = 'borderLeftWidth';
export const BorderTopFill = 'borderTopFill';
export const BorderRightFill = 'borderRightFill';
export const BorderBottomFill = 'borderBottomFill';
export const BorderLeftFill = 'borderLeftFill';
export const cx = 'cx';
export const cy = 'cy';
export const dx = 'dx';
export const dx1 = 'dx1';
export const dx2 = 'dx2';
export const dy = 'dy';
export const dy1 = 'dy1';
export const dy2 = 'dy2';
export const r = 'r';
export const fill = 'fill';
export const fillSelected = 'fillSelected';
export const stroke = 'stroke';
export const strokeWidth = 'strokeWidth';

export const Multiplication = '*';
export const Division = '/';
export const Subtraction = '-';
export const Addition = '+';

export const C = 'C';
export const L = 'L';
export const M = 'M';
export const S = 'S';
export const Z = 'Z';

const ViewBoxMinimumX = 'f-dc';
const ViewBoxMinimumY = 'b-cc';
const ViewBoxWidth = 'd-fc';
const ViewBoxHeight = 'd-db';
const OuterHorizontalBorderWidth = 'c-bd';
const OuterVerticalBorderHeight = 'd-ad';
const OuterHorizontalDivisionCount = 'c-ae';
const InnerHorizontalDivisionCount = 'b-dc';
const OuterVerticalDivisionCount = 'f-bf';
const InnerVerticalDivisionCount = 'a-fb';
const OuterHorizontalDivisionBorderIndex = 'c-ba';
const OuterVerticalDivisionBorderIndex = 'd-da';
const InterfaceRowIndex = 'd-eb';
const InterfaceColumnIndex = 'd-cc';
const InterfaceX = 'c-da';
const InterfaceY = 'f-fc';
const InterfaceWidth = 'b-ed';
const InterfaceHeight = 'b-db';
const OuterHorizontalDivisionBorderX = 'd-ac';
const OuterVerticalDivisionBorderY = 'e-bd';
const InterfaceBorderSize = 'c-de';
const InterfaceBorderTopHeight = 'e-dc';
const InterfaceBorderRightWidth = 'e-de';
const InterfaceBorderBottomHeight = 'e-cc';
const InterfaceBorderLeftWidth = 'd-ee';
const BorderColor = 'a-dd';
const InterfaceBorderTopColor = 'a-aa';
const InterfaceBorderRightColor = 'd-be';
const InterfaceBorderBottomColor = 'f-af';
const InterfaceBorderLeftColor = 'e-dd';
const OuterHorizontalDivisionBorderColor = 'e-ec';
const OuterVerticalDivisionBorderColor = 'e-ae';
const InterfaceColor = 'f-ae';
const InterfaceSelectedColor = 'c-fa';
const HueRed = 'f-cc';
const HueOrange = 'b-fa';
const HueYellow = 'a-eb';
const HueChartreuse = 'd-bb';
const HueGreen = 'e-cd';
const HueMint = 'b-ea';
const HueCyan = 'b-da';
const HueAzure = 'c-fd';
const HueBlue = 'e-ad';
const HueViolet = 'e-ce';
const HueMagenta = 'c-fc';
const HuePink = 'b-af';

export const systemColorDefaults: AsinoColorReference[] = [
  {
    id: BorderColor,
    name: { value: 'Interface Border Color' },
    value: {
      hue: HueAzure,
      hueDark: HuePink,
      saturation: { numerator: 1, denominator: 4 },
      lightness: { numerator: 1, denominator: 20 },
      lightnessDark: { numerator: 19, denominator: 20 }
    }
  },
  {
    id: InterfaceBorderTopColor,
    name: { value: 'Interface Border Top Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderRightColor,
    name: { value: 'Interface Border Right Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderBottomColor,
    name: { value: 'Interface Border Bottom Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderLeftColor,
    name: { value: 'Interface Border Left Color' },
    value: BorderColor
  },
  {
    id: OuterHorizontalDivisionBorderColor,
    name: { value: 'Outer Horizontal Division Border Color' },
    value: BorderColor
  },
  {
    id: OuterVerticalDivisionBorderColor,
    name: { value: 'Outer Vertical Division Border Color' },
    value: BorderColor
  },
  {
    id: InterfaceColor,
    name: { value: 'Interface Color' },
    value: {
      hue: HuePink,
      hueDark: HueAzure,
    }
  },
  {
    id: InterfaceSelectedColor,
    name: { value: 'Interface Selected Color' },
    value: {
      hue: HueChartreuse,
      hueDark: HuePink
    }
  }
];

export const systemNumberDefaults: AsinoNumberReference[] = [
  {
    id: ViewBoxMinimumX,
    name: { value: 'View Box Minimum X' },
    value: 0
  },
  {
    id: ViewBoxMinimumY,
    name: { value: 'View Box Minimum Y' },
    value: 0
  },
  {
    id: ViewBoxWidth,
    name: { value: 'View Box Width' },
    value: 1
  },
  {
    id: ViewBoxHeight,
    name: { value: 'View Box Height' },
    value: 1
  },
  {
    id: OuterHorizontalBorderWidth,
    name: { value: 'Outer Horizontal Border Width' },
    value: { numerator: 1, denominator: 200 }
  },
  {
    id: OuterVerticalBorderHeight,
    name: { value: 'Outer Vertical Border Height' },
    value: { numerator: 1, denominator: 200 }
  },
  {
    id: OuterHorizontalDivisionCount,
    name: { value: 'Outer Horizontal Division Count' },
    value: 3
  },
  {
    id: InnerHorizontalDivisionCount,
    name: { value: 'Inner Horizontal Division Count' },
    value: 3
  },
  {
    id: OuterVerticalDivisionCount,
    name: { value: 'Outer Vertical Division Count' },
    value: 3
  },
  {
    id: InnerVerticalDivisionCount,
    name: { value: 'Inner Vertical Division Count' },
    value: 3
  },
  {
    id: InterfaceBorderSize,
    name: { value: 'Interface Border Size' },
    value: { numerator: 1, denominator: 40 }
  },
  {
    id: InterfaceBorderTopHeight,
    name: { value: 'Interface Border Top Height' },
    value: InterfaceBorderSize
  },
  {
    id: InterfaceBorderRightWidth,
    name: { value: 'Interface Border Right Width' },
    value: InterfaceBorderSize
  },
  {
    id: InterfaceBorderBottomHeight,
    name: { value: 'Interface Border Bottom Height' },
    value: InterfaceBorderSize
  },
  {
    id: InterfaceBorderLeftWidth,
    name: { value: 'Interface Border Left Width' },
    value: InterfaceBorderSize
  },
  {
    id: InterfaceX,
    name: { value: 'Interface X' },
    value: {
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
                        InterfaceRowIndex,
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
    value: {
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
                        InterfaceColumnIndex,
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
    value: {
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
    value: {
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
    value: {
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
    value: {
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
    value: 0
  },
  {
    id: HueOrange,
    name: { value: 'Hue Orange' },
    value: { numerator: 1, denominator: 12 }
  },
  {
    id: HueYellow,
    name: { value: 'Hue Yellow' },
    value: { numerator: 1, denominator: 6 }
  },
  {
    id: HueChartreuse,
    name: { value: 'Hue Chartreuse' },
    value: { numerator: 1, denominator: 4 }
  },
  {
    id: HueGreen,
    name: { value: 'Hue Green' },
    value: { numerator: 1, denominator: 3 }
  },
  {
    id: HueMint,
    name: { value: 'Hue Mint' },
    value: { numerator: 5, denominator: 12 }
  },
  {
    id: HueCyan,
    name: { value: 'Hue Cyan' },
    value: { numerator: 1, denominator: 2 }
  },
  {
    id: HueAzure,
    name: { value: 'Hue Azure' },
    value: { numerator: 7, denominator: 12 }
  },
  {
    id: HueBlue,
    name: { value: 'Hue Blue' },
    value: { numerator: 2, denominator: 3 }
  },
  {
    id: HueViolet,
    name: { value: 'Hue Violet' },
    value: { numerator: 3, denominator: 4 }
  },
  {
    id: HueMagenta,
    name: { value: 'Hue Magenta' },
    value: { numerator: 5, denominator: 6 }
  },
  {
    id: HuePink,
    name: { value: 'Hue Pink' },
    value: { numerator: 11, denominator: 12 }
  },
  {
    id: OuterHorizontalDivisionBorderIndex,
    name: { value: 'Outer Horizontal Division Border Index' },
    value: 1
  },
  {
    id: OuterVerticalDivisionBorderIndex,
    name: { value: 'Outer Vertical Division Border Index' },
    value: 1
  },
  {
    id: InterfaceRowIndex,
    name: { value: 'Interface Row Index' },
    value: 1
  },
  {
    id: InterfaceColumnIndex,
    name: { value: 'Interface Column Index' },
    value: 1
  }
];

export const systemInterfaceDefaults: AsinoInterfaceReference[] = [
  {
    id: 'c-fe',
    name: { value: 'Interface' },
    value: {
      x: InterfaceX,
      y: InterfaceY,
      width: InterfaceWidth,
      height: InterfaceHeight,
      borderTopHeight: InterfaceBorderTopHeight,
      borderRightWidth: InterfaceBorderRightWidth,
      borderBottomHeight: InterfaceBorderBottomHeight,
      borderLeftWidth: InterfaceBorderLeftWidth,
      borderTopFill: InterfaceBorderTopColor,
      borderRightFill: InterfaceBorderRightColor,
      borderBottomFill: InterfaceBorderBottomColor,
      borderLeftFill: InterfaceBorderLeftColor,
      fill: InterfaceColor,
      fillSelected: InterfaceSelectedColor
    }
  }
];

export const systemRectangleDefaults: AsinoRectangleReference[] = [
  {
    id: 'a-db',
    name: { value: 'Outer Horizontal Division Border' },
    value: {
      x: OuterHorizontalDivisionBorderX,
      y: ViewBoxMinimumY,
      width: OuterHorizontalBorderWidth,
      height: ViewBoxHeight,
      fill: OuterHorizontalDivisionBorderColor
    }
  },
  {
    id: 'e-cb',
    name: { value: 'Outer Vertical Division Border' },
    value: {
      y: OuterVerticalDivisionBorderY,
      x: ViewBoxMinimumX,
      height: OuterVerticalBorderHeight,
      width: ViewBoxWidth,
      fill: OuterVerticalDivisionBorderColor
    }
  }
]
