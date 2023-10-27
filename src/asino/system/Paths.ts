import { PathSize, CurveFraction, Color, FontSizeHorizontal2, FontSizeVertical1, FontCurveVertical1, FontSizeHorizontal1, FontCurveHorizontal1, FontLengthHorizontal, FontLengthVertical1, FontCurveVertical2, FontCurveHorizontal2, FontSizeVertical2, FontCurveVertical3, FontLengthVertical2, ColorWrong } from "../consts";
import { AsinoPath } from "../types/Path";

export const systemPathDefaults: { [id: string]: AsinoPath; } = {
  'd-de': {
    id: 'd-de',
    name: '1',
    commandList: [
      {
        letter: 'm',
        dx: { numberId: FontSizeHorizontal2 },
        dy: { integer: 0 }
      },
      {
        commandId: 'c-dd'
      },
      {
        commandId: 'e-df'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'd-cd'
      },
      {
        commandId: 'f-da'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-eb'
      },
      {
        commandId: 'd-ca'
      },
      {
        commandId: 'c-bb'
      },
      {
        commandId: 'a-ce'
      },
      {
        commandId: 'f-fd'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'a-de'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'c-ed'
      },
      {
        commandId: 'd-bf'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-ba': {
    id: 'f-ba',
    name: '2',
    commandList: [
      {
        letter: 'm',
        dx: { integer: 0 },
        dy: {
          operator: '+',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      },
      {
        commandId: 'e-ea'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'f-ef'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'f-fa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'f-bd'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-eb'
      },
      {
        commandId: 'b-cf'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-bf'
      },
      {
        commandId: 'd-fb'
      },
      {
        commandId: 'd-ca'
      },
      {
        commandId: 'c-bb'
      },
      {
        commandId: 'd-fd'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fa'
      },
      {
        commandId: 'd-ba'
      },
      {
        commandId: 'a-ce'
      },
      {
        commandId: 'f-fd'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'b-ae'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-be'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'b-cb'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fc'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-cd': {
    id: 'f-cd',
    name: '3a',
    commandList: [
      {
        letter: 'm',
        dx: { integer: 0 },
        dy: {
          operator: '+',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      },
      {
        commandId: 'e-ea'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'f-ef'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'f-fa'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-be'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'b-cb'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fc'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'e-ba': {
    id: 'e-ba',
    name: '3b',
    commandList: [
      {
        letter: 'm',
        dx: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 },
            { numberId: FontLengthHorizontal }
          ]
        },
        dy: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 },
            { numberId: FontLengthVertical1 },
            { numberId: FontCurveVertical2 }
          ]
        }
      },
      {
        commandId: 'd-dd'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-ee'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-fa'
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'a-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'e-fc'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'e-aa'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'c-bc': {
    id: 'c-bc',
    name: '4',
    commandList: [
      {
        letter: 'm',
        dx: { numberId: FontSizeHorizontal1 },
        dy: { integer: 0 }
      },
      {
        commandId: 'c-dd'
      },
      {
        commandId: 'e-df'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'b-cf'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-bf'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'c-ed'
      },
      {
        commandId: 'd-bf'
      },
      {
        commandId: 'd-fb'
      },
      {
        commandId: 'c-dd'
      },
      {
        commandId: 'e-df'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'd-cd'
      },
      {
        commandId: 'f-da'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-eb'
      },
      {
        commandId: 'd-ca'
      },
      {
        commandId: 'c-bb'
      },
      {
        commandId: 'a-ce'
      },
      {
        commandId: 'f-fd'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'a-de'
      },
      {
        commandId: 'd-fd'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fa'
      },
      {
        commandId: 'd-ba'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'c-ed'
      },
      {
        commandId: 'd-bf'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-cf': {
    id: 'f-cf',
    name: '5',
    commandList: [
      {
        letter: 'm',
        dx: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 },
            { numberId: FontLengthHorizontal },
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        },
        dy: { numberId: FontSizeVertical1 }
      },
      {
        commandId: 'c-bb'
      },
      {
        commandId: 'd-fd'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fa'
      },
      {
        commandId: 'e-df'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'b-cf'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'd-dd'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-ee'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-fa'
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'a-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'e-fc'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'e-aa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fa'
      },
      {
        commandId: 'd-ba'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'c-ed'
      },
      {
        commandId: 'd-bf'
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'b-cf'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-bf'
      },
      {
        commandId: 'd-fb'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'e-ca': {
    id: 'e-ca',
    name: '6',
    commandList: [
      {
        letter: 'm',
        dx: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 },
            { numberId: FontLengthHorizontal },
            { numberId: FontCurveHorizontal2 }
          ]
        },
        dy: {
          operator: '+',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      {
        commandId: 'b-cb'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fc'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'd-cd'
      },
      {
        commandId: 'f-da'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'a-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'e-fc'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'e-aa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'f-bd'
      },
      {
        commandId: 'd-ba'
      },
      {
        commandId: 'b-ae'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'd-dd'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-ee'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-fa'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'a-de'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'e-ea'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'f-ef'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-ec': {
    id: 'f-ec',
    name: '7',
    commandList: [
      {
        letter: 'm',
        dx: { integer: 0 },
        dy: { integer: 0 }
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'b-cf'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-bf'
      },
      {
        commandId: 'd-fb'
      },
      {
        commandId: 'c-dd'
      },
      {
        commandId: 'e-df'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'd-cd'
      },
      {
        commandId: 'f-da'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-eb'
      },
      {
        commandId: 'd-ca'
      },
      {
        commandId: 'c-bb'
      },
      {
        commandId: 'a-ce'
      },
      {
        commandId: 'f-fd'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'a-de'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'c-ed'
      },
      {
        commandId: 'd-fd'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fa'
      },
      {
        commandId: 'd-ba'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'c-ab': {
    id: 'c-ab',
    name: '8a',
    commandList: [
      {
        letter: 'm',
        dx: { integer: 0 },
        dy: {
          operator: '+',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      },
      {
        commandId: 'e-ea'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'f-ef'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'f-fa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-bb'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'd-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-be'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'b-cb'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fc'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'b-be': {
    id: 'b-be',
    name: '8b',
    commandList: [
      {
        letter: 'm',
        dx: { integer: 0 },
        dy: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 },
            { numberId: FontLengthVertical1 },
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 }
          ]
        }
      },
      {
        commandId: 'b-ae'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'd-dd'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-ee'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-fa'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'f-cb'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'a-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'e-fc'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'e-aa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'f-bd'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-db': {
    id: 'f-db',
    name: '9',
    commandList: [
      {
        letter: 'm',
        dx: { numberId: FontSizeHorizontal1 },
        dy: {
          operator: 'TOTAL',
          numberList: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 },
            { numberId: FontLengthVertical1 },
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 },
            { numberId: FontLengthVertical2 }
          ]
        }
      },
      {
        commandId: 'a-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'e-fc'
      },
      {
        commandId: 'f-df'
      },
      {
        commandId: 'a-de'
      },
      {
        commandId: 'd-bc'
      },
      {
        commandId: 'a-ca'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'b-cb'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'a-fc'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'd-bd'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'a-be'
      },
      {
        commandId: 'd-fb'
      },
      {
        commandId: 'f-fa'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-bb'
      },
      {
        commandId: 'b-ec'
      },
      {
        commandId: 'e-ea'
      },
      {
        commandId: 'd-ef'
      },
      {
        commandId: 'f-ef'
      },
      {
        commandId: 'f-ad'
      },
      {
        commandId: 'e-ee'
      },
      {
        commandId: 'd-cd'
      },
      {
        commandId: 'f-da'
      },
      {
        commandId: 'c-ec'
      },
      {
        commandId: 'b-ee'
      },
      {
        commandId: 'd-af'
      },
      {
        commandId: 'e-fa'
      },
      {
        letter: 'z'
      }
    ],
    fill: { colorId: 'b-ca' }
  },
  'f-ee': {
    id: 'f-ee',
    name: 'Curve Right To Bottom',
    commandList: [
      {
        letter: 'M',
        x: { integer: 1 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'C',
        x1: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '-',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        y1: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x2: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y2: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '-',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'L',
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'C',
        x1: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y1: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '+',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        x2: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '+',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        y2: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x: { integer: 1 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  },
  'f-eb': {
    id: 'f-eb',
    name: 'Curve Left To Top',
    commandList: [
      {
        letter: 'M',
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'C',
        x1: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y1: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        x2: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        y2: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x: { integer: 0 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'L',
        x: { integer: 0 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'C',
        x1: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '-',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        y1: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x2: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y2: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '-',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  },
  'b-ff': {
    id: 'b-ff',
    name: 'Curve Top To Right',
    commandList: [
      {
        letter: 'M',
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'C',
        x1: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y1: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '-',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        x2: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '-',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        y2: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x: { integer: 1 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'L',
        x: { integer: 1 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'C',
        x1: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '+',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        y1: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x2: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y2: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  },
  'c-fb': {
    id: 'c-fb',
    name: 'Curve Right To Left',
    commandList: [
      {
        letter: 'M',
        x: { integer: 0 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'L',
        x: { integer: 0 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'L',
        x: { integer: 1 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'L',
        x: { integer: 1 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  },
  'a-ee': {
    id: 'a-ee',
    name: 'Curve Top To Bottom',
    commandList: [
      {
        letter: 'M',
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'L',
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 0 }
      },
      {
        letter: 'L',
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'L',
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  },
  'b-bc': {
    id: 'b-bc',
    name: 'Curve Bottom To Left',
    commandList: [
      {
        letter: 'M',
        x: { integer: 0 },
        y: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'C',
        x1: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        y1: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x2: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y2: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '+',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        x: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'L',
        x: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y: { integer: 1 }
      },
      {
        letter: 'C',
        x1: {
          operator: '-',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        y1: {
          operator: '-',
          numberList: [
            { integer: 1 },
            {
              operator: '*',
              numberList: [
                { numberId: CurveFraction },
                {
                  operator: '-',
                  numberList: [
                    {
                      numerator: { integer: 1 },
                      denominator: { integer: 2 }
                    },
                    {
                      operator: '/',
                      numberList: [
                        { numberId: PathSize },
                        { integer: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        x2: {
          operator: '*',
          numberList: [
            { numberId: CurveFraction },
            {
              operator: '-',
              numberList: [
                {
                  numerator: { integer: 1 },
                  denominator: { integer: 2 }
                },
                {
                  operator: '/',
                  numberList: [
                    { numberId: PathSize },
                    { integer: 2 }
                  ]
                }
              ]
            }
          ]
        },
        y2: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        },
        x: { integer: 0 },
        y: {
          operator: '+',
          numberList: [
            {
              numerator: { integer: 1 },
              denominator: { integer: 2 }
            },
            {
              operator: '/',
              numberList: [
                { numberId: PathSize },
                { integer: 2 }
              ]
            }
          ]
        }
      },
      {
        letter: 'Z'
      }
    ],
    fill: { colorId: Color }
  }
}
