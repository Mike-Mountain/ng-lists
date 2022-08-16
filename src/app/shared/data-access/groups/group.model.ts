import {CreatedBy} from "../models/created-by.model";

export interface Group {
  id: string;
  name: string;
  createdBy: CreatedBy;
  createdOn: any;
  icon: string;
  lists: string[];
  members: string[];
}
