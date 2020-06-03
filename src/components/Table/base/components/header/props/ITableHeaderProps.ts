import { Related } from '@fenix/tf-search-model';
import { IEntityNameId } from '../../../model';

export default interface ITableHeaderProps {
  title: string;
  index: Number;
  related: Related;
  filter?: boolean;
  filterList?: IEntityNameId[];
  selected?: string[];
  select?: (sel:string[])=>void;
}
