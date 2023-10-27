import { FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoClass } from "../types/Class";

export const systemClassDefaults: { [id: string]: AsinoClass; } = {
  'e-af': {
    id: 'e-af',
    name: 'Curve Right To Bottom And Left To Top',
    layerList: [
      {
        pathId: 'f-ee'
      },
      {
        pathId: 'f-eb'
      }
    ]
  },
  'b-dd': {
    id: 'b-dd',
    name: 'Curve Right To Bottom',
    layerList: [
      {
        pathId: 'f-ee'
      }
    ]
  },
  'e-be': {
    id: 'e-be',
    name: 'Curve Left To Top',
    layerList: [
      {
        pathId: 'f-eb'
      }
    ]
  },
  'd-ab': {
    id: 'd-ab',
    name: 'Curve Top To Right And Bottom To Left',
    layerList: [
      {
        pathId: 'b-ff'
      },
      {
        pathId: 'b-bc'
      }
    ]
  },
  'e-cd': {
    id: 'e-cd',
    name: 'Curve Top To Bottom And Right To Left',
    layerList: [
      {
        pathId: 'c-fb'
      },
      {
        pathId: 'a-ee'
      }
    ]
  },
  'e-da': {
    id: 'e-da',
    name: 'Curve Right To Left',
    layerList: [
      {
        pathId: 'c-fb'
      }
    ]
  },
  'a-cf': {
    id: 'a-cf',
    name: 'Curve Top To Right',
    layerList: [
      {
        pathId: 'b-ff'
      }
    ]
  },
  'a-df': {
    id: 'a-df',
    name: 'Curve Bottom To Left',
    layerList: [
      {
        pathId: 'b-bc'
      }
    ]
  },
  'd-ce': {
    id: 'd-ce',
    name: 'Curve Top To Bottom',
    layerList: [
      {
        pathId: 'a-ee'
      }
    ]
  },
  'b-de': {
    id: 'b-de',
    name: '1',
    layerList: [
      {
        pathId: 'd-de'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: { numberId: FontSizeHorizontal1 },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'f-de': {
    id: 'f-de',
    name: '2',
    layerList: [
      {
        pathId: 'f-ba'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'e-eb': {
    id: 'e-eb',
    name: '3',
    layerList: [
      {
        pathId: 'f-cd'
      },
      {
        pathId: 'e-ba'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'a-ae': {
    id: 'a-ae',
    name: '4',
    layerList: [
      {
        pathId: 'c-bc'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'c-ee': {
    id: 'c-ee',
    name: '5',
    layerList: [
      {
        pathId: 'f-cf'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'd-df': {
    id: 'd-df',
    name: '6',
    layerList: [
      {
        pathId: 'e-ca'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'f-ce': {
    id: 'f-ce',
    name: '7',
    layerList: [
      {
        pathId: 'f-ec'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'f-ed': {
    id: 'f-ed',
    name: '8',
    layerList: [
      {
        pathId: 'c-ab'
      },
      {
        pathId: 'b-be'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  },
  'e-ff': {
    id: 'e-ff',
    name: '9',
    layerList: [
      {
        pathId: 'f-db'
      }
    ],
    viewBox: {
      minX: { integer: 0 },
      minY: { integer: 0 },
      width: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeHorizontal1 },
          { numberId: FontSizeHorizontal2 },
          { numberId: FontCurveHorizontal1 },
          { numberId: FontCurveHorizontal2 },
          { numberId: FontLengthHorizontal }
        ]
      },
      height: {
        operator: 'TOTAL',
        numberList: [
          { numberId: FontSizeVertical1 },
          { numberId: FontSizeVertical2 },
          { numberId: FontSizeVertical3 },
          { numberId: FontCurveVertical1 },
          { numberId: FontCurveVertical2 },
          { numberId: FontCurveVertical3 },
          { numberId: FontCurveVertical4 },
          { numberId: FontLengthVertical1 },
          { numberId: FontLengthVertical2 }
        ]
      }
    }
  }
}
