import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';

export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+';

export type Fraction = { numerator?: AsinoNumber, denominator?: AsinoNumber };
export type EditedNumber = { originalValue: number, editedValue: number }
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';

export type AsinoNumber = Number | EditedNumber | string | NumberFormula | AsinoNumberReference;

export type NumberFormula = {
  operator?: NumberOperator; // formula for this number
  numberInputs?: (AsinoNumber | undefined)[]; // number inputs
}

export type AsinoNumberReference = {
  id?: string; // id of this number
  name?: string; // name of this number
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

export const getNumberReferenceRow = (puzzle: AsinoPuzzle, numberReference: AsinoNumberReference, key: string, layer: number, update: (value: AsinoNumberReference) => void): JSX.Element => {
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
      numberReferenceUpdate.value = 1;
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
      if (numberReference.value.editedValue % 1 === 0) {
        numberReferenceUpdate.value = numberReference.value.editedValue;
      } else {
        let denominator = 10;

        while (numberReference.value.editedValue * denominator % 1 !== 0) {
          denominator *= 10;
        }

        numberReferenceUpdate.value = { numerator: numberReference.value.editedValue * denominator, denominator: denominator };
      }
    }

    update(numberReferenceUpdate);
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

  return <div key={rowKey} style={{ backgroundColor: Utils.getRowColor(layer), marginBottom: '1em' }}>
    <div>{numberReference.name}</div>
    <select name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </select>
    {typeof numberReference.value === 'number' && <span style={{ cursor: 'pointer' }} onClick={() => update({ ...numberReference, value: { originalValue: Number(numberReference.value), editedValue: Number(numberReference.value) } })}>{numberReference.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></span>}
    {numberReference.value !== undefined && isNumberEditedNumber(numberReference.value) && <input type='number' value={numberReference.value.editedValue} onBlur={updateNumber} onKeyDown={onKeyDownNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...numberReference, value: { editedValue: Number(event.target.value), originalValue: numberReference.value !== undefined && isNumberEditedNumber(numberReference.value) ? numberReference.value.originalValue : 0 } })} />}
    {typeof numberReference.value === 'string' && <select name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={numberReference.value ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: event.target.value })}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name}</option>)}
    </select>}
    {numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) && <>
      {getNumberRow(puzzle, numberReference.value.numerator, `${rowKey}numerator`, layer + 1, (value: AsinoNumber | undefined) => update({ ...numberReference, value: { numerator: value ?? 1, denominator: numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) ? numberReference.value.denominator : 1 } }))}
      <div>/</div>
      {getNumberRow(puzzle, numberReference.value.denominator, `${rowKey}denominator`, layer + 1, (value: AsinoNumber | undefined) => update({ ...numberReference, value: { denominator: value ?? 1, numerator: numberReference.value !== undefined && isAsinoNumberFraction(numberReference.value) ? numberReference.value.numerator : 1 } }))}
      <div style={{ height: '1em' }}></div>
    </>}
    {numberReference.value !== undefined && isNumberFormula(numberReference.value) && <>
      <select name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={numberReference.value.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: { operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] } })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </select>
      {getNumberRow(puzzle, numberReference.value.numberInputs?.[0], `${rowKey}input0`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
      <div>{numberReference.value.operator === 'NONE' ? '?' : numberReference.value.operator}</div>
      {getNumberRow(puzzle, numberReference.value.numberInputs?.[1], `${rowKey}input1`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
      <div style={{ height: '1em' }}></div>
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
      update(1);
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
      if (number.editedValue % 1 === 0) {
        update(number.editedValue);
      } else {
        let denominator = 10;

        while (number.editedValue * denominator % 1 !== 0) {
          denominator *= 10;
        }

        update({ numerator: number.editedValue * denominator, denominator: denominator });
      }
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

  return <div key={rowKey} style={{ backgroundColor: Utils.getRowColor(layer) }}>
    <select name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </select>
    {typeof number === 'number' && <span style={{ cursor: 'pointer' }} onClick={() => update({ originalValue: number, editedValue: number })}>{number}<Icon title='edit' type='pencil' fillSecondary='--accent' /></span>}
    {number !== undefined && isNumberEditedNumber(number) && <input type='number' value={number.editedValue} onBlur={updateNumber} onKeyDown={onKeyDownNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ editedValue: Number(event.target.value), originalValue: number !== undefined && isNumberEditedNumber(number) ? number.originalValue : 0 })} />}
    {typeof number === 'string' && <select name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={number ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name}</option>)}
    </select>}
    {number !== undefined && isAsinoNumberFraction(number) && <>
      {getNumberRow(puzzle, number.numerator, `${rowKey}numerator`, layer + 1, (value: AsinoNumber | undefined) => update({ numerator: value ?? 1, denominator: number !== undefined && isAsinoNumberFraction(number) ? number.denominator : 1 }))}
      <div>/</div>
      {getNumberRow(puzzle, number.denominator, `${rowKey}denominator`, layer + 1, (value: AsinoNumber | undefined) => update({ denominator: value ?? 1, numerator: number !== undefined && isAsinoNumberFraction(number) ? number.numerator : 1 }))}
      <div style={{ height: '1em' }}></div>
    </>}
    {number !== undefined && isNumberFormula(number) && <>
      <select name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={number.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </select>
      {getNumberRow(puzzle, number.numberInputs?.[0], `${rowKey}input${0}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
      <div>{number.operator === 'NONE' ? '?' : number.operator}</div>
      {getNumberRow(puzzle, number.numberInputs?.[1], `${rowKey}input${1}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
      <div style={{ height: '1em' }}></div>
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
