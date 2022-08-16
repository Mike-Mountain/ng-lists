import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() isSingleUse = false;
  @Input() isLoading = false;
  @Input() size: 'small' | 'medium' | 'large' = 'large';

  constructor() { }

  ngOnInit(): void {
  }

}
