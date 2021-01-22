import { IEntitySearch } from "@fenix/tf-search-model";
import { IEntityNameIndex } from "../../components/Table/base/model";

/**
 * no todas las entidades tienen la misma cantidad de propiedades, porque existen algunas nulas.
 * por eso debe cálcular de acuerdo al conjunto de entidades, que cabecera debe mostrar.
 * 
 * este método filtra todas los typeSearch de tipo Entidad que tengan un nombre 
 * @param entities listado de entidades de donde obtendrá las propiedades.
 * @param header función que recibe el índice de una cabecera y retorna el nombre
 * @returns {object} { index: indice de la cabecera, name: nombre que mostrará en la cabecera }
 */
const GetEntityHeaders : (entities: IEntitySearch[], header: (header: number) => string) => IEntityNameIndex[] = (entities, header)=>{
    // obtiene los indices de propiedad de todos los typeSearch de tipo entidad.
    let headersRelated = entities.reduce((pn: Number[], u) => [...pn, ...u.rel.filter(a => a.name !== "").map(s => s.entityIndex)], []);
  
    // retorna el indice de propiedad y el nombre de la cabecera.
    return headersRelated.filter((n, i) => headersRelated.indexOf(n) === i).map(s => ({ index: s, title: header(s as number) } as IEntityNameIndex));

}

export default GetEntityHeaders;
