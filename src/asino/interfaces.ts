import { C, CX, CXId, CY, CYId, DX, DX1, DX1Id, DX2, DX2Id, DXId, DY, DY1, DY1Id, DY2, DY2Id, DYId, Height, HeightId, L, M, Multiplication, R, RId, S, StrokeWidth, StrokeWidthId, Width, WidthId, X, X1, X1Id, X2, X2Id, XId, Y, Y1, Y1Id, Y2, Y2Id, YId, Z } from "./consts";
import { Operator, Number, Letter } from "./types";

export interface AsinoPuzzle {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: AsinoInterface[]; // interfaces
  rectangles?: AsinoRectangle[]; // rectangles
  lines?: AsinoLine[]; // shapes
  circles?: AsinoCircle[]; // circles
  paths?: AsinoPath[]; // circle
  numbers?: AsinoNumber[]; // numbers
  defaults?: { // should this be called 'settings'?
    interfaceWidthValue?: AsinoNumber; // default width of interface, or use default of 560 (5,040/9)
    interfaceHeightValue?: AsinoNumber; // default height of interface, or use default of 560 (5,040/9)
    [StrokeWidth]?: AsinoNumber; // default width of stroke, or use default of 24
  }
  dateCreated?: string;
  dateUpdated?: string;
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
}

export type AsinoInterface = {
  id?: string; // id of this interface
  name?: string; // name of this interface
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide, or...
  [WidthId]?: string; // if this exists, draw the interface as wide as this number, or use default interface width
  [Height]?: AsinoNumber; // if this exists, draw the interface this high, or...
  [HeightId]?: string; // if this exists, draw the interface as high as this number, or use default interface height
  [X]?: AsinoNumber; // if this exists, draw the interface here, or...
  [XId]?: string; // if this exists, draw the interface at this number, or use default of 0
  [Y]?: AsinoNumber; // if this exists, draw the interface here, or...
  [YId]?: string; // if this exists, draw the interface at this number, or use default of 0
  numbers?: AsinoNumber[] // number parameters
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

export const Test: AsinoPuzzle = {
  title: 'My Test',
  userName: 'Lotographia',
  layers: [
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 8 }] },
    { lineId: '2-00' },
    { lineId: '2-01' },
    { lineId: '2-02' },
    { lineId: '2-03' },
    { pathId: '3-00' }
  ],
  interfaces: [
    {
      id: '0-00', name: 'Template',
      xId: '1-06', x: { numbers: [{ id: '1-09', numberId: '1-07' }] },
      yId: '1-06', y: { numbers: [{ id: '1-09', numberId: '1-08' }] }
    }
  ],
  numbers: [
    { id: '1-00', name: 'Interface Width', number: 560 },
    { id: '1-01', name: 'Interface Height', number: 560 },
    { id: '1-02', name: '3,360', number: 3360 },
    { id: '1-03', name: '0', number: 0 },
    { id: '1-04', name: '5,040', number: 5040 },
    { id: '1-05', name: '32', number: 48 },
    {
      id: '1-06', name: 'Input Multiplied By 560', operator: Multiplication,
      operandLeftId: '1-09', operandRight: { number: 560 }
    },
    { id: '1-07', name: 'X Position', number: 0 },
    { id: '1-08', name: 'Y Position', number: 0 },
    { id: '1-09', name: 'Left Operand for Input Multiplied By 560', number: 0 }
  ],
  lines: [
    { id: '2-00', name: 'Vertical Border 1', x1: { number: 1680 }, x2: { number: 1680 }, y1: { number: 0 }, y2: { number: 5040 }, strokeWidth: { number: 48 } },
    { id: '2-01', name: 'Vertical Border 2', x1Id: '1-02', x2Id: '1-02', y1Id: '1-03', y2Id: '1-04', strokeWidthId: '1-05' },
    { id: '2-02', name: 'Horizontal Border 1', x1: { number: 0 }, x2: { number: 5040 }, y1: { number: 1680 }, y2: { number: 1680 } },
    { id: '2-03', name: 'Horizontal Border 2', x1: { number: 0 }, x2: { number: 5040 }, y1: { number: 3360 }, y2: { number: 3360 } }
  ],
  paths: [
    {
      id: '3-00', commands: [
        { letter: M, x: { number: 100 }, y: { number: 200 } },
        { letter: L, x: { number: 300 }, y: { number: 400 } },
        { letter: C, x1: { number: 410 }, y1: {number: 400}, x2: {number: 500}, y2: { number: 510 }, x: { number: 500 }, y: { number: 600 } },
        { letter: S, x2: {number: 410}, y2: { number: 800 }, x: { number: 300 }, y: { number: 800 } },
        { letter: S, x2: {number: 100}, y2: { number: 710 }, x: { number: 100 }, y: { number: 600 } },
        { letter: Z }
      ]
    }
  ],
  defaults: {
    interfaceWidthValue: { number: 560 },
    interfaceHeightValue: { number: 560 },
    strokeWidth: { number: 48 }
  }
}
