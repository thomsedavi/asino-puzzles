import React, { Dispatch, SetStateAction } from 'react';
import { Icon } from '../../common/icons';
import { Column, ColumnGroup, Table, TableCell, TableCellAction, TableHeader, TableRow } from '../../common/styled';
import Utils from '../../common/utils';
import { getDescription } from '../functions/Common';
import { BraiderGame, BraiderSelectOptionString, BraiderVariable } from '../Interfaces';

interface VariablesTabProps {
  braiderGame: BraiderGame | undefined;
  setCreatedVariable: Dispatch<SetStateAction<{description: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', type?: 'INPUT' | 'EVALUATED', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined>>;
  setUpdatedVariable: Dispatch<SetStateAction<{id: string, description: string, format: 'TEXT' | 'NUMBER' | 'BOOLEAN', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined>>;
  setDeletedVariableId: Dispatch<SetStateAction<string | undefined>>;
}

const VariablesTab = (props: VariablesTabProps): JSX.Element => {
  const sortVariables = (a: BraiderVariable, b: BraiderVariable): number => {
    if ((a.type !== 'SYSTEM' && b.type !== 'SYSTEM') || (a.type === 'SYSTEM' && b.type === 'SYSTEM')) {
      return getDescription(a, props.braiderGame) > getDescription(b, props.braiderGame) ? 1 : -1;
    } else if (a.type === 'SYSTEM') {
      return 1;
    } else {
      return -1;
    }
  }

  const variableElements: JSX.Element[] | undefined = props.braiderGame?.variables?.sort(sortVariables).map((variable: BraiderVariable, index: number) => {
    const description = getDescription(variable, props.braiderGame);

    return <TableRow key={`variable${index}`}>
      <TableCell title={`${variable.id}: ${variable.description}`}>
        {description}
      </TableCell>
      <TableCell>
        {Utils.toTitleCase(variable.format)}
      </TableCell>
      <TableCell textAlign='center'>
        {variable.type !== 'SYSTEM' && <>
          <TableCellAction onClick={() => props.setUpdatedVariable({id: variable.id!, format: variable.format!, description: variable.description!, options: variable.options, defaultOptionId: variable.defaultOptionId, defaultValue: variable.defaultValue})}><Icon title='edit' fillSecondary='--opposite' type='pencil'/></TableCellAction>
          <TableCellAction onClick={() => props.setDeletedVariableId(variable.id)}><Icon title='delete' fillSecondary='--opposite' type='delete' /></TableCellAction>
        </>}
      </TableCell>
    </TableRow>;
  });

  return <Table>
    <ColumnGroup>
      <Column smallWidth='8.2em' mediumWidth='22.2em' largeWidth='24.2em' />
      <Column smallWidth='8.2em' mediumWidth='8.2em' largeWidth='8.2em' />
      <Column width='4.6em' />
    </ColumnGroup>
    <thead>
      <TableRow>
       <TableHeader title='Description'>Description</TableHeader>
        <TableHeader title='Format'>Format</TableHeader>
        <TableHeader title='Actions'>Actions</TableHeader>
      </TableRow>
    </thead>
    <tbody>
      {variableElements}
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell textAlign='center'>
          <span onClick={() => props.setCreatedVariable({description: ''})} style={{ cursor: 'pointer' }}><Icon title='create variable' type='create' /></span>
        </TableCell>
      </TableRow>
    </tbody>
  </Table>;
}

export default VariablesTab;
