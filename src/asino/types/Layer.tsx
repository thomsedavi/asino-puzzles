import React from 'react';
import { AsinoPuzzle } from "../interfaces";
import { AsinoCircleReference } from "./Circle";
import { AsinoColorReference } from "./Color";
import { AsinoInterfaceReference } from "./Interface";
import { AsinoLineReference } from "./Line";
import { AsinoNumberReference } from "./Number";
import { AsinoPathReference } from "./Path";
import { AsinoRectangleReference } from "./Rectangle";
import Utils from '../../common/utils';
import { InputInline, SelectInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoGroupReference } from './Group';

export interface AsinoLayer {
  name?: { value?: string, editedValue?: string }; // name of this rectangle
  interface?: AsinoInterfaceReference; // draw the interface with these attributes
  rectangle?: AsinoRectangleReference; // draw the rectangle with these attributes
  line?: AsinoLineReference; // draw the layer with these attributes
  circle?: AsinoCircleReference; // draw the circle with these attributes
  path?: AsinoPathReference; // draw the path with these attributes
  group?: AsinoGroupReference; // draw the group with these attributes
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // color parameters
  objectId?: string; // id of the interface of this layer
  collectionId?: string; // id of collection of this layer
}

export const getLayerRow = (puzzle: AsinoPuzzle, layer: AsinoLayer, key: string, depth: number, update: (value: AsinoLayer) => void): JSX.Element => {
  const rowKey = `layer${key}`;
  let selectValue = 'NONE';

  if (layer.interface !== undefined) {
    selectValue = 'INTERFACE';
  } else if (layer.line !== undefined) {
    selectValue = 'LINE';
  } else if (layer.rectangle !== undefined) {
    selectValue = 'RECTANGLE';
  } else if (layer.circle !== undefined) {
    selectValue = 'CIRCLE';
  } else if (layer.group !== undefined) {
    selectValue = 'GROUP';
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update({ name: layer.name });
    } else if (event.target.value === 'INTERFACE') {
      update({ name: layer.name, interface: {} });
    } else if (event.target.value === 'LINE') {
      update({ name: layer.name, line: {} });
    } else if (event.target.value === 'RECTANGLE') {
      update({ name: layer.name, rectangle: {} });
    } else if (event.target.value === 'CIRCLE') {
      update({ name: layer.name, circle: {} });
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
      <option value='LINE'>Line</option>
      <option value='RECTANGLE'>Rectangle</option>
      <option value='CIRCLE'>Circle</option>
      <option value='GROUP'>Group</option>
    </SelectInline>
    {layer.interface !== undefined && <SelectInline name={`Interface {${rowKey}} Id`} id={`Interface {${rowKey}} Id`} value={layer.interface.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, interface: { ...layer.interface, id: event.target.value } })}>
      <option value='NONE'>Select Interface</option>
      {puzzle.interfaces?.map((i, index) => <option key={`${rowKey} Id ${index}`} value={i.id}>{i.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.line !== undefined && <SelectInline name={`Line {${rowKey}} Id`} id={`Line {${rowKey}} Id`} value={layer.line.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, line: { ...layer.line, id: event.target.value } })}>
      <option value='NONE'>Select Line</option>
      {puzzle.lines?.map((l, index) => <option key={`${rowKey} Id ${index}`} value={l.id}>{l.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.rectangle !== undefined && <SelectInline name={`Rectangle {${rowKey}} Id`} id={`Rectangle {${rowKey}} Id`} value={layer.rectangle.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, rectangle: { ...layer.rectangle, id: event.target.value } })}>
      <option value='NONE'>Select Rectangle</option>
      {puzzle.rectangles?.map((r, index) => <option key={`${rowKey} Id ${index}`} value={r.id}>{r.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.circle !== undefined && <SelectInline name={`Circle {${rowKey}} Id`} id={`Circle {${rowKey}} Id`} value={layer.circle.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, circle: { ...layer.circle, id: event.target.value } })}>
      <option value='NONE'>Select Circle</option>
      {puzzle.circles?.map((c, index) => <option key={`${rowKey} Id ${index}`} value={c.id}>{c.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.group !== undefined && <SelectInline name={`Group {${rowKey}} Id`} id={`Group {${rowKey}} Id`} value={layer.group.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, group: { ...layer.group, id: event.target.value } })}>
      <option value='NONE'>Select Group</option>
      {puzzle.groups?.map((g, index) => <option key={`${rowKey} Id ${index}`} value={g.id}>{g.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.interface !== undefined && <SelectInline value={layer.collectionId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, collectionId: event.target.value !== 'NONE' ? event.target.value : undefined, objectId: undefined })}>
      <option value='NONE'>Select Collection</option>
      {puzzle.collections?.map((c, index) => <option key={`${rowKey} Collection ${index}`} value={c.id}>{c.name?.value ?? ''}</option>)}
    </SelectInline>}
    {layer.collectionId !== undefined && <SelectInline value={layer.objectId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...layer, objectId: event.target.value !== 'NONE' ? event.target.value : undefined })}>
      <option value='NONE'>Select Object</option>
      {puzzle.collections?.filter(c => c.id === layer.collectionId)[0].objects?.map((o, index) => <option key={`${rowKey} Collection ${index}`} value={o.id}>{o.name?.value}</option>)}
    </SelectInline>}
  </div>;
}
