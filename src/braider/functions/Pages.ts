import Utils from "../../common/utils";
import { BraiderGame, BraiderPage } from "../Interfaces";
import { getRandomId } from "./Common";

export const createPage = (createdPage: {description: string} | undefined,
                           braiderGame: BraiderGame,
                           setCreatedPage: (createdPage: undefined) => void,
                           setBraiderGame: (braiderGame: BraiderGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (createdPage === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedPage: BraiderPage = { description: Utils.tidyString(createdPage.description) };
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  if ((braiderGame.pages?.filter(page => page.description?.toLowerCase() === cleanedPage.description?.toLowerCase()).length ?? 0) > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }

  // any other cleanup stuff goes here

  const existingPageIds: string[] = braiderGame.pages?.map(v => v.id ?? '') ?? [];

  cleanedPage.id = getRandomId(existingPageIds);

  setBraiderGame({ ...braiderGame, pages: [...braiderGame.pages ?? [], cleanedPage]});
  setCreatedPage(undefined);  
}

export const updatePage = (updatedPage: {id: string, description: string} | undefined,
                           braiderGame: BraiderGame,
                           setUpdatedPage: (updatedPage: undefined) => void,
                           setBraiderGame: (braiderGame: BraiderGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (updatedPage === undefined)
    return;

  setErrorMessage(undefined);

  const cleanedPage: BraiderPage = { id: updatedPage.id, description: Utils.tidyString(updatedPage.description) };
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  if ((braiderGame.pages?.filter(page => page.id !== cleanedPage.id && page.description?.toLowerCase() === cleanedPage.description?.toLowerCase()).length ?? 0) > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }

  // any other cleanup stuff goes here

  const existingPage = braiderGame.pages?.filter(page => page.id === cleanedPage.id)[0];

  if (existingPage === undefined)
    return;

  cleanedPage.elementIds = [...existingPage.elementIds ?? []];

  const existingPageIndex = braiderGame.pages?.indexOf(existingPage);

  existingPageIndex !== undefined && setBraiderGame({ ...braiderGame, pages: [...braiderGame.pages?.slice(0, existingPageIndex) ?? [], cleanedPage, ...braiderGame.pages?.slice(existingPageIndex + 1) ?? []]});
  setUpdatedPage(undefined);
}

export const deletePage = (deletedPageId: string | undefined,
                           braiderGame: BraiderGame,
                           setDeletedPageId: (deletedPageId: undefined) => void,
                           setBraiderGame: (braiderGame: BraiderGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (deletedPageId === undefined)
    return;

  if (deletedPageId === braiderGame.defaultPageId) {
    setErrorMessage('Cannot Delete Default Page');
    return;
  }

  const existingPage = braiderGame.pages?.filter(page => page.id === deletedPageId)[0];
  
  if (existingPage === undefined)
    return;

  const existingPageIndex = braiderGame.pages?.indexOf(existingPage);

  existingPageIndex !== undefined && setBraiderGame({ ...braiderGame, pages: [...braiderGame.pages?.slice(0, existingPageIndex) ?? [], ...braiderGame.pages?.slice(existingPageIndex + 1) ?? []]});
  setDeletedPageId(undefined);
}
