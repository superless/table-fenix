import { Related, IEntitySearch } from "@fenix/tf-search-model";
import moment from "moment";


/**
 * función que usa el tipo de searchType, la entidad, el índice de la propiedad para obtener el valor correspondiente al typeSearch de una entidad
 * @param headerIndex índice del typeSearch de la entidad
 * @param related tipo de searchType
 * @param entity Objeto de la entidad, de donde sacaremos los valores.
 * @param enumValue función que retornará el valor de una enumeración de acuerdo al id de un typeSearch de tipo enumeración y el valor de la enumeración. 
 */
const GetValue: (headerIndex:number, related:Related , entity:IEntitySearch, enumValue?: (indexEnun: number, valueEnum: number ) => string)=>string = (headerIndex, related , entity, enumValue)=>{
    
    
    // tipo de searchType
    switch (related) {
      // otiene el valor de acuerdo al tipo de typeSearch, el índice del typeSearch y la entidad.
      case Related.SUGGESTION:        
        return entity.sug.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.sug.filter(e => e.propertyIndex === headerIndex)[0].value : "";
      case Related.STR:
        return entity.str.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.str.filter(e => e.propertyIndex === headerIndex)[0].value : "";
        
      case Related.NUM32:
        return entity.num32.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.num32.filter(e => e.propertyIndex === headerIndex)[0].value.toString() : "";   
      case Related.NUM64:
        return entity.num64.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.num64.filter(e => e.propertyIndex === headerIndex)[0].value.toString() : "";
      case Related.DBL:
        return entity.dbl.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.dbl.filter(e => e.propertyIndex === headerIndex)[0].value.toString() : "";
      case Related.BOOL:
        return entity.bl.filter(e => e.propertyIndex === headerIndex).length > 0 ? entity.bl.filter(e => e.propertyIndex === headerIndex)[0].value?"Ok":"NoOk" : "";
      case Related.DATE:
        return entity.dt.filter(e => e.propertyIndex === headerIndex).length > 0 ? moment(entity.dt.filter(e => e.propertyIndex === headerIndex)[0].value).format("DD-MM-yyyy HH:mm") : "";
      case Related.ENUM:
        return entity.enum.filter(e => e.propertyIndex === headerIndex).length > 0 && enumValue? enumValue(headerIndex, entity.enum.filter(e => e.propertyIndex === headerIndex)[0].value) : "";

        
      //geo comentado hasta saber de que manera se utilizará
      // case Related.GEO :
      //   headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.geo.map(s => s.propertyIndex)], []);
      case Related.REFERENCE:
      case Related.LOCAL_REFERENCE:
        return entity.rel.filter(e => e.entityIndex === headerIndex).length > 0 ? entity.rel.filter(e => e.entityIndex ===headerIndex)[0].name : ""
        
    }


    return "" as string;
}

export default GetValue;