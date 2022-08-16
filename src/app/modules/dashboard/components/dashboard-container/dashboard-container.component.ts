import {Component, OnInit} from '@angular/core';
import {Group, GroupsService, List, ListsService, SessionQuery} from "../../../../shared";
import {forkJoin, Observable, zip} from "rxjs";
import {LoadingService} from "../../../../shared/ui/services/loading.service";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  public listsCreated: Observable<List[]> | undefined;
  public listsEditor: Observable<List[]> | undefined;
  public groups: Observable<Group[]> | undefined;

  constructor(private sessionQuery: SessionQuery,
              private listService: ListsService,
              private groupsService: GroupsService,
              private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.sessionQuery.select('user').subscribe(user => {
      this.listsCreated = this.listService.getMultipleListsByIds(user.listsCreated);
      this.listsEditor = this.listService.getMultipleListsByIds(user.listsEditor);
      this.groups = this.groupsService.getMultipleGroupsByIds(user.groupsMember);
    })
  }

}
