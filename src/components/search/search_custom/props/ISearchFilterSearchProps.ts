import { SearchType } from "tf-search-model";



export default interface ISearchFilterProps {
  searchTypes: SearchType[];
  defaultSearchType: SearchType;
  SearchTypeSelect: (searchTypeIndex: SearchType) => void;
  onEnter: (name: string) => void;
  loading:boolean;
}
