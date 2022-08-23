import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  Group,
  GroupsService,
  List,
  ListService,
  SessionQuery,
} from '../../../../shared';
import { delay, Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
  public listsCreated: Observable<List[]> | undefined;
  public listsEditor: Observable<List[]> | undefined;
  public groups: Observable<Group[]> | undefined;
  public loadingStates = {
    listsCreated: true,
    listsEditor: true,
    groups: true,
  };

  constructor(
    private sessionQuery: SessionQuery,
    private listService: ListService,
    private groupsService: GroupsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listsCreated = this.sessionQuery
      .select((session) => session.user)
      .pipe(
        map((user) => user.listsCreated),
        delay(1000),
        tap(() => (this.loadingStates.listsCreated = false))
      );
    this.listsEditor = this.sessionQuery
      .select((session) => session.user)
      .pipe(
        map((user) => user.listsEditor),
        delay(1000),
        tap(() => (this.loadingStates.listsEditor = false))
      );
    this.groups = this.sessionQuery
      .select((session) => session.user)
      .pipe(
        map((user) => [...user.groupsMember, ...user.groupsCreated]),
        delay(1000),
        tap(() => (this.loadingStates.groups = false))
      );
  }

  deleteList(list: List, confirmDeleteTmpl: TemplateRef<any>) {
    this.dialog
      .open(confirmDeleteTmpl)
      .afterClosed()
      .subscribe((confirmDelete: boolean) => {});
  }
}
