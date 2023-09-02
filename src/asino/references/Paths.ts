import { PathSize, CurveFraction, Color } from "../consts";
import { AsinoPathReference } from "../types/Path";

export const systemPathDefaults: AsinoPathReference[] = [
  {
    id: 'f-ee',
    name: { value: 'Curve Right To Bottom' },
    path: {
      commands: [
        {
          letter: 'M',
          x: 1,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '-',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y2: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '-',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'C',
          x1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '+',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '+',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x: 1,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  },
  {
    id: 'f-eb',
    name: { value: 'Curve Left To Top' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'C',
          x1: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          x2: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: 0,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '-',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x2: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y2: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '-',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  },
  {
    id: 'b-ff',
    name: { value: 'Curve Top To Right' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'C',
          x1: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '-',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          x2: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '-',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x: 1,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: 1,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '+',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x2: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y2: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  },
  {
    id: 'c-fb',
    name: { value: 'Curve Right To Left' },
    path: {
      commands: [
        {
          letter: 'M',
          x: 0,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: 1,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: 1,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  },
  {
    id: 'a-ee',
    name: { value: 'Curve Top To Bottom' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'L',
          x: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 0
        },
        {
          letter: 'L',
          x: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  },
  {
    id: 'b-bc',
    name: { value: 'Curve Bottom To Left' },
    path: {
      commands: [
        {
          letter: 'M',
          x: 0,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y2: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '+',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'C',
          x1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '-',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
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
            numberInputs: [
              CurveFraction,
              {
                operator: '-',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  }
]
