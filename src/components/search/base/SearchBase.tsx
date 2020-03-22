import * as React from "react";
import ISearchFilterBaseProps from "./props/ISearchFilterBaseProps";
import { Search, SearchProps, SearchResultData } from "semantic-ui-react";
import ISearchFilterBaseState from "./state/ISearchFilterBaseState";
import * as _ from "lodash";

import { ISearchCategoryModel } from "./model/types/ISearchCategoryModel";
import ISearchBaseModel from "./model/types/ISearchBaseModel";
import SelectFilter from "../search_filter/SelectFilter";


export default class SearchBase extends React.Component<
  ISearchFilterBaseProps,
  ISearchFilterBaseState
> {
  private searchRef = React.createRef<HTMLDivElement>();

  public render() {
    
    const jsx = (
      <SelectFilter
        SearchTypeSelect={this.props.SearchTypeSelect}
        searchTypes={this.props.searchTypes}
        defaultValue={this.props.defaultSearchType}
      />
    );

    const { load, value, results, resultCategory } = this.state;
    this.setState({...this.state, load: this.props.loading });
    
    const placeHolder = this.props.placeholder;
    const map: { [key: string]: ISearchCategoryModel } = {};

    if (resultCategory && resultCategory.length > 0) {
      resultCategory.map(r => {
        map[r.name] = r;
      });
    }

    const resultLocal = this.props.isCategory ? map : results;
    
    return (
      <div ref={this.searchRef}>
        <Search
          category={this.props.isCategory}
          loading={load}
          size="large"
          onSearchChange={
            this.props.isCategory
              ? this.handleSearchChangeCategory
              : this.handleSearchChange
          }
          
          onResultSelect={this.handleResultSelect}
          results={resultLocal}
          value={value}
          fluid={true}
          onFocus={this.resetComponent}
          input={{
            action: jsx,
            className: "",
            icon: "search",
            iconPosition: "left",
            placeholder: placeHolder,
            fluid: true
          }}
          noResultsMessage={this.props.messageNotFound}
        />
      </div>
    );
  }

  public componentDidMount() {
    const refDiv = this.searchRef.current;
    if (refDiv) {
      const inputs = refDiv.getElementsByTagName("input");
      if (inputs) {
        const input = inputs.item(0);
        if (input) {
          input.classList.remove("prompt");
        }
      }
    }
    
  }

  public componentWillMount() {
    this.resetComponent();
  }

  private handleResultSelect = (
    e: React.SyntheticEvent<Element>,
    data: SearchResultData
  ) => {
    const value = data.result.id;
    this.setState({...this.state, value: data.result.title });
    // tslint:disable-next-line:no-unused-expression
    this.props.elementSelected && this.props.elementSelected(value);
    
  };

  private handleSearchChange = (
    e: React.SyntheticEvent<Element>,
    data: SearchProps
  ) => {
    const value = data.value;
    this.setState({ load: true, value });

    const re = new RegExp(_.escapeRegExp(this.state.value), "i");
    const isMatch = (result: ISearchBaseModel) => re.test(result.title);

    const results = _.filter(this.props.source, isMatch);

    this.setState({
      load: false,
      results
    });
  };

  private handleSearchChangeCategory = (
    e: React.SyntheticEvent<Element>,
    data: SearchProps
  ) => {
    const value = data.value;
    this.setState({ load: true, value });

    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = (result: ISearchBaseModel) => re.test(result.title);

    const filteredResults = _.reduce(
      this.props.sourceCategory,

      // tslint:disable-next-line:no-shadowed-variable
      (memo, data, index) => {
        const resultCategory = re.test(data.name);

        const result = _.filter(data.results, isMatch);

        const ElemResult = {
          name: data.name,
          results: resultCategory ? data.results : result
        };

        if (index === 0 && ElemResult.results.length > 0) {
          memo = ElemResult;
          return memo;
        }

        if (ElemResult.results.length === 0) {
          const memos = [...(memo as ISearchCategoryModel[])];
          if (index === 0) {
            return [];
          }
          return memos;
        } else {
          const memos = [...(memo as ISearchCategoryModel[]), ElemResult];

          return memos;
        }
      },
      {}
    ) as ISearchCategoryModel[];

    this.setState({
      load: false,
      resultCategory: filteredResults
    });
  };

  private resetComponent = (): void => {
    this.setState({ load: false, results: [], resultCategory: [], value: "" });
  };
}
