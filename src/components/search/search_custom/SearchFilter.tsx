import * as React from "react";


import ISearchFilterProps from "./props/ISearchFilterSearchProps";
import { Input } from "semantic-ui-react";
import SelectFilter from "../search_filter/SelectFilter";

export default class SearchFilter extends React.Component<
ISearchFilterProps
> {
  private inputRef = React.createRef<HTMLDivElement>();
  public render() {
    const jsx = (
      <SelectFilter
        SearchTypeSelect={this.props.SearchTypeSelect}
        searchTypes={this.props.searchTypes}
        defaultValue={this.props.defaultSearchType}
      />
    );

    return (
      <div ref={this.inputRef}>
        <Input
          action={jsx}
          icon="search"
          iconPosition="left"
          placeholder="Presione enter para la busqueda"
          size="large"
          fluid={true}
          loading = {this.props.loading}
        />
      </div>
    );
  }
  public componentDidMount() {
    const refDiv = this.inputRef.current;
    if (refDiv) {
      const inputs = refDiv.getElementsByTagName("input");
      if (inputs) {
        const input = inputs.item(0);
        if (input) {
          input.onkeydown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
              this.props.onEnter(input.value);
            }
          };
        }
      }
    }
  }
}
