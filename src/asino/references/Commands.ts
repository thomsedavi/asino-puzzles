import { CurveFraction, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoCommandReference } from "../types/Path";

export const systemCommandDefaults: { [id: string]: AsinoCommandReference; } = {
  'f-cb': {
    name: { value: 'Font Size Left To Right 1' },
    command: {
      letter: 'h',
      dx: FontSizeHorizontal1
    }
  },
  'd-ba': {
    name: { value: 'Font Size Right To Left 1' },
    command: {
      letter: 'h',
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontSizeHorizontal1
        ]
      }
    }
  },
  'b-cf': {
    name: { value: 'Font Curve Left To Right 1' },
    command: {
      letter: 'h',
      dx: FontCurveHorizontal1
    }
  },
  'a-fa': {
    name: { value: 'Font Curve Right To Left 1' },
    command: {
      letter: 'h',
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal1
        ]
      }
    }
  },
  'd-ef': {
    name: { value: 'Font Length Left To Right' },
    command: {
      letter: 'h',
      dx: FontLengthHorizontal
    }
  },
  'd-af': {
    name: { value: 'Font Length Right To Left' },
    command: {
      letter: 'h',
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontLengthHorizontal
        ]
      }
    }
  },
  'a-bf': {
    name: { value: 'Font Curve Left To Right 2' },
    command: {
      letter: 'h',
      dx: FontCurveHorizontal2
    }
  },
  'd-fd': {
    name: { value: 'Font Curve Right To Left 2' },
    command: {
      letter: 'h',
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal2
        ]
      }
    }
  },
  'd-fb': {
    name: { value: 'Font Size Left To Right 2' },
    command: {
      letter: 'h',
      dx: FontSizeHorizontal2
    }
  },
  'c-bb': {
    name: { value: 'Font Size Right To Left 2' },
    command: {
      letter: 'h',
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontSizeHorizontal2
        ]
      }
    }
  },
  'c-dd': {
    name: { value: 'Font Line Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontSizeVertical1
    }
  },
  'd-bf': {
    name: { value: 'Font Line Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontSizeVertical1
        ]
      }
    }
  },
  'e-df': {
    name: { value: 'Font Curve Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontCurveVertical1
    }
  },
  'c-ed': {
    name: { value: 'Font Curve Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical1
        ]
      }
    }
  },
  'f-ad': {
    name: { value: 'Font Length Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontLengthVertical1
    }
  },
  'b-ec': {
    name: { value: 'Font Length Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontLengthVertical1
        ]
      }
    }
  },
  'e-ee': {
    name: { value: 'Font Curve Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontCurveVertical2
    }
  },
  'a-ca': {
    name: { value: 'Font Curve Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical2
        ]
      }
    }
  },
  'd-cd': {
    name: { value: 'Font Line Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontSizeVertical2
    }
  },
  'd-bc': {
    name: { value: 'Font Line Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontSizeVertical2
        ]
      }
    }
  },
  'f-da': {
    name: { value: 'Font Curve Up To Down 3' },
    command: {
      letter: 'v',
      dy: FontCurveVertical3
    }
  },
  'a-de': {
    name: { value: 'Font Curve Down To Up 3' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical3
        ]
      }
    }
  },
  'c-ec': {
    name: { value: 'Font Length Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontLengthVertical2
    }
  },
  'f-df': {
    name: { value: 'Font Length Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontLengthVertical2
        ]
      }
    }
  },
  'b-eb': {
    name: { value: 'Font Curve Up To Down 4' },
    command: {
      letter: 'v',
      dy: FontCurveVertical4
    }
  },
  'f-fd': {
    name: { value: 'Font Curve Down To Up 4' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical4
        ]
      }
    }
  },
  'd-ca': {
    name: { value: 'Font Line Up To Down 3' },
    command: {
      letter: 'v',
      dy: FontSizeVertical3
    }
  },
  'a-ce': {
    name: { value: 'Font Line Down To Up 3' },
    command: {
      letter: 'v',
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontSizeVertical3
        ]
      }
    }
  },
  'e-ea': {
    name: { value: 'Font Outer Curve Down To Up 1 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeVertical1,
                  FontCurveVertical1
                ]
              }
            ]
          }
        ]
      },
      dx2: {
        operator: '-',
        numberInputs: [
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeHorizontal1,
                  FontCurveHorizontal1
                ]
              }
            ]
          }
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical1,
              FontCurveVertical1
            ]
          }
        ]
      },
      dx: {
        operator: '+',
        numberInputs: [
          FontSizeHorizontal1,
          FontCurveHorizontal1
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical1,
              FontCurveVertical1
            ]
          }
        ]
      }
    }
  },
  'f-ef': {
    name: { value: 'Font Outer Curve Left To Right 2 Up To Down 1' },
    command: {
      letter: 'c',
      dx1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          {
            operator: '+',
            numberInputs: [
              FontCurveHorizontal2,
              FontSizeHorizontal2
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '+',
        numberInputs: [
          FontCurveHorizontal2,
          FontSizeHorizontal2
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical1,
              FontCurveVertical1
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeVertical1,
                  FontCurveVertical1
                ]
              }
            ]
          }
        ]
      },
      dx: {
        operator: '+',
        numberInputs: [
          FontCurveHorizontal2,
          FontSizeHorizontal2
        ]
      },
      dy: {
        operator: '+',
        numberInputs: [
          FontSizeVertical1,
          FontCurveVertical1
        ]
      }
    }
  },
  'f-fa': {
    name: { value: 'Font Outer Curve Up To Down 2 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          {
            operator: '+',
            numberInputs: [
              FontCurveVertical2,
              FontSizeVertical2
            ]
          }
        ]
      },
      dx2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              {
                operator: '+',
                numberInputs: [
                  FontCurveHorizontal2,
                  FontSizeHorizontal2
                ]
              }
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontCurveHorizontal2,
                  FontSizeHorizontal2
                ]
              }
            ]
          }
        ]
      },
      dy2: {
        operator: '+',
        numberInputs: [
          FontCurveVertical2,
          FontSizeVertical2
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontCurveHorizontal2,
              FontSizeHorizontal2
            ]
          }
        ]
      },
      dy: {
        operator: '+',
        numberInputs: [
          FontCurveVertical2,
          FontSizeVertical2
        ]
      }
    }
  },
  'f-bd': {
    name: { value: 'Font Inner Curve Right To Left 1 Up To Down 3' },
    command: {
      letter: 'c',
      dx1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal1
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          FontCurveVertical3,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveVertical3
            ]
          }
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal1
        ]
      },
      dy: FontCurveVertical3
    }
  },
  'b-ae': {
    name: { value: 'Font Outer Curve Down To Up 3 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeVertical2,
                  FontCurveVertical3
                ]
              }
            ]
          }
        ]
      },
      dx2: {
        operator: '-',
        numberInputs: [
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeHorizontal1,
                  FontCurveHorizontal1
                ]
              }
            ]
          }
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical2,
              FontCurveVertical3
            ]
          }
        ]
      },
      dx: {
        operator: '+',
        numberInputs: [
          FontSizeHorizontal1,
          FontCurveHorizontal1
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical2,
              FontCurveVertical3
            ]
          }
        ]
      }
    }
  },
  'a-be': {
    name: { value: 'Font Inner Curve Left To Right 2 Down To Up 2' },
    command: {
      letter: 'c',
      dx1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          FontCurveHorizontal2
        ]
      },
      dy1: 0,
      dx2: FontCurveHorizontal2,
      dy2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              FontCurveVertical2
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveVertical2
            ]
          }
        ]
      },
      dx: FontCurveHorizontal2,
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical2
        ]
      }
    }
  },
  'b-cb': {
    name: { value: 'Font Inner Curve Down To Up 1 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveVertical1
            ]
          }
        ]
      },
      dx2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              FontCurveHorizontal2
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal2
            ]
          }
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical1
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal2
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical1
        ]
      }
    }
  },
  'a-fc': {
    name: { value: 'Font Inner Curve Right To Left 1 Up To Down 1' },
    command: {
      letter: 'c',
      dx1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal1
        ]
      },
      dy2: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          FontCurveVertical1
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal1
        ]
      },
      dy: FontCurveVertical1
    }
  },
  'd-dd': {
    name: { value: 'Font Outer Curve Left To Right 2 Up To Down 3' },
    command: {
      letter: 'c',
      dx1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          {
            operator: '+',
            numberInputs: [
              FontCurveHorizontal2,
              FontSizeHorizontal2
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '+',
        numberInputs: [
          FontCurveHorizontal2,
          FontSizeHorizontal2
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          {
            operator: '+',
            numberInputs: [
              FontSizeVertical2,
              FontCurveVertical3
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeVertical2,
                  FontCurveVertical3
                ]
              }
            ]
          }
        ]
      },
      dx: {
        operator: '+',
        numberInputs: [
          FontCurveHorizontal2,
          FontSizeHorizontal2
        ]
      },
      dy: {
        operator: '+',
        numberInputs: [
          FontSizeVertical2,
          FontCurveVertical3
        ]
      }
    }
  },
  'b-ee': {
    name: { value: 'Font Outer Curve Up To Down 4 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          {
            operator: '+',
            numberInputs: [
              FontCurveVertical4,
              FontSizeVertical3
            ]
          }
        ]
      },
      dx2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              {
                operator: '+',
                numberInputs: [
                  FontCurveHorizontal2,
                  FontSizeHorizontal2
                ]
              }
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontCurveHorizontal2,
                  FontSizeHorizontal2
                ]
              }
            ]
          }
        ]
      },
      dy2: {
        operator: '+',
        numberInputs: [
          FontCurveVertical4,
          FontSizeVertical3
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontCurveHorizontal2,
              FontSizeHorizontal2
            ]
          }
        ]
      },
      dy: {
        operator: '+',
        numberInputs: [
          FontCurveVertical4,
          FontSizeVertical3
        ]
      }
    }
  },
  'e-fa': {
    name: { value: 'Font Outer Curve Right To Left 1 Down To Up 4' },
    command: {
      letter: 'c',
      dx1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeHorizontal1,
                  FontCurveHorizontal1
                ]
              }
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              {
                operator: '+',
                numberInputs: [
                  FontCurveVertical4,
                  FontSizeVertical3
                ]
              }
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontCurveVertical4,
                  FontSizeVertical3
                ]
              }
            ]
          }
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontCurveVertical4,
              FontSizeVertical3
            ]
          }
        ]
      }
    }
  },
  'a-bd': {
    name: { value: 'Font Inner Curve Up To Down 4 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          FontCurveVertical4
        ]
      },
      dx2: {
        operator: '-',
        numberInputs: [
          FontCurveHorizontal1,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy2: FontCurveVertical4,
      dx: FontCurveHorizontal1,
      dy: FontCurveVertical4
    }
  },
  'e-fc': {
    name: { value: 'Font Inner Curve Left To Right 2 Down To Up 4' },
    command: {
      letter: 'c',
      dx1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          FontCurveHorizontal2
        ]
      },
      dy1: 0,
      dx2: FontCurveHorizontal2,
      dy2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              FontCurveVertical4
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveVertical4

            ]
          }
        ]
      },
      dx: FontCurveHorizontal2,
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical4
        ]
      }
    }
  },
  'e-aa': {
    name: { value: 'Font Inner Curve Down To Up 3 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveVertical3
            ]
          }
        ]
      },
      dx2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              FontCurveHorizontal2
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal2
            ]
          }
        ]
      },
      dy2: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical3
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveHorizontal2
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          FontCurveVertical3
        ]
      }
    }
  },
  'e-bb': {
    name: { value: 'Font Outer Curve Right To Left 1 Down To Up 2' },
    command: {
      letter: 'c',
      dx1: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontSizeHorizontal1,
                  FontCurveHorizontal1
                ]
              }
            ]
          }
        ]
      },
      dy1: 0,
      dx2: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy2: {
        operator: '+',
        numberInputs: [
          {
            operator: '-',
            numberInputs: [
              0,
              {
                operator: '+',
                numberInputs: [
                  FontCurveVertical2,
                  FontSizeVertical2
                ]
              }
            ]
          },
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontCurveVertical2,
                  FontSizeVertical2
                ]
              }
            ]
          }
        ]
      },
      dx: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontSizeHorizontal1,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy: {
        operator: '-',
        numberInputs: [
          0,
          {
            operator: '+',
            numberInputs: [
              FontCurveVertical2,
              FontSizeVertical2
            ]
          }
        ]
      }
    }
  },
  'd-bd': {
    name: { value: 'Font Inner Curve Up To Down 2 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: 0,
      dy1: {
        operator: '*',
        numberInputs: [
          CurveFraction,
          FontCurveVertical2
        ]
      },
      dx2: {
        operator: '-',
        numberInputs: [
          FontCurveHorizontal1,
          {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontCurveHorizontal1
            ]
          }
        ]
      },
      dy2: FontCurveVertical2,
      dx: FontCurveHorizontal1,
      dy: FontCurveVertical2
    }
  }
}
