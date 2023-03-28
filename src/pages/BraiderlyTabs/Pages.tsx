import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '../../common/icons';
import { BraiderlyElement, BraiderlyGame, BraiderlyPage, BraiderlySpan, BraiderlyVariable } from '../../common/interfaces';
import { Button, ButtonGroup, Column, ColumnGroup, Heading1, Paragraph, SpanAction, Table, TableCell, TableCellAction, TableHeader, TableRow } from '../../common/styled';

interface PagesTabProps {
  braiderlyGame?: BraiderlyGame;
  editedPageId?: string;
  setEditedPage: Dispatch<SetStateAction<BraiderlyPage | undefined>>;
  setEditedPageId: Dispatch<SetStateAction<string | undefined>>;
  setEditedElement: Dispatch<SetStateAction<BraiderlyElement | undefined>>;
  setEditedElementId: Dispatch<SetStateAction<string | undefined>>;
  setEditedSpan: Dispatch<SetStateAction<BraiderlySpan | undefined>>;
  setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>;
  setPageId: Dispatch<SetStateAction<string | undefined>>;
  getVariableDescription: (variable: BraiderlyVariable) => string;
}

const PagesTab = (props: PagesTabProps): JSX.Element => {
  const pageElements: JSX.Element[] | undefined = props.braiderlyGame?.pages?.sort((a: BraiderlyPage, b: BraiderlyPage) => { return (a.description ?? '') > (b.description ?? '') ? 1 : -1; }).map((page: BraiderlyPage, index: number) => {
    const description = props.getVariableDescription(page);

    return <TableRow key={`variable${index}`}>
      <TableCell title={`${page.id}: ${page.description}`}>
        {description}
      </TableCell>
      <TableCell textAlign='center'>
        <TableCellAction onClick={() => props.setEditedPageId(page.id)}><Icon title='edit' fillSecondary='--opposite' type='pencil'/></TableCellAction>
        <TableCellAction onClick={() => {props.setBraiderlyGame({...props.braiderlyGame, defaultPageId: page.id}); props.setPageId(page.id)}}><Icon title='set home page' type={props.braiderlyGame?.defaultPageId === page.id ? 'down' : 'up'}/></TableCellAction>
      </TableCell>
    </TableRow>;
  });

  const elementElements: JSX.Element[] | undefined = props.braiderlyGame?.pages?.filter(page => page.id === props.editedPageId)[0]?.elementIds?.map((elementId: string, index: number) => {
    const element = props.braiderlyGame?.elements?.filter(element => element.id === elementId)[0];

    if (element === undefined) {
      return <Paragraph key={`pageElement${index}`}>Error: element not found</Paragraph>
    } else {
      const spans: JSX.Element[] = [];

      (element.spans ?? []).map((span: BraiderlySpan, spanIndex: number) => {
        if (span.type === 'TEXT') {
          spans.push(<span key={`pageElement${index}span${spanIndex}`}>{span.value}</span>);
        }
      });

      return <Paragraph key={`pageElement${index}`}><SpanAction onClick={() => {props.setEditedSpan({}); props.setEditedElementId(elementId)}}>{spans}<Icon title='create span' type='create' /></SpanAction></Paragraph>
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
            <span onClick={() => props.setEditedPage({})} style={{ cursor: 'pointer' }}><Icon title='create page' type='create' /></span>
          </TableCell>
        </TableRow>
      </tbody>
    </Table> : <>
      <Heading1>{props.braiderlyGame?.pages?.filter(page => page.id === props.editedPageId)[0]?.description}</Heading1>
      {elementElements}
      <ButtonGroup>
        <Button onClick={() => props.setEditedElement({})}>Create Element</Button>
        <Button onClick={() => props.setEditedPageId(undefined)}>Close Page</Button>
      </ButtonGroup>
    </>}
  </>;
}

export default PagesTab;
