import { EntityBaseSearch, GeographyProperty, GeoPointTs, KindProperty } from "@trifenix/mdm";

export default interface ITableCellProps {
    entity : EntityBaseSearch<GeoPointTs>;
    related : KindProperty;
    typeSearchIndex : number;
    enumValue? : (indexEnun: number, valueEnum: number ) => string
}