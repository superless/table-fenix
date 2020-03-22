import * as React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { SearchType } from "tf-search-model";



interface IProps {
  SearchTypeSelect: (searchType: SearchType) => void;
  searchTypes: SearchType[];
  defaultValue: SearchType;
}

export default class SelectFilter extends React.Component<IProps> {
  public render() {
    const typeSearch = this.props.searchTypes.map(st => ({
      key: st.entitySearchTypeIndex,
      text: st.name,
      value: st.entitySearchTypeIndex
    }));

    return (
      <Dropdown
        button={true}
        basic={true}
        floating={true}
        options={typeSearch}
        defaultValue={this.props.defaultValue.entitySearchTypeIndex}
        onChange={this.SelectTypeSearch}
      />
    );
  }
  private SelectTypeSearch = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    
    this.props.SearchTypeSelect(this.props.searchTypes.filter(s=>s.entitySearchTypeIndex === (data.value as number))[0]);
  };
}
