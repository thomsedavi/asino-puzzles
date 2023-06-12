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
    interfaceWidthValue?: number; // default width of interface, or use default of 560 (5,040/9)
    interfaceHeightValue?: number; // default height of interface, or use default of 560 (5,040/9)
    strokeWidthValue?: number; // default width of stroke, or use default of 24
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
  attributes?: AsinoAttribute[]; // draw the layer with these attributes
}

export interface AsinoInterface {
  id?: string; // id of this interface
  widthValue?: number; // if this exists, draw the interface this wide, or...
  widthNumberId?: string; // if this exists, draw the interface as wide as this number, or use default interface width
  heightValue?: number; // if this exists, draw the interface this high, or...
  heightNumberId?: string; // if this exists, draw the interface as high as this number, or use default interface height
  xValue?: number; // if this exists, draw the interface here, or...
  xNumberId?: string; // if this exists, draw the interface at this number, or use default of 0
  yValue?: number; // if this exists, draw the interface here, or...
  yNumberId?: string; // if this exists, draw the interface at this number, or use default of 0
}

export interface AsinoRectangle {
  id?: string; // id of this rectangle
  widthValue?: number; // if this exists, draw the rectangle this wide, or...
  widthNumberId?: string; // if this exists, draw the rectangle as wide as this number, or use default of 0
  heightValue?: number; // if this exists, draw the rectangle this high, or...
  heightNumberId?: string; // if this exists, draw the rectangle as high as this number, or use default of 0
  xValue?: number; // if this exists, draw the rectangle here, or...
  xNumberId?: string; // if this exists, draw the rectangle at this number, or use default of 0
  yValue?: number; // if this exists, draw the rectangle here, or...
  yNumberId?: string; // if this exists, draw the rectangle at this number, or use default of 0
}

export interface AsinoLine {
  id?: string; // id of this line
  description?: string; // description of this line, or should this be 'name'?
  x1Value?: number; // if this exists, draw x1 here, or...
  x1NumberId?: string; // if this exists, draw x1 at this number, or use default of 0
  x2Value?: number; // if this exists, draw x2 here, or...
  x2NumberId?: string; // if this exists, draw x2 at this number, or use default of 0
  y1Value?: number; // if this exists, draw y1 here, or...
  y1NumberId?: string; // if this exists, draw y1 at this number, or use default of 0
  y2Value?: number; // if this exists, draw y2 here, or...
  y2NumberId?: string; // if this exists, draw y2 at this number, or use default of 0
  strokeWidthValue?: number; // if this exists, draw stroke with width, or...
  strokeWidthAttributeId?: string; // if this attribute exists, draw stroke this width, or...
  strokeWidthNumberId?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoCircle {
  id?: string; // id of this line
  description?: string; // description of this line, or should this be 'name'?
  cxValue?: number; // if this exists, draw cx here, or...
  cxNumberId?: string; // if this exists, draw cx at this number, or use default of 0
  cyValue?: number; // if this exists, draw cy here, or...
  cyNumberId?: string; // if this exists, draw cy at this number, or use default of 0
  rValue?: number; // if this exists, draw r here, or...
  rNumberId?: string; // if this exists, draw r at this number, or use default of 0
}

export interface AsinoPath {
  id?: string; // id of this path
  description?: string; // description of this path, or should this be 'name'?
  strokeWidthValue?: number; // if this exists, draw stroke with width, or...
  strokeWidthNumberId?: string; // if this exists, draw stroke the width of this number, or use default stroke width
}

export interface AsinoAttribute {
  id?: string;
  Value?: number;
  numberId?: string;
}

export interface AsinoNumber {
  id?: string; // id of this number
  description?: string; // description of this number, or should this be 'name'?
  value?: number; // value of this number
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
    { lineId: '2-02', attributes: [{ id: '2-02-000', Value: 32 }] },
    { lineId: '2-03', attributes: [{ id: '2-03-000', numberId: '1-05' }] }
  ],
  interfaces: [
    { id: '0-00', xNumberId: '1-03', yNumberId: '1-03', widthNumberId: '1-00', heightNumberId: '1-01' },
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
    { id: '2-01', description: 'Vertical Border 2', x1NumberId: '1-02', x2NumberId: '1-02', y1NumberId: '1-03', y2NumberId: '1-04', strokeWidthNumberId: '1-05' },
    { id: '2-02', description: 'Horizontal Border 1', x1Value: 0, x2Value: 5040, y1Value: 1680, y2Value: 1680, strokeWidthAttributeId: '2-02-000' },
    { id: '2-03', description: 'Horizontal Border 2', x1Value: 0, x2Value: 5040, y1Value: 3360, y2Value: 3360, strokeWidthAttributeId: '2-03-000' }
  ],
  defaults: {
    interfaceWidthValue: 560,
    interfaceHeightValue: 560
  }
}
