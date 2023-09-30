import React from 'react';
import { AsinoCircle, Circle } from "./Circle";
import { AsinoInterface, Interface } from "./Interface";
import { AsinoLine, Line } from "./Line";
import { AsinoPath, Path } from "./Path";
import { AsinoRectangle, Rectangle } from "./Rectangle";
import Utils from '../../common/utils';
import { Button, ButtonGroup, InputInline, SelectInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoGroup, Group } from './Group';
import { AsinoPuzzle } from './Puzzle';
import { AsinoNumber, AsinoNumberReference, getNumberRow } from './Number';
import { systemInterfaceDefaults } from '../references/Interfaces';
import { systemRectangleDefaults } from '../references/Rectangles';
import { systemPathDefaults } from '../references/Paths';
import { AsinoObjectReference } from './Object';

export type AsinoLayer = {
  name?: { value?: string, editedValue?: string }; // name of this rectangle
  interface?: Interface; // draw this interface
  interfaceId?: string; // draw the interface with this id
  rectangle?: Rectangle; // draw this rectangle
  rectangleId?: string; // draw the rectangle with this id
  line?: Line; // draw this line
  lineId?: string; // draw the line with this id
  circle?: Circle; // draw this circle
  circleId?: string; // draw the circle with this id
  path?: Path; // draw this path
  pathId?: string; // draw the path with this id
  group?: Group; // draw this group
  groupId?: string; // draw the group with this id
  objectId?: string; // id of the interface of this layer
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getLayerRow = (puzzle: AsinoPuzzle, layer: AsinoLayer, key: string, depth: number, update: (value: AsinoLayer) => void): JSX.Element => {
  const rowKey = `layer${key}`;
  let selectValue = 'NONE';

  if (layer.interface !== undefined) {
    selectValue = 'INTERFACE';
  } else if (layer.interfaceId !== undefined) {
    selectValue = 'INTERFACE_ID';
  } else if (layer.line !== undefined) {
    selectValue = 'LINE';
  } else if (layer.rectangle !== undefined) {
    selectValue = 'RECTANGLE';
  } else if (layer.rectangleId !== undefined) {
    selectValue = 'RECTANGLE_ID';
  } else if (layer.circle !== undefined) {
    selectValue = 'CIRCLE';
  } else if (layer.path !== undefined) {
    selectValue = 'PATH';
  } else if (layer.pathId !== undefined) {
    selectValue = 'PATH_ID';
  } else if (layer.group !== undefined) {
    selectValue = 'GROUP';
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update({ name: layer.name });
    } else if (event.target.value === 'INTERFACE') {
      update({ name: layer.name, interface: {} });
    } else if (event.target.value === 'INTERFACE_ID') {
      update({ name: layer.name, interfaceId: 'NONE' });
    } else if (event.target.value === 'LINE') {
      update({ name: layer.name, line: {} });
    } else if (event.target.value === 'RECTANGLE') {
      update({ name: layer.name, rectangle: {} });
    } else if (event.target.value === 'RECTANGLE_ID') {
      update({ name: layer.name, rectangleId: 'NONE' });
    } else if (event.target.value === 'CIRCLE') {
      update({ name: layer.name, circle: {} });
    } else if (event.target.value === 'PATH') {
      update({ name: layer.name, path: {} });
    } else if (event.target.value === 'PATH_ID') {
      update({ name: layer.name, pathId: 'NONE' });
    } else if (event.target.value === 'GROUP') {
      update({ name: layer.name, group: {} });
    }
  }

  const updateName = () => {
    const updatedName = Utils.tidyString(layer.name?.editedValue);

    update({ ...layer, name: { value: updatedName !== '' ? updatedName : layer.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...layer, name: { value: layer.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {layer.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...layer, name: { ...layer.name, editedValue: layer.name?.value } })}>{layer.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {layer.name?.editedValue !== undefined && <InputInline block autoFocus value={layer.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...layer, name: { ...layer.name, editedValue: event.target.value } })} />}
    <SelectInline name={`Layer {${rowKey}} Type`} id={`Layer {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='INTERFACE'>Interface</option>
      <option value='INTERFACE_ID'>Interface Select</option>
      <option value='LINE'>Line</option>
      <option value='RECTANGLE'>Rectangle</option>
      <option value='RECTANGLE_ID'>Rectangle Select</option>
      <option value='CIRCLE'>Circle</option>
      <option value='PATH'>Path</option>
      <option value='PATH_ID'>Path Select</option>
      <option value='GROUP'>Group</option>
    </SelectInline>
    {layer.interfaceId !== undefined && <SelectInline name={`Interface {${rowKey}} Id`} id={`Interface {${rowKey}} Id`} value={layer.interfaceId} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, interfaceId: event.target.value })}>
      <option value='NONE'>Select Interface</option>
      {Object.entries(puzzle.interfaces ?? {}).length !== 0 && <optgroup label="Custom Interfaces">
        {Object.entries(puzzle.interfaces ?? {}).map((i, index) => <option key={`${rowKey} Id ${index}`} value={i[0]}>{i[1].name?.value ?? ''}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {Object.entries(systemInterfaceDefaults).map((i, index) => <option key={`${rowKey} Default Id ${index}`} value={i[0]}>{i[1].name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>}
    {layer.lineId !== undefined && <SelectInline name={`Line {${rowKey}} Id`} id={`Line {${rowKey}} Id`} value={layer.lineId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, lineId: event.target.value })}>
      <option value='NONE'>Select Line</option>
      {Object.entries(puzzle.lines ?? {}).map((l, index) => <option key={`${rowKey} Id ${index}`} value={l[0]}>{l[1].name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.rectangleId !== undefined && <SelectInline name={`Rectangle {${rowKey}} Id`} id={`Rectangle {${rowKey}} Id`} value={layer.rectangleId} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, rectangleId: event.target.value })}>
      <option value='NONE'>Select Rectangle</option>
      {Object.entries(puzzle.rectangles ?? {}).length !== 0 && <optgroup label="Custom Rectangles">
        {Object.entries(puzzle.rectangles ?? {}).map((r, index) => <option key={`${rowKey} Id ${index}`} value={r[0]}>{r[1].name?.value ?? ''}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {Object.entries(systemRectangleDefaults).map((r, index) => <option key={`${rowKey} Default Id ${index}`} value={r[0]}>{r[1].name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>}
    {layer.circle !== undefined && <SelectInline name={`Circle {${rowKey}} Id`} id={`Circle {${rowKey}} Id`} value={layer.circleId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, circleId: event.target.value })}>
      <option value='NONE'>Select Circle</option>
      {Object.entries(puzzle.circles ?? {}).map((c, index) => <option key={`${rowKey} Id ${index}`} value={c[0]}>{c[1].name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.pathId !== undefined && <SelectInline name={`Path {${rowKey}} Id`} id={`Path {${rowKey}} Id`} value={layer.pathId} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, pathId: event.target.value })}>
      <option value='NONE'>Select Path</option>
      {Object.entries(puzzle.paths ?? {}).length !== 0 && <optgroup label="Custom Path">
        {Object.entries(puzzle.paths ?? {}).map((p, index) => <option key={`${rowKey} Id ${index}`} value={p[0]}>{p[1].name?.value ?? ''}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {Object.entries(systemPathDefaults).map((p, index) => <option key={`${rowKey} Default Id ${index}`} value={p[0]}>{p[1].name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>}
    {layer.group !== undefined && <SelectInline name={`Group {${rowKey}} Id`} id={`Group {${rowKey}} Id`} value={layer.groupId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, groupId: event.target.value })}>
      <option value='NONE'>Select Group</option>
      {Object.entries(puzzle.groups ?? {}).map((g, index) => <option key={`${rowKey} Id ${index}`} value={g[0]}>{g[1].name?.value ?? ''}</option>)}
    </SelectInline>}
    {(layer.interface !== undefined || layer.interfaceId !== undefined) && <SelectInline value={layer.objectId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, objectId: event.target.value !== 'NONE' ? event.target.value : undefined })}>
      <option value='NONE'>Select Object</option>
      {Object.entries(puzzle.objects ?? {}).map((object: [string, AsinoObjectReference], index: number) => <option key={`${rowKey} Object ${index}`} value={object[0]}>{object[1].name?.value}</option>)}
    </SelectInline>}
    {Object.entries(layer.numbers ?? {}).map((number: [string, AsinoNumber], index: number) => getNumberRow(puzzle, number[1], `${index}`, depth + 1, (value: AsinoNumber | undefined) => { const numbers = layer.numbers ?? {}; numbers[number[0]] = value ?? { number: { value: 0 } }; update({ ...layer, numbers: numbers }) }))}
  </div>;
}
