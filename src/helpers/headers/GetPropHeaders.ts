import { EntityBaseSearch, GeoPointTs, KindProperty } from "@trifenix/mdm";
import { IEntityNameIndex } from "../../components/Table/base/model";

/**
   * retorna el título de la cabecera de acuerdo al tipo de typeSearch (ENUM, STR, NUM, etc.), la lista de entidade existentes (usadas para calcular las propiedades para título).
   * y la función que retorna el título de acuerdo al índice de la propiedad y el tipo de typeSearch.  * 
   * @param entities elementos donde se calcularán los títulos.
   * @param typeRelated Tipo de EntitySearch
   * @param header función que retorna el nombre del título de acuerdo al indice de la propiedad.
   */
  const GetPropHeaders : (entities: EntityBaseSearch<GeoPointTs>[], typeRelated: KindProperty, header: (header: number, typeRelated: KindProperty) => string)  => IEntityNameIndex[] = (entities, typeRelated, header)=>{
    // listado de ids de cabecera vacio
    let headersProperties: number[] = [];
  
    // tipo de searchType
    switch (typeRelated) {
      // otiene los indices que existen en el listado de entidades de a acuerdo el tipo.
      case KindProperty.SUGGESTION:
        
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.sug.map(s => s.index)], []);
        break;
      case KindProperty.STR:
        
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.str.map(s => s.index)], []);
        break;
      case KindProperty.BOOL:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.bl.map(s => s.index)], []);
        break;
      case KindProperty.NUM32:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.num32.map(s => s.index)], []);
        break;
      case KindProperty.NUM64:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.num64.map(s => s.index)], []);
        break;
      case KindProperty.DATE:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.dt.map(s => s.index)], []);
        break;
      case KindProperty.DBL:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.dbl.map(s => s.index)], []);
        break;
      case KindProperty.ENUM:
        headersProperties = entities.reduce((pn: number[], u) => [...pn, ...u.enm.map(s => s.index)], []);
        break;
      // case Related.GEO :
      //   headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.geo.map(s => s.propertyIndex)], []);
    }
  
    if (headersProperties.length  == 0) return [];
    // usa el método para retornar el índice y el nombre de cada cabecera encontrada.
    const distinct = headersProperties.filter((n, i) => headersProperties.indexOf(n) === i); // distinct ids del header.
    return distinct.map(s => ({ index: s, title: header(s as number, typeRelated) }  as IEntityNameIndex  ) ); // colección con id y nombre, usando la función de header
}

export default GetPropHeaders;