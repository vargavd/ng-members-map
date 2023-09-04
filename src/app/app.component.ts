/// <reference types="google.maps" />

import { Component } from '@angular/core';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // MODAL/PANEL STATES
  addMemberModalOpened = false;
  deleteMemberModalOpened = false;
  membersPanelOpened = true;

  // MODAL PROPERTIES
  editedMemberIndex: number | undefined;
  deleteMemberIndex: number | undefined;


  constructor(private membersService: MembersService) {}


  // CLOSE EVENTS
  onCloseMemberModal = () => {
    this.addMemberModalOpened = false;
    setTimeout(() => this.editedMemberIndex = undefined, 400); // wait for animation to finish
  }
  onCloseDeleteMemberModal = () => {
    this.deleteMemberModalOpened = false;
    setTimeout(() => this.deleteMemberIndex = undefined, 400); // wait for animation to finish
  }
  onCloseMembersPanel = () => {
    this.membersPanelOpened = false;
  }


  // OPEN EVENTS
  openEditMemberModal = (index: number) => {
    this.editedMemberIndex = index;
    this.addMemberModalOpened = true;
  }
  openDeleteMemberModal = (index: number) => {
    this.deleteMemberIndex = index;
    this.deleteMemberModalOpened = true;
  }
}
