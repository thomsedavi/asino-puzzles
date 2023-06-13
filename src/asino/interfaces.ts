import { CX, CXId, CY, CYId, Height, HeightId, R, RId, StrokeWidth, StrokeWidthId, Width, WidthId, X, X1, X1Id, X2, X2Id, XId, Y, Y1, Y1Id, Y2, Y2Id, YId } from "./consts";

export type Number = number | 'infinity';

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
    interfaceWidthValue?: Number; // default width of interface, or use default of 560 (5,040/9)
    interfaceHeightValue?: Number; // default height of interface, or use default of 560 (5,040/9)
    [StrokeWidth]?: Number; // default width of stroke, or use default of 24
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
  attributes?: AsinoAttribute[]; // draw the layer with these attributes
}

export type AsinoInterface = {
  id?: string; // id of this interface
  name?: string; // name of this interface
  [Width]?: Number; // if this exists, draw the interface this wide, or...
  [WidthId]?: string; // if this exists, draw the interface as wide as this number, or use default interface width
  [Height]?: Number; // if this exists, draw the interface this high, or...
  [HeightId]?: string; // if this exists, draw the interface as high as this number, or use default interface height
  [X]?: Number; // if this exists, draw the interface here, or...
  [XId]?: string; // if this exists, draw the interface at this number, or use default of 0
  [Y]?: Number; // if this exists, draw the interface here, or...
  [YId]?: string; // if this exists, draw the interface at this number, or use default of 0
}

export interface AsinoRectangle {
  id?: string; // id of this rectangle
  [Width]?: Number; // if this exists, draw the rectangle this wide, or...
  [WidthId]?: string; // if this exists, draw the rectangle as wide as this number, or use default of 0
  [Height]?: Number; // if this exists, draw the rectangle this high, or...
  [HeightId]?: string; // if this exists, draw the rectangle as high as this number, or use default of 0
  [X]?: Number; // if this exists, draw the rectangle here, or...
  [XId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
  [Y]?: Number; // if this exists, draw the rectangle here, or...
  [YId]?: string; // if this exists, draw the rectangle at this number, or use default of 0
}

export interface AsinoLine {
  id?: string; // id of this line
  name?: string; // name of this line
  [X1]?: Number; // if this exists, draw x1 here, or...
  [X1Id]?: string; // if this exists, draw x1 at this number, or use default of 0
  [X2]?: Number; // if this exists, draw x2 here, or...
  [X2Id]?: string; // if this exists, draw x2 at this number, or use default of 0
  [Y1]?: Number; // if this exists, draw y1 here, or...
  [Y1Id]?: string; // if this exists, draw y1 at this number, or use default of 0
  [Y2]?: Number; // if this exists, draw y2 here, or...
  [Y2Id]?: string; // if this exists, draw y2 at this number, or use default of 0
  [StrokeWidth]?: Number; // if this exists, draw stroke with width, or...
  [StrokeWidthId]?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoCircle {
  id?: string; // id of this line
  name?: string; // name of this line
  [CX]?: Number; // if this exists, draw cx here, or...
  [CXId]?: string; // if this exists, draw cx at this number, or use default of 0
  [CY]?: Number; // if this exists, draw cy here, or...
  [CYId]?: string; // if this exists, draw cy at this number, or use default of 0
  [R]?: Number; // if this exists, draw r here, or...
  [RId]?: string; // if this exists, draw r at this number, or use default of 0
}

export interface AsinoPath {
  id?: string; // id of this path
  name?: string; // name of this path
  [StrokeWidth]?: Number; // if this exists, draw stroke with width, or...
  [StrokeWidthId]?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoAttribute {
  id?: string;
  numberValue?: number;
  numberId?: string;
}

export interface AsinoNumber {
  id?: string; // id of this number
  name?: string; // name of this number
  value?: Number; // value of this number
}

export const Test: AsinoPuzzle = {
  title: 'My Test',
  userName: 'Lotographia',
  layers: [
    { interfaceId: '0-00' },
    { interfaceId: '0-01' },
    { interfaceId: '0-02' },
    { lineId: '2-00' },
    { lineId: '2-01' },
    { lineId: '2-02', line: { strokeWidth: 32 } },
    { lineId: '2-03', line: { strokeWidthId: '1-05' } }
  ],
  interfaces: [
    { id: '0-00', xId: '1-03', yId: '1-03', widthId: '1-00', heightId: '1-01' },
    { id: '0-01', x: 560, y: 0, width: 560, height: 560 },
    { id: '0-02', x: 1120 },
    { id: '0-03', name: 'Template' }
  ],
  numbers: [
    { id: '1-00', name: 'Interface Width', value: 560 },
    { id: '1-01', name: 'Interface Height', value: 560 },
    { id: '1-02', name: '3,360', value: 3360 },
    { id: '1-03', name: '0', value: 0 },
    { id: '1-04', name: '5,040', value: 5040 },
    { id: '1-05', name: '32', value: 32 }
  ],
  lines: [
    { id: '2-00', name: 'Vertical Border 1', x1: 1680, x2: 1680, y1: 0, y2: 5040, strokeWidth: 32 },
    { id: '2-01', name: 'Vertical Border 2', x1Id: '1-02', x2Id: '1-02', y1Id: '1-03', y2Id: '1-04', strokeWidthId: '1-05' },
    { id: '2-02', name: 'Horizontal Border 1', x1: 0, x2: 5040, y1: 1680, y2: 1680 },
    { id: '2-03', name: 'Horizontal Border 2', x1: 0, x2: 5040, y1: 3360, y2: 3360 }
  ],
  defaults: {
    interfaceWidthValue: 560,
    interfaceHeightValue: 560
  }
}
