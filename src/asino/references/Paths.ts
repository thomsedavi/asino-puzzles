import { PathSize, CurveFraction, Color, FontSizeHorizontal2, FontSizeVertical1, FontCurveVertical1, FontSizeHorizontal1, FontCurveHorizontal1, FontLengthHorizontal, FontLengthVertical1, FontCurveVertical2, FontCurveHorizontal2, FontSizeVertical2, FontCurveVertical3, FontLengthVertical2 } from "../consts";
import { AsinoPathReference } from "../types/Path";

export const systemPathDefaults: { [id: string]: AsinoPathReference; } = {
  'd-de': {
    name: { value: '1' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { numberId: FontSizeHorizontal2 },
              dy: { number: { value: 0 } }
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
        fill: { colorId: Color }
      }
    }
  },
  'f-ba': {
    name: { value: '2' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { number: { value: 0 } },
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-cd': {
    name: { value: '3a' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { number: { value: 0 } },
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
        fill: { colorId: Color }
      }
    }
  },
  'e-ba': {
    name: { value: '3b' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeHorizontal1 },
                    { numberId: FontCurveHorizontal1 },
                    { numberId: FontLengthHorizontal }
                  ]
                }
              },
              dy: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeVertical1 },
                    { numberId: FontCurveVertical1 },
                    { numberId: FontLengthVertical1 },
                    { numberId: FontCurveVertical2 }
                  ]
                }
              }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'c-bc': {
    name: { value: '4' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { numberId: FontSizeHorizontal1 },
              dy: { number: { value: 0 } }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-cf': {
    name: { value: '5' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeHorizontal1 },
                    { numberId: FontCurveHorizontal1 },
                    { numberId: FontLengthHorizontal },
                    { numberId: FontCurveHorizontal2 },
                    { numberId: FontSizeHorizontal2 }
                  ]
                }
              },
              dy: { numberId: FontSizeVertical1 }
            }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'e-ca': {
    name: { value: '6' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeHorizontal1 },
                    { numberId: FontCurveHorizontal1 },
                    { numberId: FontLengthHorizontal },
                    { numberId: FontCurveHorizontal2 }
                  ]
                }
              },
              dy: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    { numberId: FontSizeVertical1 },
                    { numberId: FontCurveHorizontal1 }
                  ]
                }
              }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-ec': {
    name: { value: '7' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { number: { value: 0 } },
              dy: { number: { value: 0 } }
            }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'c-ab': {
    name: { value: '8a' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { number: { value: 0 } },
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'b-be': {
    name: { value: '8b' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { number: { value: 0 } },
              dy: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeVertical1 },
                    { numberId: FontCurveVertical1 },
                    { numberId: FontLengthVertical1 },
                    { numberId: FontCurveVertical2 },
                    { numberId: FontSizeVertical2 },
                    { numberId: FontCurveVertical3 }
                  ]
                }
              }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-db': {
    name: { value: '9' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'm',
              dx: { numberId: FontSizeHorizontal1 },
              dy: {
                formula: {
                  operator: 'TOTAL',
                  numberInputs: [
                    { numberId: FontSizeVertical1 },
                    { numberId: FontCurveVertical1 },
                    { numberId: FontLengthVertical1 },
                    { numberId: FontCurveVertical2 },
                    { numberId: FontSizeVertical2 },
                    { numberId: FontCurveVertical3 },
                    { numberId: FontLengthVertical2 }
                  ]
                }
              }
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
            command: {
              letter: 'z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-ee': {
    name: { value: 'Curve Right To Bottom' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      },
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '-',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  },
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '-',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'L',
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '+',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '+',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'f-eb': {
    name: { value: 'Curve Left To Top' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '+',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '+',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'L',
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '-',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '-',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'b-ff': {
    name: { value: 'Curve Top To Right' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '-',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '-',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'L',
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '+',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '+',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'c-fb': {
    name: { value: 'Curve Right To Left' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'L',
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'L',
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'L',
              x: { number: { value: 1 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'a-ee': {
    name: { value: 'Curve Top To Bottom' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'L',
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 0 } }
            }
          },
          {
            command: {
              letter: 'L',
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'L',
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  },
  'b-bc': {
    name: { value: 'Curve Bottom To Left' },
    value: {
      path: {
        commands: [
          {
            command: {
              letter: 'M',
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '+',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '+',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'L',
              x: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y: { number: { value: 1 } }
            }
          },
          {
            command: {
              letter: 'C',
              x1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              y1: {
                formula: {
                  operator: '-',
                  numberInputs: [
                    { number: { value: 1 } },
                    {
                      formula: {
                        operator: '*',
                        numberInputs: [
                          { numberId: CurveFraction },
                          {
                            formula: {
                              operator: '-',
                              numberInputs: [
                                {
                                  fraction: {
                                    numerator: { number: { value: 1 } },
                                    denominator: { number: { value: 2 } }
                                  }
                                },
                                {
                                  formula: {
                                    operator: '/',
                                    numberInputs: [
                                      { numberId: PathSize },
                                      { number: { value: 2 } }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              x2: {
                formula: {
                  operator: '*',
                  numberInputs: [
                    { numberId: CurveFraction },
                    {
                      formula: {
                        operator: '-',
                        numberInputs: [
                          {
                            fraction: {
                              numerator: { number: { value: 1 } },
                              denominator: { number: { value: 2 } }
                            }
                          },
                          {
                            formula: {
                              operator: '/',
                              numberInputs: [
                                { numberId: PathSize },
                                { number: { value: 2 } }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              y2: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              },
              x: { number: { value: 0 } },
              y: {
                formula: {
                  operator: '+',
                  numberInputs: [
                    {
                      fraction: {
                        numerator: { number: { value: 1 } },
                        denominator: { number: { value: 2 } }
                      }
                    },
                    {
                      formula: {
                        operator: '/',
                        numberInputs: [
                          { numberId: PathSize },
                          { number: { value: 2 } }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            command: {
              letter: 'Z'
            }
          }
        ],
        fill: { colorId: Color }
      }
    }
  }
}
