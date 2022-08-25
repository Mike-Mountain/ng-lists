import { Component, OnInit } from '@angular/core';
import {List} from "../../../../shared";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {

  public list: List | undefined;
  public listForm: UntypedFormGroup | undefined;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({
      name: ['', Validators.required],
      group: [''],
      items: [[{name: '', isComplete: false}]]
    })
  }

}
