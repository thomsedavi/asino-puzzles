import { BraiderlyGame, BraiderlyPage } from "../../common/interfaces";
import Utils from "../../common/utils";
import { getRandomId } from "./Common";

export const createPage = (createdPage: {description: string} | undefined,
                           braiderlyGame: BraiderlyGame,
                           setCreatedPage: (createdPage: undefined) => void,
                           setBraiderlyGame: (braiderlyGame: BraiderlyGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (createdPage === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedPage: BraiderlyPage = { description: Utils.tidyString(createdPage.description) };
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  if (braiderlyGame.pages?.filter(page => page.description?.toLowerCase() === cleanedPage.description?.toLowerCase()).length ?? 0 > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }

  // any other cleanup stuff goes here

  const existingPageIds: string[] = braiderlyGame.pages?.map(v => v.id ?? '') ?? [];

  cleanedPage.id = getRandomId(existingPageIds);

  setBraiderlyGame({ ...braiderlyGame, pages: [...braiderlyGame.pages ?? [], cleanedPage]});
  setCreatedPage(undefined);  
}

export const updatePage = (updatedPage: {id: string, description: string} | undefined,
                           braiderlyGame: BraiderlyGame,
                           setUpdatedPage: (updatedPage: undefined) => void,
                           setBraiderlyGame: (braiderlyGame: BraiderlyGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (updatedPage === undefined)
    return;

  setErrorMessage(undefined);

  const cleanedPage: BraiderlyPage = { id: updatedPage.id, description: Utils.tidyString(updatedPage.description) };
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  if (braiderlyGame.pages?.filter(page => page.id !== cleanedPage.id && page.description?.toLowerCase() === cleanedPage.description?.toLowerCase()).length ?? 0 > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }

  // any other cleanup stuff goes here

  const existingPage = braiderlyGame.pages?.filter(page => page.id === cleanedPage.id)[0];

  if (existingPage === undefined)
    return;

  cleanedPage.elementIds = [...existingPage.elementIds ?? []];

  const existingPageIndex = braiderlyGame.pages?.indexOf(existingPage);

  existingPageIndex !== undefined && setBraiderlyGame({ ...braiderlyGame, pages: [...braiderlyGame.pages?.slice(0, existingPageIndex) ?? [], cleanedPage, ...braiderlyGame.pages?.slice(existingPageIndex + 1) ?? []]});
  setUpdatedPage(undefined);
}

export const deletePage = (deletedPageId: string | undefined,
                           braiderlyGame: BraiderlyGame,
                           setDeletedPageId: (deletedPageId: undefined) => void,
                           setBraiderlyGame: (braiderlyGame: BraiderlyGame | undefined) => void,
                           setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (deletedPageId === undefined)
    return;

  if (deletedPageId === braiderlyGame.defaultPageId) {
    setErrorMessage('Cannot Delete Default Page');
    return;
  }

  const existingPage = braiderlyGame.pages?.filter(page => page.id === deletedPageId)[0];
  
  if (existingPage === undefined)
    return;

  const existingPageIndex = braiderlyGame.pages?.indexOf(existingPage);

  existingPageIndex !== undefined && setBraiderlyGame({ ...braiderlyGame, pages: [...braiderlyGame.pages?.slice(0, existingPageIndex) ?? [], ...braiderlyGame.pages?.slice(existingPageIndex + 1) ?? []]});
  setDeletedPageId(undefined);
}
