import * as React from 'react';
import { Related } from '@fenix/tf-search-model';
import _ from 'lodash';
import { GetPropHeaders, GetEntityHeaders } from '../../../helpers/headers';
import TableHeader from './components/header/TableHeader';
import TableCell from './components/cell/TableCell';
import { ITableBaseFenixProps } from './props/ITableBaseFenixProps';
import { Table, Segment, Pagination, PaginationItemProps, Menu, Icon, Button } from 'semantic-ui-react';
import { IEntityNameId } from './model';

export interface ITableBaseFenixState {
  filtersSelected?: { [key: number]: string[] };
}

/**
 * Tabla basada en EntitySearchs.
 */
export default class TableBaseFenix extends React.Component<ITableBaseFenixProps, ITableBaseFenixState> {
  /**
   * Tabla basada en EntitySearchs.
   * @param props propedades del componente
   */
  constructor(props: ITableBaseFenixProps) {
    super(props);
    this.setPaginationValue = this.setPaginationValue.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.state = {
      filtersSelected: props.filtersSelected,
    };
    this.getEntityFilters = this.getEntityFilters.bind(this);
    this.getEntitySelected = this.getEntitySelected.bind(this);
  }

  public render() {
    // inicializa entidades.
    let entities = !this.props.elements ? [] : this.props.elements.entities;

    // obtiene cabeceras de acuerdo al tipo de typeSearch, las entidades y el método que retorna el título en base al indice.
    const suggestHeaders = GetPropHeaders(entities, Related.SUGGESTION, this.props.headerProperty);
    const strHeaders = GetPropHeaders(entities, Related.STR, this.props.headerProperty);
    const num32Headers = GetPropHeaders(entities, Related.NUM32, this.props.headerProperty);
    const num64Headers = GetPropHeaders(entities, Related.NUM64, this.props.headerProperty);
    const doubleHeaders = GetPropHeaders(entities, Related.DBL, this.props.headerProperty);
    const boolHeaders = GetPropHeaders(entities, Related.BOOL, this.props.headerProperty);
    const dtHeaders = GetPropHeaders(entities, Related.DATE, this.props.headerProperty);
    const enumHeaders = GetPropHeaders(entities, Related.ENUM, this.props.headerProperty);
    //const geoHeaders = GetPropHeaders(entities, Related.GEO, this.props.headerProperty);
    const RelatedHeaders = GetEntityHeaders(entities, this.props.headerRelated);

    const colspan =
      suggestHeaders.length +
      strHeaders.length +
      num32Headers.length +
      num64Headers.length +
      doubleHeaders.length +
      boolHeaders.length +
      dtHeaders.length +
      enumHeaders.length +
      RelatedHeaders.length;

    return (
      <>
        <Table compact celled selectable color="violet">
          <Table.Header>
            <Table.Row>
              {suggestHeaders.map(h => (
                <TableHeader {...h} related={Related.SUGGESTION} />
              ))}
              {strHeaders.map(h => (
                <TableHeader {...h} related={Related.STR} />
              ))}
              {num32Headers.map(h => (
                <TableHeader {...h} related={Related.NUM32} />
              ))}
              {num64Headers.map(h => (
                <TableHeader {...h} related={Related.NUM64} />
              ))}
              {doubleHeaders.map(h => (
                <TableHeader {...h} related={Related.DBL} />
              ))}
              {boolHeaders.map(h => (
                <TableHeader {...h} related={Related.BOOL} />
              ))}
              {enumHeaders.map(h => (
                <TableHeader {...h} related={Related.ENUM} />
              ))}
              {dtHeaders.map(h => (
                <TableHeader {...h} related={Related.DATE} />
              ))}
              {/* {geoHeaders.map(h => tableHeader(h.title, h.index, Related.GEO) )} */}
              {RelatedHeaders.map(h => (
                <TableHeader
                  {...h}
                  related={Related.REFERENCE}
                  filter={this.props.filter}
                  filterList={this.getEntityFilters(h.index)}
                  selected={this.getEntitySelected(h.index)}
                  select={selecteds => this.setFilters(h.index, selecteds)}
                />
              ))}
              {this.props.cellheaders &&
                this.props.cellheaders.map(ch => <Table.HeaderCell textAlign="center">{ch}</Table.HeaderCell>)}
            </Table.Row>
            <Table.Row>
              {this.props.filtersSelected && Object.keys(this.props.filtersSelected).length > 0 && (
                <Table.HeaderCell colSpan={colspan}>
                  <Button color="youtube" floated="right" onClick={this.props.clean}>
                    <Icon name="filter" /> Limpiar
                  </Button>
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entities!.map(entity => (
              <Table.Row key={entity.id}>
                {suggestHeaders.map((h, i) => (
                  <TableCell
                    related={Related.SUGGESTION}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {strHeaders.map((h, i) => (
                  <TableCell
                    related={Related.STR}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {num32Headers.map((h, i) => (
                  <TableCell
                    related={Related.NUM32}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {num64Headers.map((h, i) => (
                  <TableCell
                    related={Related.NUM64}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {doubleHeaders.map((h, i) => (
                  <TableCell
                    related={Related.DBL}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {boolHeaders.map((h, i) => (
                  <TableCell
                    related={Related.BOOL}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {enumHeaders.map((h, i) => (
                  <TableCell
                    related={Related.ENUM}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {dtHeaders.map((h, i) => (
                  <TableCell
                    related={Related.DATE}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {/* falta campos de tipo ubicacion geografica*/}

                {RelatedHeaders.map((h, i) => (
                  <TableCell
                    related={Related.REFERENCE}
                    entity={entity}
                    typeSearchIndex={h.index}
                    key={`${entity.id}_${i}`}
                  />
                ))}
                {this.props.cells &&
                  this.props.cells.map(ch => <Table.Cell textAlign="center">{ch(entity)}</Table.Cell>)}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Segment textAlign="center" basic>
          <Pagination
            stackable
            disabled={!this.props.elements || this.props.elements.total === 0}
            activePage={this.props.elements?.current ?? 1}
            onPageChange={this.setPaginationValue}
            totalPages={(this.props.elements && Math.ceil(this.props.elements.total / this.props.itemPerPage)) || 1}
          />
        </Segment>
      </>
    );
  }

  setFilters(index: number, entities: string[]) {
    this.props.filters && this.props.filters(index, entities);
  }

  getEntityFilters(index: number): IEntityNameId[] {
    return (this.props.filtersValues && this.props.filtersValues[index]) ?? [];
  }

  getEntitySelected(index: number): string[] {
    return (this.state.filtersSelected && this.state.filtersSelected[index]) ?? [];
  }

  /**
   * envía a la propiedad de selección de página, la página activa.   *
   * @param event evento del botón de paginación
   * @param data propiedades de la paginación (Semantic ui).
   */
  setPaginationValue(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) {
    this.props.selectPage && this.props.selectPage(data.activePage);
    if (event == null) console.log(event);
  }
}
