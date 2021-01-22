import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { GetValue } from '../../../../../helpers';
import ITableCellProps from './props/ITableCellProps';



export default function TableCell (props: ITableCellProps) {
  const {entity, related, typeSearchIndex, enumValue} = props;
  return (
    <Table.Cell 
        textAlign='center' 
        key={`${related}.${typeSearchIndex}_${entity.id}`}> 
            {GetValue(typeSearchIndex,related, entity, enumValue)}
        
        </Table.Cell>
  );
}
