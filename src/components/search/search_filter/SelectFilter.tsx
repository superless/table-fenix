import * as React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { ISearchType } from "tf-search-model";



interface IProps {
  SearchTypeSelect: (searchType: ISearchType) => void;
  searchTypes: ISearchType[];
  defaultValue: ISearchType;
}

export default class SelectFilter extends React.Component<IProps> {
  public render() {
    
    const typeSearch = this.props.searchTypes.map(st => ({
      key: st.Name,
      text: st.Name,
      value: st.Name
    }));

    return (
      <Dropdown
        button={true}
        basic={true}
        floating={true}
        options={typeSearch}
        defaultValue={this.props.defaultValue.Name}
        onChange={this.SelectTypeSearch}
      />
    );
  }
  private SelectTypeSearch = (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    console.log(event);
    this.props.SearchTypeSelect(this.props.searchTypes.filter(s=>s.Name === (data.value as string))[0]);
  };
}
