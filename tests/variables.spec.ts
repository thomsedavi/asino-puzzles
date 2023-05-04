import { BraiderGame, BraiderSelectOptionString } from '../src/braider/Interfaces';
import { createVariable } from '../src/braider/functions/Variables';
import { test, expect } from '@playwright/test';
import Utils from '../src/common/utils';

test('Can Create Is Days Since Start Variable', () => {
  let _createdVariable: {description?: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', type?: 'INPUT' | 'EVALUATED', expression?: 'TEXT_FROM_OPTION_SUBSTITUTED' | 'IS_DAYS_SINCE_START', options?: BraiderSelectOptionString[], defaultValue?: string, value?: string, defaultOptionId?: string, variableId?: string} | undefined = {
    type: 'EVALUATED',
    format: 'BOOLEAN',
    expression: 'IS_DAYS_SINCE_START',
    value: '1'
  };
  const setCreatedVariable = (createdVariable: {description: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', type?: 'INPUT' | 'EVALUATED', expression?: 'TEXT_FROM_OPTION_SUBSTITUTED' | 'IS_DAYS_SINCE_START', options?: BraiderSelectOptionString[], defaultValue?: string, value?: string, defaultOptionId?: string, variableId?: string} | undefined) => {
    _createdVariable = createdVariable;
  };

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame !== undefined && createVariable(_createdVariable, _braiderGame, setCreatedVariable, setBraiderGame, setErrorMessage);

  expect(_createdVariable).toBeUndefined();
  expect(_braiderGame.variables?.length).toBe(1);
  expect((_braiderGame.variables ?? [])[0].id).toBeDefined();
  expect((_braiderGame.variables ?? [])[0].type).toBe('EVALUATED');
  expect((_braiderGame.variables ?? [])[0].format).toBe('BOOLEAN');
  expect((_braiderGame.variables ?? [])[0].expression).toBe('IS_DAYS_SINCE_START');
  expect((_braiderGame.variables ?? [])[0].value).toBe('1');
  expect(_errorMessage).toBeUndefined();
});
