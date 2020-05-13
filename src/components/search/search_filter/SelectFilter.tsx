import * as React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { ISearchType } from "@fenix/tf-search-model";



interface IProps {
  SearchTypeSelect: (searchType: ISearchType) => void;
  searchTypes: ISearchType[];
  defaultValue: ISearchType;
}

export default class SelectFilter extends React.Component<IProps> {
  public render() {
    
    const typeSearch = this.props.searchTypes.map(st => ({
      key: st.name,
      text: st.name,
      value: st.name
    }));

    return (
      <Dropdown
        button={true}
        basic={true}
        floating={true}
        options={typeSearch}
        defaultValue={this.props.defaultValue.name}
        onChange={this.SelectTypeSearch}
      />
    );
  }
  private SelectTypeSearch = (
    e: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    if (e == null) console.log(e);
    this.props.SearchTypeSelect(this.props.searchTypes.filter(s=>s.name === (data.value as string))[0]);
  };
}
