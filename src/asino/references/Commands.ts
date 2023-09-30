import { FontSizeHorizontal1 } from "../consts";
import { CurveFraction, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoCommandReference } from "../types/Path";

export const systemCommandDefaults: { [id: string]: AsinoCommandReference; } = {
  'f-cb': {
    name: { value: 'Font Size Left To Right 1' },
    command: {
      letter: 'h',
      dx: { numberId: FontSizeHorizontal1 }
    }
  },
  'd-ba': {
    name: { value: 'Font Size Right To Left 1' },
    command: {
      letter: 'h',
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontSizeHorizontal1 }
          ]
        }
      }
    }
  },
  'b-cf': {
    name: { value: 'Font Curve Left To Right 1' },
    command: {
      letter: 'h',
      dx: { numberId: FontCurveHorizontal1 }
    }
  },
  'a-fa': {
    name: { value: 'Font Curve Right To Left 1' },
    command: {
      letter: 'h',
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      }
    }
  },
  'd-ef': {
    name: { value: 'Font Length Left To Right' },
    command: {
      letter: 'h',
      dx: { numberId: FontLengthHorizontal }
    }
  },
  'd-af': {
    name: { value: 'Font Length Right To Left' },
    command: {
      letter: 'h',
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontLengthHorizontal }
          ]
        }
      }
    }
  },
  'a-bf': {
    name: { value: 'Font Curve Left To Right 2' },
    command: {
      letter: 'h',
      dx: { numberId: FontCurveHorizontal2 }
    }
  },
  'd-fd': {
    name: { value: 'Font Curve Right To Left 2' },
    command: {
      letter: 'h',
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      }
    }
  },
  'd-fb': {
    name: { value: 'Font Size Left To Right 2' },
    command: {
      letter: 'h',
      dx: { numberId: FontSizeHorizontal2 }
    }
  },
  'c-bb': {
    name: { value: 'Font Size Right To Left 2' },
    command: {
      letter: 'h',
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      }
    }
  },
  'c-dd': {
    name: { value: 'Font Line Up To Down 1' },
    command: {
      letter: 'v',
      dy: { numberId: FontSizeVertical1 }
    }
  },
  'd-bf': {
    name: { value: 'Font Line Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontSizeVertical1 }
          ]
        }
      }
    }
  },
  'e-df': {
    name: { value: 'Font Curve Up To Down 1' },
    command: {
      letter: 'v',
      dy: { numberId: FontCurveVertical1 }
    }
  },
  'c-ed': {
    name: { value: 'Font Curve Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical1 }
          ]
        }
      }
    }
  },
  'f-ad': {
    name: { value: 'Font Length Up To Down 1' },
    command: {
      letter: 'v',
      dy: { numberId: FontLengthVertical1 }
    }
  },
  'b-ec': {
    name: { value: 'Font Length Down To Up 1' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontLengthVertical1 }
          ]
        }
      }
    }
  },
  'e-ee': {
    name: { value: 'Font Curve Up To Down 2' },
    command: {
      letter: 'v',
      dy: { numberId: FontCurveVertical2 }
    }
  },
  'a-ca': {
    name: { value: 'Font Curve Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical2 }
          ]
        }
      }
    }
  },
  'd-cd': {
    name: { value: 'Font Line Up To Down 2' },
    command: {
      letter: 'v',
      dy: { numberId: FontSizeVertical2 }
    }
  },
  'd-bc': {
    name: { value: 'Font Line Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontSizeVertical2 }
          ]
        }
      }
    }
  },
  'f-da': {
    name: { value: 'Font Curve Up To Down 3' },
    command: {
      letter: 'v',
      dy: { numberId: FontCurveVertical3 }
    }
  },
  'a-de': {
    name: { value: 'Font Curve Down To Up 3' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical3 }
          ]
        }
      }
    }
  },
  'c-ec': {
    name: { value: 'Font Length Up To Down 2' },
    command: {
      letter: 'v',
      dy: { numberId: FontLengthVertical2 }
    }
  },
  'f-df': {
    name: { value: 'Font Length Down To Up 2' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontLengthVertical2 }
          ]
        }
      }
    }
  },
  'b-eb': {
    name: { value: 'Font Curve Up To Down 4' },
    command: {
      letter: 'v',
      dy: { numberId: FontCurveVertical4 }
    }
  },
  'f-fd': {
    name: { value: 'Font Curve Down To Up 4' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical4 }
          ]
        }
      }
    }
  },
  'd-ca': {
    name: { value: 'Font Line Up To Down 3' },
    command: {
      letter: 'v',
      dy: { numberId: FontSizeVertical3 }
    }
  },
  'a-ce': {
    name: { value: 'Font Line Down To Up 3' },
    command: {
      letter: 'v',
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontSizeVertical3 }
          ]
        }
      }
    }
  },
  'e-ea': {
    name: { value: 'Font Outer Curve Down To Up 1 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeVertical1 },
                        { numberId: FontCurveVertical1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeHorizontal1 },
                        { numberId: FontCurveHorizontal1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical1 },
                  { numberId: FontCurveVertical1 }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical1 },
                  { numberId: FontCurveVertical1 }
                ]
              }
            }
          ]
        }
      }
    }
  },
  'f-ef': {
    name: { value: 'Font Outer Curve Left To Right 2 Up To Down 1' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveHorizontal2 },
                  { numberId: FontSizeHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical1 },
                  { numberId: FontCurveVertical1 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeVertical1 },
                        { numberId: FontCurveVertical1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontSizeVertical1 },
            { numberId: FontCurveVertical1 }
          ]
        }
      }
    }
  },
  'f-fa': {
    name: { value: 'Font Outer Curve Up To Down 2 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveVertical2 },
                  { numberId: FontSizeVertical2 }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveHorizontal2 },
                        { numberId: FontSizeHorizontal2 }
                      ]
                    }
                  }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveHorizontal2 },
                        { numberId: FontSizeHorizontal2 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveHorizontal2 },
                  { numberId: FontSizeHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveVertical2 },
            { numberId: FontSizeVertical2 }
          ]
        }
      }
    }
  },
  'f-bd': {
    name: { value: 'Font Inner Curve Right To Left 1 Up To Down 3' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            { numberId: FontCurveVertical3 },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveVertical3 }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy: { numberId: FontCurveVertical3 }
    }
  },
  'b-ae': {
    name: { value: 'Font Outer Curve Down To Up 3 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeVertical2 },
                        { numberId: FontCurveVertical3 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeHorizontal1 },
                        { numberId: FontCurveHorizontal1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical2 },
                  { numberId: FontCurveVertical3 }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontSizeHorizontal1 },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical2 },
                  { numberId: FontCurveVertical3 }
                ]
              }
            }
          ]
        }
      }
    }
  },
  'a-be': {
    name: { value: 'Font Inner Curve Left To Right 2 Down To Up 2' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: { numberId: FontCurveHorizontal2 },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  { numberId: FontCurveVertical2 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveVertical2 }
                ]
              }
            }
          ]
        }
      },
      dx: { numberId: FontCurveHorizontal2 },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical2 }
          ]
        }
      }
    }
  },
  'b-cb': {
    name: { value: 'Font Inner Curve Down To Up 1 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveVertical1 }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  { numberId: FontCurveHorizontal2 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical1 }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical1 }
          ]
        }
      }
    }
  },
  'a-fc': {
    name: { value: 'Font Inner Curve Right To Left 1 Up To Down 1' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical1 }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal1 }
          ]
        }
      },
      dy: { numberId: FontCurveVertical1 }
    }
  },
  'd-dd': {
    name: { value: 'Font Outer Curve Left To Right 2 Up To Down 3' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveHorizontal2 },
                  { numberId: FontSizeHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeVertical2 },
                  { numberId: FontCurveVertical3 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeVertical2 },
                        { numberId: FontCurveVertical3 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveHorizontal2 },
            { numberId: FontSizeHorizontal2 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontSizeVertical2 },
            { numberId: FontCurveVertical3 }
          ]
        }
      }
    }
  },
  'b-ee': {
    name: { value: 'Font Outer Curve Up To Down 4 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveVertical4 },
                  { numberId: FontSizeVertical3 }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveHorizontal2 },
                        { numberId: FontSizeHorizontal2 }
                      ]
                    }
                  }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveHorizontal2 },
                        { numberId: FontSizeHorizontal2 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveVertical4 },
            { numberId: FontSizeVertical3 }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveHorizontal2 },
                  { numberId: FontSizeHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy: {
        formula: {
          operator: '+',
          numberInputs: [
            { numberId: FontCurveVertical4 },
            { numberId: FontSizeVertical3 }
          ]
        }
      }
    }
  },
  'e-fa': {
    name: { value: 'Font Outer Curve Right To Left 1 Down To Up 4' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeHorizontal1 },
                        { numberId: FontCurveHorizontal1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveVertical4 },
                        { numberId: FontSizeVertical3 }
                      ]
                    }
                  }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveVertical4 },
                        { numberId: FontSizeVertical3 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveVertical4 },
                  { numberId: FontSizeVertical3 }
                ]
              }
            }
          ]
        }
      }
    }
  },
  'a-bd': {
    name: { value: 'Font Inner Curve Up To Down 4 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical4 }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { numberId: FontCurveHorizontal1 },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy2: { numberId: FontCurveVertical4 },
      dx: { numberId: FontCurveHorizontal1 },
      dy: { numberId: FontCurveVertical4 }
    }
  },
  'e-fc': {
    name: { value: 'Font Inner Curve Left To Right 2 Down To Up 4' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: { numberId: FontCurveHorizontal2 },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  { numberId: FontCurveVertical4 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveVertical4 }
                ]
              }
            }
          ]
        }
      },
      dx: { numberId: FontCurveHorizontal2 },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical4 }
          ]
        }
      }
    }
  },
  'e-aa': {
    name: { value: 'Font Inner Curve Down To Up 3 Right To Left 2' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveVertical3 }
                ]
              }
            }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  { numberId: FontCurveHorizontal2 }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal2 }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical3 }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveHorizontal2 }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            { numberId: FontCurveVertical3 }
          ]
        }
      }
    }
  },
  'e-bb': {
    name: { value: 'Font Outer Curve Right To Left 1 Down To Up 2' },
    command: {
      letter: 'c',
      dx1: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontSizeHorizontal1 },
                        { numberId: FontCurveHorizontal1 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dy1: { integer: { value: 0 } },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy2: {
        formula: {
          operator: '+',
          numberInputs: [
            {
              formula: {
                operator: '-',
                numberInputs: [
                  { integer: { value: 0 } },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveVertical2 },
                        { numberId: FontSizeVertical2 }
                      ]
                    }
                  }
                ]
              }
            },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  {
                    formula: {
                      operator: '+',
                      numberInputs: [
                        { numberId: FontCurveVertical2 },
                        { numberId: FontSizeVertical2 }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      dx: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontSizeHorizontal1 },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy: {
        formula: {
          operator: '-',
          numberInputs: [
            { integer: { value: 0 } },
            {
              formula: {
                operator: '+',
                numberInputs: [
                  { numberId: FontCurveVertical2 },
                  { numberId: FontSizeVertical2 }
                ]
              }
            }
          ]
        }
      }
    }
  },
  'd-bd': {
    name: { value: 'Font Inner Curve Up To Down 2 Left To Right 1' },
    command: {
      letter: 'c',
      dx1: { integer: { value: 0 } },
      dy1: {
        formula: {
          operator: '*',
          numberInputs: [
            { numberId: CurveFraction },
            { numberId: FontCurveVertical2 }
          ]
        }
      },
      dx2: {
        formula: {
          operator: '-',
          numberInputs: [
            { numberId: FontCurveHorizontal1 },
            {
              formula: {
                operator: '*',
                numberInputs: [
                  { numberId: CurveFraction },
                  { numberId: FontCurveHorizontal1 }
                ]
              }
            }
          ]
        }
      },
      dy2: { numberId: FontCurveVertical2 },
      dx: { numberId: FontCurveHorizontal1 },
      dy: { numberId: FontCurveVertical2 }
    }
  }
}
