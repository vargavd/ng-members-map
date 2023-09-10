import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-list-side-panel',
  templateUrl: './list-side-panel.component.html',
  styleUrls: ['./list-side-panel.component.scss']
})
export class ListSidePanelComponent implements OnInit, OnDestroy {
  // PRIVATE PROPERTIES
  members: Member[];

  // INPUTS
  @Input() opened = false;

  // OUTPUTS
  @Output() onClosePanel = new EventEmitter<void>();
  @Output() onEditMember = new EventEmitter<number>();
  @Output() onDeleteMember = new EventEmitter<number>();

  // PUBLIC PROPERTIES
  closeButtonHovered = false;

  constructor(private membersService: MembersService) {}

  ngOnInit() {
    this.membersService.filteredMembers.subscribe({
      next: members => this.members = members,
      error: error => console.error(error),
    });
  }
  ngOnDestroy() {
    this.membersService.filteredMembers.unsubscribe();
  }

  // DOM EVENTS
  onClosePanelClick() {
    this.onClosePanel.emit();
  }
  onClickMember(id: string) {
    this.membersService.changeMemberSelection(id);
  }
}