import { createPage } from '../src/braiderly/functions/Pages';
import { test, expect } from '@playwright/test';
import { BraiderlyGame } from '../src/common/interfaces';
import Utils from '../src/common/utils';

test('Can Create Page', () => {
  let _createdPage: {description: string} | undefined = {description: '  Page  Description  '}
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame && createPage(_createdPage, _braiderlyGame, setCreatedPage, setBraiderlyGame, setErrorMessage);
  expect(_createdPage).toBe(undefined);
  expect(_braiderlyGame.pages?.length).toBe(2);
  expect(_errorMessage).toBe(undefined);
});

test('Cannot Create Page With No Description', () => {
  let _createdPage: {description: string} | undefined = {description: '  '}
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame && createPage(_createdPage, _braiderlyGame, setCreatedPage, setBraiderlyGame, setErrorMessage);
  expect(_createdPage?.description).toBe('  ');
  expect(_braiderlyGame.pages?.length).toBe(1);
  expect(_errorMessage).toBe('Description Required');
});
