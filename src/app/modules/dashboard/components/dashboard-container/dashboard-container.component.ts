import { Component, OnInit } from '@angular/core';
import {List, SessionQuery} from "../../../../shared";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  public listsCreated: Observable<List>[] = [];
  public listsEditor: Observable<List>[] = [];
  public groups: Observable<any>[] = [];

  constructor(private sessionQuery: SessionQuery,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.sessionQuery.select('user').subscribe(user => {
      this.listsCreated = this.dashboardService.getReferenceData('lists', user.lists_creator) as Observable<List>[];
      this.listsEditor = this.dashboardService.getReferenceData('lists', user.lists_editor) as Observable<List>[];
      this.groups = this.dashboardService.getReferenceData('groups', [...user.groups_created, ...user.groups_member]) as Observable<any>[];
    })
  }

}
