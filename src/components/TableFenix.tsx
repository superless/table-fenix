import * as React from 'react';
import { IResult } from "tf-search-model"

export interface ITableFenixProps {
  elements? : IResult,
  loading:boolean
}

export default function TableFenix (props: ITableFenixProps) {
  console.log(props.elements);

  return (
    <div>
      hello mtf 4
    </div>
  );
}
