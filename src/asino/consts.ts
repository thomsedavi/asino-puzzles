import { AsinoNumberReference } from "./types/Number";

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

export const systemDefaults: AsinoNumberReference[] = [
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
    name: { value: 'Border Width' },
    value: { numerator: 1, denominator: 200 }
  }
];
