import {ISearchBaseModel} from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";
import { ISearchType } from "tf-search-model";




export default interface ISearchFilterBaseProps {
  source?: ISearchBaseModel[]; // listado de elementos de precarga
  elementSelected: (name: ISearchBaseModel) => void; // evento de busqueda de acuerdo a lo ingresado
  SearchTypeSelect: (searchType: ISearchType) => void; // seleccion de tipo de busqueda
  searchTypes: ISearchType[]; // tipos de busquedas
  defaultSearchType: ISearchType; // tipo de busqueda 
  messageNotFound: string; // mensaje en caso de no encontrar
  placeholder: string; // mensaje en el cuadro de busqueda
  sourceCategory?: ISearchCategoryModel[]; // carga de datos si es en base a categoria
  isCategory: boolean; // define si es de tipo categoria
  loading:boolean;
}
