import { Document, Section, Element } from './interfaces';

const numbers = '1234567890';

const getRandomId = (ids: string[]): string => {
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  month.length === 1 && (month = '0' + month);
  let day = (date.getDate() + 1).toString();
  day.length === 1 && (day = '0' + day);

  return `${year}-${month}-${day}`;
}

// TODO split by words and stuff, this is v basic right now
const toTitleCase = (value: string | undefined): string | undefined => {
  if (value === undefined)
    return undefined;

  const lower = value.toLowerCase();

  return lower[0].toUpperCase() + lower.substring(1);
}

// TODO trim line endings and stuff
const tidyString = (input: string | undefined): string => {
  let output = input ?? ''

  while (output.includes('  ')) {
    output = output.replaceAll('  ', ' ');
  }

  return output.trim();
}

const convertDocumentToString = (document?: Document): string => {
  var result = '';

  document?.sections?.forEach((section: Section, index: number) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        result += section.element.text;
      } else if (section.elements) {
        section.elements!.forEach((element: Element, index: number) => {
          result += element.text;
          result += '\n';
        });
      }
    }

    if (index < document.sections!.length - 1) {
      result += '\n';
    }
  });

  return result;
}

const convertStringToDocument = (text?: string): Document => {
  const document: Document = {};

  if (text) {
    const sections: Section[] = [];

    const split: string[] = text.split('\n');

    const elements: string[][] = [];
    let element: string[] = [];

    split.forEach((bit: string) => {
      let bitTrimmed = tidyString(bit);

      if (bitTrimmed === '' && element.length === 0) {
        // do nothing
      } else if (bitTrimmed === '') {
        elements.push(element);
        element = [];
      } else {
        element.push(bitTrimmed);
      }
    });

    if (element.length) {
      elements.push(element);
    }

    elements.forEach((element: string[]) => {
      var section: Section = {};

      section.type = 'PARAGRAPH';

      if (element.length === 1) {
        section.element = { text: element[0] };
      }
      else {
        const bits: Element[] = [];

        element.forEach((bit: string) => {
          bits.push({
            text: bit
          });
        });

        section.elements = bits;
      }

      sections.push(section);
    });

    document.sections = sections;
  }

  return document;
}

const getRowColor = (layer: number): string => {
  const modulus = layer % 12;

  switch (modulus) {
    case 0:
      return 'var(--row-0)';
    case 1:
      return 'var(--row-1)';
    case 2:
      return 'var(--row-2)';
    case 3:
      return 'var(--row-3)';
    case 4:
      return 'var(--row-4)';
    case 5:
      return 'var(--row-5)';
    case 6:
      return 'var(--row-6)';
    case 7:
      return 'var(--row-7)';
    case 8:
      return 'var(--row-8)';
    case 9:
      return 'var(--row-9)';
    case 10:
      return 'var(--row-10)';
    default:
      return 'var(--row-11)';
  }
}

const Utils = {
  getRandomId: getRandomId,
  tidyString: tidyString,
  toTitleCase: toTitleCase,
  convertStringToDocument: convertStringToDocument,
  convertDocumentToString: convertDocumentToString,
  formatDate: formatDate,
  getRowColor: getRowColor
}

export default Utils;
