import ISearchBaseModel from "../model/types/ISearchBaseModel";
import { ISearchCategoryModel } from "../model/types/ISearchCategoryModel";
import { SearchType } from "../model/types/SearchType";



export default interface ISearchFilterBaseProps {
  source?: ISearchBaseModel[]; // listado de elementos de precarga
  elementSelected: (name: string) => void; // evento de busqueda de acuerdo a lo ingresado
  SearchTypeSelect: (searchType: SearchType) => void; // seleccion de tipo de busqueda
  searchTypes: SearchType[]; // tipos de busquedas
  defaultSearchType: SearchType; // tipo de busqueda 
  messageNotFound: string; // mensaje en caso de no encontrar
  placeholder: string; // mensaje en el cuadro de busqueda
  sourceCategory?: ISearchCategoryModel[]; // carga de datos si es en base a categoria
  isCategory: boolean; // define si es de tipo categoria
  loading:boolean;
}
