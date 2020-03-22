import ISearchBaseModel from "./ISearchBaseModel";

export interface ISearchCategoryModel {
  
  name: string;
  results: ISearchBaseModel[];
}

export type SearchCategoryModel = Map<string, ISearchCategoryModel>;
