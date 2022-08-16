import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../modules";
import {Group, List, User} from "../../../data-access";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-display-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './list-display-card.component.html',
  styleUrls: ['./list-display-card.component.scss']
})
export class ListDisplayCardComponent implements OnInit, OnChanges {

  @Input() data: List | Group | undefined | null;
  public createdBy: Observable<User> | undefined;
  public group: Group | undefined;
  public list: List | undefined;
  public date: Date = new Date();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data) {
      this.date = this.data.createdOn.toDate();
      if ('members' in this.data) {
        this.group = this.data;
        this.createdBy = this.data.createdBy as unknown as Observable<User>;
      } else {
        this.list = this.data
      }
    }
  }

  ngOnInit(): void {
  }

}
