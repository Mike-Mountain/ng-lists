import { CreatedBy } from '../models/created-by.model';

export interface List {
  id: number;
  name: string;
  icon: string;
  createdBy: CreatedBy;
  createdOn: any;
  group: string;
  editors: string[];
  listItems: ListItem[];
}

export interface ListItem {
  name: string;
  isComplete: boolean;
}
