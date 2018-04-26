import { Component, OnInit, Input } from '@angular/core';
import { Deadline } from '../deadline.model';

@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.css']
})
export class DeadlineComponent implements OnInit {

  @Input() public deadline:Deadline;

  constructor() { }

  ngOnInit() {
  }

}
