import { EntityBaseSearch, GeoPointTs, KindProperty } from "@trifenix/mdm";
import moment from "moment";


/**
 * función que usa el tipo de searchType, la entidad, el índice de la propiedad para obtener el valor correspondiente al typeSearch de una entidad
 * @param headerIndex índice del typeSearch de la entidad
 * @param related tipo de searchType
 * @param entity Objeto de la entidad, de donde sacaremos los valores.
 * @param enumValue función que retornará el valor de una enumeración de acuerdo al id de un typeSearch de tipo enumeración y el valor de la enumeración. 
 */
const GetValue: (headerIndex:number, related:KindProperty , entity:EntityBaseSearch<GeoPointTs>, enumValue?: (indexEnun: number, valueEnum: number ) => string)=>string = (headerIndex, related , entity, enumValue)=>{
    
    
    // tipo de searchType
    switch (related) {
      // otiene el valor de acuerdo al tipo de typeSearch, el índice del typeSearch y la entidad.
      case KindProperty.SUGGESTION:        
        return entity.sug.filter(e => e.index === headerIndex).length > 0 ? entity.sug.filter(e => e.index === headerIndex)[0].value : "";
      case KindProperty.STR:
        return entity.str.filter(e => e.index === headerIndex).length > 0 ? entity.str.filter(e => e.index === headerIndex)[0].value : "";
        
      case KindProperty.NUM32:
        return entity.num32.filter(e => e.index === headerIndex).length > 0 ? entity.num32.filter(e => e.index === headerIndex)[0].value.toString() : "";   
      case KindProperty.NUM64:
        return entity.num64.filter(e => e.index === headerIndex).length > 0 ? entity.num64.filter(e => e.index === headerIndex)[0].value.toString() : "";
      case KindProperty.DBL:
        return entity.dbl.filter(e => e.index === headerIndex).length > 0 ? entity.dbl.filter(e => e.index === headerIndex)[0].value.toString() : "";
      case KindProperty.BOOL:
        return entity.bl.filter(e => e.index === headerIndex).length > 0 ? entity.bl.filter(e => e.index === headerIndex)[0].value?"Ok":"NoOk" : "";
      case KindProperty.DATE:
        return entity.dt.filter(e => e.index === headerIndex).length > 0 ? moment(entity.dt.filter(e => e.index === headerIndex)[0].value).format("DD-MM-yyyy HH:mm") : "";
      case KindProperty.ENUM:
        return entity.enm.filter(e => e.index === headerIndex).length > 0 && enumValue? enumValue(headerIndex, entity.enm.filter(e => e.index === headerIndex)[0].value) : "";

        
      //geo comentado hasta saber de que manera se utilizará
      // case Related.GEO :
      //   headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.geo.map(s => s.propertyIndex)], []);
      
      default:
        //TODO: encontrar la manera de poner el nombre
        return entity.rel.filter(e => e.index === headerIndex).length > 0 ? entity.rel.filter(e => e.index ===headerIndex)[0].id : ""
        
    }
}

export default GetValue;