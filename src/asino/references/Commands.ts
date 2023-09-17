import { CurveFraction, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoCommandReference } from "../types/Path";

export const systemCommandDefaults: AsinoCommandReference[] = [
  {
    id: 'f-cb',
    name: { value: 'Font Size Left To Right 1' },
    command: {
      letter: 'h',
      dx: FontSizeHorizontal1
    }
  },
  {
    id: 'd-ba',
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
  {
    id: 'b-cf',
    name: { value: 'Font Curve Left To Right 1' },
    command: {
      letter: 'h',
      dx: FontCurveHorizontal1
    }
  },
  {
    id: 'a-fa',
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
  {
    id: 'd-ef',
    name: { value: 'Font Length Left To Right' },
    command: {
      letter: 'h',
      dx: FontLengthHorizontal
    }
  },
  {
    id: 'd-af',
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
  {
    id: 'a-bf',
    name: { value: 'Font Curve Left To Right 2' },
    command: {
      letter: 'h',
      dx: FontCurveHorizontal2
    }
  },
  {
    id: 'd-fd',
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
  {
    id: 'd-fb',
    name: { value: 'Font Size Left To Right 2' },
    command: {
      letter: 'h',
      dx: FontSizeHorizontal2
    }
  },
  {
    id: 'c-bb',
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
  {
    id: 'c-dd',
    name: { value: 'Font Line Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontSizeVertical1
    }
  },
  {
    id: 'd-bf',
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
  {
    id: 'e-df',
    name: { value: 'Font Curve Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontCurveVertical1
    }
  },
  {
    id: 'c-ed',
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
  {
    id: 'f-ad',
    name: { value: 'Font Length Up To Down 1' },
    command: {
      letter: 'v',
      dy: FontLengthVertical1
    }
  },
  {
    id: 'b-ec',
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
  {
    id: 'e-ee',
    name: { value: 'Font Curve Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontCurveVertical2
    }
  },
  {
    id: 'a-ca',
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
  {
    id: 'd-cd',
    name: { value: 'Font Line Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontSizeVertical2
    }
  },
  {
    id: 'd-bc',
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
  {
    id: 'f-da',
    name: { value: 'Font Curve Up To Down 3' },
    command: {
      letter: 'v',
      dy: FontCurveVertical3
    }
  },
  {
    id: 'a-de',
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
  {
    id: 'c-ec',
    name: { value: 'Font Length Up To Down 2' },
    command: {
      letter: 'v',
      dy: FontLengthVertical2
    }
  },
  {
    id: 'f-df',
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
  {
    id: 'b-eb',
    name: { value: 'Font Curve Up To Down 4' },
    command: {
      letter: 'v',
      dy: FontCurveVertical4
    }
  },
  {
    id: 'f-fd',
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
  {
    id: 'd-ca',
    name: { value: 'Font Line Up To Down 3' },
    command: {
      letter: 'v',
      dy: FontSizeVertical3
    }
  },
  {
    id: 'a-ce',
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
  {
    id: 'e-ea',
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
  {
    id: 'f-ef',
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
  {
    id: 'f-fa',
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
  {
    id: 'f-bd',
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
  {
    id: 'b-ae',
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
  {
    id: 'a-be',
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
  {
    id: 'b-cb',
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
  {
    id: 'a-fc',
    name: { value: 'Font Inner Curve Right To Left 1 Top To Bottom 1' },
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
  }
]
