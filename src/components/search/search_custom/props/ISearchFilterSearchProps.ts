import { ISearchType } from "@fenix/tf-search-model";



export default interface ISearchFilterProps {
  searchTypes: ISearchType[];
  defaultSearchType: ISearchType;
  SearchTypeSelect: (searchTypeIndex: ISearchType) => void;
  onEnter: (name: string) => void;
  loading:boolean;
}
