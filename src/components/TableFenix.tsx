import * as React from 'react';
import { IResult, IEntitySearch } from "tf-search-model";
import { InputOnChangeData, Header, Segment, Input, Divider, Button, List, Pagination, Table, Icon, Select, Container, Grid, Statistic } from 'semantic-ui-react';


export interface ITableFenixProps {
  elements?: IResult;
  loading: boolean;
  headerRelated: (header: number) => string;
  headerProperty: (header: number) => string;
}

function GetEntityHeaders(entities: IEntitySearch[], header: (header: number) => string) {
  let headersRelated = entities.reduce((pn: Number[], u) => [...pn, ...u.RelatedIds.filter(a => a.name !== "").map(s => s.EntityIndex)], []);
  return headersRelated.filter((n, i) => headersRelated.indexOf(n) === i).map(s => ({ index: s, name: header(s as number) }));
}

function GetPropHeaders(entities: IEntitySearch[], header: (header: number) => string) {
  let headersProperties = entities.reduce((pn: Number[], u) => [...pn, ...u.RelatedProperties.map(s => s.PropertyIndex)], []);
  return headersProperties.filter((n, i) => headersProperties.indexOf(n) === i).map(s => ({ index: s, name: header(s as number) }));
}

export default function TableFenix(props: ITableFenixProps) {


  let entities = !props.elements ? [] : props.elements.entities;





  let propHeader = GetPropHeaders(entities, props.headerProperty);
  let entityHeader = GetEntityHeaders(entities, props.headerRelated);


  return (
    
    <Table compact celled selectable color='violet'>
      <Table.Header>
        <Table.Row>
          {propHeader.map(h => (
            <Table.HeaderCell key={`p${h.index}`} textAlign='center'>
              {h.name} 
            </Table.HeaderCell>
          ))}
          {entityHeader.map(h => (
            <Table.HeaderCell textAlign='center' key={`e${h.index}`}>
              {h.name} 
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>

        {entities!.map(entity =>
          <Table.Row key={entity.Id}>
            {propHeader.map(h => (
              <Table.Cell textAlign='center' key={`p${h.index}_${entity.Id}`}> {entity.RelatedProperties.filter(e => e.PropertyIndex === h.index).length > 0 ? entity.RelatedProperties.filter(e => e.PropertyIndex === h.index)[0].Value : ""}</Table.Cell>
            ))}
            {entityHeader.map(h => (
              <Table.Cell textAlign='center' key={`e${h.index}_${entity.Id}`} > {entity.RelatedIds.filter(e => e.EntityIndex === h.index).length > 0 ? entity.RelatedIds.filter(e => e.EntityIndex === h.index)[0].name : ""}</Table.Cell>
            ))}
          </Table.Row>
        )}
      </Table.Body>

    </Table>

  );
}
