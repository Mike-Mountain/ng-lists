import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {List, ListItem, ListQuery} from "../../../../shared";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  public list: List | undefined;
  public newItem = '';

  constructor(private route: ActivatedRoute,
              private listsQuery: ListQuery) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const list = this.listsQuery.getEntity(params['id']);
      if (list) {
        this.list = JSON.parse(JSON.stringify(list));
      }
    })
  }

  updateItemStatus(item: ListItem, event: MatCheckboxChange) {
    item.isComplete = event.checked;
    this.sortItems();
  }

  addItem() {
    this.list?.items.push({name: this.newItem, isComplete: false});
    this.sortItems();
    this.newItem = '';
  }

  sortItems() {
    if (this.list) {
      this.list.items.sort((itemA, itemB) => {
        return (itemA.isComplete === itemB.isComplete) ? 0 : itemA.isComplete ? 1 : -1;
      })
    }
  }
}
