import { EntityBaseSearch, GeoPointTs, KindProperty } from "@trifenix/mdm";
import { ITableBaseProps } from "../../props/ITableBaseProps";
import { IEntityNameIndex } from "../model";
/**
 * Propiedades de table fenix.
 */
export interface ITableBaseFenixProps extends ITableBaseProps {
  GetPropHeaders : (entities: EntityBaseSearch<GeoPointTs>[], typeRelated: KindProperty, header: (header: number, typeRelated: KindProperty) => string)  => IEntityNameIndex[];
  GetEntityHeaders : (entities: EntityBaseSearch<GeoPointTs>[], header: (header: number) => string) => IEntityNameIndex[];
}
