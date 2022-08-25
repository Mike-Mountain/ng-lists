import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {List, ListItem, ListQuery, ListService} from '../../../../shared';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  public list$: Observable<List | undefined> | undefined;
  public newItem = '';

  constructor(private route: ActivatedRoute, private listsQuery: ListQuery, private listService: ListService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!this.listsQuery.getEntity(params['id'])) {
        this.listService.getListById(params['id']).subscribe();
      }
      this.list$ = this.listsQuery.selectEntity(params['id']).pipe(map((list) => {
        return list ? JSON.parse(JSON.stringify(list)) : undefined
      }));
    });
  }

  updateItemStatus(list: List, item: ListItem, event: MatCheckboxChange) {
    item.isComplete = event.checked;
    list.listItems = this.sortItems(list);
    this.listService.updateEntity(list.id, list).subscribe();
  }

  addItem(list: List) {
    list.listItems.push({name: this.newItem, isComplete: false});
    list.listItems = this.sortItems(list);
    this.newItem = '';
    this.listService.updateEntity(list.id, list).subscribe();
  }

  sortItems(list: List): ListItem[] {
    return list.listItems.sort((itemA, itemB) => {
      return itemA.isComplete === itemB.isComplete
        ? 0
        : itemA.isComplete
          ? 1
          : -1;
    });
  }
}
