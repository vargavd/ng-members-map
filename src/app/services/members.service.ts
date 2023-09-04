import { Injectable } from '@angular/core';

import { Member } from '../models/member';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // EVENTS
  membersChanged = new Subject<Member[]>();

  // PRIVATE
  private members: Member[] = [
    new Member('John', 'Doe', '901 Wildwood Way, Hacienda Heights, CA 91745, USA', 34.031521958176654, -118.00405177962188),
    new Member('Jane', 'Doe', 'Rome St, Newark, NJ 07105, United States', 40.72619818517835, -74.1422788961509),
    new Member('John', 'Smith', 'Parc des Beaumonts, 93100 Montreuil, France', 48.857902939296714, 2.4521800977977986),
    new Member('Jane', 'Smith', 'Av. de America, s/n, 28983 Parla, Madrid, Spain', 40.23189035602494, -3.7597457848679356),
  ];

  constructor() { }

  // PUBLIC METHODS
  getMembers(): Member[] {
    return this.members.slice();
  }
  addMember(firstName, lastName, address, latitude, longitude): void {
    this.members.push(new Member(firstName, lastName, address, latitude, longitude));

    this.membersChanged.next(this.members.slice());
  }
  updateMember(index: number, firstName, lastName, address, latitude, longitude): void {
    this.members[index] = new Member(firstName, lastName, address, latitude, longitude);

    this.membersChanged.next(this.members.slice());
  }
  getMember(index: number): Member {
    return this.members[index];
  }
  changeMemberSelection(selectedIndex: number): void {
    this.members.forEach((member, index) => {
      if (index === selectedIndex) {
        member.selected = !member.selected;
      } else {
        member.selected = false;
      }
    });

    this.membersChanged.next(this.members.slice());
  }

}