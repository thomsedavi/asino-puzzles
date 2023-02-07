import React from 'react';
import { Button, ButtonGroup, Container, Heading2, MyParagraph, MyHeading2, MySpan, Overlay, Placeholder } from '../common/styled';
import { User } from '../interfaces';
import Layout from './Layout';
import { ThingElement, ThingElementGroup, ThingElementInput, ThingPage, ThingSelectOptionString, ThingSetVariable, ThingSpanString, ThingSpanVariable, ThingTest } from '../common/somethingv2';

interface SomethingProps {
  user?: User | null;
}

const isElementGroup = (element: ThingElement | ThingElementGroup | ThingElementInput): element is ThingElementGroup => {
  return element.type === 'ELEMENT_GROUP';
}

const isElementInput = (element: ThingElement | ThingElementGroup | ThingElementInput): element is ThingElementInput => {
  return element.type === 'ELEMENT_INPUT';
}

const isSpanString = (span: ThingSpanString | ThingSpanVariable): span is ThingSpanString => {
  return span.type === 'STRING';
}

const evaluateStringVariable = (variables: ThingSetVariable[], stringVariableId?: string): string | undefined => {
  if (stringVariableId === undefined)
    return undefined;

  const variable = ThingTest.variables?.filter(variable => variable.id === stringVariableId)[0];

  if (variable === undefined)
    return undefined;

  if (variable.type === 'VARIABLE_EVALUATED') {
    if (variable.expression === 'SUBSTITUTE_OPTION') {
      var setVar = variables.filter(v => v.variableId === variable.variableId)[0];

      if (setVar !== undefined) {
        var substit = variable.options?.filter(v => v.id === setVar.optionId)[0]?.value;

        return substit;
      }
    }
  } else if (variable.type === 'VARIABLE_SET_STRING') {
    var setVar = variables.filter(v => v.variableId === variable.id)[0];

    if (setVar === undefined)
      return undefined;

    if (setVar.optionId !== undefined && variable.options !== undefined) {
      const optionResult = variable.options.filter(o => o.id === setVar.optionId)[0];

      if (optionResult !== undefined)
        return optionResult.value;
    } else if (setVar.value !== undefined) {
      return setVar.value;
    }
  }
}

const evaluateIsVariable = (variables: ThingSetVariable[], isVariableId?: string): boolean | undefined => {
  if (isVariableId === undefined)
    return undefined;
    
  const variable = ThingTest.variables?.filter(variable => variable.id === isVariableId)[0];

  if (variable === undefined)
    return undefined;

  if (variable.type === 'VARIABLE_EVALUATED') {
    if (variable.expression === 'IS_VARIABLE_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet !== undefined;
    } else if (variable.expression === 'IS_VARIABLE_OPTION' && variable.variableId !== undefined) {
      const setVariable = variables.filter(isVariableOption => isVariableOption.variableId === variable.variableId)[0];

      if (setVariable === undefined)
        return false;

      return setVariable.optionId === variable.optionId;
    }
  }

  return undefined;
}

const insertSpace = (text: string): string => {
  const punctuation = [',', '!', '?', '.'];

  if (punctuation.indexOf(text[0]) !== -1)
    return '';

  return ' ';
}

const drawElements = (elementIds: string[], elements: JSX.Element[], variables: ThingSetVariable[], keys: number[], tempValues: ThingSetVariable[], updateTempValue: (variableId?: string, value?: string) => void, saveTempValue: (variable?: string) => void): void => {
  let encounteredInput = false;

  elementIds.forEach((elementId: string, elementIndex: number) => {
    if (encounteredInput)
     return;

    const element: (ThingElement | ThingElementGroup | ThingElementInput) = ThingTest.elements?.filter(element => element.id === elementId)[0] ?? {};

    let isResult = evaluateIsVariable(variables, element.isVariableId);

    if (isResult !== undefined) {
      if (element.isNotVariable)
        isResult = !isResult;

      if (!isResult)
        return;
    }

    if (isElementGroup(element)) {

    } else if (isElementInput(element)) {
      // do not show variables if they have been set
      const selectedVariable = variables.filter(varble => varble.variableId === element.variableId)[0];

      if (selectedVariable !== undefined)
        return;

      const elementVariable = ThingTest.variables?.filter(variable => variable.id === element.variableId)[0] ?? {};

      if (elementVariable.type === 'VARIABLE_SET_STRING') {
        if (elementVariable.options !== undefined) {
          const setVariable = tempValues.filter(variable => element.variableId === variable.variableId)[0]?.optionId ?? '';
          var options: JSX.Element[] = [];
    
          elementVariable.options.forEach((option: ThingSelectOptionString, optionIndex: number) => {
            options.push(<option key={`element${keys.join('-')}-${elementIndex}option${optionIndex}`} value={option.id}>{option.value}</option>);
          });

          elements.push(<select key={`element${keys.join('-')}-${elementIndex}`} id={elementVariable.id} value={setVariable} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => updateTempValue(elementVariable.id, event.currentTarget.value)}><option value="" disabled>{elementVariable.placeholder}</option>{options}</select>);
          elements.push(<button key={`division${keys.join('-')}-${elementIndex}button`} onClick={() => saveTempValue(element.variableId)}>Save</button>);
        } else {
          const setVariable = tempValues.filter(variable => element.variableId === variable.variableId)[0]?.value ?? '';

          elements.push(<input type="text" key={`division${keys.join('-')}-${elementIndex}input`} id={elementVariable.id}
                                value={setVariable}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateTempValue(elementVariable.id, event.currentTarget.value)}} />);
          elements.push(<button key={`division${keys.join('-')}-${elementIndex}button`} onClick={() => saveTempValue(element.variableId)}>Save</button>);
        }
      }

      encounteredInput = true;
    } else {
      const spans: JSX.Element[] = [];

      element.spans?.forEach((span: ThingSpanString | ThingSpanVariable, spanIndex: number) => {
        let isResultSpan = evaluateIsVariable(variables, span.isVariableId);

        if (isResultSpan !== undefined) {
          if (span.isNotVariable)
            isResultSpan = !isResultSpan;
    
          if (!isResultSpan)
            return;
        }

        if (isSpanString(span)) {
          span.string && spans.push(<MySpan key={`element${keys.join('-')}-${elementIndex}span${spanIndex}`}>{insertSpace(span.string)}{span.string}</MySpan>);
        } else {
          let resultSpan = evaluateStringVariable(variables, span.variableId);

          resultSpan !== undefined && spans.push(<MySpan key={`element${keys.join('-')}-${elementIndex}span${spanIndex}`}>{insertSpace(resultSpan)}{resultSpan}</MySpan>);
        }
      });

      if (element.type === 'ELEMENT_PARAGRAPH') {
        elements.push(<MyParagraph key={`element${keys.join('-')}-${elementIndex}`}>{spans}</MyParagraph>);
      } else if (element.type === 'ELEMENT_HEADING_2') {
        elements.push(<MyHeading2 key={`element${keys.join('-')}-${elementIndex}`}>{spans}</MyHeading2>);
      }
    }

    //if (isElementCondition(element)) {
    //  const result: boolean = isExpression(division.expression, variables);

    //  result && division.divisions && drawElements(division.divisions, divisions, variables, [...keys, divisionIndex], tempValues, selectVariable, updateTempValue, saveTempValue);
    //} else if (isElement(division)) {
    //  division.elements?.forEach((element: SomethingSpanCondition | SomethingSpan, elementIndex: number) => {
    //    } else {
    //      const value: string | undefined = variables.filter(v => v.variable === element.variable)[0].value;
    //      const text: string | undefined = value && SomethingTest.variables?.filter(v => element.variable)[0]?.options?.filter(o => o.value === value)[0]?.text;
    //
    //      text && elements.push(<MySpan key={`division${keys.join('-')}-${divisionIndex}element${elementIndex}`}>{text}</MySpan>);
    //    }
    //  });
    //} else {
    //  const variable: SomethingVariable = SomethingTest.variables?.filter(variable => variable.id === division.variable)[0] ?? {};
    //}
  });
}

const Something = (props: SomethingProps): JSX.Element => {
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [ pageId ] = React.useState<string | undefined>(ThingTest.indexPageId);
  const [ variables, setVariables ] = React.useState<ThingSetVariable[]>([]);
  const [ tempValues, setTempValues ] = React.useState<ThingSetVariable[]>([]);

  const onClickLoader = () => {
    setIsLoading(true);
  }

  const updateTempValue = (variableId?: string, value?: string): void => {
    if (variableId === undefined || value === undefined )
      return;

    const currentTempValues = [...tempValues];

    const gameVariable = ThingTest.variables?.filter(v => v.id === variableId)[0] ?? {};

    const variable = currentTempValues.filter(varb => varb.variableId === variableId)[0];

    if ((gameVariable.type === 'VARIABLE_SET_STRING') && gameVariable.options !== undefined) {
      if (variable === undefined) {
        currentTempValues.push({variableId: variableId, optionId: value});
      } else {
        variable.optionId = value;
      }
    } else {
      if (variable === undefined) {
        currentTempValues.push({variableId: variableId, value: value});
      } else {
        variable.value = value;
      }
    }

    setTempValues(currentTempValues);
  }

  const saveTempValue = (variableId?: string): void => {
    const currentVariables = [...variables];

    const gameVariable = ThingTest.variables?.filter(v => v.id === variableId)[0] ?? {};

    const variable = currentVariables.filter(varb => varb.variableId === variableId)[0];
    const tempVariable = tempValues.filter(varb => varb.variableId === variableId)[0];

    if ((gameVariable.type === 'VARIABLE_SET_STRING') && gameVariable.options !== undefined) {
      if (variable === undefined) {
        currentVariables.push({variableId: variableId, optionId: tempVariable.optionId});
      } else {
        variable.optionId = tempVariable.optionId;
      }
    } else {
      if (variable === undefined) {
        currentVariables.push({variableId: variableId, value: tempVariable.value});
      } else {
        variable.value = tempVariable.value;
      }
    }

    setVariables(currentVariables);
  }

  const page: ThingPage = ThingTest.pages?.filter(page => page.id === pageId)[0] ?? {};

  const elements: JSX.Element[] = [];

  page.elementIds && drawElements(page.elementIds ?? [], elements, variables, [], tempValues, updateTempValue, saveTempValue);

  return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        <ButtonGroup>
         <Button onClick={() => { setVariables([]); setTempValues([]) }}>Reset</Button> 
        </ButtonGroup>
        <Heading2>Test</Heading2>
        {elements}
      </Container>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Something;
