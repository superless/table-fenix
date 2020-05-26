import * as React from 'react';
import ITableHeaderProps from "./props/ITableHeaderProps";
import { Table } from "semantic-ui-react";
import FilterMenu from '../filter_header/FilterMenu';
import { IEntityNameId } from '../../model';



/**
   * Obtiene la cabecera en formato JSX de acuerdo al indice, el nombre y el tipo de typeSearch.
   * @param title texto de la cabecera 
   * @param index índice de la propiedad dentro del searchType de la entidad.
   * @param related Tipo de entitySearch.
   */
  export default function TableHeader(props : ITableHeaderProps){
    const {related, index, title,filter} = props;
    const relatedNum = related as number;

    // retorna la cabecera.
    return <Table.HeaderCell key={`${relatedNum}.${index}`} textAlign='center'>
      
      {filter?(<FilterMenu filterlist={props.filterList || []} selected={props.selected} select={props.select as (sel:string[])=>void} title={title}/>):<span>{title}</span>}
    </Table.HeaderCell>
  }

  
