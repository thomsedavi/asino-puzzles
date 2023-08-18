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
const InterfaceBorderTopColor = 'a-aa';
const InterfaceBorderTopStyle = 'c-ec';
const InterfaceBorderSize = 'c-de';
const InterfaceBorderTopHeight = 'e-dc';
const InterfaceBorderRightWidth = 'e-de';
const InterfaceBorderBottomHeight = 'e-cc';
const InterfaceBorderLeftWidth = 'd-ee';

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
    value: { numerator: 1, denominator: 25 }
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
  }
];

export const systemNumberFormulas: AsinoNumberReference[] = [
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
  }
];

export const systemNumberParameters: AsinoNumberReference[] = [
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
      borderLeftWidth: InterfaceBorderLeftWidth
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
      height: ViewBoxHeight
    }
  },
  {
    id: 'e-cb',
    name: { value: 'Outer Vertical Division Border' },
    value: {
      y: OuterVerticalDivisionBorderY,
      x: ViewBoxMinimumX,
      height: OuterVerticalBorderHeight,
      width: ViewBoxWidth
    }
  }
]
