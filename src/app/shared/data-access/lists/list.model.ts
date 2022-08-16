import {CreatedBy} from "../models/created-by.model";

export interface List {
  name: string;
  icon: string;
  createdBy: CreatedBy;
  createdOn: any;
  group: string;
  editors: string[];
  items: string[];
}

export interface ListItem {
  name: string;
  isComplete: string;
}
