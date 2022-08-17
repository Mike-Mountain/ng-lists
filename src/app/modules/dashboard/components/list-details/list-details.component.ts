import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListsQuery} from "../../../../shared";
import {HashMap} from "@datorama/akita";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private listsQuery: ListsQuery) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(this.listsQuery.getEntity(params['id']));
      console.log(params);
    })
  }

}
