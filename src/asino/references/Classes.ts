import { FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLengthHorizontal, FontLengthVertical1, FontLengthVertical2, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical1, FontSizeVertical2, FontSizeVertical3 } from "../consts";
import { AsinoClassReference } from "../types/Class";

export const systemClassDefaults: { [id: string]: AsinoClassReference; } = {
  'e-af': {
    name: { value: 'Curve Right To Bottom And Left To Top' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-ee'
          },
          {
            pathId: 'f-eb'
          }
        ]
      }
    }
  },
  'b-dd': {
    name: { value: 'Curve Right To Bottom' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-ee'
          }
        ]
      }
    }
  },
  'e-be': {
    name: { value: 'Curve Left To Top' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-eb'
          }
        ]
      }
    }
  },
  'd-ab': {
    name: { value: 'Curve Top To Right And Bottom To Left' },
    value: {
      class: {
        layers: [
          {
            pathId: 'b-ff'
          },
          {
            pathId: 'b-bc'
          }
        ]
      }
    }
  },
  'e-cd': {
    name: { value: 'Curve Top To Bottom And Right To Left' },
    value: {
      class: {
        layers: [
          {
            pathId: 'c-fb'
          },
          {
            pathId: 'a-ee'
          }
        ]
      }
    }
  },
  'e-da': {
    name: { value: 'Curve Right To Left' },
    value: {
      class: {
        layers: [
          {
            pathId: 'c-fb'
          }
        ]
      }
    }
  },
  'a-cf': {
    name: { value: 'Curve Top To Right' },
    value: {
      class: {
        layers: [
          {
            pathId: 'b-ff'
          }
        ]
      }
    }
  },
  'a-df': {
    name: { value: 'Curve Bottom To Left' },
    value: {
      class: {
        layers: [
          {
            pathId: 'b-bc'
          }
        ]
      }
    }
  },
  'd-ce': {
    name: { value: 'Curve Top To Bottom' },
    value: {
      class: {
        layers: [
          {
            pathId: 'a-ee'
          }
        ]
      }
    }
  },
  'b-de': {
    name: { value: '1' },
    value: {
      class: {
        layers: [
          {
            pathId: 'd-de'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: { numberId: FontSizeHorizontal1 },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'f-de': {
    name: { value: '2' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-ba'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'e-eb': {
    name: { value: '3' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-cd'
          },
          {
            pathId: 'e-ba'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'a-ae': {
    name: { value: '4' },
    value: {
      class: {
        layers: [
          {
            pathId: 'c-bc'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'c-ee': {
    name: { value: '5' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-cf'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'd-df': {
    name: { value: '6' },
    value: {
      class: {
        layers: [
          {
            pathId: 'e-ca'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'f-ce': {
    name: { value: '7' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-ec'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'f-ed': {
    name: { value: '8' },
    value: {
      class: {
        layers: [
          {
            pathId: 'c-ab'
          },
          {
            pathId: 'b-be'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  },
  'e-ff': {
    name: { value: '9' },
    value: {
      class: {
        layers: [
          {
            pathId: 'f-db'
          }
        ],
        viewBox: {
          minX: { integer: { value: 0 } },
          minY: { integer: { value: 0 } },
          width: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
                { numberId: FontSizeHorizontal1 },
                { numberId: FontSizeHorizontal2 },
                { numberId: FontCurveHorizontal1 },
                { numberId: FontCurveHorizontal2 },
                { numberId: FontLengthHorizontal }
              ]
            }
          },
          height: {
            formula: {
              operator: 'TOTAL',
              numberInputs: [
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
    }
  }
}
