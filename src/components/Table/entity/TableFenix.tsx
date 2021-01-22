import * as React from 'react';
import { ITableBaseProps } from '../props/ITableBaseProps';
import TableBaseFenix from '../base/TableBaseFenix';
import { GetEntityHeaders, GetPropHeaders } from '../../../helpers';

export interface ITableFenixProps extends ITableBaseProps {
}

export default function TableFenix (props: ITableFenixProps) {
  return (
    <TableBaseFenix  {...props} GetEntityHeaders={GetEntityHeaders} GetPropHeaders={GetPropHeaders} />
  );
}
