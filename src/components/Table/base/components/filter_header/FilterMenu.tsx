import * as React from 'react';
import { Dropdown, Button, Checkbox, CheckboxProps, Segment, Label, Icon } from 'semantic-ui-react';
import { IEntityNameId } from '../../model';


/**
 * Propiedades del filtro de la tabla,
 * filterlist, es el listado de posibles elementos a seleccionar con su índice y su nombre
 * title, es el título de la columna del filtro.
 * select, es el método de selección.
 * selected, es el elemento seleccionado
 * filtered, representa si el filtro ha sido usado o no.
 */
export interface IFilterMenuProps {
    filterlist: IEntityNameId[]; 
    title:string;
    select: (sel: string[]) => void;
    selected?: string[];
    filtered?:boolean;
}



/**
 * Estado del menú,
 * determina si es visible o no y los elementos seleccionados.
 */
export interface IFilterMenuState {
    selected: string[];
    visible: boolean;

}


/**
 * Filter menu, es un componente de react para ser usada como filtro en una cabecera de una tabla
 */
export default class FilterMenu extends React.Component<IFilterMenuProps, IFilterMenuState> {

    // referencia interna para manejar eventos
    private wrapperRef = React.createRef<HTMLDivElement>();


    constructor(props: IFilterMenuProps) {
        super(props);
        // eventos
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClickAll = this.handleClickAll.bind(this);
        this.cancelPressButton = this.cancelPressButton.bind(this);
        this.clickVisibleFilter = this.clickVisibleFilter.bind(this);
        this.selectFilterItem = this.selectFilterItem.bind(this);

        // filtro
        this.filter = this.filter.bind(this);

        // inicialmente no está visible. 
        this.state = {
            visible : false,
            selected : props.selected || []
        }
        
    }

    

    public render() {
        const { filterlist } = this.props; // colección de índice y nombre.
        const { visible, selected } = this.state;
        const colorIcon = this.props.filtered?"red":""; // asigna el color del ícono, cuando el filtro es seleccionado.
        return (
            
            <div ref={this.wrapperRef}>{/* usamos el div para asignar los eventos */}
                <Dropdown 
                icon={`filter ${colorIcon}`} open={visible} text={this.props.title}
                onClick={this.clickVisibleFilter}
                disabled={false}
                closeOnEscape={true}
            >
                <Dropdown.Menu>
                    <Dropdown.Header content='Ordenar' />
                    {/* botones sin funcionamiento aún. */}
                    <Dropdown.Header><Button size='mini' icon={'sort alphabet ascending'} /><Button size='mini' icon={'sort alphabet descending'} /></Dropdown.Header>
                    <Dropdown.Header content='Filtros' />
                    <Dropdown.Divider />
                    <Dropdown.Header><Checkbox onChange={this.handleClickAll} label={'Selecionar todas'} /></Dropdown.Header>
                    <Dropdown.Divider />
                    {/* listamos los id y nombre de la colección de elementos filtrados o todos si aún no se ha filtrado */}
                    <Dropdown.Menu scrolling={true}>
                             {filterlist.map(s => (
                            <Dropdown.Item key={s.index} >
                                <Checkbox checked={this.state.selected.some(a=>a === s.index)} value={s.index} onChange={this.selectFilterItem} label={<label>{s.title}</label>}></Checkbox>
                            </Dropdown.Item>))}
                    </Dropdown.Menu>
                    <Dropdown.Divider />
                    <Dropdown.Header>
                        <Button negative content={'Cancelar'} onClick={this.cancelPressButton} />
                        <Button color={"teal"} content={'Filtrar'} disabled={selected.length === 0} onClick={this.filter} />
                    </Dropdown.Header>
                </Dropdown.Menu>
            </Dropdown>            
            </div>
        );
    }

    
    /**
     * Asigna el valor de la propiedad en el estado.
     */
    filter(){
        this.props.select(this.state.selected);
        this.setState({...this.state, visible : false});
    }

    
    /**
     * selección de un elemento en el filtro.
     * @param evento nativo html 
     * @param selección del checkbox.
     */
    selectFilterItem(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps){
        event.preventDefault();        
        if(data.checked){
            this.setState({...this.state, selected:[...this.state.selected, data.value as string]});
        } else {
            this.setState({...this.state, selected:this.state.selected.filter(s=>s!==(data.value as string))});
        }
    }


    /**
     * Limpia el filtro
     */
    cancelPressButton(){
        this.setState({...this.state, visible : false});
    }



    /**
     * evento de selección del filtro, asignando el estado visible.
     */
    clickVisibleFilter(){
        if(!this.state.visible){
            this.setState({...this.state, visible : true});
        }
    }


    /**
     * Click en selección de todos los elementos.
     * @param evento nativo html 
     * @param  los datos del checkbox que determinan si está o no seleccionado.
     */
    handleClickAll(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps){
      event.preventDefault();
      if(data.checked){
        this.setState({...this.state, selected: this.props.filterlist.map(s=>s.index)});
      } else {
        this.setState({...this.state, selected: []});
      }
    }

    /**
     * Añade el evento al documento, para poder realizar operaciones al salir del 
     * div del filtro.
     */
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }



    /**
     * Desmonta el evento que bloquea la página al usar el filtro.
     */
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     * si el elemento seleccionado no es el filtro, deja el filtro oculto.
     */
    handleClickOutside(event : MouseEvent) {
        if (this.wrapperRef) {
            var current = this.wrapperRef.current;
            
            if (current){
                if (!current.contains(event.target as Node) && this.state.visible){               
                    this.setState({...this.state, visible : false});
                }
            }
        }
    }
}

