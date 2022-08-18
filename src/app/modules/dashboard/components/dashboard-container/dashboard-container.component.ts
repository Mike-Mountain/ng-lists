import {Component, OnInit, TemplateRef} from '@angular/core';
import {Group, GroupsService, List, ListsService, SessionQuery} from "../../../../shared";
import {Observable, tap} from "rxjs";
import {LoadingService} from "../../../../shared/ui/services/loading.service";
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
              private listService: ListsService,
              private groupsService: GroupsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sessionQuery.select('user').subscribe(user => {
      let groups: string[] = [];
      if (user.groupsMember) {
        groups = [...user.groupsMember, ...groups]
      }
      if (user.groupsCreated) {
        groups = [...user.groupsCreated, ...groups]
      }
      this.listsCreated = this.listService.getMultipleListsByIds(user.listsCreated).pipe(tap(() => this.loadingStates.listsCreated = false));
      this.listsEditor = this.listService.getMultipleListsByIds(user.listsEditor).pipe(tap(() => this.loadingStates.listsEditor = false));
      this.groups = this.groupsService.getMultipleGroupsByIds(groups).pipe(tap(() => this.loadingStates.groups = false));
    })
  }

  deleteList(list: List, confirmDeleteTmpl: TemplateRef<any>) {
    this.dialog.open(confirmDeleteTmpl).afterClosed().subscribe((confirmDelete: boolean) => {
      if (confirmDelete) {
        this.listService.deleteList(list).subscribe(data => console.log('OUTPUT: ', data));
      }
    })
  }
}
