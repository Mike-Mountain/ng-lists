import {Component, OnInit} from '@angular/core';
import {Group, List, SessionQuery} from "../../../../shared";
import {Observable} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  public listsCreated: Observable<List>[] = [];
  public listsEditor: Observable<List>[] = [];
  public groups: Observable<Group>[] = [];

  constructor(private sessionQuery: SessionQuery,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.sessionQuery.select('user').subscribe(user => {
      this.listsCreated = this.dashboardService.getReferenceData('lists', user.lists_creator) as Observable<List>[];
      this.listsEditor = this.dashboardService.getReferenceData('lists', user.lists_editor) as Observable<List>[];
      this.groups = this.dashboardService.getReferenceData('groups', user.groups_member).map(group => {
        return group.pipe(
          map((details: any) => {
            details.createdBy = this.dashboardService.getUsername(details.createdBy.id);
            return details;
          })
        )
      }) as Observable<Group>[];
    })
  }

}
