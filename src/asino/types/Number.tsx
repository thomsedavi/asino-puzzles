import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { SelectInline, InputInline } from '../../common/styled';
import { systemNumberDefaults, systemNumberFormulas, systemNumberParameters } from '../consts';

export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+' | 'FLOOR' | 'CEILING';

export type Fraction = { numerator?: AsinoNumber, denominator?: AsinoNumber };
export type EditedNumber = { originalValue: number, editedValue: string };
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';

export type AsinoNumber = Number | EditedNumber | string | NumberFormula | AsinoNumberReference;

export type NumberFormula = {
  operator?: NumberOperator; // formula for this number
  numberInputs?: (AsinoNumber | undefined)[]; // number inputs
  collapsed?: boolean; // collapse in editor
}

export type AsinoNumberReference = {
  id?: string; // id of this number
  name?: { value?: string, editedValue?: string }; // name of this number
  value?: AsinoNumber; // value of this number
  numbers?: AsinoNumberReference[]; // parameters to use when overriding
}

export const isNumberFraction = (number: Number): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isAsinoNumberFraction = (number: AsinoNumber): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isNumberFormula = (number: AsinoNumber): number is NumberFormula => {
  return typeof number !== 'string' && typeof number !== 'number' && 'operator' in number;
}

export const isNumberEditedNumber = (number: AsinoNumber): number is EditedNumber => {
  return typeof number !== 'string' && typeof number !== 'number' && 'originalValue' in number && 'editedValue' in number;
}

export const getNumberReferenceRow = (puzzle: AsinoPuzzle, numberReference: AsinoNumberReference, key: string, depth: number, update: (value: AsinoNumberReference) => void): JSX.Element => {
  const rowKey = `numberReference${key}`;
  let selectValue = 'NONE';

  if (numberReference.value !== undefined) {
    if (typeof numberReference.value === 'string') {
      selectValue = 'ID';
    } else if (typeof numberReference.value === 'number' || isNumberEditedNumber(numberReference.value)) {
      selectValue = 'NUMBER';
    } else if (isNumberFormula(numberReference.value)) {
      selectValue = 'FORMULA';
    } else if (isAsinoNumberFraction(numberReference.value)) {
      selectValue = 'FRACTION';
    } else {
      selectValue = 'REFERENCE'
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numberReferenceUpdate: AsinoNumberReference = { ...numberReference };

    if (event.target.value === 'NONE') {
      delete numberReferenceUpdate.value;
      update(numberReferenceUpdate);
    } else if (event.target.value === 'NUMBER') {
      numberReferenceUpdate.value = 0;
      update(numberReferenceUpdate);
    } else if (event.target.value === 'ID') {
      numberReferenceUpdate.value = 'NONE';
      update(numberReferenceUpdate);
    } else if (event.target.value === 'FRACTION') {
      numberReferenceUpdate.value = { numerator: 1, denominator: 1 };
      update(numberReferenceUpdate);
    } else {
      numberReferenceUpdate.value = { operator: 'NONE' };
      update(numberReferenceUpdate);
    }
  }

  const onUpdateFormula = (value: AsinoNumber | undefined, index: number) => {
    if (numberReference.value !== undefined && isNumberFormula(numberReference.value)) {
      update({ ...numberReference, value: { operator: numberReference.value.operator, numberInputs: [...(numberReference.value.numberInputs?.slice(0, index) ?? []), value, ...(numberReference.value.numberInputs?.slice(index + 1) ?? [])] } });
    }
  }

  const updateNumber = () => {
    const numberReferenceUpdate: AsinoNumberReference = { ...numberReference };

    if (numberReference.value !== undefined && isNumberEditedNumber(numberReference.value)) {
      numberReferenceUpdate.value = toNumberOrFraction(Number(numberReference.value.editedValue));
    }

    update(numberReferenceUpdate);
  }

  const updateName = () => {
    const updatedName = Utils.tidyString(numberReference.name?.editedValue);

    update({ ...numberReference, name: { value: updatedName !== '' ? updatedName : numberReference.name?.value } });
  }

  const onKeyDownNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateNumber();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      const numberReferenceUpdate: AsinoNumberReference = { ...numberReference };
      if (numberReference.value !== undefined && isNumberEditedNumber(numberReference.value)) {
        numberReferenceUpdate.value = numberReference.value.originalValue;
      }
      update(numberReferenceUpdate);
    }
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...numberReference, name: { value: numberReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {numberReference.name !== undefined && <>
      {numberReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...numberReference, name: { ...numberReference.name, editedValue: numberReference.name?.value } })}>{numberReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
      {numberReference.name?.editedValue !== undefined && <InputInline block autoFocus value={numberReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...numberReference, name: { ...numberReference.name, editedValue: event.target.value } })} />}
    </>}
    {numberReference.name === undefined && <>
      <SelectInline name={`Number {${rowKey}} Override`} id={`Number {${rowKey}} Type`} value={numberReference.id ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, id: event.target.value, value: [...systemNumberDefaults, ...systemNumberParameters, ...systemNumberFormulas].find(d => d.id === event.target.value)?.value })}>
        <option value='NONE'>Select Number To Override</option>
        {systemNumberDefaults.map((n, index) => <option key={`${rowKey} Default Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
        {systemNumberFormulas.map((n, index) => <option key={`${rowKey} Formula Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
        {systemNumberParameters.map((n, index) => <option key={`${rowKey} ParameterId ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
      </SelectInline>
    </>}
    <SelectInline name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </SelectInline>
    {typeof numberReference.value === 'number' && <span style={{ cursor: 'pointer' }} onClick={() => update({ ...numberReference, value: { originalValue: Number(numberReference.value), editedValue: `${numberReference.value}` } })}>{numberReference.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></span>}
    {numberReference.value !== undefined && isNumberEditedNumber(numberReference.value) && <InputInline autoFocus type='number' value={numberReference.value.editedValue} onBlur={updateNumber} onKeyDown={onKeyDownNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...numberReference, value: { editedValue: event.target.value, originalValue: numberReference.value !== undefined && isNumberEditedNumber(numberReference.value) ? numberReference.value.originalValue : 0 } })} />}
    {typeof numberReference.value === 'string' && <SelectInline name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={numberReference.value ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: event.target.value })}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers !== undefined && puzzle.numbers.length !== 0 && <optgroup label="Custom Numbers">
        {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {systemNumberDefaults.map((n, index) => <option key={`${rowKey} Default Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>}
    {numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) && <>
      {getTopBracket(depth)}
      {getNumberRow(puzzle, numberReference.value.numerator, `${rowKey}numerator`, depth + 1, (value: AsinoNumber | undefined) => update({ ...numberReference, value: { numerator: value ?? 1, denominator: numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) ? numberReference.value.denominator : 1 } }))}
      {getBottomBracket(depth)}
      <div style={{ textAlign: 'center' }}>/</div>
      {getTopBracket(depth)}
      {getNumberRow(puzzle, numberReference.value.denominator, `${rowKey}denominator`, depth + 1, (value: AsinoNumber | undefined) => update({ ...numberReference, value: { denominator: value ?? 1, numerator: numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) ? numberReference.value.numerator : 1 } }))}
      {getBottomBracket(depth)}
    </>}
    {numberReference.value !== undefined && isNumberFormula(numberReference.value) && <>
      <SelectInline name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={numberReference.value.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: { operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] } })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </SelectInline>
      <span onClick={() => numberReference.value !== undefined && isNumberFormula(numberReference.value) && update({ ...numberReference, value: { ...numberReference.value, collapsed: !numberReference.value.collapsed ?? undefined } })} style={{ cursor: 'pointer' }}>{numberReference.value.collapsed ? '>' : 'v'}</span>
      {!numberReference.value.collapsed && <>
        {getTopBracket(depth)}
        {getNumberRow(puzzle, numberReference.value.numberInputs?.[0], `${rowKey}input0`, depth + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
        {getBottomBracket(depth)}
        <div style={{ textAlign: 'center' }}>{numberReference.value.operator === 'NONE' ? '?' : numberReference.value.operator}</div>
        {getTopBracket(depth)}
        {getNumberRow(puzzle, numberReference.value.numberInputs?.[1], `${rowKey}input1`, depth + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
        {getBottomBracket(depth)}
      </>}
    </>}
  </div>;
}

export const getNumberRow = (puzzle: AsinoPuzzle, number: AsinoNumber | undefined, key: string, layer: number, update: (value: AsinoNumber | undefined) => void): JSX.Element => {
  const rowKey = `number${key}`;
  let selectValue = 'NONE';

  if (number !== undefined) {
    if (typeof number === 'string') {
      selectValue = 'ID';
    } else if (typeof number === 'number' || isNumberEditedNumber(number)) {
      selectValue = 'NUMBER';
    } else if (isNumberFormula(number)) {
      selectValue = 'FORMULA';
    } else if (isAsinoNumberFraction(number)) {
      selectValue = 'FRACTION';
    } else {
      selectValue = 'REFERENCE'
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update(undefined);
    } else if (event.target.value === 'NUMBER') {
      update(0);
    } else if (event.target.value === 'ID') {
      update('NONE');
    } else if (event.target.value === 'FRACTION') {
      update({ numerator: 1, denominator: 1 });
    } else {
      update({ operator: 'NONE' });
    }
  }

  const onUpdateFormula = (value: AsinoNumber | undefined, index: number) => {
    if (number !== undefined && isNumberFormula(number)) {
      update({ operator: number.operator, numberInputs: [...(number.numberInputs?.slice(0, index) ?? []), value, ...(number.numberInputs?.slice(index + 1) ?? [])] });
    }
  }

  const updateNumber = () => {
    if (number !== undefined && isNumberEditedNumber(number)) {
      update(toNumberOrFraction(Number(number.editedValue)));
    }
  }

  const onKeyDownNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateNumber();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      if (number !== undefined && isNumberEditedNumber(number)) {
        update(number.originalValue);
      }
    }
  }

  return <div key={rowKey}>
    <SelectInline name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </SelectInline>
    {typeof number === 'number' && <span style={{ cursor: 'pointer' }} onClick={() => update({ originalValue: number, editedValue: `${number}` })}>{number}<Icon title='edit' type='pencil' fillSecondary='--accent' /></span>}
    {number !== undefined && isNumberEditedNumber(number) && <InputInline autoFocus type='number' value={number.editedValue} onBlur={updateNumber} onKeyDown={onKeyDownNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ editedValue: event.target.value, originalValue: number !== undefined && isNumberEditedNumber(number) ? number.originalValue : 0 })} />}
    {typeof number === 'string' && <SelectInline name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={number ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers !== undefined && puzzle.numbers.length !== 0 && <optgroup label="Custom Numbers">
        {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {systemNumberDefaults.map((n, index) => <option key={`${rowKey} Default Id ${index}`} value={n.id}>{n.name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>}
    {number !== undefined && isAsinoNumberFraction(number) && <>
      {getTopBracket(layer)}
      {getNumberRow(puzzle, number.numerator, `${rowKey}numerator`, layer + 1, (value: AsinoNumber | undefined) => update({ numerator: value ?? 1, denominator: number !== undefined && isAsinoNumberFraction(number) ? number.denominator : 1 }))}
      {getBottomBracket(layer)}
      <div style={{ textAlign: 'center' }}>/</div>
      {getTopBracket(layer)}
      {getNumberRow(puzzle, number.denominator, `${rowKey}denominator`, layer + 1, (value: AsinoNumber | undefined) => update({ denominator: value ?? 1, numerator: number !== undefined && isAsinoNumberFraction(number) ? number.numerator : 1 }))}
      {getBottomBracket(layer)}
    </>}
    {number !== undefined && isNumberFormula(number) && <>
      <SelectInline name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={number.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </SelectInline>
      <span onClick={() => update({ ...number, collapsed: !number.collapsed })} style={{ cursor: 'pointer' }}>{number.collapsed ? '>' : 'v'}</span>
      {!number.collapsed && <>
        {getTopBracket(layer)}
        {getNumberRow(puzzle, number.numberInputs?.[0], `${rowKey}input${0}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
        {getBottomBracket(layer)}
        <div style={{ textAlign: 'center' }}>{number.operator === 'NONE' ? '?' : number.operator}</div>
        {getTopBracket(layer)}
        {getNumberRow(puzzle, number.numberInputs?.[1], `${rowKey}input${1}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
        {getBottomBracket(layer)}
      </>}
    </>}
  </div>;
}

const getNumberOperator = (value: string): NumberOperator => {
  switch (value) {
    case '*':
      return '*';
    case '-':
      return '-';
    case '+':
      return '+';
    case '/':
      return '/';
    default:
      return 'NONE';
  }
}

const getTopBracket = (layer: number): JSX.Element => {
  return <div>
    <svg version="1.1"
      viewBox='0 0 1 0.02'
      xmlns="http://www.w3.org/2000/svg">
      <path d='M0,0.02C0,0,0,0,0.5,0C1,0,1,0,1,0.02' stroke={Utils.getRowColor(layer)} fill='none' strokeWidth='0.005' />
    </svg>
  </div>;
}

const getBottomBracket = (layer: number): JSX.Element => {
  return <div>
    <svg version="1.1"
      viewBox='0 0 1 0.02'
      xmlns="http://www.w3.org/2000/svg">
      <path d='M0,0C0.0.02,0,0.02,0.5,0.02C1,0.02,1,0.02,1,0' stroke={Utils.getRowColor(layer)} fill='none' strokeWidth='0.005' />
    </svg>
  </div>;
}

const toNumberOrFraction = (value: number): AsinoNumber => {
  if (value % 1 === 0) {
    return value;
  } else {
    let denominator = 10;

    while (value * denominator % 1 !== 0) {
      denominator *= 10;
    }

    let fraction = { numerator: value * denominator, denominator: denominator };

    let quarfle = 2;

    while (quarfle < fraction.denominator) {
      while (((fraction.numerator / quarfle) % 1 === 0) && ((fraction.denominator / quarfle) % 1 === 0)) {
        fraction = { numerator: fraction.numerator / quarfle, denominator: denominator / quarfle };
      }

      quarfle++;
    }

    return fraction;
  }
}
