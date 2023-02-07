// ideas:
// * Some options only available when requirements are met

export interface ThingPuzzle {
  indexPageId?: string;
  variables?: (ThingVariableSet | ThingVariabelEvaluated)[];
  pages?: ThingPage[];
  elements?: (ThingElement | ThingElementGroup | ThingElementInput)[];
}

export interface ThingElement {
  id?: string;
  name?: string;
  type?: 'ELEMENT_PARAGRAPH' | 'ELEMENT_HEADING_2';
  spans?: (ThingSpanString | ThingSpanVariable)[];
  isVariableId?: string;
  isNotVariable?: boolean;
}

export interface ThingElementInput {
  id?: string;
  name?: string;
  type?: 'ELEMENT_INPUT';
  variableId?: string;
  isVariableId?: string;
  isNotVariable?: boolean;
}

export interface ThingElementGroup {
  id?: string;
  name?: string;
  type?: 'ELEMENT_GROUP';
  isVariableId?: string;
  isNotVariable?: boolean;
}

export interface ThingSpanString {
  type?: 'STRING';
  string?: string;
  isVariableId?: string;
  isNotVariable?: boolean;
}

export interface ThingSpanVariable {
  type?: 'VARIABLE';
  variableId?: string;
  isVariableId?: string;
  isNotVariable?: boolean;

}

export interface ThingVariableSet {
  id?: string;
  name?: string;
  type?: 'VARIABLE_SET_STRING' | 'VARIABLE_SET_NUMBER' | 'VARIABLE_SET_BOOLEAN';
  placeholder?: string;
  defaultOptionId?: string;
  defaultValue?: string;
  options?: ThingSelectOptionString[];
}

export interface ThingSelectOptionString {
  id?: string;
  value?: string;
}

export interface ThingVariabelEvaluated {
  id?: string;
  name?: string;
  type?: 'VARIABLE_EVALUATED';
  expression?: 'SUBSTITUTE_OPTION' | 'IS_VARIABLE_SET' | 'IS_VARIABLE_OPTION';
  variableId?: string,
  options?: ThingSelectOptionString[];
  optionId?: string;
}

export interface ThingPage {
  id?: string;
  elementIds?: string[];
}

export interface ThingSetVariable {
  variableId?: string;
  value?: string;
  optionId?: string;
}

export const ThingTest: ThingPuzzle = {
  indexPageId: 'home',
  variables: [
    {
      id: 'char1class',
      name: 'Character 1 Class',
      type: 'VARIABLE_SET_STRING',
      options: [{id: 'BARD', value: 'Bard'}, {id: 'ROGUE', value: 'Rogue'}],
      placeholder: 'Character 1 Class'
    },
    {
      id: 'char1classlowercase',
      name: 'Character 1 Class Lower Case',
      type: 'VARIABLE_EVALUATED',
      expression: 'SUBSTITUTE_OPTION',
      variableId: 'char1class',
      options: [{id: 'BARD', value: 'bard'}, {id: 'ROGUE', value: 'rogue'}]
    },
    {
      id: 'bardinstrument',
      name: 'Bard Instrument',
      type: 'VARIABLE_SET_STRING',
      options: [{id: 'HARP', value: 'Harp'}, {id: 'LUTE', value: 'Lute'}, {id: 'KAZOO', value: 'Kazoo'}],
      placeholder: 'Bard Instrument'
    },
    {
      id: 'bardinstrumentlowercase',
      name: 'Bard Instgrument Lower Case',
      type: 'VARIABLE_EVALUATED',
      expression: 'SUBSTITUTE_OPTION',
      variableId: 'bardinstrument',
      options: [{id: 'HARP', value: 'harp'}, {id: 'LUTE', value: 'lute'}, {id: 'KAZOO', value: 'kazoo'}]
    },
    {
      id: 'char1name',
      name: 'Character 1 Name',
      type: 'VARIABLE_SET_STRING',
      placeholder: 'Character 1 Name',
      defaultValue: 'Incognito'
    },
    {
      id: 'ischar1classset',
      name: 'Is Character 1 Class Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_SET',
      variableId: 'char1class'
    },
    {
      id: 'ischar1classbard',
      name: 'Is Character 1 Bard',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_OPTION',
      variableId: 'char1class',
      optionId: 'BARD'
    },
    {
      id: 'ischar1classrogue',
      name: 'Is Character 1 Rogue',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_OPTION',
      variableId: 'char1class',
      optionId: 'ROGUE'
    },
    {
      id: 'isbardinstrumentset',
      name: 'Is Bard Instrument Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_SET',
      variableId: 'bardinstrument'
    },
    {
      id: 'ischar1nameset',
      name: 'Is Character 1 Name Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_SET',
      variableId: 'char1name'
    }
  ],
  pages: [
    {
      id: 'home',
      elementIds: [
        'introheading',
        'char1cselectparagraph',
        'char1cinput',
        'char1isrogueparagraph',
        'char1isbardparagraph',
        'bardinstrumentinput',
        'char1nselectparagraph',
        'char1ninput',
        'char1nresult',
        'theend'
      ]
    }
  ],
  elements: [
    {
      id: 'introheading',
      name: 'Introduction',
      type: 'ELEMENT_HEADING_2',
      spans: [
        {
          type: 'STRING',
          string: 'You are going on an adventure!'
        }
      ]
    },
    {
      id: 'char1cselectparagraph',
      name: 'Character 1 Class Select Text',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'What is the class of your first adventurer?'
        }
      ],
      isVariableId: 'ischar1classset',
      isNotVariable: true
    },
    {
      id: 'char1nselectparagraph',
      name: 'Character 1 Name Select Text',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'What is the name of your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'STRING',
          string: '?'
        }
      ],
      isVariableId: 'ischar1nameset',
      isNotVariable: true
    },
    {
      id: 'char1cinput',
      name: 'Character 1 Class Select Input',
      type: 'ELEMENT_INPUT',
      variableId: 'char1class'
    },
    {
      id: 'char1ninput',
      name: 'Character 1 Name Input',
      type: 'ELEMENT_INPUT',
      variableId: 'char1name'
    },
    {
      id: 'char1isrogueparagraph',
      name: 'Character 1 Is Bard Paragraph',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'Huzzah, your party has a rogue!'
        }
      ],
      isVariableId: 'ischar1classrogue'
    },
    {
      id: 'char1nresult',
      name: 'Character 1 Name Result',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'Your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'STRING',
          string: 'is named'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1name'
        },
        {
          type: 'STRING',
          string: '.'
        }
      ]
    },
    {
      id: 'char1isbardparagraph',
      name: 'Character 1 Is Bard Paragraph',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'Hurrah, your party has a bard!'
        },
        {
          type: 'STRING',
          string: 'What kind of instrument does your bard have?',
          isVariableId: 'isbardinstrumentset',
          isNotVariable: true
        },
        {
          type: 'STRING',
          string: 'And your bard has a',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'VARIABLE',
          variableId: 'bardinstrumentlowercase',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'STRING',
          string: '!',
          isVariableId: 'isbardinstrumentset'
        }
      ],
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'bardinstrumentinput',
      name: 'Bard Instrument Input',
      type: 'ELEMENT_INPUT',
      variableId: 'bardinstrument',
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'theend',
      name: 'The End',
      type: 'ELEMENT_PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          string: 'The End'
        }
      ]
    }
  ]
}
