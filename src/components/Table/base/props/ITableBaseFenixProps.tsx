import { IResult, IEntitySearch, Related } from "@fenix/tf-search-model";
import { ITableBaseProps } from "../../props/ITableBaseProps";
import { IEntityNameIndex } from "../model";
/**
 * Propiedades de table fenix.
 */
export interface ITableBaseFenixProps extends ITableBaseProps {
  GetPropHeaders : (entities: IEntitySearch[], typeRelated: Related, header: (header: number, typeRelated: Related) => string)  => IEntityNameIndex[];
  GetEntityHeaders : (entities: IEntitySearch[], header: (header: number) => string) => IEntityNameIndex[];
}
