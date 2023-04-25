import { BraiderlyGame, BraiderlyVariable, getExpressionDescription } from "../../common/interfaces";

const numbers = '1234567890';

export const getRandomId = (ids: string[]): string => {
  let template = [
    ['#', '-', '#', '#'],
    ['#', '-', '#', '#', '#'],
    ['#', '#', '-', '#', '#', '#'],
    ['#', '-', '#', '#', '-', '#', '#', '#'],
    ['#', '#', '#', '-', '#', '#', '#', '#'],
    ['#', '-', '#', '#', '#', '-', '#', '#', '#', '#']
  ];
  let id = '';
  let isNew = false;

  for (let i = 0; i < template.length && !isNew; i++) {
    id = template[i].map(t => t === '#' ? numbers[Math.floor(Math.random() * numbers.length)] : '-').join('');
    isNew = ids.indexOf(id) === -1;
  }

  return id;
}

export const getDescription = (variable: { description?: string, type?: string, variableId?: string, expression?: string, optionId?: string }, braiderlyGame: BraiderlyGame | undefined): string => {
  if (variable.type !== 'SYSTEM') {
    return variable.description ?? '';
  } else {
    const nestedVariable: BraiderlyVariable = braiderlyGame?.variables?.filter(v => v.id === variable.variableId)[0] ?? {};
    const nestedVariableDescription: string = getDescription(nestedVariable, braiderlyGame);

    if (variable.optionId === undefined) {
      return getExpressionDescription(variable.expression ?? 'NONE', [nestedVariableDescription]);
    } else {
      const myvariable = braiderlyGame?.variables?.filter(thisvariable => (thisvariable.options?.filter(option => option.id === variable.optionId).length ?? 0) > 0)[0];
      const myoption = myvariable?.options?.filter(thisoption => thisoption.id === variable.optionId)[0];
      let spanDescription: string = '';

      myoption?.spans?.forEach(span => {
        span.value && (spanDescription += span.value);
      });

      return getExpressionDescription(variable.expression ?? 'NONE', [nestedVariableDescription, spanDescription]);
    }
  }
}
