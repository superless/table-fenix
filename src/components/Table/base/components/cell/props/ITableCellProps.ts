import { EntityBaseSearch, GeographyProperty, GeoPointTs, KindProperty } from "@trifenix/mdm";

/**
 * Propiedades de una celda.
 * toma una entidad, el tipo de propiedad y el índice
 * si es una enumeración deberá incluir una función que entrega el índice de la enumaración y el número del item seleccionado.
 * para que retorne el valor a renderizar en la celda.
 */
export default interface ITableCellProps {
    entity : EntityBaseSearch<GeoPointTs>;
    related : KindProperty | "related";
    typeSearchIndex : number;
    enumValue? : (indexEnun: number, valueEnum: number ) => string
}