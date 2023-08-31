import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  // public properties
  @Input() opened:boolean = false;

  // output events
  @Output() onCloseModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
