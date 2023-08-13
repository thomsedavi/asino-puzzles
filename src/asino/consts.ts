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

export const systemNumberDefaults: AsinoNumberReference[] = [
  {
    id: 'f-dc',
    name: { value: 'View Box Minimum X' },
    value: 0
  },
  {
    id: 'b-cc',
    name: { value: 'View Box Minimum Y' },
    value: 0
  },
  {
    id: 'd-fc',
    name: { value: 'View Box Width' },
    value: 1
  },
  {
    id: 'd-db',
    name: { value: 'View Box Height' },
    value: 1
  },
  {
    id: 'c-bd',
    name: { value: 'Horizontal Border Width' },
    value: { numerator: 1, denominator: 200 }
  },
  {
    id: 'd-ad',
    name: { value: 'Vertical Border Height' },
    value: { numerator: 1, denominator: 200 }
  },
  {
    id: 'c-ae',
    name: { value: 'Outer Horizontal Division Count' },
    value: 3
  },
  {
    id: 'b-dc',
    name: { value: 'Inner Horizontal Division Count' },
    value: 3
  },
  {
    id: 'f-bf',
    name: { value: 'Outer Vertical Division Count' },
    value: 3
  },
  {
    id: 'a-fb',
    name: { value: 'Inner Vertical Division Count' },
    value: 3
  }
];

export const systemNumberParameters: AsinoNumberReference[] = [
  {
    id: 'c-ba',
    name: { value: 'Outer Horizontal Division Border Index' }
  }
];

export const systemRectangleDefaults: AsinoRectangleReference[] = [
  {
    id: 'a-db',
    name: { value: 'Outer Horizontal Division Border' },
    value: {
      x: {
        operator: '-',
        numberInputs: [
          {
            operator: '*',
            numberInputs: [
              'c-ba',
              {
                operator: '+',
                numberInputs: [
                  'f-dc',
                  {
                    operator: '/',
                    numberInputs: [
                      'd-fc',
                      'c-ae'
                    ]
                  }
                ]
              }
            ]
          },
          {
            operator: '/',
            numberInputs: [
              'c-bd',
              2
            ]
          }
        ]
      },
      y: 'b-cc',
      width: 'c-bd',
      height: 'd-db'
    },
    numbers: [
      {
        id: 'c-ba',
        value: 1
      }
    ]
  }
]
