import { Addition, C, CX, CXId, CY, CYId, DX, DX1, DX1Id, DX2, DX2Id, DXId, DY, DY1, DY1Id, DY2, DY2Id, DYId, Division, Fill, Height, HeightId, L, M, Multiplication, R, RId, Stroke, StrokeWidth, StrokeWidthId, Subtraction, Width, WidthId, X, X1, X1Id, X2, X2Id, XId, Y, Y1, Y1Id, Y2, Y2Id, YId, Z } from "./consts";
import { Operator, Number, Letter } from "./types";
import { getNumberFromId, getProduct, getSum } from "./utils";

export interface AsinoPuzzle {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: AsinoInterface[]; // interfaces
  rectangles?: AsinoRectangle[]; // rectangles
  collections?: AsinoCollection[]; // collections
  lines?: AsinoLine[]; // shapes
  circles?: AsinoCircle[]; // circles
  paths?: AsinoPath[]; // circle
  numbers?: AsinoNumber[]; // numbers
  defaults?: { // should this be called 'settings'?
    interfaceWidthValue?: AsinoNumber; // default width of interface, or use default of 1/9
    interfaceHeightValue?: AsinoNumber; // default height of interface, or use default of 1/9
    [StrokeWidth]?: AsinoNumber; // default width of stroke, or use default of 1/200
  }
  dateCreated?: string;
  dateUpdated?: string;
}

export interface AsinoObject {
  id?: string; // id of this object
  name?: string; // name of this object
}

export interface AsinoCollection {
  id?: string; // id of this collection
  name?: string; // name of this collection
  classes?: AsinoClass[]; // classes
  objects?: AsinoObject[]; // objects
}

export interface AsinoClass {
  id?: string; // id of this class
  name?: string; // name of this class
  layers?: AsinoLayer[]; // layers to draw this class
}

export interface AsinoLayer {
  interfaceId?: string; // draw the interface with this id
  rectangleId?: string; // draw the rectangle with this id
  lineId?: string; // draw the shape with this id
  circleId?: string; // draw the circle with this id
  pathId?: string; // draw the path with this id
  interface?: AsinoInterface; // draw the interface with these attributes
  rectangle?: AsinoRectangle; // draw the rectangle with these attributes
  line?: AsinoLine; // draw the layer with these attributes
  circle?: AsinoCircle; // draw the circle with these attributes
  path?: AsinoPath; // draw the path with these attributes
  numbers?: AsinoNumber[] // number parameters
  objectId?: string; // id of the interface of this layer
  collectionId?: string; // id of collection of this layer
}

export type AsinoInterface = {
  id?: string; // id of this interface
  name?: string; // name of this interface
  objectId?: string; // id of the object for this interface
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide, or...
  [WidthId]?: string; // if this exists, draw the interface as wide as this number, or use default interface width
  [Height]?: AsinoNumber; // if this exists, draw the interface this high, or...
  [HeightId]?: string; // if this exists, draw the interface as high as this number, or use default interface height
  [X]?: AsinoNumber; // if this exists, draw the interface here, or...
  [XId]?: string; // if this exists, draw the interface at this number, or use default of 0
  [Y]?: AsinoNumber; // if this exists, draw the interface here, or...
  [YId]?: string; // if this exists, draw the interface at this number, or use default of 0
  numbers?: AsinoNumber[] // number parameters
  collectionId?: string; // id of collection of this layer
}

export interface AsinoRectangle {
  id?: string; // id of this rectangle
  [Width]?: AsinoNumber; // if this exists, draw the rectangle this wide, or...
  [WidthId]?: string; // if this exists, draw the rectangle as wide as this number, or use default of 0
  [Height]?: AsinoNumber; // if this exists, draw the rectangle this high, or...
  [HeightId]?: string; // if this exists, draw the rectangle as high as this number, or use default of 0
  [X]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [XId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [YId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
}

export interface AsinoLine {
  id?: string; // id of this line
  name?: string; // name of this line
  [X1]?: AsinoNumber; // if this exists, draw x1 here, or...
  [X1Id]?: string; // if this exists, draw x1 at this number, or use default of 0
  [X2]?: AsinoNumber; // if this exists, draw x2 here, or...
  [X2Id]?: string; // if this exists, draw x2 at this number, or use default of 0
  [Y1]?: AsinoNumber; // if this exists, draw y1 here, or...
  [Y1Id]?: string; // if this exists, draw y1 at this number, or use default of 0
  [Y2]?: AsinoNumber; // if this exists, draw y2 here, or...
  [Y2Id]?: string; // if this exists, draw y2 at this number, or use default of 0
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width, or...
  [StrokeWidthId]?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoCircle {
  id?: string; // id of this line
  name?: string; // name of this line
  [CX]?: AsinoNumber; // if this exists, draw cx here, or...
  [CXId]?: string; // if this exists, draw cx at this number, or use default of 0
  [CY]?: AsinoNumber; // if this exists, draw cy here, or...
  [CYId]?: string; // if this exists, draw cy at this number, or use default of 0
  [R]?: AsinoNumber; // if this exists, draw r here, or...
  [RId]?: string; // if this exists, draw r at this number, or use default of 0
}

export interface AsinoPath {
  id?: string; // id of this path
  name?: string; // name of this path
  commands?: AsinoCommand[]; // list of commands
  [Fill]?: string; // the fill for this path
  [Stroke]?: string; // the stroke for this path
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width, or...
  [StrokeWidthId]?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoCommand {
  letter?: Letter;
  [X]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [XId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [X1]?: AsinoNumber; // if this exists, draw x1 here, or...
  [X1Id]?: string; // if this exists, draw x1 at this number, or use default of 0
  [X2]?: AsinoNumber; // if this exists, draw x2 here, or...
  [X2Id]?: string; // if this exists, draw x2 at this number, or use default of 0
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [YId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [Y1]?: AsinoNumber; // if this exists, draw y1 here, or...
  [Y1Id]?: string; // if this exists, draw y1 at this number, or use default of 0
  [Y2]?: AsinoNumber; // if this exists, draw y2 here, or...
  [Y2Id]?: string; // if this exists, draw y2 at this number, or use default of 0
  [DX]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DXId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [DX1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX1Id]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [DX2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX2Id]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [DY]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DYId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [DY1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY1Id]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [DY2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY2Id]?: string; // if this exists, draw the rectangle at this number, or use default of 0
}

export interface AsinoNumber {
  id?: string; // id of this number
  name?: string; // name of this number
  number?: Number; // value of this number
  numberId?: string; // find the number with this id in the list of numbers
  operator?: Operator; // formula for this number
  operandLeft?: AsinoNumber; // if this exists, use this as left operand, or...
  operandLeftId?: string; // if this exists, use this as left operand, or use default of 0
  operandRight?: AsinoNumber; // if this exists, use this as right operand, or...
  operandRightId?: string; // if this exists, use this as right operand, or default to 0
  numbers?: AsinoNumber[] // parameters
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
  collections: [
    {
      id: '5-00',
      name: 'numbers',
      objects: [
        { id: '4-00', name: 'Object r1c1' },
        { id: '4-01', name: 'Object r1c2' },
        { id: '4-02', name: 'Object r1c3' },
        { id: '4-03', name: 'Object r1c4' },
        { id: '4-04', name: 'Object r1c5' },
        { id: '4-05', name: 'Object r1c6' },
        { id: '4-06', name: 'Object r1c7' },
        { id: '4-07', name: 'Object r1c8' },
        { id: '4-08', name: 'Object r1c9' },
        { id: '4-10', name: 'Object r2c1' },
        { id: '4-11', name: 'Object r2c2' },
        { id: '4-12', name: 'Object r2c3' },
        { id: '4-13', name: 'Object r2c4' },
        { id: '4-14', name: 'Object r2c5' },
        { id: '4-15', name: 'Object r2c6' },
        { id: '4-16', name: 'Object r2c7' },
        { id: '4-17', name: 'Object r2c8' },
        { id: '4-18', name: 'Object r2c9' },
        { id: '4-20', name: 'Object r3c1' },
        { id: '4-21', name: 'Object r3c2' },
        { id: '4-22', name: 'Object r3c3' },
        { id: '4-23', name: 'Object r3c4' },
        { id: '4-24', name: 'Object r3c5' },
        { id: '4-25', name: 'Object r3c6' },
        { id: '4-26', name: 'Object r3c7' },
        { id: '4-27', name: 'Object r3c8' },
        { id: '4-28', name: 'Object r3c9' },
        { id: '4-30', name: 'Object r4c1' },
        { id: '4-31', name: 'Object r4c2' },
        { id: '4-32', name: 'Object r4c3' },
        { id: '4-33', name: 'Object r4c4' },
        { id: '4-34', name: 'Object r4c5' },
        { id: '4-35', name: 'Object r4c6' },
        { id: '4-36', name: 'Object r4c7' },
        { id: '4-37', name: 'Object r4c8' },
        { id: '4-38', name: 'Object r4c9' },
        { id: '4-40', name: 'Object r5c1' },
        { id: '4-41', name: 'Object r5c2' },
        { id: '4-42', name: 'Object r5c3' },
        { id: '4-43', name: 'Object r5c4' },
        { id: '4-44', name: 'Object r5c5' },
        { id: '4-45', name: 'Object r5c6' },
        { id: '4-46', name: 'Object r5c7' },
        { id: '4-47', name: 'Object r5c8' },
        { id: '4-48', name: 'Object r5c9' },
        { id: '4-50', name: 'Object r6c1' },
        { id: '4-51', name: 'Object r6c2' },
        { id: '4-52', name: 'Object r6c3' },
        { id: '4-53', name: 'Object r6c4' },
        { id: '4-54', name: 'Object r6c5' },
        { id: '4-55', name: 'Object r6c6' },
        { id: '4-56', name: 'Object r6c7' },
        { id: '4-57', name: 'Object r6c8' },
        { id: '4-58', name: 'Object r6c9' },
        { id: '4-60', name: 'Object r7c1' },
        { id: '4-61', name: 'Object r7c2' },
        { id: '4-62', name: 'Object r7c3' },
        { id: '4-63', name: 'Object r7c4' },
        { id: '4-64', name: 'Object r7c5' },
        { id: '4-65', name: 'Object r7c6' },
        { id: '4-66', name: 'Object r7c7' },
        { id: '4-67', name: 'Object r7c8' },
        { id: '4-68', name: 'Object r7c9' },
        { id: '4-70', name: 'Object r8c1' },
        { id: '4-71', name: 'Object r8c2' },
        { id: '4-72', name: 'Object r8c3' },
        { id: '4-73', name: 'Object r8c4' },
        { id: '4-74', name: 'Object r8c5' },
        { id: '4-75', name: 'Object r8c6' },
        { id: '4-76', name: 'Object r8c7' },
        { id: '4-77', name: 'Object r8c8' },
        { id: '4-78', name: 'Object r8c9' },
        { id: '4-80', name: 'Object r9c1' },
        { id: '4-81', name: 'Object r9c2' },
        { id: '4-82', name: 'Object r9c3' },
        { id: '4-83', name: 'Object r9c4' },
        { id: '4-84', name: 'Object r9c5' },
        { id: '4-85', name: 'Object r9c6' },
        { id: '4-86', name: 'Object r9c7' },
        { id: '4-87', name: 'Object r9c8' },
        { id: '4-88', name: 'Object r9c9' }
      ],
      classes: [
        {
          id: '3-00',
          name: '1',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    x: { operator: Subtraction, operandLeftId: FontXMiddle, operandRight: { operator: Division, operandLeftId: FontLineWidth, operandRight: { number: 2 } } },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: L,
                    x: { operator: Addition, operandLeftId: FontXMiddle, operandRight: { operator: Division, operandLeftId: FontLineWidth, operandRight: { number: 2 } } },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: L,
                    x: { operator: Addition, operandLeftId: FontXMiddle, operandRight: { operator: Division, operandLeftId: FontLineWidth, operandRight: { number: 2 } } },
                    y: { numberId: FontBottom }
                  },
                  {
                    letter: L,
                    x: { operator: Subtraction, operandLeftId: FontXMiddle, operandRight: { operator: Division, operandLeftId: FontLineWidth, operandRight: { number: 2 } } },
                    y: { numberId: FontBottom }
                  },
                  { letter: Z }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-01',
          name: '2',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    x: { numberId: FontLeft },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: L,
                    x: { numberId: FontXMiddle },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: C,
                    x1: {
                      operator: Addition, operandLeftId: FontXMiddle, operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, operator: Subtraction, operandLeftId: FontRight, operandRightId: FontXMiddle }
                        ]
                      }
                    },
                    y1: { numberId: FontTop },
                    x2: { numberId: FontRight },
                    y2: {
                      operator: Subtraction,
                      operandLeft: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter },
                      operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, operator: Subtraction, operandRightId: FontTop, operandLeft: {
                              operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter
                            }
                          }
                        ]
                      }
                    },
                    x: { numberId: FontRight },
                    y: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter }
                  },
                  {
                    letter: C,
                    x1: { numberId: FontRight },
                    y1: {
                      operator: Addition,
                      operandLeft: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter },
                      operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, operator: Subtraction,
                            operandLeft: {
                              operator: Addition,
                              operandLeftId: FontYMiddle,
                              operandRightId: FontLineHeightHalf
                            },
                            operandRight: {
                              operator: Addition,
                              operandLeftId: FontYTop,
                              operandRightId: FontLineHeightQuarter
                            }
                          }
                        ]
                      }
                    },
                    x2: {
                      operator: Addition, operandLeftId: FontXMiddle, operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, operator: Subtraction, operandLeftId: FontRight, operandRightId: FontXMiddle }
                        ]
                      }
                    },
                    y2: {
                      operator: Addition, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf
                    },
                    x: { numberId: FontXMiddle },
                    y: {
                      operator: Addition, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf
                    }
                  },
                  { letter: L, x: { operator: Addition, operandLeftId: FontLeft, operandRightId: FontLineWidth }, y: { numberId: FontYBottom } },
                  { letter: L, x: { operator: Addition, operandLeftId: FontLeft, operandRightId: FontLineWidth }, y: { operator: Subtraction, operandLeftId: FontBottom, operandRightId: FontLineHeight } },
                  { letter: L, x: { numberId: FontRight }, y: { operator: Subtraction, operandLeftId: FontBottom, operandRightId: FontLineHeight } },
                  { letter: L, x: { numberId: FontRight }, y: { numberId: FontBottom } },
                  { letter: L, x: { numberId: FontLeft }, y: { numberId: FontBottom } },
                  { letter: L, x: { numberId: FontLeft }, y: { numberId: FontYBottom } },
                  { letter: L, x: { numberId: FontXMiddle }, y: { operator: Subtraction, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf } },
                  { letter: L, x: { operator: Subtraction, operandLeftId: FontRight, operandRightId: FontLineWidth }, y: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter } },
                  { letter: L, x: { numberId: FontXMiddle }, y: { operator: Addition, operandLeftId: FontTop, operandRightId: FontLineHeight } },
                  { letter: L, x: { numberId: FontLeft }, y: { operator: Addition, operandLeftId: FontTop, operandRightId: FontLineHeight } },
                  { letter: Z }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-02',
          name: '3',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    x: { numberId: FontLeft },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: L,
                    x: { numberId: FontXMiddle },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: C,
                    x1: {
                      operator: Addition, operandLeftId: FontXMiddle, operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, operator: Subtraction, operandLeftId: FontRight, operandRightId: FontXMiddle }
                        ]
                      }
                    },
                    y1: { numberId: FontTop },
                    x2: { numberId: FontRight },
                    y2: {
                      operator: Subtraction,
                      operandLeft: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter },
                      operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, operator: Subtraction, operandRightId: FontTop, operandLeft: {
                              operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter
                            }
                          }
                        ]
                      }
                    },
                    x: { numberId: FontRight },
                    y: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter }
                  },
                  {
                    letter: C,
                    x1: { numberId: FontRight },
                    y1: {
                      operator: Addition,
                      operandLeft: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter },
                      operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          {
                            id: MultiplyBy55PercentInput, operator: Subtraction,
                            operandLeft: {
                              operator: Addition,
                              operandLeftId: FontYMiddle,
                              operandRightId: FontLineHeightHalf
                            },
                            operandRight: {
                              operator: Addition,
                              operandLeftId: FontYTop,
                              operandRightId: FontLineHeightQuarter
                            }
                          }
                        ]
                      }
                    },
                    x2: {
                      operator: Addition, operandLeftId: FontXMiddle, operandRight: {
                        numberId: MultiplyBy55Percent, numbers: [
                          { id: MultiplyBy55PercentInput, operator: Subtraction, operandLeftId: FontRight, operandRightId: FontXMiddle }
                        ]
                      }
                    },
                    y2: {
                      operator: Addition, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf
                    },
                    x: { numberId: FontXMiddle },
                    y: {
                      operator: Addition, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf
                    }
                  },
                  { letter: L, x: { numberId: FontLeft }, y: { operator: Addition, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf } },
                  { letter: L, x: { numberId: FontLeft }, y: { operator: Subtraction, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf } },
                  { letter: L, x: { numberId: FontXMiddle }, y: { operator: Subtraction, operandLeftId: FontYMiddle, operandRightId: FontLineHeightHalf } },
                  { letter: L, x: { operator: Subtraction, operandLeftId: FontRight, operandRightId: FontLineWidth }, y: { operator: Addition, operandLeftId: FontYTop, operandRightId: FontLineHeightQuarter } },
                  { letter: L, x: { numberId: FontXMiddle }, y: { operator: Addition, operandLeftId: FontTop, operandRightId: FontLineHeight } },
                  { letter: L, x: { numberId: FontLeft }, y: { operator: Addition, operandLeftId: FontTop, operandRightId: FontLineHeight } },
                  { letter: Z }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            },
            {
              path: {
                commands: [
                  {
                    letter: M,
                    x: { numberId: FontLeft },
                    y: { numberId: FontYMiddle }
                  },
                  {
                    letter: L,
                    x: { numberId: FontRight },
                    y: { numberId: FontYBottom }
                  },
                  {
                    letter: L,
                    x: { numberId: FontLeft },
                    y: { numberId: FontBottom }
                  },
                  {
                    letter: L,
                    x: { numberId: FontXMiddle },
                    y: { numberId: FontYBottom }
                  },
                  { letter: Z }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-03',
          name: '4',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    x: { numberId: FontLeft },
                    y: { numberId: FontTop }
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontBottom
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-04',
          name: '5',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    xId: FontLeft,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontYMiddle
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-05',
          name: '6',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    xId: FontRight,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontYMiddle
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-06', name: '7',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    xId: FontLeft,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-07',
          name: '8',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    xId: FontXMiddle,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontYTop
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontYTop
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        },
        {
          id: '3-08',
          name: '9',
          layers: [
            {
              path: {
                commands: [
                  {
                    letter: M,
                    xId: FontXMiddle,
                    yId: FontTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontYTop
                  },
                  {
                    letter: L,
                    xId: FontRight,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontBottom
                  },
                  {
                    letter: L,
                    xId: FontXMiddle,
                    yId: FontYBottom
                  },
                  {
                    letter: L,
                    xId: FontLeft,
                    yId: FontYMiddle
                  },
                  {
                    letter: Z
                  }
                ],
                fill: 'var(--color)',
                stroke: 'none'
              }
            }
          ]
        }
      ]
    }
  ],
  layers: [
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-01', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-02', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-03', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-04', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-05', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-06', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-07', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-08', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-10', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-11', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-12', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-13', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-14', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-15', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-16', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-17', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-18', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-20', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-21', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-22', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-23', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-24', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-25', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-26', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-27', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-28', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-30', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-31', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-32', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-33', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-34', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-35', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-36', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-37', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-38', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-40', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-41', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-42', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-43', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-44', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-45', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-46', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-47', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-48', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-50', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-51', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-52', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-53', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-54', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-55', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-56', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-57', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-58', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-60', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-61', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-62', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-63', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-64', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-65', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-66', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-67', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-68', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-70', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-71', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-72', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-73', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-74', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-75', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-76', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-77', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-78', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-80', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-81', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-82', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-83', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-84', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-85', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-86', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-01', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', collectionId: '5-00', objectId: '4-88', numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 8 }] },
    { lineId: '2-00' },
    { lineId: '2-01' },
    { lineId: '2-02' },
    { lineId: '2-03' }
  ],
  interfaces: [
    {
      id: '0-00',
      name: 'Template',
      xId: '1-06', x: { numbers: [{ id: '1-09', numberId: '1-07' }] },
      yId: '1-06', y: { numbers: [{ id: '1-09', numberId: '1-08' }] }
    },
    {
      id: '0-01',
      name: 'Interface r9c8',
      collectionId: '5-00',
      objectId: '4-87',
      xId: '1-06', x: { numbers: [{ id: '1-09', numberId: '1-07' }] },
      yId: '1-06', y: { numbers: [{ id: '1-09', numberId: '1-08' }] }
    }
  ],
  numbers: [
    { id: '1-00', name: 'Interface Width', number: { numerator: 1, denominator: 9 } },
    { id: '1-01', name: 'Interface Height', number: { numerator: 1, denominator: 9 } },
    { id: '1-02', name: '2/3', number: { numerator: 2, denominator: 3 } },
    { id: '1-03', name: '0', number: 0 },
    { id: '1-04', name: '1', number: 1 },
    { id: '1-05', name: '1/100', number: { numerator: 1, denominator: 100 } },
    {
      id: '1-06', name: 'Input Multiplied By 1/9', operator: Multiplication,
      operandLeftId: '1-09', operandRight: { number: { numerator: 1, denominator: 9 } }
    },
    { id: '1-07', name: 'X Position', number: 0 },
    { id: '1-08', name: 'Y Position', number: 0 },
    { id: '1-09', name: 'Left Operand for Input Multiplied By 1/9', number: 0 },
    { id: FontTop, name: 'Font Top', number: { numerator: 2, denominator: 9 } },
    { id: FontBottom, name: 'Font Bottom', number: { numerator: 7, denominator: 9 } },
    { id: FontLineHeight, name: 'Font Line Height', number: { numerator: 2, denominator: 27 } },
    { id: FontLeft, name: 'Font Left', number: { numerator: 3, denominator: 9 } },
    { id: FontRight, name: 'Font Right', number: { numerator: 6, denominator: 9 } },
    { id: FontXMiddle, name: 'Font X Middle', number: { numerator: 1, denominator: 2 } },
    { id: FontLineWidth, name: 'Font Line Width', number: { numerator: 2, denominator: 27 } },
    { id: FontYTop, name: 'Font Y Top', number: { numerator: 13, denominator: 36 } },
    { id: FontYMiddle, name: 'Font Y Middle', number: { numerator: 1, denominator: 2 } },
    { id: FontYBottom, name: 'Font Y Bottom', number: { numerator: 23, denominator: 36 } },
    {
      id: MultiplyBy55Percent, name: '55% of', operator: Multiplication,
      operandLeft: { number: { numerator: 11, denominator: 20 } }, operandRightId: MultiplyBy55PercentInput
    },
    { id: MultiplyBy55PercentInput, name: '55% of default', number: 1 },
    {
      id: FontLineHeightHalf, name: 'Font Line Height Half', operator: Division,
      operandLeftId: FontLineHeight, operandRight: { number: 2 }
    },
    {
      id: FontLineHeightQuarter, name: 'Font Line Height Quarter', operator: Division,
      operandLeftId: FontLineHeightHalf, operandRight: { number: 2 }
    }
  ],
  lines: [
    { id: '2-00', name: 'Vertical Border 1', x1: { number: { numerator: 1, denominator: 3 } }, x2: { number: { numerator: 1, denominator: 3 } }, y1: { number: 0 }, y2: { number: 1 }, strokeWidthId: '1-05' },
    { id: '2-01', name: 'Vertical Border 2', x1Id: '1-02', x2Id: '1-02', y1Id: '1-03', y2Id: '1-04', strokeWidthId: '1-05' },
    { id: '2-02', name: 'Horizontal Border 1', x1: { number: 0 }, x2: { number: 1 }, y1: { number: { numerator: 1, denominator: 3 } }, y2: { number: { numerator: 1, denominator: 3 } }, strokeWidthId: '1-05' },
    { id: '2-03', name: 'Horizontal Border 2', x1: { number: 0 }, x2: { number: 1 }, y1: { number: { numerator: 2, denominator: 3 } }, y2: { number: { numerator: 2, denominator: 3 } }, strokeWidthId: '1-05' }
  ],
  defaults: {
    interfaceWidthValue: { number: { numerator: 1, denominator: 9 } },
    interfaceHeightValue: { number: { numerator: 1, denominator: 9 } },
    strokeWidth: { number: { numerator: 1, denominator: 200 } }
  }
}
