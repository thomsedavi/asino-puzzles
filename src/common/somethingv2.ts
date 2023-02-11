export interface ThingPuzzle {
  defaultPageId?: string;
  variables?: (ThingVariableSet | ThingVariabelEvaluated)[];
  pages?: ThingPage[];
  elements?: (ThingElement | ThingElementGroup | ThingElementInput)[];
}

export interface ThingElement {
  id?: string;
  name?: string;
  type?: 'PARAGRAPH' | 'HEADING_2';
  spans?: (ThingSpanValue | ThingSpanGroup | ThingSpanVariable)[];
  isVariableId?: string;
}

export interface ThingElementInput {
  id?: string;
  name?: string;
  type?: 'INPUT';
  variableId?: string;
  isVariableId?: string;
}

export interface ThingElementGroup {
  id?: string;
  name?: string;
  type?: 'GROUP';
  elementIds?: string[];
  isVariableId?: string;
}

export interface ThingSpanGroup {
  type?: 'GROUP';
  spans?: (ThingSpanValue | ThingSpanGroup | ThingSpanVariable)[];
  style?: ThingStyle;
  isVariableId?: string;
  pageId?: string;
}

export interface ThingSpanValue {
  type?: 'STRING';
  value?: string;
  style?: ThingStyle;
  isVariableId?: string;
  pageId?: string;
}

export interface ThingSpanVariable {
  type?: 'VARIABLE';
  variableId?: string;
  style?: ThingStyle;
  isVariableId?: string;
  pageId?: string;
}

export interface ThingStyle {
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'italic';
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
  isVariableId?: string;
}

export interface ThingVariabelEvaluated {
  id?: string;
  name?: string;
  type?: 'VARIABLE_EVALUATED';
  expression?: 'SUBSTITUTE_OPTION' | 'IS_VARIABLE_SET' | 'IS_VARIABLE_NOT_SET' | 'IS_VARIABLE_OPTION';
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
  defaultPageId: 'home',
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
      id: 'startlocation',
      name: 'Start Location',
      type: 'VARIABLE_SET_STRING',
      options: [
        {id: 'BARD_HALL', value: 'Bard Hall', isVariableId: 'ischar1classbard'},
        {id: 'MUGGY_INN', value: 'Muggy Inn'},
        {id: 'ROGUE_COLLEGE', value: 'Rogue College', isVariableId: 'ischar1classrogue'}
      ],
      placeholder: 'Start Location'
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
      id: 'ischar1classnotset',
      name: 'Is Character 1 Class Not Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'char1class'
    },
    {
      id: 'isstartlocationset',
      name: 'Is Start Location Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_SET',
      variableId: 'startlocation'
    },
    {
      id: 'isstartlocationnotset',
      name: 'Is Start Location Not Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'startlocation'
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
      id: 'isbardinstrumentnotset',
      name: 'Is Bard Instrument Not Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'bardinstrument'
    },
    {
      id: 'ischar1nameset',
      name: 'Is Character 1 Name Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_SET',
      variableId: 'char1name'
    },
    {
      id: 'ischar1namenotset',
      name: 'Is Character 1 Name Not Set',
      type: 'VARIABLE_EVALUATED',
      expression: 'IS_VARIABLE_NOT_SET',
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
        'startlocationinput',
        'startlocationdescription',
        'theend'
      ]
    },
    {
      id: 'info',
      elementIds: [
        'homelink',
        'elementgroup'
      ]
    }
  ],
  elements: [
    {
      id: 'test1',
      name: 'Test 1',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Test 1.'
        }
      ]
    },
    {
      id: 'test2',
      name: 'Test 1',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Test 2.'
        }
      ]
    },
    {
      id: 'elementgroup',
      name: 'Element Group',
      type: 'GROUP',
      elementIds: [
        'test1',
        'test2'
      ]
    },
    {
      id: 'homelink',
      name: 'Link back home',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Go back to'
        },
        {
          type: 'STRING',
          value: 'home',
          pageId: 'home'
        },
        {
          type: 'STRING',
          value: '.'
        }
      ]
    },
    {
      id: 'introheading',
      name: 'Introduction',
      type: 'HEADING_2',
      spans: [
        {
          type: 'STRING',
          value: 'You are going on an adventure!'
        }
      ]
    },
    {
      id: 'char1cselectparagraph',
      name: 'Character 1 Class Select Text',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'What is the class of your first adventurer?'
        }
      ],
      isVariableId: 'ischar1classnotset'
    },
    {
      id: 'char1nselectparagraph',
      name: 'Character 1 Name Select Text',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'What is the name of your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'STRING',
          value: '?'
        }
      ],
      isVariableId: 'ischar1namenotset'
    },
    {
      id: 'char1cinput',
      name: 'Character 1 Class Select Input',
      type: 'INPUT',
      variableId: 'char1class'
    },
    {
      id: 'char1ninput',
      name: 'Character 1 Name Input',
      type: 'INPUT',
      variableId: 'char1name'
    },
    {
      id: 'char1isrogueparagraph',
      name: 'Character 1 Is Bard Paragraph',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Huzzah, your party has a rogue!'
        }
      ],
      isVariableId: 'ischar1classrogue'
    },
    {
      id: 'char1nresult',
      name: 'Character 1 Name Result',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'STRING',
          value: 'is named'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1name'
        },
        {
          type: 'STRING',
          value: '.'
        }
      ]
    },
    {
      id: 'char1isbardparagraph',
      name: 'Character 1 Is Bard Paragraph',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'Hurrah, your party has a bard!'
        },
        {
          type: 'STRING',
          value: 'What kind of instrument does your bard have?',
          isVariableId: 'isbardinstrumentnotset'
        },
        {
          type: 'STRING',
          value: 'And your bard has a',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'VARIABLE',
          variableId: 'bardinstrumentlowercase',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'STRING',
          value: '!',
          isVariableId: 'isbardinstrumentset'
        }
      ],
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'bardinstrumentinput',
      name: 'Bard Instrument Input',
      type: 'INPUT',
      variableId: 'bardinstrument',
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'startlocationinput',
      name: 'Start Location Input',
      type: 'INPUT',
      variableId: 'startlocation'
    },
    {
      id: 'startlocationdescription',
      name: 'Start Location Description',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'You are at the'
        },
        {
          type: 'VARIABLE',
          variableId: 'startlocation'
        },
        {
          type: 'STRING',
          value: '.'
        },
        {
          type: 'GROUP',
          pageId: 'info',
          spans: [
            {
              type: 'VARIABLE',
              variableId: 'char1name'
            },
            {
              type: 'STRING',
              value: 'is sitting in the corner practicing their lock picking.'
            }
          ],
          isVariableId: 'ischar1classrogue'
        },
        {
          type: 'GROUP',
          pageId: 'info',
          spans: [
            {
              type: 'VARIABLE',
              variableId: 'char1name'
            },
            {
              type: 'STRING',
              value: 'is sitting in the corner practicing their',
              style: {
                fontStyle: 'italic'
              }
            },
            {
              type: 'VARIABLE',
              style: {
                fontWeight: 'normal'
              },
              variableId: 'bardinstrumentlowercase'
            },
            {
              type: 'STRING',
              value: '.'
            }
          ],
          style: {
            fontWeight: 'bold'
          },
          isVariableId: 'ischar1classbard'
        }
      ]
    },
    {
      id: 'theend',
      name: 'The End',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'STRING',
          value: 'The End'
        }
      ]
    }
  ]
}
