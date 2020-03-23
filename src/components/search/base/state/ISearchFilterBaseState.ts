import {ISearchBaseModel} from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";


export default interface ISearchFilterBaseState {
  value?: string;
  results?: ISearchBaseModel[];
  load:boolean,
  resultCategory?: ISearchCategoryModel[];
}
