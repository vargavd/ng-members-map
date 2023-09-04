import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-list-side-panel',
  templateUrl: './list-side-panel.component.html',
  styleUrls: ['./list-side-panel.component.scss']
})
export class ListSidePanelComponent implements OnInit {
  // PRIVATE PROPERTIES
  members: Member[];

  // INPUTS
  @Input() opened = false;

  // OUTPUTS
  @Output() onClosePanel = new EventEmitter<void>();

  // PUBLIC PROPERTIES
  closeButtonHovered = false;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.members = this.membersService.getMembers();

    this.membersService.membersChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
  }

  // DOM EVENTS
  onClosePanelClick() {
    this.onClosePanel.emit();
  }
  onClickMember(index: number) {
    this.membersService.changeMemberSelection(index);
  }
}