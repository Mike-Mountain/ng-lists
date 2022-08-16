export interface List {
  name: string;
  icon: string;
  createdBy: string;
  createdOn: any;
  group: string;
  editors: string[];
  items: string[];
}

export interface ListItem {
  name: string;
  isComplete: string;
}
