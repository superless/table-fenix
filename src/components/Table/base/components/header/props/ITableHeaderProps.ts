import { KindProperty } from '@trifenix/mdm';
import { IEntityNameId } from '../../../model';

export default interface ITableHeaderProps {
  title: string;
  index: Number;
  related: KindProperty;
  filter?: boolean;
  filterList?: IEntityNameId[];
  selected?: string[];
  select?: (sel:string[])=>void;
}
