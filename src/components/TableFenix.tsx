import * as React from 'react';
import { IResult, IEntitySearch, Related } from "tf-search-model";
import { Table} from 'semantic-ui-react';


export interface ITableFenixProps {
  elements?: IResult;
  loading: boolean;
  headerRelated: (header: number) => string;
  headerProperty: (header: number, typeRelated:Related) => string;
}

function GetEntityHeaders(entities: IEntitySearch[], header: (header: number) => string) {
  let headersRelated = entities.reduce((pn: Number[], u) => [...pn, ...u.rel.filter(a => a.name !== "").map(s => s.entityIndex)], []);
  return headersRelated.filter((n, i) => headersRelated.indexOf(n) === i).map(s => ({ index: s, name: header(s as number) }));
}

function GetPropHeaders(entities: IEntitySearch[], typeRelated:Related, header: (header: number, typeRelated:Related) => string) {
  let headersProperties : Number[] = [];
  switch(typeRelated){
    case Related.SUGGESTION:
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.sug.map(s => s.propertyIndex)], []);
      break;
    case Related.STR:      
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.str.map(s => s.propertyIndex)], []);
      break;
    case Related.BOOL :
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.bl.map(s => s.propertyIndex)], []);
      break;
    case Related.NUM32:
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.num32.map(s => s.propertyIndex)], []);
    case Related.NUM64:
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.num64.map(s => s.propertyIndex)], []);
      break;
    case Related.DATE:
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.dt.map(s => s.propertyIndex)], []);
      break;
    case Related.DBL:
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.dbl.map(s => s.propertyIndex)], []);
    case Related.ENUM : 
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.enum.map(s => s.propertyIndex)], []);
    case Related.GEO :
      headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.geo.map(s => s.propertyIndex)], []);
  }

  if (headersProperties.length>0)
    return headersProperties.filter((n, i) => headersProperties.indexOf(n) === i).map(s => ({ index: s, name: header(s as number, typeRelated) }));

  return [];
}

export default function TableFenix(props: ITableFenixProps) {
  let entities = !props.elements ? [] : props.elements.entities;
  

  const suggestHeaders = GetPropHeaders(entities, Related.SUGGESTION, props.headerProperty);
  const strHeaders = GetPropHeaders(entities, Related.STR, props.headerProperty);
  const num32Headers = GetPropHeaders(entities, Related.NUM32, props.headerProperty);
  const num64Headers = GetPropHeaders(entities, Related.NUM64, props.headerProperty);
  const doubleHeaders = GetPropHeaders(entities, Related.DBL, props.headerProperty);
  const boolHeaders = GetPropHeaders(entities, Related.BOOL, props.headerProperty);
  const dtHeaders = GetPropHeaders(entities, Related.DATE, props.headerProperty);
  const enumHeaders = GetPropHeaders(entities, Related.DATE, props.headerProperty);
  const geoHeaders = GetPropHeaders(entities, Related.GEO, props.headerProperty);
  const RelatedHeaders = GetEntityHeaders(entities, props.headerRelated);

  const tableHeader = (name:string, index:Number, related:Related)=>{
    const relatedNum  = related as number;
    return ( <Table.HeaderCell key={`${relatedNum}.${index}`} textAlign='center'>
    {name} 
  </Table.HeaderCell>)
  }

  
  
  let entityHeader = GetEntityHeaders(entities, props.headerRelated);


  return (
    
    <Table compact celled selectable color='violet'>
      <Table.Header>
        <Table.Row>
          {suggestHeaders.map(h => tableHeader(h.name, h.index, Related.SUGGESTION) )}
          {strHeaders.map(h => tableHeader(h.name, h.index, Related.STR) )}
          {num32Headers.map(h => tableHeader(h.name, h.index, Related.NUM32) )}
          {num64Headers.map(h => tableHeader(h.name, h.index, Related.NUM64) )}
          {doubleHeaders.map(h => tableHeader(h.name, h.index, Related.DBL) )}
          {boolHeaders.map(h => tableHeader(h.name, h.index, Related.BOOL) )}
          {enumHeaders.map(h => tableHeader(h.name, h.index, Related.ENUM) )}
          {dtHeaders.map(h => tableHeader(h.name, h.index, Related.DATE) )}
          {geoHeaders.map(h => tableHeader(h.name, h.index, Related.GEO) )}
          {RelatedHeaders.map(h => tableHeader(h.name, h.index, Related.REFERENCE))}


          
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {entities!.map(entity =>
          <Table.Row key={entity.id}>
            {suggestHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.SUGGESTION as number}.${h.index}_${entity.id}`}> {entity.sug.filter(e => e.propertyIndex === h.index).length > 0 ? entity.sug.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {strHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.STR as number}.${h.index}_${entity.id}`}> {entity.str.filter(e => e.propertyIndex === h.index).length > 0 ? entity.str.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {num32Headers.map(h => (
              <Table.Cell textAlign='center' key={`${Related.NUM32 as number}.${h.index}_${entity.id}`}> {entity.num32.filter(e => e.propertyIndex === h.index).length > 0 ? entity.num32.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {num64Headers.map(h => (
              <Table.Cell textAlign='center' key={`${Related.NUM64 as number}.${h.index}_${entity.id}`}> {entity.num64.filter(e => e.propertyIndex === h.index).length > 0 ? entity.num64.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {doubleHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.DBL as number}.${h.index}_${entity.id}`}> {entity.dbl.filter(e => e.propertyIndex === h.index).length > 0 ? entity.dbl.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {boolHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.BOOL as number}.${h.index}_${entity.id}`}> {entity.bl.filter(e => e.propertyIndex === h.index).length > 0 ? entity.bl.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {enumHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.ENUM as number}.${h.index}_${entity.id}`}> {entity.enum.filter(e => e.propertyIndex === h.index).length > 0 ? entity.enum.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {dtHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.DATE as number}.${h.index}_${entity.id}`}> {entity.dt.filter(e => e.propertyIndex === h.index).length > 0 ? entity.dt.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}
            {geoHeaders.map(h => (
              <Table.Cell textAlign='center' key={`${Related.GEO as number}.${h.index}_${entity.id}`}> {entity.geo.filter(e => e.propertyIndex === h.index).length > 0 ? entity.geo.filter(e => e.propertyIndex === h.index)[0].value : ""}</Table.Cell>
            ))}


            {entityHeader.map(h => (
              <Table.Cell textAlign='center' key={`e${h.index}_${entity.id}`} > {entity.rel.filter(e => e.entityIndex === h.index).length > 0 ? entity.rel.filter(e => e.entityIndex === h.index)[0].name : ""}</Table.Cell>
            ))}
          </Table.Row>
        )}
      </Table.Body>

    </Table>

  );
}
