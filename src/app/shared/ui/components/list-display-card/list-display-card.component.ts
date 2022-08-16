import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../modules";
import {List} from "../../../data-access";

@Component({
  selector: 'app-list-display-card',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './list-display-card.component.html',
  styleUrls: ['./list-display-card.component.scss']
})
export class ListDisplayCardComponent implements OnInit {

  @Input() list: List | undefined | null;
  public date: Date = new Date();

  constructor() {
  }

  ngOnInit(): void {
    if (this.list) {
      this.date = new Date(this.list.createdOn)
    }
  }

}
