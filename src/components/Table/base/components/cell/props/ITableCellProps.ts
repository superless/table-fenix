import { IEntitySearch, Related } from "@fenix/tf-search-model";

export default interface ITableCellProps {
    entity : IEntitySearch;
    related : Related;
    typeSearchIndex : number;
    enumValue? : (indexEnun: number, valueEnum: number ) => string
}