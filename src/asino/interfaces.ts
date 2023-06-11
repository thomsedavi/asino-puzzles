export interface AsinoPuzzle {
  id?: string; // id of this puzzle
  title?: string; // title of this puzzle
  userId?: string; // id of the creator of this puzzle
  userName?: string; // name of the creator of this puzzle
  layers?: AsinoLayer[]; // ids of layers
  interfaces?: AsinoInterface[]; // interfaces
  lines?: AsinoLine[]; // shapes
  numbers?: AsinoNumber[]; // numbers
  defaults?: { // should this be called 'settings'?
    interfaceWidthValue?: number; // default width of interface, or use default of 560 (5,040/9)
    interfaceHeightValue?: number; // default height of interface, or use default of 560 (5,040/9)
  }
  dateCreated?: string;
  dateUpdated?: string;
}

export interface AsinoLayer {
  interfaceId?: string; // draw the interface with this id
  lineId?: string; // draw the shape with this id
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

export interface AsinoLine {
  id?: string; // id of this line
  description?: string; // description of this line, or should this be 'name'?
  x1value?: number; // if this exists, draw x1 here, or...
  x1numberId?: string; // if this exists, draw x1 at this number, or use default of 0
  x2value?: number; // if this exists, draw x2 here, or...
  x2numberId?: string; // if this exists, draw x2 at this number, or use default of 0
  y1value?: number; // if this exists, draw y1 here, or...
  y1numberId?: string; // if this exists, draw y1 at this number, or use default of 0
  y2value?: number; // if this exists, draw y2 here, or...
  y2numberId?: string; // if this exists, draw y2 at this number, or use default of 0
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
    { lineId: '2-00' }
  ],
  interfaces: [
    { id: '0-00', widthNumberId: '1-00', heightNumberId: '1-01' },
    { id: '0-01', widthValue: 560, heightValue: 560 },
    { id: '0-02' }
  ],
  numbers: [
    { id: '1-00', description: 'Interface Width', value: 560 },
    { id: '1-01', description: 'Interface Height', value: 560 }
  ],
  lines: [
    { id: '2-00', description: 'Vertical Border 1', x1value: 1680, x2value: 1680, y1value: 0, y2value: 5040 }
  ]
}
