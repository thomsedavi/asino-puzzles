import { PathSize, CurveFraction, Color, FontPathWidth, FontHorizontalSerifWidth, FontWidth, FontHalfHeight, FontPathHeight } from "../consts";
import { AsinoPathReference } from "../types/Path";

export const systemPathDefaults: AsinoPathReference[] = [
  {
    id: 'f-ba',
    name: { value: '2' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '+',
            numberInputs: [
              FontWidth,
              FontPathWidth
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: 0,
          y: 1
        },
        {
          letter: 'L',
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              FontHalfHeight,
              {
                operator: '-',
                numberInputs: [
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
                      2
                    ]
                  },
                  {
                    operator: '/',
                    numberInputs: [
                      FontPathHeight,
                      2
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: 0,
          y1: {
            operator: '-',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontHalfHeight,
                  {
                    operator: '-',
                    numberInputs: [
                      {
                        operator: '/',
                        numberInputs: [
                          {
                            operator: '+',
                            numberInputs: [
                              FontWidth,
                              FontPathWidth
                            ]
                          },
                          2
                        ]
                      },
                      {
                        operator: '/',
                        numberInputs: [
                          FontPathHeight,
                          2
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
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
              {
                operator: '/',
                numberInputs: [
                  {
                    operator: '+',
                    numberInputs: [
                      FontWidth,
                      FontPathWidth
                    ]
                  },
                  2
                ]
              },
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y2: {
            operator: '-',
            numberInputs: [
              FontHalfHeight,
              {
                operator: '/',
                numberInputs: [
                  FontPathHeight,
                  2
                ]
              }
            ]
          },
          x: {
            operator: '/',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              2
            ]
          },
          y: {
            operator: '-',
            numberInputs: [
              FontHalfHeight,
              {
                operator: '/',
                numberInputs: [
                  FontPathHeight,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: {
            operator: '-',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              FontPathWidth
            ]
          },
          y: {
            operator: '/',
            numberInputs: [
              FontHalfHeight,
              2
            ]
          }
        },
        {
          letter: 'L',
          x: {
            operator: '/',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              2
            ]
          },
          y: FontPathHeight
        },
        {
          letter: 'L',
          x: 0,
          y: FontPathHeight
        },
        {
          letter: 'L',
          x: 0,
          y: 0
        },
        {
          letter: 'L',
          x: {
            operator: '/',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              2
            ]
          },
          y: 0
        },
        {
          letter: 'C',
          x1: {
            operator: '+',
            numberInputs: [
              {
                operator: '/',
                numberInputs: [
                  {
                    operator: '+',
                    numberInputs: [
                      FontWidth,
                      FontPathWidth
                    ]
                  },
                  2
                ]
              },
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y1: 0,
          x2: {
            operator: '+',
            numberInputs: [
              FontWidth,
              FontPathWidth
            ]
          },
          y2: {
            operator: '-',
            numberInputs: [
              {
                operator: '/',
                numberInputs: [
                  {
                    operator: '+',
                    numberInputs: [
                      FontWidth,
                      FontPathWidth
                    ]
                  },
                  2
                ]
              },
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
                      2
                    ]
                  }
                ]
              }
            ]
          },
          x: {
            operator: '+',
            numberInputs: [
              FontWidth,
              FontPathWidth
            ]
          },
          y: {
            operator: '/',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              2
            ]
          }
        },
        {
          letter: 'L',
          x: {
            operator: '+',
            numberInputs: [
              FontWidth,
              FontPathWidth
            ]
          },
          y: {
            operator: '/',
            numberInputs: [
              FontHalfHeight,
              2
            ]
          }
        },
        {
          letter: 'L',
          x: {
            operator: '/',
            numberInputs: [
              {
                operator: '+',
                numberInputs: [
                  FontWidth,
                  FontPathWidth
                ]
              },
              2
            ]
          },
          y: {
            operator: '+',
            numberInputs: [
              FontHalfHeight,
              {
                operator: '/',
                numberInputs: [
                  FontPathHeight,
                  2
                ]
              }
            ]
          },
        },
        {
          letter: 'L',
          x: FontPathWidth,
          y: {
            operator: '+',
            numberInputs: [
              FontHalfHeight,
              {
                operator: '-',
                numberInputs: [
                  {
                    operator: '/',
                    numberInputs: [
                      {
                        operator: '+',
                        numberInputs: [
                          FontWidth,
                          FontPathWidth
                        ]
                      },
                      2
                    ]
                  },
                  {
                    operator: '/',
                    numberInputs: [
                      FontPathHeight,
                      2
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          letter: 'L',
          x: FontPathWidth,
          y: {
            operator: '-',
            numberInputs: [
              1,
              FontPathHeight
            ]
          }
        },
        {
          letter: 'L',
          x: {
            operator: '+',
            numberInputs: [
              FontWidth,
              FontPathWidth
            ]
          },
          y: {
            operator: '-',
            numberInputs: [
              1,
              FontPathHeight
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
    id: 'd-de',
    name: { value: '1 Serif' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          y: 0
        },
        {
          letter: 'C',
          x1: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          y1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  FontPathWidth,
                  FontHorizontalSerifWidth
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
                  FontPathWidth,
                  FontHorizontalSerifWidth
                ]
              }
            ]
          },
          y2: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              FontHorizontalSerifWidth
            ]
          },
          y1: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          x2: FontHorizontalSerifWidth,
          y2: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  FontHorizontalSerifWidth
                ]
              }
            ]
          },
          x: FontHorizontalSerifWidth,
          y: FontPathWidth
        },
        {
          letter: 'L',
          x: FontHorizontalSerifWidth,
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
    id: 'f-ef',
    name: { value: '1 Bar' },
    path: {
      commands: [
        {
          letter: 'M',
          x: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          y: 0
        },
        {
          letter: 'L',
          x: {
            operator: '+',
            numberInputs: [
              FontPathWidth,
              FontHorizontalSerifWidth
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: FontHorizontalSerifWidth,
          y: 1
        },
        {
          letter: 'L',
          x: FontHorizontalSerifWidth,
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
