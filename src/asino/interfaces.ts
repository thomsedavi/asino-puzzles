import { CX, CXId, CY, CYId, DX, DX1, DX1Id, DX2, DX2Id, DXId, DY, DY1, DY1Id, DY2, DY2Id, DYId, Height, HeightId, Multiplication, R, RId, StrokeWidth, StrokeWidthId, Width, WidthId, X, X1, X1Id, X2, X2Id, XId, Y, Y1, Y1Id, Y2, Y2Id, YId } from "./consts";
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
    interfaceWidthValue?: AsinoNumber; // default width of interface, or use default of 1/9
    interfaceHeightValue?: AsinoNumber; // default height of interface, or use default of 1/9
    [StrokeWidth]?: AsinoNumber; // default width of stroke, or use default of 1/200
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
  objectId?: string; // id of the interface of this layer
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
    { interfaceId: '0-00', objectId: '4-00', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-01', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-02', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-03', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-04', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-05', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-06', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-07', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-08', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 0 }] } },
    { interfaceId: '0-00', objectId: '4-10', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-11', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-12', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-13', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-14', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-15', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-16', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-17', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-18', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 1 }] } },
    { interfaceId: '0-00', objectId: '4-20', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-21', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-22', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-23', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-24', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-25', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-26', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-27', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-28', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 2 }] } },
    { interfaceId: '0-00', objectId: '4-30', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-31', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-32', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-33', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-34', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-35', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-36', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-37', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-38', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 3 }] } },
    { interfaceId: '0-00', objectId: '4-40', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-41', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-42', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-43', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-44', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-45', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-46', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-47', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-48', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 4 }] } },
    { interfaceId: '0-00', objectId: '4-50', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-51', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-52', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-53', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-54', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-55', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-56', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-57', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-58', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 5 }] } },
    { interfaceId: '0-00', objectId: '4-60', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-61', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-62', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-63', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-64', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-65', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-66', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-67', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-68', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 6 }] } },
    { interfaceId: '0-00', objectId: '4-70', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-71', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-72', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-73', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-74', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-75', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-76', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-77', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-78', interface: { numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 7 }] } },
    { interfaceId: '0-00', objectId: '4-80', interface: { numbers: [{ id: '1-07', number: 0 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-81', interface: { numbers: [{ id: '1-07', number: 1 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-82', interface: { numbers: [{ id: '1-07', number: 2 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-83', interface: { numbers: [{ id: '1-07', number: 3 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-84', interface: { numbers: [{ id: '1-07', number: 4 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-85', interface: { numbers: [{ id: '1-07', number: 5 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-86', interface: { numbers: [{ id: '1-07', number: 6 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-87', interface: { numbers: [{ id: '1-07', number: 7 }, { id: '1-08', number: 8 }] } },
    { interfaceId: '0-00', objectId: '4-88', numbers: [{ id: '1-07', number: 8 }, { id: '1-08', number: 8 }] },
    { lineId: '2-00' },
    { lineId: '2-01' },
    { lineId: '2-02' },
    { lineId: '2-03' }
  ],
  interfaces: [
    {
      id: '0-00', name: 'Template',
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
    { id: '1-09', name: 'Left Operand for Input Multiplied By 1/9', number: 0 }
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
