import { CollectionResult, EntityBaseSearch, GeoPointTs, KindProperty } from "@trifenix/mdm";
import { IEntityNameId } from "../base/model";
/**
 * Propiedades de table fenix.
 */
export interface ITableBaseProps {
  /** elementos a cargar en la tabla */
  elements?: CollectionResult;
  /**
   * Renderiza la cabecera
   */

  headerRelated: (header: number) => string;
  
  filter : boolean;
  /**
   * Renderiza el título de la cabecera de acuerdo al índice de un typeSearch
   * y el tipo de typeSearch  (STR, DT, BL, GEO, NUM, etc.) y
   * retorna el nombre de la cabecera
   * @param {number} header índice de la cabecera, bajo el modelo será una enumeración por cada tipo de typeSearch.
   * @param {Related} typeRelated tipo de cabecera.
   * @returns {string} el nombre de la cabecera.
   */
  headerProperty: (header: number, typeRelated: KindProperty) => string;
  /**
   * muestra el valor de una enumeración de acuerdo al índice de propiedad correspondiente a typeSearch de tipo enumeración dentro del entitySearch.
   * @param {number} indexEnun índice del typeSearch de tipo ENUM dentro de una entidad (EntitySearch).
   * @param {number} valueEnum índice del valor de la enumeración dentro del typeSearch de la entidad.
   * @returns {string} valor de la enumeración.
   */
  enumValue: (indexEnun: number, valueEnum: number) => string;
  /**
   * evento de selección de página.
   * @param {number} page número de página actual.
   */
  selectPage?: (page: number) => void;
  /**
   * número de items que se mostrarán por página.
   */
  itemPerPage: number;


  /**
   * JSX para renderizar en las cabeceras de la tabla.
   */
  cellheaders?: JSX.Element[];
  /**
   * JSX para renderizar cada celda recibiendo como entrada la entidad que corresponde a la fila.
  */
  cells?: ((elem: EntityBaseSearch<GeoPointTs>) => JSX.Element)[];


  /**
   * asigna un diccionario con las entidades de la tabla y los valores disponible para el filtro
   */
  filtersValues? : {[key:number]:IEntityNameId[]};

  /**
   * asigna los valores que han sido seleccionados en los filtros.
   */
  filtersSelected? : {[key:number]:string[]}

  filters? : (index:number, selecteds:string[])=>void;


  clean: ()=>void;



  
}
