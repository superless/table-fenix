import * as React from 'react';
import { Dropdown, Button, Checkbox, CheckboxProps, Segment, Label, Icon } from 'semantic-ui-react';
import { IEntityNameId } from '../../model';


export interface IFilterMenuProps {
    filterlist: IEntityNameId[];
    title:string;
    select: (sel: string[]) => void;
    selected?: string[];
    filtered?:boolean;
    
}

export interface IFilterMenuState {
    selected: string[];
    visible: boolean;

}

export default class FilterMenu extends React.Component<IFilterMenuProps, IFilterMenuState> {
    private wrapperRef = React.createRef<HTMLDivElement>();


    constructor(props: IFilterMenuProps) {
        super(props);

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClickAll = this.handleClickAll.bind(this);
        this.cancelPressButton = this.cancelPressButton.bind(this);
        this.clickVisibleFilter = this.clickVisibleFilter.bind(this);
        this.selectFilterItem = this.selectFilterItem.bind(this);
        this.filter = this.filter.bind(this);

        this.state = {
            visible : false,
            selected : props.selected || []
        }
        
    }

    

    public render() {
        const { filterlist, select } = this.props;
        const { visible, selected } = this.state;
        const colorIcon = this.props.filtered?"red":"";
        return (
            <div ref={this.wrapperRef}>
                <Dropdown 
                icon={`filter ${colorIcon}`} open={visible} text={this.props.title}
                onClick={this.clickVisibleFilter}
                disabled={false}
                closeOnEscape={true}
            >
                <Dropdown.Menu>
                    <Dropdown.Header content='Ordenar' />
                    <Dropdown.Header><Button size='mini' icon={'sort alphabet ascending'} /><Button size='mini' icon={'sort alphabet descending'} /></Dropdown.Header>
                    <Dropdown.Header content='Filtros' />
                    <Dropdown.Divider />
                    <Dropdown.Header><Checkbox onChange={this.handleClickAll} label={'Selecionar todas'} /></Dropdown.Header>
                    <Dropdown.Divider />
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


    filter(){
        this.props.select(this.state.selected);
        this.setState({...this.state, visible : false});
    }

    
    selectFilterItem(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps){
        event.preventDefault();        
        if(data.checked){
            this.setState({...this.state, selected:[...this.state.selected, data.value as string]});
        } else {
            this.setState({...this.state, selected:this.state.selected.filter(s=>s!==(data.value as string))});
        }
    }

    cancelPressButton(){
        this.setState({...this.state, visible : false});
    }

    clickVisibleFilter(){
        if(!this.state.visible){
            this.setState({...this.state, visible : true});
        }
    }

    handleClickAll(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps){
      event.preventDefault();
      if(data.checked){
        this.setState({...this.state, selected: this.props.filterlist.map(s=>s.index)});
      } else {
        this.setState({...this.state, selected: []});
      }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     * Alert if clicked on outside of element
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

