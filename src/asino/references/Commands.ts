import { FontSizeHorizontal1 } from "../consts";
import { CurveFraction, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoCommand } from "../types/Command";

export const systemCommandDefaults: { [id: string]: AsinoCommand; } = {
  'f-cb': {
    id: 'f-cb',
    name: 'Font Size Left To Right 1',
    letter: 'h',
    dx: { numberId: FontSizeHorizontal1 }
  },
  'd-ba': {
    id: 'd-ba',
    name: 'Font Size Right To Left 1',
    letter: 'h',
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontSizeHorizontal1 }
      ]
    }
  },
  'b-cf': {
    id: 'b-cf',
    name: 'Font Curve Left To Right 1',
    letter: 'h',
    dx: { numberId: FontCurveHorizontal1 }
  },
  'a-fa': {
    id: 'a-fa',
    name: 'Font Curve Right To Left 1',
    letter: 'h',
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal1 }
      ]
    }
  },
  'd-ef': {
    id: 'd-ef',
    name: 'Font Length Left To Right',
    letter: 'h',
    dx: { numberId: FontLengthHorizontal }
  },
  'd-af': {
    id: 'd-af',
    name: 'Font Length Right To Left',
    letter: 'h',
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontLengthHorizontal }
      ]
    }
  },
  'a-bf': {
    id: 'a-bf',
    name: 'Font Curve Left To Right 2',
    letter: 'h',
    dx: { numberId: FontCurveHorizontal2 }
  },
  'd-fd': {
    id: 'd-fd',
    name: 'Font Curve Right To Left 2',
    letter: 'h',
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal2 }
      ]
    }
  },
  'd-fb': {
    id: 'd-fb',
    name: 'Font Size Left To Right 2',
    letter: 'h',
    dx: { numberId: FontSizeHorizontal2 }
  },
  'c-bb': {
    id: 'c-bb',
    name: 'Font Size Right To Left 2',
    letter: 'h',
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontSizeHorizontal2 }
      ]
    }
  },
  'c-dd': {
    id: 'c-dd',
    name: 'Font Line Up To Down 1',
    letter: 'v',
    dy: { numberId: FontSizeVertical1 }
  },
  'd-bf': {
    id: 'd-bf',
    name: 'Font Line Down To Up 1',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontSizeVertical1 }
      ]
    }
  },
  'e-df': {
    id: 'e-df',
    name: 'Font Curve Up To Down 1',
    letter: 'v',
    dy: { numberId: FontCurveVertical1 }
  },
  'c-ed': {
    id: 'c-ed',
    name: 'Font Curve Down To Up 1',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical1 }
      ]
    }
  },
  'f-ad': {
    id: 'f-ad',
    name: 'Font Length Up To Down 1',
    letter: 'v',
    dy: { numberId: FontLengthVertical1 }
  },
  'b-ec': {
    id: 'b-ed',
    name: 'Font Length Down To Up 1',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontLengthVertical1 }
      ]
    }
  },
  'e-ee': {
    id: 'e-ee',
    name: 'Font Curve Up To Down 2',
    letter: 'v',
    dy: { numberId: FontCurveVertical2 }
  },
  'a-ca': {
    id: 'a-ca',
    name: 'Font Curve Down To Up 2',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical2 }
      ]
    }
  },
  'd-cd': {
    id: 'd-cd',
    name: 'Font Line Up To Down 2',
    letter: 'v',
    dy: { numberId: FontSizeVertical2 }
  },
  'd-bc': {
    id: 'd-bc',
    name: 'Font Line Down To Up 2',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontSizeVertical2 }
      ]
    }
  },
  'f-da': {
    id: 'f-da',
    name: 'Font Curve Up To Down 3',
    letter: 'v',
    dy: { numberId: FontCurveVertical3 }
  },
  'a-de': {
    id: 'a-de',
    name: 'Font Curve Down To Up 3',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical3 }
      ]
    }
  },
  'c-ec': {
    id: 'c-ed',
    name: 'Font Length Up To Down 2',
    letter: 'v',
    dy: { numberId: FontLengthVertical2 }
  },
  'f-df': {
    id: 'f-df',
    name: 'Font Length Down To Up 2',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontLengthVertical2 }
      ]
    }
  },
  'b-eb': {
    id: 'b-eb',
    name: 'Font Curve Up To Down 4',
    letter: 'v',
    dy: { numberId: FontCurveVertical4 }
  },
  'f-fd': {
    id: 'f-fd',
    name: 'Font Curve Down To Up 4',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical4 }
      ]
    }
  },
  'd-ca': {
    id: 'd-ca',
    name: 'Font Line Up To Down 3',
    letter: 'v',
    dy: { numberId: FontSizeVertical3 }
  },
  'a-ce': {
    id: 'a-ce',
    name: 'Font Line Down To Up 3',
    letter: 'v',
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontSizeVertical3 }
      ]
    }
  },
  'e-ea': {
    id: 'e-ea',
    name: 'Font Outer Curve Down To Up 1 Left To Right 1',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeVertical1 },
                { numberId: FontCurveVertical1 }
              ]
            }
          ]
        }
      ]
    },
    dx2: {
      operator: '-',
      numbers: [
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontCurveHorizontal1 }
              ]
            }
          ]
        }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      ]
    },
    dx: {
      operator: '+',
      numbers: [
        { numberId: FontSizeHorizontal1 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      ]
    }
  },
  'f-ef': {
    id: 'f-ef',
    name: 'Font Outer Curve Left To Right 2 Up To Down 1',
    letter: 'c',
    dx1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '+',
      numbers: [
        { numberId: FontCurveHorizontal2 },
        { numberId: FontSizeHorizontal2 }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeVertical1 },
                { numberId: FontCurveVertical1 }
              ]
            }
          ]
        }
      ]
    },
    dx: {
      operator: '+',
      numbers: [
        { numberId: FontCurveHorizontal2 },
        { numberId: FontSizeHorizontal2 }
      ]
    },
    dy: {
      operator: '+',
      numbers: [
        { numberId: FontSizeVertical1 },
        { numberId: FontCurveVertical1 }
      ]
    }
  },
  'f-fa': {
    id: 'f-fa',
    name: 'Font Outer Curve Up To Down 2 Right To Left 2',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 }
          ]
        }
      ]
    },
    dx2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveHorizontal2 },
                { numberId: FontSizeHorizontal2 }
              ]
            }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveHorizontal2 },
                { numberId: FontSizeHorizontal2 }
              ]
            }
          ]
        }
      ]
    },
    dy2: {
      operator: '+',
      numbers: [
        { numberId: FontCurveVertical2 },
        { numberId: FontSizeVertical2 }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      ]
    },
    dy: {
      operator: '+',
      numbers: [
        { numberId: FontCurveVertical2 },
        { numberId: FontSizeVertical2 }
      ]
    }
  },
  'f-bd': {
    id: 'f-bd',
    name: 'Font Inner Curve Right To Left 1 Up To Down 3',
    letter: 'c',
    dx1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        { numberId: FontCurveVertical3 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical3 }
          ]
        }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy: { numberId: FontCurveVertical3 }
  },
  'b-ae': {
    id: 'b-ae',
    name: 'Font Outer Curve Down To Up 3 Left To Right 1',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeVertical2 },
                { numberId: FontCurveVertical3 }
              ]
            }
          ]
        }
      ]
    },
    dx2: {
      operator: '-',
      numbers: [
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontCurveHorizontal1 }
              ]
            }
          ]
        }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 }
          ]
        }
      ]
    },
    dx: {
      operator: '+',
      numbers: [
        { numberId: FontSizeHorizontal1 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 }
          ]
        }
      ]
    }
  },
  'a-be': {
    id: 'a-be',
    name: 'Font Inner Curve Left To Right 2 Down To Up 2',
    letter: 'c',
    dx1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        { numberId: FontCurveHorizontal2 }
      ]
    },
    dy1: { integer: 0 },
    dx2: { numberId: FontCurveHorizontal2 },
    dy2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            { numberId: FontCurveVertical2 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical2 }
          ]
        }
      ]
    },
    dx: { numberId: FontCurveHorizontal2 },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical2 }
      ]
    }
  },
  'b-cb': {
    id: 'b-cb',
    name: 'Font Inner Curve Down To Up 1 Right To Left 2',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical1 }
          ]
        }
      ]
    },
    dx2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            { numberId: FontCurveHorizontal2 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical1 }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal2 }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical1 }
      ]
    }
  },
  'a-fc': {
    id: 'a-fc',
    name: 'Font Inner Curve Right To Left 1 Up To Down 1',
    letter: 'c',
    dx1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy2: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        { numberId: FontCurveVertical1 }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal1 }
      ]
    },
    dy: { numberId: FontCurveVertical1 }
  },
  'd-dd': {
    id: 'd-dd',
    name: 'Font Outer Curve Left To Right 2 Up To Down 3',
    letter: 'c',
    dx1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '+',
      numbers: [
        { numberId: FontCurveHorizontal2 },
        { numberId: FontSizeHorizontal2 }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeVertical2 },
                { numberId: FontCurveVertical3 }
              ]
            }
          ]
        }
      ]
    },
    dx: {
      operator: '+',
      numbers: [
        { numberId: FontCurveHorizontal2 },
        { numberId: FontSizeHorizontal2 }
      ]
    },
    dy: {
      operator: '+',
      numbers: [
        { numberId: FontSizeVertical2 },
        { numberId: FontCurveVertical3 }
      ]
    }
  },
  'b-ee': {
    id: 'b-ee',
    name: 'Font Outer Curve Up To Down 4 Right To Left 2',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveVertical4 },
            { numberId: FontSizeVertical3 }
          ]
        }
      ]
    },
    dx2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveHorizontal2 },
                { numberId: FontSizeHorizontal2 }
              ]
            }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveHorizontal2 },
                { numberId: FontSizeHorizontal2 }
              ]
            }
          ]
        }
      ]
    },
    dy2: {
      operator: '+',
      numbers: [
        { numberId: FontCurveVertical4 },
        { numberId: FontSizeVertical3 }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      ]
    },
    dy: {
      operator: '+',
      numbers: [
        { numberId: FontCurveVertical4 },
        { numberId: FontSizeVertical3 }
      ]
    }
  },
  'e-fa': {
    id: 'e-fa',
    name: 'Font Outer Curve Right To Left 1 Down To Up 4',
    letter: 'c',
    dx1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontCurveHorizontal1 }
              ]
            }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveVertical4 },
                { numberId: FontSizeVertical3 }
              ]
            }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveVertical4 },
                { numberId: FontSizeVertical3 }
              ]
            }
          ]
        }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveVertical4 },
            { numberId: FontSizeVertical3 }
          ]
        }
      ]
    }
  },
  'a-bd': {
    id: 'a-bd',
    name: 'Font Inner Curve Up To Down 4 Left To Right 1',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        { numberId: FontCurveVertical4 }
      ]
    },
    dx2: {
      operator: '-',
      numbers: [
        { numberId: FontCurveHorizontal1 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy2: { numberId: FontCurveVertical4 },
    dx: { numberId: FontCurveHorizontal1 },
    dy: { numberId: FontCurveVertical4 }
  },
  'e-fc': {
    id: 'e-fc',
    name: 'Font Inner Curve Left To Right 2 Down To Up 4',
    letter: 'c',
    dx1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        { numberId: FontCurveHorizontal2 }
      ]
    },
    dy1: { integer: 0 },
    dx2: { numberId: FontCurveHorizontal2 },
    dy2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            { numberId: FontCurveVertical4 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical4 }
          ]
        }
      ]
    },
    dx: { numberId: FontCurveHorizontal2 },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical4 }
      ]
    }
  },
  'e-aa': {
    id: 'e-aa',
    name: 'Font Inner Curve Down To Up 3 Right To Left 2',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical3 }
          ]
        }
      ]
    },
    dx2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            { numberId: FontCurveHorizontal2 }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      ]
    },
    dy2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical3 }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveHorizontal2 }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        { numberId: FontCurveVertical3 }
      ]
    }
  },
  'e-bb': {
    id: 'e-bb',
    name: 'Font Outer Curve Right To Left 1 Down To Up 2',
    letter: 'c',
    dx1: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontCurveHorizontal1 }
              ]
            }
          ]
        }
      ]
    },
    dy1: { integer: 0 },
    dx2: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy2: {
      operator: '+',
      numbers: [
        {
          operator: '-',
          numbers: [
            { integer: 0 },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveVertical2 },
                { numberId: FontSizeVertical2 }
              ]
            }
          ]
        },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            {
              operator: '+',
              numbers: [
                { numberId: FontCurveVertical2 },
                { numberId: FontSizeVertical2 }
              ]
            }
          ]
        }
      ]
    },
    dx: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy: {
      operator: '-',
      numbers: [
        { integer: 0 },
        {
          operator: '+',
          numbers: [
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 }
          ]
        }
      ]
    }
  },
  'd-bd': {
    id: 'd-bd',
    name: 'Font Inner Curve Up To Down 2 Left To Right 1',
    letter: 'c',
    dx1: { integer: 0 },
    dy1: {
      operator: '*',
      numbers: [
        { numberId: CurveFraction },
        { numberId: FontCurveVertical2 }
      ]
    },
    dx2: {
      operator: '-',
      numbers: [
        { numberId: FontCurveHorizontal1 },
        {
          operator: '*',
          numbers: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      ]
    },
    dy2: { numberId: FontCurveVertical2 },
    dx: { numberId: FontCurveHorizontal1 },
    dy: { numberId: FontCurveVertical2 }
  }
}
