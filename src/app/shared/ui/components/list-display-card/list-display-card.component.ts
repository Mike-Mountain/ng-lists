import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../modules";
import {Group, List} from "../../../data-access";

@Component({
  selector: 'app-list-display-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './list-display-card.component.html',
  styleUrls: ['./list-display-card.component.scss']
})
export class ListDisplayCardComponent implements OnInit, OnChanges {

  @Input() data: List | Group | undefined | null;
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
      } else {
        this.list = this.data
      }
    }
  }

  ngOnInit(): void {
  }

}
