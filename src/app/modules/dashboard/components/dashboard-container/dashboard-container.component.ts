import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group, GroupsService, List, ListService, SessionQuery} from "../../../../shared";
import {Observable, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  public listsCreated: Observable<List[]> | undefined;
  public listsEditor: Observable<List[]> | undefined;
  public groups: Observable<Group[]> | undefined;
  public loadingStates = {
    listsCreated: true,
    listsEditor: true,
    groups: true
  }

  constructor(private sessionQuery: SessionQuery,
              private listService: ListService,
              private groupsService: GroupsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sessionQuery.select(session => session.user).subscribe(user => {
      console.log(user);
    })
  }

  deleteList(list: List, confirmDeleteTmpl: TemplateRef<any>) {
    this.dialog.open(confirmDeleteTmpl).afterClosed().subscribe((confirmDelete: boolean) => {
    })
  }
}
