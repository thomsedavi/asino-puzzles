import { BraiderGame, BraiderSetVariable, BraiderSpan } from "../Interfaces";

export const evaluateStringVariable = (puzzle: BraiderGame, variables: BraiderSetVariable[], stringVariableId?: string): BraiderSpan[] | undefined => {
  if (stringVariableId === undefined)
    return undefined;

  const variable = puzzle.variables?.filter(variable => variable.id === stringVariableId)[0];

  if (variable === undefined)
    return undefined;

  if (variable.type === 'EVALUATED') {
    if (variable.expression === 'SUBSTITUTE_OPTION') {
      var evalVar = variables.filter(v => v.variableId === variable.variableId)[0];

      if (evalVar !== undefined) {
        var substit = variable.options?.filter(v => v.id === evalVar.optionId)[0]?.spans;

        return substit;
      }
    }
  } else if (variable.type === 'INPUT') {
    var setVar = variables.filter(v => v.variableId === variable.id)[0];

    if (setVar === undefined)
      return undefined;

    if (setVar.optionId !== undefined && variable.options !== undefined) {
      const optionResult = variable.options.filter(o => o.id === setVar.optionId)[0];

      if (optionResult !== undefined)
        return optionResult.spans;
    } else if (setVar.value !== undefined) {
      return [{ type: 'TEXT', value: setVar.value }];
    }
  }
}

export const evaluateIsVariable = (braider: BraiderGame, variables: BraiderSetVariable[], isVariableId?: string): boolean | undefined => {
  if (isVariableId === undefined)
    return undefined;
    
  const variable = braider.variables?.filter(variable => variable.id === isVariableId)[0];

  if (variable === undefined)
    return undefined;

    if (variable.expression === 'IS_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet !== undefined;
    } else if (variable.expression === 'IS_NOT_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet === undefined;
    } else if (variable.expression === 'IS_OPTION' && variable.variableId !== undefined) {
      const setVariable = variables.filter(isVariableOption => isVariableOption.variableId === variable.variableId)[0];

      if (setVariable === undefined)
        return false;

      return setVariable.optionId === variable.optionId;
    }

    return undefined;
}
