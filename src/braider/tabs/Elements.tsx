import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '../../common/icons';
import { Column, ColumnGroup, Table, TableCell, TableCellAction, TableHeader, TableRow } from '../../common/styled';
import { getDescription } from '../functions/Common';
import { BraiderElement, BraiderGame } from '../Interfaces';

interface ElementsTabProps {
  braiderGame: BraiderGame | undefined;
  editedElementId?: string;
  setCreatedElement: Dispatch<SetStateAction<{description: string} | undefined>>;
  setEditedElementId: Dispatch<SetStateAction<string | undefined>>;
  setDeletedElementId: Dispatch<SetStateAction<string | undefined>>;
}

const ElementsTab = (props: ElementsTabProps): JSX.Element => {
  const elementElements: JSX.Element[] | undefined = props.braiderGame?.elements?.sort((a: BraiderElement, b: BraiderElement) => { return (a.description ?? '') > (b.description ?? '') ? 1 : -1; }).map((element: BraiderElement, index: number) => {
    const description = getDescription(element, props.braiderGame);

    return <TableRow key={`variable${index}`}>
      <TableCell title={`${element.id}: ${element.description}`}>
        {description}
      </TableCell>
      <TableCell textAlign='center'>
        <TableCellAction onClick={() => props.setEditedElementId(element.id)}><Icon title='update' fillSecondary='--opposite' type='pencil'/></TableCellAction>
        <TableCellAction onClick={() => props.setDeletedElementId(element.id)}><Icon title='delete' fillSecondary='--opposite' type='delete' /></TableCellAction>
      </TableCell>
    </TableRow>;
  });

  return <>
    {props.editedElementId === undefined ? <Table>
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
        {elementElements}
        <TableRow>
          <TableCell></TableCell>
          <TableCell textAlign='center'>
            <span onClick={() => props.setCreatedElement({description: ''})} style={{ cursor: 'pointer' }}><Icon title='create element' type='create' /></span>
          </TableCell>
        </TableRow>
      </tbody>
    </Table> : <>
      
    </>}
  </>;
}

export default ElementsTab;
