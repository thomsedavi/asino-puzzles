import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '../../common/icons';
import { BraiderGame, BraiderPage, BraiderSpan } from '../../common/interfaces';
import { Button, ButtonGroup, Column, ColumnGroup, Heading1, Paragraph, SpanAction, Table, TableCell, TableCellAction, TableHeader, TableRow } from '../../common/styled';
import { getDescription } from '../functions/Common';

interface PagesTabProps {
  braiderGame: BraiderGame | undefined;
  editedPageId?: string;
  setCreatedPage: Dispatch<SetStateAction<{description: string} | undefined>>;
  setEditedPageId: Dispatch<SetStateAction<string | undefined>>;
  setCreatedElement: Dispatch<SetStateAction<{description: string} | undefined>>;
  setUpdatedElement: Dispatch<SetStateAction<{id: string, description: string, type: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string} | undefined>>;
  setEditedElementId: Dispatch<SetStateAction<string | undefined>>;
  setCreatedSpan: Dispatch<SetStateAction<{targetElementId: string, targetIndex: number} | undefined>>;
  setUpdatedSpan: Dispatch<SetStateAction<{type: 'GROUP' | 'TEXT' | 'VARIABLE', targetElementId: string, value?: string, targetIndex: number, variableId?: string, pageId?: string} | undefined>>;
  setAddedElementId: Dispatch<SetStateAction<string | undefined>>;
  setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>;
  setDeletedElementId: Dispatch<SetStateAction<string | undefined>>;
}

const PagesTab = (props: PagesTabProps): JSX.Element => {
  const pageElements: JSX.Element[] | undefined = props.braiderGame?.pages?.sort((a: BraiderPage, b: BraiderPage) => { return (a.description ?? '') > (b.description ?? '') ? 1 : -1; }).map((page: BraiderPage, index: number) => {
    const description = getDescription(page, props.braiderGame);

    return <TableRow key={`variable${index}`}>
      <TableCell title={`${page.id}: ${page.description}`}>
        {description}
      </TableCell>
      <TableCell textAlign='center'>
        <TableCellAction onClick={() => props.setEditedPageId(page.id)}><Icon title='update' fillSecondary='--opposite' type='pencil'/></TableCellAction>
        <TableCellAction onClick={() => {props.setBraiderGame({...props.braiderGame, defaultPageId: page.id});}}><Icon title='set default page' type={props.braiderGame?.defaultPageId === page.id ? 'selected' : 'unselected'} fillPrimary='--opposite' /></TableCellAction>
      </TableCell>
    </TableRow>;
  });

  const elementElements: JSX.Element[] | undefined = props.braiderGame?.pages?.filter(page => page.id === props.editedPageId)[0]?.elementIds?.map((elementId: string, index: number) => {
    const element = props.braiderGame?.elements?.filter(element => element.id === elementId)[0];

    if (element === undefined) {
      return <Paragraph key={`pageElement${index}`}>Error: element not found</Paragraph>
    } else {
      const spans: JSX.Element[] = [];

      (element.spans ?? []).forEach((span: BraiderSpan, spanIndex: number) => {
        if (span.type === 'TEXT') {
          spans.push(<span key={`pageElement${index}span${spanIndex}`}>{span.value}<SpanAction onClick={() => {props.setUpdatedSpan({type: span.type!, targetElementId: elementId, targetIndex: spanIndex, value: span.value, variableId: span.variableId, pageId: span.pageId});}}><Icon title='update span' type='pencil' /></SpanAction></span>);
        } else if (span.type === 'VARIABLE') {
          const variable = props.braiderGame?.variables?.filter(variable => variable.id === span.variableId)[0];

          variable && spans.push(<span key={`pageElement${index}span${spanIndex}`}>({variable.description})</span>);
        }
      });

      return <Paragraph key={`pageElement${index}`}>
        <SpanAction onClick={() => props.setDeletedElementId(element.id)}>
          <Icon title='delete element' fillSecondary='--opposite' type='delete' />
        </SpanAction>
        <SpanAction onClick={() => props.setUpdatedElement({id: element.id!, description: element.description!, type: element.type!, variableId: element.variableId, isVariableId: element.isVariableId})}>
          <Icon title='update element' fillSecondary='--opposite' type='pencil' />
        </SpanAction>
        {spans}
        <SpanAction onClick={() => {props.setCreatedSpan({targetElementId: elementId, targetIndex: element.spans?.length ?? 0}); props.setEditedElementId(elementId)}}>
          <Icon title='create span' type='create' />
        </SpanAction>
      </Paragraph>;
    }
  });

  return <>
    {props.editedPageId === undefined ? <Table>
      <ColumnGroup>
        <Column smallWidth='16.4em' mediumWidth='30.4em' largeWidth='32.4em' />
        <Column width='4.6em' />
      </ColumnGroup>
      <thead>
        <TableRow>
          <TableHeader title='Description'>Description</TableHeader>
          <TableHeader title='Actions'>Actions</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {pageElements}
        <TableRow>
          <TableCell></TableCell>
          <TableCell textAlign='center'>
            <span onClick={() => props.setCreatedPage({description: ''})} style={{ cursor: 'pointer' }}><Icon title='create page' type='create' /></span>
          </TableCell>
        </TableRow>
      </tbody>
    </Table> : <>
      <Heading1>{props.braiderGame?.pages?.filter(page => page.id === props.editedPageId)[0]?.description}</Heading1>
      {elementElements}
      <ButtonGroup>
        <Button onClick={() => props.setCreatedElement({description: ''})}>Create Element</Button>
        <Button onClick={() => props.setAddedElementId('NONE')}>Add Element</Button>
        <Button onClick={() => props.setEditedPageId(undefined)}>Close Page</Button>
      </ButtonGroup>
    </>}
  </>;
}

export default PagesTab;
