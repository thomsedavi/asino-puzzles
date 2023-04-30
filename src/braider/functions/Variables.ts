import { Dispatch, SetStateAction } from "react";
import { getRandomId } from "./Common";
import Utils from "../../common/utils";
import { BraiderGame, BraiderSelectOptionString, BraiderVariable } from "../Interfaces";

export const createVariable = (createdVariable: {description: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', type?: 'INPUT' | 'EVALUATED', expression?: 'SUBSTITUTE_OPTION', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string, variableId?: string} | undefined,
                               braiderGame: BraiderGame,
                               setCreatedVariable: (createdVariable: undefined) => void,
                               setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                               setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (createdVariable === undefined)
    return;
  
  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedVariable: BraiderVariable = { type: createdVariable.type, description: Utils.tidyString(createdVariable.description) };

  // requires a description
  if (cleanedVariable.description === '') {
    setErrorMessage('Description Required');
    return;
  }
  
  // requires a type
  if (cleanedVariable.type === undefined) {
    setErrorMessage('Type Required');
    return;
  }

  // cannot create a new variable with an existing name, or rename an old variable to have a different existing name
  if ((braiderGame.variables?.filter(v => v.description?.toLowerCase() === cleanedVariable.description!.toLowerCase()).length ?? [].length) > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }
  
  // format is required
  if (createdVariable.format === undefined) {
    setErrorMessage('Format Required');
    return;
  } else {
    cleanedVariable.format = createdVariable.format;
  }
  
  if (cleanedVariable.type === 'INPUT') {
    cleanedVariable.options = createdVariable.options;

    if (cleanedVariable.options === undefined) {
      if (Utils.tidyString(createdVariable.defaultValue) === '') {
        setErrorMessage(`Default ${cleanedVariable.description} Required`);
        return;  
      } else {
        cleanedVariable.defaultValue = Utils.tidyString(createdVariable.defaultValue);
      }
    }

    if (cleanedVariable.options !== undefined) {
      if (createdVariable.defaultOptionId === undefined) {
        setErrorMessage('Default Option Required');
        return;  
      } else {
        cleanedVariable.defaultOptionId = createdVariable.defaultOptionId;
      }
    }

    // any other cleanup stuff goes here

    const existingVariableIds: string[] = braiderGame.variables?.map(v => v.id ?? '') ?? [];

    cleanedVariable.id = getRandomId(existingVariableIds);
    existingVariableIds.push(cleanedVariable.id);

    const isVariableSet: BraiderVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_SET', variableId: cleanedVariable.id };
    isVariableSet.id = getRandomId(existingVariableIds);
    existingVariableIds.push(isVariableSet.id);

    const isVariableNotSet: BraiderVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_NOT_SET', variableId: cleanedVariable.id };
    isVariableNotSet.id = getRandomId(existingVariableIds);
    existingVariableIds.push(isVariableNotSet.id);

    const isOptionVariables: BraiderVariable[] = []

    cleanedVariable.options?.forEach(option => {
      const isVariableOption: BraiderVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_OPTION', variableId: cleanedVariable.id, optionId: option.id };
      isVariableOption.id = getRandomId(existingVariableIds);
      existingVariableIds.push(isVariableOption.id);        
      isOptionVariables.push(isVariableOption);
    });

    setBraiderGame({ ...braiderGame, variables: [...braiderGame.variables ?? [], cleanedVariable, isVariableSet, isVariableNotSet, ...isOptionVariables]});
    setCreatedVariable(undefined);    
  }
}

export const updateVariable = (updatedVariable: {id: string, description: string, format: 'TEXT' | 'NUMBER' | 'BOOLEAN', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined,
                               braiderGame: BraiderGame,
                               setUpdatedVariable: (updatedVariable: undefined) => void,
                               setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                               setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (updatedVariable === undefined)
    return;
  
  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedVariable: BraiderVariable | undefined = braiderGame?.variables?.filter(variable => variable.id === updatedVariable.id)[0];

  if (cleanedVariable === undefined)
    return;

  // requires a description
  if (cleanedVariable.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  // cannot create a new variable with an existing name, or rename an old variable to have a different existing name
  if ((braiderGame.variables?.filter(v => v.description?.toLowerCase() === cleanedVariable.description!.toLowerCase() && v.id !== updatedVariable.id).length ?? [].length) > 0) {
    setErrorMessage('Description Must Be Unique');
    return;
  }

  cleanedVariable.options = updatedVariable.options;

  if (cleanedVariable.options !== undefined) {
    if (updatedVariable.defaultOptionId === undefined) {
      setErrorMessage('Default Option Required');
      return;  
    } else {
      cleanedVariable.defaultOptionId = updatedVariable.defaultOptionId;
    }
  }

  if (cleanedVariable.options === undefined) {
    if (Utils.tidyString(updatedVariable.defaultValue) === '') {
      setErrorMessage(`Default ${cleanedVariable.description} Required`);
      return;  
    } else {
      cleanedVariable.defaultValue = Utils.tidyString(updatedVariable.defaultValue);
    }
  }

  // any other cleanup stuff goes here

  const existingVariable = braiderGame.variables!.filter(v => v.id === cleanedVariable.id)[0];
  const variableIndex = braiderGame.variables!.indexOf(existingVariable);
  setBraiderGame({...braiderGame, variables: [...braiderGame.variables!.slice(0, variableIndex), cleanedVariable, ...braiderGame.variables!.slice(variableIndex + 1)] });
  setUpdatedVariable(undefined);
}

export const deleteVariable = (deletedVariableId: string | undefined,
                               braiderGame: BraiderGame,
                               setDeletedVariableId: (deletedVariableId: undefined) => void,
                               setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                               setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (deletedVariableId === undefined)
    return;

  let myVariables = braiderGame.variables ?? [];

  const systemVariables = myVariables.filter(variable => variable.variableId === deletedVariableId);

  systemVariables?.forEach(systemVariable => {
    const variableIndex = myVariables.indexOf(systemVariable);

    if (variableIndex !== undefined && variableIndex !== -1) {
      myVariables = [...(myVariables.slice(0, variableIndex) ?? []), ...(myVariables.slice(variableIndex + 1) ?? [])];
    }
  });

  const myDeletedVariable = myVariables.filter(theVariable => theVariable.id === deletedVariableId)[0];

  const deletedVariableIndex = myVariables.indexOf(myDeletedVariable);

  if (deletedVariableIndex !== -1) {
    myVariables = [...(myVariables.slice(0, deletedVariableIndex) ?? []), ...(myVariables.slice(deletedVariableIndex + 1) ?? [])];
  }

  setBraiderGame({ ...braiderGame, variables: myVariables });
  setErrorMessage(undefined);
  setDeletedVariableId(undefined);
}
