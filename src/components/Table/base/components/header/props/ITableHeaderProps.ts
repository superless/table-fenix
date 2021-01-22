import { KindProperty } from '@trifenix/mdm';
import { IEntityNameId } from '../../../model';



/**
 * Propiedades de la cabecera de la tabla.
 * title, nombre de la cabecera
 * index, índice de la cabecera
 * related, tipo de propiedad o related.
 * visible, si muestra o no el filtro.
 * filterList, listado total de elementos en el filtro.
 * filtros seleccionados.
 * evento de selección del filtro.
 */
export default interface ITableHeaderProps {
  title: string; 
  index: Number;
  related: KindProperty | "related";
  visible?: boolean;
  filterList?: IEntityNameId[];
  selected?: string[];
  select?: (sel:string[])=>void;
}
