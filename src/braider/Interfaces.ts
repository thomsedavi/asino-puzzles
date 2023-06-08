export interface BraiderGame {
  id?: string; // id of the game
  title?: string; // title of the game
  userId?: string; // id of the user
  userName?: string; // name of the user
  pageIdDefault?: string; // home page
  pages?: BraiderPage[]; // pages
  blocks?: BraiderBlock[]; // headings or paragraphs
  texts?: BraiderText[]; // parts of heading or paragraph, could be fixed or user entered
  numbers?: BraiderNumber[]; // numberical decisions
  booleans?: BraiderBoolean[]; // true/false decisions
  dateCreated?: Date; // date created
  dateUpdated?: Date; // date updated
}

export interface BraiderText {
  id?: string; // id of text, only required for variables or options
  description?: string; // description, only required for variables
  type?: 'FIXED' | 'INPUT_TEXT' | 'INPUT_SELECT'; // fixed or user types in text or enters from list
  texts?: BraiderText; // list of subtexts
  text?: string; // for fixed text
  textId?: string; // use the text variable with this id
  textDefault?: string; // input text default
  textIdDefault?: string; // use the text variable with this id for input text default
  textOptions?: BraiderText[]; // list of text options to be used for select
  textOptionIdDefault?: string; // the text option default
  isBooleanId?: string; //only show if this boolean is satisfied
}

export interface BraiderNumber {
  id?: string; // id of number
  description?: string; // description of number
  type?: 'FIXED' | 'INPUT_NUMBER' | 'INPUT_SELECT' | 'EVALUATED'; // fixed or user types in number or enters from list
  number?: number; // for fixed number
  numberId?: string; // use the number with this id
  numberDefault?: string; // input number default
  numberIdDefault?: string; // use the number variable with this id for input number default
  numberOptions?: BraiderNumber[]; // list of number options to be used for select
  numberOptionIdDefault?: string; // the number option default
  isBooleanId?: string; // only show if this boolean is satisfied
}

export interface BraiderBoolean {
  id?: string; // id of boolean
  description?: string; // description of boolean
  type?: 'FIXED' | 'INPUT' | 'EVALUATED' | 'SYSTEM'; // fixed or input or evaluated or system
  boolean?: boolean; // for fixed boolean
  booleanDefault?: string; // input boolean default 
  booleanIdDefault?: string; // use the boolean variable with this id for input boolean default
  expression?: 'IS_TEXT_SET' | 'IS_TEXT_NOT_SET' | 'IS_TEXT_OPTION_SELECTED'; // for evaluated or system booleans
  textId?: string; // for 'is text' expressions
  textOptionId?: string; // for 'is text option selected' expressions
}

export interface BraiderBlock {
  id?: string; // id of block, leave blank if not variable
  description?: string; // description of block, leave blank if not variable
  type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP'; // block type
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
