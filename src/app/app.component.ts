/// <reference types="google.maps" />

import { Component } from '@angular/core';
import { MembersService } from './services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // MAIN STATE
  membersDownloaded = false;

  // MODAL/PANEL STATES
  addMemberModalOpened = false;
  deleteMemberModalOpened = false;
  membersPanelOpened = true;

  // MODAL PROPERTIES
  editedMemberId: number | undefined;
  deleteMemberId: string | undefined;


  constructor(private membersService: MembersService) {
    this.membersService.downloadMembers().subscribe({
      next: () => this.membersDownloaded = true,
      error: error => console.error(error),
    });
  }

  // CLOSE EVENTS
  onCloseMemberModal = () => {
    this.addMemberModalOpened = false;
    setTimeout(() => this.editedMemberId = undefined, 400); // wait for animation to finish
  }
  onCloseDeleteMemberModal = () => {
    this.deleteMemberModalOpened = false;
    setTimeout(() => this.deleteMemberId = undefined, 400); // wait for animation to finish
  }
  onCloseMembersPanel = () => {
    this.membersPanelOpened = false;
  }

  // OPEN EVENTS
  openEditMemberModal = (index: number) => {
    this.editedMemberId = index;
    this.addMemberModalOpened = true;
  }
  openDeleteMemberModal = (id: string) => {
    this.deleteMemberId = id;
    this.deleteMemberModalOpened = true;
  }

  // OTHER EVENTS
  onFilterMembers(filterText: string) {
    this.membersService.setFilterText(filterText);
  }
}
