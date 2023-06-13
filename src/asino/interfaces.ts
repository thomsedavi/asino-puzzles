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
    strokeWidthValue?: Number; // default width of stroke, or use default of 24
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

export interface AsinoInterface {
  id?: string; // id of this interface
  widthValue?: Number; // if this exists, draw the interface this wide, or...
  widthId?: string; // if this exists, draw the interface as wide as this number, or use default interface width
  heightValue?: Number; // if this exists, draw the interface this high, or...
  heightId?: string; // if this exists, draw the interface as high as this number, or use default interface height
  xValue?: Number; // if this exists, draw the interface here, or...
  xId?: string; // if this exists, draw the interface at this number, or use default of 0
  yValue?: Number; // if this exists, draw the interface here, or...
  yId?: string; // if this exists, draw the interface at this number, or use default of 0
}

export interface AsinoRectangle {
  id?: string; // id of this rectangle
  widthValue?: Number; // if this exists, draw the rectangle this wide, or...
  widthId?: string; // if this exists, draw the rectangle as wide as this number, or use default of 0
  heightValue?: Number; // if this exists, draw the rectangle this high, or...
  heightId?: string; // if this exists, draw the rectangle as high as this number, or use default of 0
  xValue?: Number; // if this exists, draw the rectangle here, or...
  xId?: string; // if this exists, draw the rectangle at this number, or use default of 0
  yValue?: Number; // if this exists, draw the rectangle here, or...
  yId?: string; // if this exists, draw the rectangle at this number, or use default of 0
}

export interface AsinoLine {
  id?: string; // id of this line
  description?: string; // description of this line, or should this be 'name'?
  x1Value?: Number; // if this exists, draw x1 here, or...
  x1Id?: string; // if this exists, draw x1 at this number, or use default of 0
  x2Value?: Number; // if this exists, draw x2 here, or...
  x2Id?: string; // if this exists, draw x2 at this number, or use default of 0
  y1Value?: Number; // if this exists, draw y1 here, or...
  y1Id?: string; // if this exists, draw y1 at this number, or use default of 0
  y2Value?: Number; // if this exists, draw y2 here, or...
  y2Id?: string; // if this exists, draw y2 at this number, or use default of 0
  strokeWidthValue?: Number; // if this exists, draw stroke with width, or...
  strokeWidthId?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoCircle {
  id?: string; // id of this line
  description?: string; // description of this line, or should this be 'name'?
  cxValue?: Number; // if this exists, draw cx here, or...
  cxId?: string; // if this exists, draw cx at this number, or use default of 0
  cyValue?: Number; // if this exists, draw cy here, or...
  cyId?: string; // if this exists, draw cy at this number, or use default of 0
  rValue?: Number; // if this exists, draw r here, or...
  rId?: string; // if this exists, draw r at this number, or use default of 0
}

export interface AsinoPath {
  id?: string; // id of this path
  description?: string; // description of this path, or should this be 'name'?
  strokeWidthValue?: Number; // if this exists, draw stroke with width, or...
  strokeWidthId?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoAttribute {
  id?: string;
  numberValue?: number;
  numberId?: string;
}

export interface AsinoNumber {
  id?: string; // id of this number
  description?: string; // description of this number, or should this be 'name'?
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
    { lineId: '2-02', line: { strokeWidthValue: 32 } },
    { lineId: '2-03', line: { strokeWidthId: '1-05' } }
  ],
  interfaces: [
    { id: '0-00', xId: '1-03', yId: '1-03', widthId: '1-00', heightId: '1-01' },
    { id: '0-01', xValue: 560, yValue: 0, widthValue: 560, heightValue: 560 },
    { id: '0-02', xValue: 1120 }
  ],
  numbers: [
    { id: '1-00', description: 'Interface Width', value: 560 },
    { id: '1-01', description: 'Interface Height', value: 560 },
    { id: '1-02', description: '3,360', value: 3360 },
    { id: '1-03', description: '0', value: 0 },
    { id: '1-04', description: '5,040', value: 5040 },
    { id: '1-05', description: '32', value: 32 }
  ],
  lines: [
    { id: '2-00', description: 'Vertical Border 1', x1Value: 1680, x2Value: 1680, y1Value: 0, y2Value: 5040, strokeWidthValue: 32 },
    { id: '2-01', description: 'Vertical Border 2', x1Id: '1-02', x2Id: '1-02', y1Id: '1-03', y2Id: '1-04', strokeWidthId: '1-05' },
    { id: '2-02', description: 'Horizontal Border 1', x1Value: 0, x2Value: 5040, y1Value: 1680, y2Value: 1680 },
    { id: '2-03', description: 'Horizontal Border 2', x1Value: 0, x2Value: 5040, y1Value: 3360, y2Value: 3360 }
  ],
  defaults: {
    interfaceWidthValue: 560,
    interfaceHeightValue: 560
  }
}
