import React from 'react';

import { AsinoColor } from "./Color"
import { AsinoNumber, getNumberRow } from "./Number"
import { SelectInline } from '../../common/styled';
import { AsinoPuzzle } from '../interfaces';
import { systemNumberDefaults } from '../references/Numbers';

export type AsinoParameter = {
  numberId?: string;
  colorId?: string;
  number?: AsinoNumber;
  color?: AsinoColor;
}

export const getParameterRow = (puzzle: AsinoPuzzle, parameter: AsinoParameter, key: string, depth: number, update: (value: AsinoParameter) => void): JSX.Element => {
  const rowKey = `numberReference${key}`;
  let selectValue = 'NONE';

  if (parameter.colorId !== undefined) {
    selectValue = 'COLOR';
  } else if (parameter.numberId !== undefined) {
    selectValue = 'NUMBER';
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update({});
    } else if (event.target.value === 'NUMBER') {
      update({ numberId: 'NONE' });
    } else if (event.target.value === 'COLOR') {
      update({ colorId: 'NONE' });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    <SelectInline name={`Parameter {${rowKey}} Type`} id={`Parameter {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='COLOR'>Color</option>
    </SelectInline>
    {parameter.numberId !== undefined && <>
      <SelectInline name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={parameter.numberId} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...parameter, numberId: event.target.value, number: systemNumberDefaults.filter(n => n.id === event.target.value)[0].number })}>
        <option value='NONE'>Select Number</option>
        {puzzle.numbers !== undefined && puzzle.numbers.length !== 0 && <optgroup label="Custom Numbers">
          {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
        </optgroup>}
        <optgroup label="System Defaults">
          {systemNumberDefaults.map((n, index) => <option key={`${rowKey} Default Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
        </optgroup>
      </SelectInline>
      {parameter.numberId !== 'NONE' && getNumberRow(puzzle, parameter.number, `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...parameter, number: value ?? 1 }))}
    </>}
  </div>;
}
