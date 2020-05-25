import { Related } from "@fenix/tf-search-model";

export default interface ITableHeaderProps {
    title: string; 
    index: Number; 
    related: Related;
    filter?: boolean;
}