import { Injectable } from '@angular/core';

import { BaseMember, Member } from '../models/member';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // EVENTS
  filteredMembers = new BehaviorSubject<Member[]>([]);

  // PRIVATE
  // private members: Member[] = [
  //   new Member('John', 'Doe', '901 Wildwood Way, Hacienda Heights, CA 91745, USA', 34.031521958176654, -118.00405177962188),
  //   new Member('Jane', 'Doe', 'Rome St, Newark, NJ 07105, United States', 40.72619818517835, -74.1422788961509),
  //   new Member('John', 'Smith', 'Parc des Beaumonts, 93100 Montreuil, France', 48.857902939296714, 2.4521800977977986),
  //   new Member('Jane', 'Smith', 'Av. de America, s/n, 28983 Parla, Madrid, Spain', 40.23189035602494, -3.7597457848679356),
  //   new Member('Dave', 'Smith', '9V5M+HM Augsburg, Germany', 48.35900252560118, 10.884605654802417),
  //   new Member('Dave', 'Doe', 'GR48+7M London, United Kingdom', 51.505776804736584, -0.18325586476235745),
  // ];
  private members: Member[];
  private filterText: string = '';

  constructor(private http: HttpClient) { }

  // PUBLIC METHODS
  downloadMembers(): void {
    this.http.get<{ [key: string]: BaseMember }>(
      'https://ng-members-map-default-rtdb.europe-west1.firebasedatabase.app/members.json'
    ).pipe(map(
      membersResponse => {
        const members: Member[] = [];

        for (const key in membersResponse) {
          if (membersResponse.hasOwnProperty(key)) {
            const member = membersResponse[key];
            members.push(new Member(key, member.firstName, member.lastName, member.address, member.latitude, member.longitude));
          }
        }

        this.members = members;

        return members;
      })
    ).subscribe({
      next: (members) => {
        this.members = members;
        this.updateFilteredMembers();
      },
      error: (error) => console.error(error),
    })
  }
  addMember(firstName: string, lastName: string, address: string, latitude: number, longitude: number): void {
    this.http.post<{ name: string }>(
      'https://ng-members-map-default-rtdb.europe-west1.firebasedatabase.app/members.json',
      {
        firstName, lastName, address, latitude, longitude
      }
    ).subscribe({
      next: ({ name }) => {
        this.members.push(new Member(name, firstName, lastName, address, latitude, longitude));

        this.updateFilteredMembers();
      },
      error: (error) => console.error(error),
      complete: () => console.log('complete')
    });
  }
  updateMember(id: string, firstName: string, lastName: string, address: string, latitude: number, longitude: number): void {
    this.http.put(
      `https://ng-members-map-default-rtdb.europe-west1.firebasedatabase.app/members/${id}.json`,
      {
        firstName, lastName, address, latitude, longitude
      }
    ).subscribe({
      next: () => {
        const member = this.members.find(member => member.id === id);

        if (member) {
          member.firstName = firstName;
          member.lastName = lastName;
          member.address = address;
          member.latitude = latitude;
          member.longitude = longitude;
        }

        this.updateFilteredMembers();
      },
      error: (error) => console.error(error)
    });
  }
  deleteMember(id: string): void {
    this.http.delete<void>(
      `https://ng-members-map-default-rtdb.europe-west1.firebasedatabase.app/members/${id}.json`
    ).subscribe({
      next: () => {
        this.members.splice(this.members.findIndex(member => member.id === id), 1);

        this.updateFilteredMembers();
      },
      error: (error) => console.error(error),
      complete: () => console.log('complete')
    });
  }
  getMember(id: string): Observable<Member> {
    return this.filteredMembers.pipe(
      map(members => members.find(member => member.id === id))
    );
  }
  changeMemberSelection(id: string): void {
    this.members.forEach((member) => {
      if (member.id === id) {
        member.selected = !member.selected;
      } else {
        member.selected = false;
      }
    });

    this.updateFilteredMembers();
  }
  setFilterText(filterText: string): void {
    this.filterText = filterText;

    this.updateFilteredMembers();
  }

  // PRIVATE METHODS
  private updateFilteredMembers() {
    const filteredMembers = this.members.filter(member => {
      return member.firstName.toLowerCase().includes(this.filterText.toLowerCase()) ||
        member.lastName.toLowerCase().includes(this.filterText.toLowerCase()) ||
        member.address.toLowerCase().includes(this.filterText.toLowerCase());
    }
    ).slice();

    this.filteredMembers.next(filteredMembers);
  }

  // this service acts like a guard as well:
  // we only allow access to the route if we have downloaded members from firebase
  // canActivate(): Observable<boolean> |boolean {
  //   if (Array.isArray(this.members)) {
  //     return true;
  //   }

  //   return (<Observable<Member[]>>this.downloadMembers(true))
  //     .pipe(map(
  //       () => true
  //     )
  //   );
  // }
}
