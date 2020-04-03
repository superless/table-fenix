import * as React from 'react';
import { ISearchType, TypeEntity } from 'tf-search-model';
import {ISearchBaseModel} from './search/base/model/types/ISearchBaseModel';
import { ISearchCategoryModel } from './search/base/model/types/ISearchCategoryModel';
import SearchFilter from "./search/search_custom/SearchFilter";
import SearchBase from './search/base/SearchBase';

export interface ISearchFilterProps {
  searchTypes: ISearchType[];
  searchTypeSelect: (searchType: ISearchType) => void;
  elementSelected: (name: ISearchBaseModel) => void; // evento de busqueda de acuerdo a lo ingresado
  source?: ISearchBaseModel[]; 
  sourceCategory?: ISearchCategoryModel[];
  loading : boolean;
}

export function SearchFenix (props: ISearchFilterProps) {
  
  const {searchTypes, searchTypeSelect, loading, elementSelected, source, sourceCategory} = props;

  const defaultSearchTypes = searchTypes.filter(s=>s.default);

  const [currentSearch, setCurrentsearch] = React.useState(defaultSearchTypes.length>0?defaultSearchTypes[0]:searchTypes[0]);

  const searchSelected : (src:ISearchType)=>void = (src)=>{
    setCurrentsearch(src);
    searchTypeSelect(src);
  };

  React.useEffect(()=>{
    searchSelected(currentSearch);
    
  },[])

  
  
  if (currentSearch.entityType == TypeEntity.SEARCH){
    return <SearchFilter 
              SearchTypeSelect={searchSelected} 
              loading={loading} 
              onEnter={(elem)=>elementSelected({title : elem, description:"", id : elem})} 
              defaultSearchType={currentSearch}
               
              searchTypes={searchTypes}/>

  } else if (currentSearch.entityType == TypeEntity.SELECTED){


    return <SearchBase
                SearchTypeSelect={searchSelected}
                defaultSearchType = {currentSearch}
                elementSelected = {elementSelected}
                isCategory = {false}
                loading = {loading}
                messageNotFound={currentSearch.messageNotFound || "Elemento no encontrado"}
                placeholder={currentSearch.placeHolder || "Seleccione un elemento"}
                searchTypes={searchTypes}
                source={source}
            />

  } else {

    
    return <SearchBase
                SearchTypeSelect={searchSelected}
                defaultSearchType = {currentSearch}
                elementSelected = {elementSelected}
                isCategory = {true}
                loading = {loading}
                messageNotFound={currentSearch.messageNotFound || "Elemento no encontrado"}
                placeholder={currentSearch.messageNotFound || "Seleccione un elemento"}
                searchTypes={searchTypes}
                sourceCategory={sourceCategory}
        />
  }
}


