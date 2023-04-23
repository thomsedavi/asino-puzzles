import { Dispatch, SetStateAction } from "react";
import { BraiderlyGame, BraiderlyPage } from "../../common/interfaces";
import { tidyString } from "../../common/utils";
import { getRandomId } from "./Common";

export const createPage = (createdPage: {description: string} | undefined,
                           braiderlyGame: BraiderlyGame,
                           setCreatedPage: (createdPage: undefined) => void,
                           setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>,
                           setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (createdPage === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedPage: BraiderlyPage = { description: tidyString(createdPage.description) };
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
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
                           setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (updatedPage === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedPage: BraiderlyPage | undefined = braiderlyGame?.pages?.filter(page => page.id === updatedPage.id)[0];

  if (cleanedPage === undefined)
    return;
  
  // requires a description
  if (cleanedPage.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  // any other cleanup stuff goes here
}
