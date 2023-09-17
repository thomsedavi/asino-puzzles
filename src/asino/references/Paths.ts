import { PathSize, CurveFraction, Color, FontSizeHorizontal2, FontSizeVertical1, FontCurveVertical1 } from "../consts";
import { AsinoPathReference } from "../types/Path";

export const systemPathDefaults: AsinoPathReference[] = [
  {
    id: 'd-de',
    name: { value: '1' },
    path: {
      commands: [
        {
          command: {
            letter: 'm',
            dx: FontSizeHorizontal2,
            dy: 0
          }
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
          command: {
            letter: 'z'
          }
        }
      ],
      fill: Color
    }
  },
  {
    id: 'f-ba',
    name: { value: '2' },
    path: {
      commands: [
        {
          command: {
            letter: 'm',
            dx: 0,
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
          command: {
            letter: 'z'
          }
        }
      ],
      fill: Color
    }
  },
  {
    id: 'f-cd',
    name: { value: '3a' },
    path: {
      commands: [
        {
          command: {
            letter: 'm',
            dx: 0,
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
          command: {
            letter: 'z'
          }
        }
      ],
      fill: Color
    }
  },
  {
    id: 'f-ee',
    name: { value: 'Curve Right To Bottom' },
    path: {
      commands: [
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
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
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
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
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
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
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
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
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
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
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
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
          }
        },
        {
          command: {
            letter: 'Z'
          }
        }
      ],
      fill: Color
    }
  }
]
