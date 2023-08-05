import { Addition, C, Division, L, M, Multiplication, Subtraction, Z } from "./consts";
import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoCircleReference } from "./types/Circle";
import { AsinoClassReference } from "./types/Class";
import { AsinoColorReference } from "./types/Color";
import { AsinoInterfaceReference } from "./types/Interface";
import { AsinoLayer } from "./types/Layer";
import { AsinoLineReference } from "./types/Line";
import { AsinoNumberReference } from "./types/Number";
import { AsinoObjectReference } from "./types/Object";
import { AsinoCommandReference, AsinoPathReference } from "./types/Path";
import { AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSetReference } from "./types/Set";

export interface AsinoPuzzle {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: AsinoInterfaceReference[]; // interfaces
  rectangles?: AsinoRectangleReference[]; // rectangles
  collections?: AsinoCollection[]; // collections
  objects?: AsinoObjectReference[]; // objects
  classes?: AsinoClassReference[]; // classes
  sets?: AsinoSetReference[]; // sets
  lines?: AsinoLineReference[]; // lines
  circles?: AsinoCircleReference[]; // circles
  paths?: AsinoPathReference[]; // paths
  numbers?: AsinoNumberReference[]; // numbers
  booleans?: AsinoBooleanReference[] // booleans
  colors?: AsinoColorReference[]; // colors
  commands?: AsinoCommandReference[]; // commands
  dateCreated?: string;
  dateUpdated?: string;
}

export interface AsinoCollection {
  id?: string; // id of this collection
  name?: { value?: string, editedValue?: string }; // name of this collection
  classes?: AsinoClassReference[]; // classes
  objects?: AsinoObjectReference[]; // objects
}

export interface Solution {
  selectedClasses?: { objectId: string, classId: string }[]; // keep track of user selections
}

const FontTop = '1-10';
const FontBottom = '1-11';
const FontRight = '1-14';
const FontLeft = '1-13';
const FontXMiddle = '1-15';
const FontYTop = '1-17';
const FontYMiddle = '1-18';
const FontYBottom = '1-19';
const FontLineWidth = '1-16';
const FontLineHeight = '1-12';
const FontLineHeightHalf = '1-22';
const FontLineHeightQuarter = '1-23';
const MultiplyBy55Percent = '1-20';
const MultiplyBy55PercentInput = '1-21';

export const Test: AsinoPuzzle = {
  title: 'My Test',
  userName: 'Lotographia',
  objects: [
    { id: '4-00', name: { value: 'Object r1c1' } },
    { id: '4-01', name: { value: 'Object r1c2' } },
    { id: '4-02', name: { value: 'Object r1c3' } },
    { id: '4-03', name: { value: 'Object r1c4' } },
    { id: '4-04', name: { value: 'Object r1c5' } },
    { id: '4-05', name: { value: 'Object r1c6' } },
    { id: '4-06', name: { value: 'Object r1c7' } },
    { id: '4-07', name: { value: 'Object r1c8' } },
    { id: '4-08', name: { value: 'Object r1c9' } },
    { id: '4-10', name: { value: 'Object r2c1' } },
    { id: '4-11', name: { value: 'Object r2c2' } },
    { id: '4-12', name: { value: 'Object r2c3' } },
    { id: '4-13', name: { value: 'Object r2c4' } },
    { id: '4-14', name: { value: 'Object r2c5' } },
    { id: '4-15', name: { value: 'Object r2c6' } },
    { id: '4-16', name: { value: 'Object r2c7' } },
    { id: '4-17', name: { value: 'Object r2c8' } },
    { id: '4-18', name: { value: 'Object r2c9' } },
    { id: '4-20', name: { value: 'Object r3c1' } },
    { id: '4-21', name: { value: 'Object r3c2' } },
    { id: '4-22', name: { value: 'Object r3c3' } },
    { id: '4-23', name: { value: 'Object r3c4' } },
    { id: '4-24', name: { value: 'Object r3c5' } },
    { id: '4-25', name: { value: 'Object r3c6' } },
    { id: '4-26', name: { value: 'Object r3c7' } },
    { id: '4-27', name: { value: 'Object r3c8' } },
    { id: '4-28', name: { value: 'Object r3c9' } },
    { id: '4-30', name: { value: 'Object r4c1' } },
    { id: '4-31', name: { value: 'Object r4c2' } },
    { id: '4-32', name: { value: 'Object r4c3' } },
    { id: '4-33', name: { value: 'Object r4c4' } },
    { id: '4-34', name: { value: 'Object r4c5' } },
    { id: '4-35', name: { value: 'Object r4c6' } },
    { id: '4-36', name: { value: 'Object r4c7' } },
    { id: '4-37', name: { value: 'Object r4c8' } },
    { id: '4-38', name: { value: 'Object r4c9' } },
    { id: '4-40', name: { value: 'Object r5c1' } },
    { id: '4-41', name: { value: 'Object r5c2' } },
    { id: '4-42', name: { value: 'Object r5c3' } },
    { id: '4-43', name: { value: 'Object r5c4' } },
    { id: '4-44', name: { value: 'Object r5c5' } },
    { id: '4-45', name: { value: 'Object r5c6' } },
    { id: '4-46', name: { value: 'Object r5c7' } },
    { id: '4-47', name: { value: 'Object r5c8' } },
    { id: '4-48', name: { value: 'Object r5c9' } },
    { id: '4-50', name: { value: 'Object r6c1' } },
    { id: '4-51', name: { value: 'Object r6c2' } },
    { id: '4-52', name: { value: 'Object r6c3' } },
    { id: '4-53', name: { value: 'Object r6c4' } },
    { id: '4-54', name: { value: 'Object r6c5' } },
    { id: '4-55', name: { value: 'Object r6c6' } },
    { id: '4-56', name: { value: 'Object r6c7' } },
    { id: '4-57', name: { value: 'Object r6c8' } },
    { id: '4-58', name: { value: 'Object r6c9' } },
    { id: '4-60', name: { value: 'Object r7c1' } },
    { id: '4-61', name: { value: 'Object r7c2' } },
    { id: '4-62', name: { value: 'Object r7c3' } },
    { id: '4-63', name: { value: 'Object r7c4' } },
    { id: '4-64', name: { value: 'Object r7c5' } },
    { id: '4-65', name: { value: 'Object r7c6' } },
    { id: '4-66', name: { value: 'Object r7c7' } },
    { id: '4-67', name: { value: 'Object r7c8' } },
    { id: '4-68', name: { value: 'Object r7c9' } },
    { id: '4-70', name: { value: 'Object r8c1' } },
    { id: '4-71', name: { value: 'Object r8c2' } },
    { id: '4-72', name: { value: 'Object r8c3' } },
    { id: '4-73', name: { value: 'Object r8c4' }, value: { class: '3-05' } },
    { id: '4-74', name: { value: 'Object r8c5' } },
    { id: '4-75', name: { value: 'Object r8c6' } },
    { id: '4-76', name: { value: 'Object r8c7' } },
    { id: '4-77', name: { value: 'Object r8c8' } },
    { id: '4-78', name: { value: 'Object r8c9' } },
    { id: '4-80', name: { value: 'Object r9c1' } },
    { id: '4-81', name: { value: 'Object r9c2' } },
    { id: '4-82', name: { value: 'Object r9c3' } },
    { id: '4-83', name: { value: 'Object r9c4' } },
    { id: '4-84', name: { value: 'Object r9c5' } },
    { id: '4-85', name: { value: 'Object r9c6' } },
    { id: '4-86', name: { value: 'Object r9c7' } },
    { id: '4-87', name: { value: 'Object r9c8' } },
    { id: '4-88', name: { value: 'Object r9c9' }, value: { class: '3-08' } },
    { id: '4-000', name: { value: 'Is Each Object Input' } }
  ],
  classes: [
    {
      id: '3-00',
      name: { value: '1' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: { operator: Subtraction, numberInputs: [FontXMiddle, { operator: Division, numberInputs: [FontLineWidth, 2] }] },
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: { operator: Addition, numberInputs: [FontXMiddle, { operator: Division, numberInputs: [FontLineWidth, 2] }] },
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: { operator: Addition, numberInputs: [FontXMiddle, { operator: Division, numberInputs: [FontLineWidth, 2] }] },
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: { operator: Subtraction, numberInputs: [FontXMiddle, { operator: Division, numberInputs: [FontLineWidth, 2] }] },
                    y: FontBottom
                  },
                  { letter: Z }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                }
              }
            }
          }
        ]
      }
    },
    {
      id: '3-01',
      name: { value: '2' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontTop
                  },
                  {
                    letter: C,
                    x1: {
                      operator: Addition, numberInputs: [FontXMiddle, {
                        id: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, value: { operator: Subtraction, numberInputs: [FontRight, FontXMiddle] } }
                        ]
                      }]
                    },
                    y1: FontTop,
                    x2: FontRight,
                    y2: {
                      operator: Subtraction,
                      numberInputs: [{ operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] },
                      {
                        id: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, value: {
                              operator: Subtraction, numberInputs: [{
                                operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter]
                              }, FontTop]
                            }
                          }
                        ]
                      }]
                    },
                    x: FontRight,
                    y: { operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] }
                  },
                  {
                    letter: C,
                    x1: FontRight,
                    y1: {
                      operator: Addition,
                      numberInputs: [{ operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] },
                      {
                        id: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, value: {
                              operator: Subtraction,
                              numberInputs: [{
                                operator: Addition,
                                numberInputs: [FontYMiddle,
                                  FontLineHeightHalf]
                              },
                              {
                                operator: Addition,
                                numberInputs: [FontYTop,
                                  FontLineHeightQuarter]
                              }]
                            }
                          }
                        ]
                      }]
                    },
                    x2: {
                      operator: Addition, numberInputs: [FontXMiddle, {
                        id: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, value: { operator: Subtraction, numberInputs: [FontRight, FontXMiddle] } }
                        ]
                      }]
                    },
                    y2: {
                      operator: Addition, numberInputs: [FontYMiddle, FontLineHeightHalf]
                    },
                    x: FontXMiddle,
                    y: {
                      operator: Addition, numberInputs: [FontYMiddle, FontLineHeightHalf]
                    }
                  },
                  { letter: L, x: { operator: Addition, numberInputs: [FontLeft, FontLineWidth] }, y: FontYBottom },
                  { letter: L, x: { operator: Addition, numberInputs: [FontLeft, FontLineWidth] }, y: { operator: Subtraction, numberInputs: [FontBottom, FontLineHeight] } },
                  { letter: L, x: FontRight, y: { operator: Subtraction, numberInputs: [FontBottom, FontLineHeight] } },
                  { letter: L, x: FontRight, y: FontBottom },
                  { letter: L, x: FontLeft, y: FontBottom },
                  { letter: L, x: FontLeft, y: FontYBottom },
                  { letter: L, x: FontXMiddle, y: { operator: Subtraction, numberInputs: [FontYMiddle, FontLineHeightHalf] } },
                  { letter: L, x: { operator: Subtraction, numberInputs: [FontRight, FontLineWidth] }, y: { operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] } },
                  { letter: L, x: FontXMiddle, y: { operator: Addition, numberInputs: [FontTop, FontLineHeight] } },
                  { letter: L, x: FontLeft, y: { operator: Addition, numberInputs: [FontTop, FontLineHeight] } },
                  { letter: Z }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-02',
      name: { value: '3' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontTop
                  },
                  {
                    letter: C,
                    x1: {
                      operator: Addition, numberInputs: [FontXMiddle, {
                        id: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, value: { operator: Subtraction, numberInputs: [FontRight, FontXMiddle] } }
                        ]
                      }]
                    },
                    y1: FontTop,
                    x2: FontRight,
                    y2: {
                      operator: Subtraction,
                      numberInputs: [{ operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] },
                      {
                        id: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, value: {
                              operator: Subtraction, numberInputs: [{
                                operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter]
                              }, FontTop]
                            }
                          }
                        ]
                      }]
                    },
                    x: FontRight,
                    y: { operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] }
                  },
                  {
                    letter: C,
                    x1: FontRight,
                    y1: {
                      operator: Addition,
                      numberInputs: [{ operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] },
                      {
                        id: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, value: {
                              operator: Subtraction,
                              numberInputs: [{
                                operator: Addition,
                                numberInputs: [FontYMiddle,
                                  FontLineHeightHalf]
                              },
                              {
                                operator: Addition,
                                numberInputs: [FontYTop,
                                  FontLineHeightQuarter]
                              }]
                            }
                          }
                        ]
                      }]
                    },
                    x2: {
                      operator: Addition, numberInputs: [FontXMiddle, {
                        id: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, value: { operator: Subtraction, numberInputs: [FontRight, FontXMiddle] } }
                        ]
                      }]
                    },
                    y2: {
                      operator: Addition, numberInputs: [FontYMiddle, FontLineHeightHalf]
                    },
                    x: FontXMiddle,
                    y: {
                      operator: Addition, numberInputs: [FontYMiddle, FontLineHeightHalf]
                    }
                  },
                  { letter: L, x: FontLeft, y: { operator: Addition, numberInputs: [FontYMiddle, FontLineHeightHalf] } },
                  { letter: L, x: FontLeft, y: { operator: Subtraction, numberInputs: [FontYMiddle, FontLineHeightHalf] } },
                  { letter: L, x: FontXMiddle, y: { operator: Subtraction, numberInputs: [FontYMiddle, FontLineHeightHalf] } },
                  { letter: L, x: { operator: Subtraction, numberInputs: [FontRight, FontLineWidth] }, y: { operator: Addition, numberInputs: [FontYTop, FontLineHeightQuarter] } },
                  { letter: L, x: FontXMiddle, y: { operator: Addition, numberInputs: [FontTop, FontLineHeight] } },
                  { letter: L, x: FontLeft, y: { operator: Addition, numberInputs: [FontTop, FontLineHeight] } },
                  { letter: Z }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          },
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontYMiddle
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYBottom
                  },
                  { letter: Z }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-03',
      name: { value: '4' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontBottom
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-04',
      name: { value: '5' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontYMiddle
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-05',
      name: { value: '6' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontRight,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYMiddle
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-06',
      name: { value: '7' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontLeft,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-07',
      name: { value: '8' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontXMiddle,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYTop
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontYTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-08',
      name: { value: '9' },
      value: {
        layers: [
          {
            path: {
              value: {
                commands: [
                  {
                    letter: M,
                    x: FontXMiddle,
                    y: FontTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontYTop
                  },
                  {
                    letter: L,
                    x: FontRight,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontBottom
                  },
                  {
                    letter: L,
                    x: FontXMiddle,
                    y: FontYBottom
                  },
                  {
                    letter: L,
                    x: FontLeft,
                    y: FontYMiddle
                  },
                  {
                    letter: Z
                  }
                ],
                fill: {
                  operator: 'IF_ELSE',
                  booleanInputs: ['8-00'],
                  colorInputs: ['6-00', '6-01']
                },
                stroke: 'none'
              }
            }
          }
        ]
      }
    },
    {
      id: '3-09',
      name: { value: 'Object class' }
    }
  ],
  collections: [
    {
      id: '5-00',
      name: { value: 'numbers' },
      classes: [
        { id: '3-00' },
        { id: '3-01' },
        { id: '3-02' },
        { id: '3-03' },
        { id: '3-04' },
        { id: '3-05' },
        { id: '3-06' },
        { id: '3-07' },
        { id: '3-08' }
      ]
    }
  ],
  layers: [
    { collectionId: '5-00', objectId: '4-00', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-01', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-02', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-03', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-04', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-05', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-06', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-07', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-08', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 0 }] } },
    { collectionId: '5-00', objectId: '4-10', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-11', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-12', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-13', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-14', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-15', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-16', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-17', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-18', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 1 }] } },
    { collectionId: '5-00', objectId: '4-20', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-21', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-22', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-23', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-24', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-25', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-26', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-27', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-28', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 2 }] } },
    { collectionId: '5-00', objectId: '4-30', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-31', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-32', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-33', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-34', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-35', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-36', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-37', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-38', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 3 }] } },
    { collectionId: '5-00', objectId: '4-40', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-41', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-42', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-43', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-44', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-45', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-46', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-47', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-48', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 4 }] } },
    { collectionId: '5-00', objectId: '4-50', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-51', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-52', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-53', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-54', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-55', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-56', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-57', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-58', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 5 }] } },
    { collectionId: '5-00', objectId: '4-60', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-61', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-62', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-63', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-64', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-65', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-66', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-67', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-68', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 6 }] } },
    { collectionId: '5-00', objectId: '4-70', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-71', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-72', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-73', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-74', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-75', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-76', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-77', interface: { id: '0-00', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-78', interface: { id: '0-00', numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 7 }] } },
    { collectionId: '5-00', objectId: '4-80', interface: { id: '0-00', numbers: [{ id: '1-07', value: 0 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-81', interface: { id: '0-00', numbers: [{ id: '1-07', value: 1 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-82', interface: { id: '0-00', numbers: [{ id: '1-07', value: 2 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-83', interface: { id: '0-00', numbers: [{ id: '1-07', value: 3 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-84', interface: { id: '0-00', numbers: [{ id: '1-07', value: 4 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-85', interface: { id: '0-00', numbers: [{ id: '1-07', value: 5 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-86', interface: { id: '0-00', numbers: [{ id: '1-07', value: 6 }, { id: '1-08', value: 8 }] } },
    { interface: { id: '0-01', numbers: [{ id: '1-07', value: 7 }, { id: '1-08', value: 8 }] } },
    { collectionId: '5-00', objectId: '4-88', interface: { id: '0-00' }, numbers: [{ id: '1-07', value: 8 }, { id: '1-08', value: 8 }] },
    { line: { id: '2-00' } },
    { line: { id: '2-01', value: { stroke: '6-00' } } },
    { line: { id: '2-02' } },
    { line: { id: '2-03' } }
  ],
  colors: [
    {
      id: '6-00',
      name: { value: 'Color' },
      value: 'var(--color)'
    },
    {
      id: '6-01',
      name: { value: 'Color' },
      value: 'var(--failure)'
    }
  ],
  interfaces: [
    {
      id: '0-00',
      name: { value: 'Template' },
      value: {
        x: { id: '1-06', numbers: [{ id: '1-09', value: '1-07' }] },
        y: { id: '1-06', numbers: [{ id: '1-09', value: '1-08' }] }
      }
    },
    {
      id: '0-01',
      name: { value: 'Interface r9c8' },
      value: {
        collectionId: '5-00',
        objectId: '4-87',
        x: { id: '1-06', numbers: [{ id: '1-09', value: '1-07' }] },
        y: { id: '1-06', numbers: [{ id: '1-09', value: '1-08' }] }
      }
    }
  ],
  booleans: [
    {
      id: '8-00', name: { value: 'Is each class unique in each set containing this object' }, value: {
        operator: 'IS_OBJECT',
        objectOutput: '4-000',
        boolean: {
          operator: 'IS_EACH_SET',
          setsInputs: [
            {
              operator: 'SETS_CONTAINING_OBJECT'
            }
          ],
          boolean: {
            operator: 'IS_EACH_OBJECT',
            objectsInputs: [
              {
                operator: '-',
                objectsInputs: [
                  {
                    operator: 'OBJECTS_IN_SET'
                  },
                  [
                    '4-000'
                  ]
                ]
              }
            ],
            boolean: {
              operator: 'IS_OBJECT_CLASS',
              classOutput: '3-09',
              boolean: {
                operator: 'IS_EACH_CLASS_DIFFERENT',
                classesInputs: [
                  [
                    '3-09',
                    {
                      operator: 'CLASS_OF_OBJECT',
                      objectInputs: ['4-000']
                    }
                  ]
                ]
              }
            }
          }
        }
      }
    }
  ],
  numbers: [
    { id: '1-00', name: { value: 'Interface Width' }, value: { numerator: 1, denominator: 9 } },
    { id: '1-01', name: { value: 'Interface Height' }, value: { numerator: 1, denominator: 9 } },
    { id: '1-02', name: { value: '2/3' }, value: { numerator: 2, denominator: 3 } },
    { id: '1-03', name: { value: '0' }, value: 0 },
    { id: '1-04', name: { value: '1' }, value: 1 },
    { id: '1-05', name: { value: '1/100' }, value: { numerator: 1, denominator: 100 } },
    {
      id: '1-06', name: { value: 'Input Multiplied By 1/9' }, value: {
        operator: Multiplication,
        numberInputs: ['1-09', { value: { numerator: 1, denominator: 9 } }]
      }
    },
    { id: '1-07', name: { value: 'X Position' }, value: 0 },
    { id: '1-08', name: { value: 'Y Position' }, value: 0 },
    { id: '1-09', name: { value: 'Left Operand for Input Multiplied By 1/9' }, value: 0 },
    { id: FontTop, name: { value: 'Font Top' }, value: { numerator: 2, denominator: 9 } },
    { id: FontBottom, name: { value: 'Font Bottom' }, value: { numerator: 7, denominator: 9 } },
    { id: FontLineHeight, name: { value: 'Font Line Height' }, value: { numerator: 2, denominator: 27 } },
    { id: FontLeft, name: { value: 'Font Left' }, value: { numerator: 3, denominator: 9 } },
    { id: FontRight, name: { value: 'Font Right' }, value: { numerator: 6, denominator: 9 } },
    { id: FontXMiddle, name: { value: 'Font X Middle' }, value: { numerator: 1, denominator: 2 } },
    { id: FontLineWidth, name: { value: 'Font Line Width' }, value: { numerator: 2, denominator: 27 } },
    { id: FontYTop, name: { value: 'Font Y Top' }, value: { numerator: 13, denominator: 36 } },
    { id: FontYMiddle, name: { value: 'Font Y Middle' }, value: { numerator: 1, denominator: 2 } },
    { id: FontYBottom, name: { value: 'Font Y Bottom' }, value: { numerator: 23, denominator: 36 } },
    {
      id: MultiplyBy55Percent, name: { value: '55% of' }, value: {
        operator: Multiplication,
        numberInputs: [{ value: { numerator: 11, denominator: 20 } }, MultiplyBy55PercentInput]
      }
    },
    { id: MultiplyBy55PercentInput, name: { value: '55% of default' }, value: 1 },
    {
      id: FontLineHeightHalf, name: { value: 'Font Line Height Half' }, value: {
        operator: Division,
        numberInputs: [FontLineHeight, { value: 2 }]
      }
    },
    {
      id: FontLineHeightQuarter, name: { value: 'Font Line Height Quarter' }, value: {
        operator: Division,
        numberInputs: [FontLineHeightHalf, { value: 2 }]
      }
    }
  ],
  lines: [
    { id: '2-00', name: { value: 'Vertical Border 1' }, value: { x1: { value: { numerator: 1, denominator: 3 } }, x2: { value: { numerator: 1, denominator: 3 } }, y1: { value: 0 }, y2: { value: 1 }, stroke: { id: '6-00' }, strokeWidth: '1-05' } },
    { id: '2-01', name: { value: 'Vertical Border 2' }, value: { x1: '1-02', x2: '1-02', y1: '1-03', y2: '1-04', strokeWidth: '1-05' } },
    { id: '2-02', name: { value: 'Horizontal Border 1' }, value: { x1: { value: 0 }, x2: { value: 1 }, y1: { value: { numerator: 1, denominator: 3 } }, y2: { value: { numerator: 1, denominator: 3 } }, stroke: '6-00', strokeWidth: '1-05' } },
    { id: '2-03', name: { value: 'Horizontal Border 2' }, value: { x1: { value: 0 }, x2: { value: 1 }, y1: { value: { numerator: 2, denominator: 3 } }, y2: { value: { numerator: 2, denominator: 3 } }, stroke: '6-00', strokeWidth: '1-05' } }
  ],
  sets: [
    { id: '7-00', name: { value: 'r1' }, value: { objects: ['4-00', '4-01', '4-02', '4-03', '4-04', '4-05', '4-06', '4-07', '4-08'] } },
    { id: '7-01', name: { value: 'r2' }, value: { objects: ['4-10', '4-11', '4-12', '4-13', '4-14', '4-15', '4-16', '4-17', '4-18'] } },
    { id: '7-02', name: { value: 'r3' }, value: { objects: ['4-20', '4-21', '4-22', '4-23', '4-24', '4-25', '4-26', '4-27', '4-28'] } },
    { id: '7-03', name: { value: 'r4' }, value: { objects: ['4-30', '4-31', '4-32', '4-33', '4-34', '4-35', '4-36', '4-37', '4-38'] } },
    { id: '7-04', name: { value: 'r5' }, value: { objects: ['4-40', '4-41', '4-42', '4-43', '4-44', '4-45', '4-46', '4-47', '4-48'] } },
    { id: '7-05', name: { value: 'r6' }, value: { objects: ['4-50', '4-51', '4-52', '4-53', '4-54', '4-55', '4-56', '4-57', '4-58'] } },
    { id: '7-06', name: { value: 'r7' }, value: { objects: ['4-60', '4-61', '4-62', '4-63', '4-64', '4-65', '4-66', '4-67', '4-68'] } },
    { id: '7-07', name: { value: 'r8' }, value: { objects: ['4-70', '4-71', '4-72', '4-73', '4-74', '4-75', '4-76', '4-77', '4-78'] } },
    { id: '7-08', name: { value: 'r9' }, value: { objects: ['4-80', '4-81', '4-82', '4-83', '4-84', '4-85', '4-86', '4-87', '4-88'] } },
    { id: '7-09', name: { value: 'c1' }, value: { objects: ['4-00', '4-10', '4-20', '4-30', '4-40', '4-50', '4-60', '4-70', '4-80'] } },
    { id: '7-10', name: { value: 'c2' }, value: { objects: ['4-01', '4-11', '4-21', '4-31', '4-41', '4-51', '4-61', '4-71', '4-81'] } },
    { id: '7-11', name: { value: 'c3' }, value: { objects: ['4-02', '4-12', '4-22', '4-32', '4-42', '4-52', '4-62', '4-72', '4-82'] } },
    { id: '7-12', name: { value: 'c4' }, value: { objects: ['4-03', '4-13', '4-23', '4-33', '4-43', '4-53', '4-63', '4-73', '4-83'] } },
    { id: '7-13', name: { value: 'c5' }, value: { objects: ['4-04', '4-14', '4-24', '4-34', '4-44', '4-54', '4-64', '4-74', '4-84'] } },
    { id: '7-14', name: { value: 'c6' }, value: { objects: ['4-05', '4-15', '4-25', '4-35', '4-45', '4-55', '4-65', '4-75', '4-85'] } },
    { id: '7-15', name: { value: 'c7' }, value: { objects: ['4-06', '4-16', '4-26', '4-36', '4-46', '4-56', '4-66', '4-76', '4-86'] } },
    { id: '7-16', name: { value: 'c8' }, value: { objects: ['4-07', '4-17', '4-27', '4-37', '4-47', '4-57', '4-67', '4-77', '4-87'] } },
    { id: '7-17', name: { value: '' }, value: { objects: ['4-00', '4-01', '4-02', '4-10', '4-11', '4-12', '4-20', '4-21', '4-22'] } },
    { id: '7-18', name: { value: '' }, value: { objects: ['4-03', '4-04', '4-05', '4-13', '4-14', '4-15', '4-23', '4-24', '4-25'] } },
    { id: '7-19', name: { value: '' }, value: { objects: ['4-06', '4-07', '4-08', '4-16', '4-17', '4-18', '4-26', '4-27', '4-28'] } },
    { id: '7-20', name: { value: '' }, value: { objects: ['4-30', '4-31', '4-32', '4-40', '4-41', '4-42', '4-50', '4-51', '4-52'] } },
    { id: '7-21', name: { value: '' }, value: { objects: ['4-33', '4-34', '4-35', '4-43', '4-44', '4-45', '4-53', '4-54', '4-55'] } },
    { id: '7-22', name: { value: '' }, value: { objects: ['4-36', '4-37', '4-38', '4-46', '4-47', '4-48', '4-56', '4-57', '4-58'] } },
    { id: '7-23', name: { value: '' }, value: { objects: ['4-60', '4-61', '4-62', '4-70', '4-71', '4-72', '4-80', '4-81', '4-82'] } },
    { id: '7-24', name: { value: '' }, value: { objects: ['4-63', '4-64', '4-65', '4-73', '4-74', '4-75', '4-83', '4-84', '4-85'] } },
    { id: '7-25', name: { value: '' }, value: { objects: ['4-66', '4-67', '4-68', '4-76', '4-77', '4-78', '4-86', '4-87', '4-88'] } }
  ],
}
