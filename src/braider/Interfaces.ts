export interface BraiderGame {
  id?: string;
  userId?: string;
  userName?: string;
  title?: string;
  defaultPageId?: string;
  variables?: BraiderVariable[];
  pages?: BraiderPage[];
  elements?: BraiderElement[];
  dateCreated?: string;
  dateUpdated?: string;
}

export interface BraiderElement {
  id?: string;
  description?: string;
  type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP';
  spans?: BraiderSpan[];
  isVariableId?: string;
  variableId?: string;
  elementIds?: string[];
}

export interface BraiderSpan {
  type?: 'GROUP' | 'TEXT' | 'VARIABLE';
  spans?: BraiderSpan[];
  style?: BraiderStyle;
  isVariableId?: string;
  pageId?: string;
  value?: string;
  variableId?: string;
}

export interface BraiderStyle {
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'italic';
}

export interface BraiderVariable {
  id?: string;
  description?: string;
  type?: 'INPUT' | 'EVALUATED' | 'SYSTEM';
  format?: 'TEXT' | 'NUMBER' | 'BOOLEAN';
  expression?: 'TEXT_FROM_OPTION_SUBSTITUTED' | 'IS_VARIABLE_SET' | 'IS_VARIABLE_NOT_SET' | 'IS_VARIABLE_OPTION_SELECTED' | 'IS_DAYS_SINCE_START';
  variableId?: string;
  defaultOptionId?: string;
  defaultValue?: string;
  options?: BraiderSelectOptionString[];
  optionId?: string;
  value?: string;
}

export const getVariableFormat = (value: string): 'TEXT' | 'NUMBER' | 'BOOLEAN' | undefined => {
  switch (value) {
    case 'TEXT':
      return 'TEXT';
    case 'NUMBER':
      return 'NUMBER';
    case 'BOOLEAN':
      return 'BOOLEAN';
    default:
      return undefined;
  }
}

export const getVariableExpression = (value: string): 'TEXT_FROM_OPTION_SUBSTITUTED' | 'IS_DAYS_SINCE_START' | undefined => {
  switch (value) {
    case 'TEXT_FROM_OPTION_SUBSTITUTED':
      return 'TEXT_FROM_OPTION_SUBSTITUTED';
    case 'IS_DAYS_SINCE_START':
      return 'IS_DAYS_SINCE_START';
    default:
      return undefined;
  }
}

export const getSpanType = (value: string): 'GROUP' | 'TEXT' | 'VARIABLE' | undefined => {
  switch (value) {
    case 'TEXT':
      return 'TEXT';
    case 'VARIABLE':
      return 'VARIABLE';
    case 'GROUP':
      return 'GROUP';
    default:
      return undefined;
  }
}

export const getElementType = (value: string): 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP' | undefined => {
  switch (value) {
    case 'PARAGRAPH':
      return 'PARAGRAPH';
    case 'HEADING_2':
      return 'HEADING_2';
    case 'INPUT':
      return 'INPUT';
      case 'GROUP':
        return 'GROUP';
      default:
      return undefined;
  }
}

export const getExpressionDescription = (expression: string, values: string[]): string => {
  switch (expression) {
    case 'IS_VARIABLE_SET':
      return `Is {${values[0]}} Set`;
    case 'IS_VARIABLE_NOT_SET':
      return `Is {${values[0]}} Not Set`;
    case 'IS_VARIABLE_OPTION_SELECTED':
      return `Is {${values[0]}} Set To {${values[1]}}`; 
    case 'IS_DAYS_SINCE_START':
      return `Is {${values[0]}} Days Since Start`;
    default:
      return `Unknown Expression: {${expression}}`;
  }
}

export interface BraiderSelectOptionString {
  id?: string;
  spans?: BraiderSpan[];
  isVariableId?: string;
}

export interface BraiderPage {
  id?: string;
  description?: string;
  elementIds?: string[];
}

export interface BraiderSetVariable {
  variableId?: string;
  optionId?: string;
  value?: string;
}

export const ThingTest: BraiderGame = {
  defaultPageId: 'home',
  variables: [
    {
      id: 'char1class',
      description: 'Character 1 Class',
      type: 'INPUT',
      format: 'TEXT',
      options: [{id: 'BARD', spans: [{ type: 'TEXT', value: 'Bard' }]}, {id: 'ROGUE', spans: [{ type: 'TEXT', value: 'Rogue' }]}]
    },
    {
      id: 'char1classlowercase',
      description: 'Character 1 Class Lower Case',
      type: 'EVALUATED',
      format: 'TEXT',
      expression: 'TEXT_FROM_OPTION_SUBSTITUTED',
      variableId: 'char1class',
      options: [{id: 'BARD', spans: [{ type: 'TEXT', value: 'bard' }]}, {id: 'ROGUE', spans: [{ type: 'TEXT', value: 'rogue' }]}]
    },
    {
      id: 'bardinstrument',
      description: 'Bard Instrument',
      type: 'INPUT',
      format: 'TEXT',
      options: [{id: 'HARP', spans: [{ type: 'TEXT', value: 'Harp' }]}, {id: 'LUTE', spans: [{ type: 'TEXT', value: 'Lute' }]}, {id: 'KAZOO', spans: [{ type: 'TEXT', value: 'Kazoo' }]}]
    },
    {
      id: 'bardinstrumentlowercase',
      description: 'Bard Instgrument Lower Case',
      type: 'EVALUATED',
      format: 'TEXT',
      expression: 'TEXT_FROM_OPTION_SUBSTITUTED',
      variableId: 'bardinstrument',
      options: [{id: 'HARP', spans: [{ type: 'TEXT', value: 'harp' }]}, {id: 'LUTE', spans: [{ type: 'TEXT', value: 'lute' }]}, {id: 'KAZOO', spans: [{ type: 'TEXT', value: 'kazoo' }]}]
    },
    {
      id: 'startlocation',
      description: 'Start Location',
      type: 'INPUT',
      format: 'TEXT',
      options: [
        {id: 'BARD_HALL', spans: [{ type: 'TEXT', value: 'Bard Hall' }], isVariableId: 'ischar1classbard'},
        {id: 'MUGGY_INN', spans: [{ type: 'TEXT', value: 'Muggy Inn' }]},
        {id: 'ROGUE_COLLEGE', spans: [{ type: 'TEXT', value: 'Rogue College' }], isVariableId: 'ischar1classrogue'}
      ]
    },
    {
      id: 'char1name',
      description: 'Character 1 Name',
      type: 'INPUT',
      format: 'TEXT',
      defaultValue: 'Incognito'
    },
    {
      id: 'ischar1classset',
      description: 'Is Character 1 Class Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_SET',
      variableId: 'char1class'
    },
    {
      id: 'ischar1classnotset',
      description: 'Is Character 1 Class Not Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'char1class'
    },
    {
      id: 'isstartlocationset',
      description: 'Is Start Location Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_SET',
      variableId: 'startlocation'
    },
    {
      id: 'isstartlocationnotset',
      description: 'Is Start Location Not Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'startlocation'
    },
    {
      id: 'ischar1classbard',
      description: 'Is Character 1 Bard',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_OPTION_SELECTED',
      variableId: 'char1class',
      optionId: 'BARD'
    },
    {
      id: 'ischar1classrogue',
      description: 'Is Character 1 Rogue',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_OPTION_SELECTED',
      variableId: 'char1class',
      optionId: 'ROGUE'
    },
    {
      id: 'isbardinstrumentset',
      description: 'Is Bard Instrument Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_SET',
      variableId: 'bardinstrument'
    },
    {
      id: 'isbardinstrumentnotset',
      description: 'Is Bard Instrument Not Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'bardinstrument'
    },
    {
      id: 'ischar1nameset',
      description: 'Is Character 1 Name Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_SET',
      variableId: 'char1name'
    },
    {
      id: 'ischar1namenotset',
      description: 'Is Character 1 Name Not Set',
      type: 'SYSTEM',
      format: 'BOOLEAN',
      expression: 'IS_VARIABLE_NOT_SET',
      variableId: 'char1name'
    }
  ],
  pages: [
    {
      id: 'home',
      description: 'Home Page',
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
      description: 'Information Page',
      elementIds: [
        'homelink',
        'elementgroup'
      ]
    }
  ],
  elements: [
    {
      id: 'test1',
      description: 'Test 1',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Test 1.'
        }
      ]
    },
    {
      id: 'test2',
      description: 'Test 1',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Test 2.'
        }
      ]
    },
    {
      id: 'elementgroup',
      description: 'Element Group',
      type: 'GROUP',
      elementIds: [
        'test1',
        'test2'
      ]
    },
    {
      id: 'homelink',
      description: 'Link back home',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Go back to'
        },
        {
          type: 'TEXT',
          value: 'home',
          pageId: 'home'
        },
        {
          type: 'TEXT',
          value: '.'
        }
      ]
    },
    {
      id: 'introheading',
      description: 'Introduction',
      type: 'HEADING_2',
      spans: [
        {
          type: 'TEXT',
          value: 'You are going on an adventure!'
        }
      ]
    },
    {
      id: 'char1cselectparagraph',
      description: 'Character 1 Class Select Text',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'What is the class of your first adventurer?'
        }
      ],
      isVariableId: 'ischar1classnotset'
    },
    {
      id: 'char1nselectparagraph',
      description: 'Character 1 Name Select Text',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'What is the name of your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'TEXT',
          value: '?'
        }
      ],
      isVariableId: 'ischar1namenotset'
    },
    {
      id: 'char1cinput',
      description: 'Character 1 Class Select Input',
      type: 'INPUT',
      variableId: 'char1class'
    },
    {
      id: 'char1ninput',
      description: 'Character 1 Name Input',
      type: 'INPUT',
      variableId: 'char1name'
    },
    {
      id: 'char1isrogueparagraph',
      description: 'Character 1 Is Bard Paragraph',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Huzzah, your party has a rogue!'
        }
      ],
      isVariableId: 'ischar1classrogue'
    },
    {
      id: 'char1nresult',
      description: 'Character 1 Name Result',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Your'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1classlowercase'
        },
        {
          type: 'TEXT',
          value: 'is named'
        },
        {
          type: 'VARIABLE',
          variableId: 'char1name'
        },
        {
          type: 'TEXT',
          value: '.'
        }
      ]
    },
    {
      id: 'char1isbardparagraph',
      description: 'Character 1 Is Bard Paragraph',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'Hurrah, your party has a bard!'
        },
        {
          type: 'TEXT',
          value: 'What kind of instrument does your bard have?',
          isVariableId: 'isbardinstrumentnotset'
        },
        {
          type: 'TEXT',
          value: 'And your bard has a',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'VARIABLE',
          variableId: 'bardinstrumentlowercase',
          isVariableId: 'isbardinstrumentset'
        },
        {
          type: 'TEXT',
          value: '!',
          isVariableId: 'isbardinstrumentset'
        }
      ],
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'bardinstrumentinput',
      description: 'Bard Instrument Input',
      type: 'INPUT',
      variableId: 'bardinstrument',
      isVariableId: 'ischar1classbard'
    },
    {
      id: 'startlocationinput',
      description: 'Start Location Input',
      type: 'INPUT',
      variableId: 'startlocation'
    },
    {
      id: 'startlocationdescription',
      description: 'Start Location Description',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'You are at the'
        },
        {
          type: 'VARIABLE',
          variableId: 'startlocation'
        },
        {
          type: 'TEXT',
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
              type: 'TEXT',
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
              type: 'TEXT',
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
              type: 'TEXT',
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
      description: 'The End',
      type: 'PARAGRAPH',
      spans: [
        {
          type: 'TEXT',
          value: 'The End'
        }
      ]
    }
  ]
}
