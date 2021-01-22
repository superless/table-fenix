import * as React from 'react';
import { ITableBaseProps } from '../props/ITableBaseProps';
import TableBaseFenix from '../base/TableBaseFenix';
import { GetEntityHeaders, GetPropHeaders } from '../../../helpers';



/**
 * Itable fenix props
 * se deja una herencia para ver la posibilidad de precargar 
 * las cabeceras.
 */
export interface ITableFenixProps extends ITableBaseProps {
}



/**
 * Se usa tablaBaseFanix para extender.
 * @param props 
 * @returns  
 */
export default function TableFenix (props: ITableFenixProps) {
  return (
    <TableBaseFenix  {...props} GetEntityHeaders={GetEntityHeaders} GetPropHeaders={GetPropHeaders} />
  );
}
