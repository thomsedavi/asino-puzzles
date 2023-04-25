import React from 'react';
import { Document, Section, Element } from './interfaces';
import { Icon } from './icons';
import { Paragraph } from './styled';

const convertDocumentToElements = (document?: Document, editable?: boolean): JSX.Element[] => {
  const test: JSX.Element[] = [];

  document?.sections?.forEach((section: Section, index: number) => {
    if (section.type === 'PARAGRAPH') {
      if (section.element) {
        if (editable && index === document!.sections!.length - 1) {
          test.push(<Paragraph key={`s${index}`}>{section.element.text} <Icon title='edit' type='pencil' fillSecondary='--accent' /></Paragraph>);
        } else {
          test.push(<Paragraph key={`s${index}`}>{section.element.text}</Paragraph>);
        }
      } else if (section.elements) {
        const paragraphBits: (JSX.Element | string)[] = [];

        section.elements.forEach((element: Element, index: number) => {
          if (element.text) {
            paragraphBits.push(element.text!);
          }

          if (index < section.elements!.length - 1) {
            paragraphBits.push(<br key={`s${index}br${index}`} />);
          }
        });

        if (editable && index === document!.sections!.length - 1) {
          test.push(<Paragraph key={`s${index}`}>{paragraphBits} <Icon title='edit' type='pencil' fillSecondary='--accent' /></Paragraph>);
        } else {
          test.push(<Paragraph key={`s${index}`}>{paragraphBits}</Paragraph>);
        }

      }
    }
  });

  return test;
}

export default {
  convertDocumentToElements: convertDocumentToElements
};
