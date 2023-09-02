/// <reference types="google.maps" />

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddMarker, InitMap, MapChecker } from './helper-funcs';
import { MembersService } from './services/members.service';
import { Member } from './models/member';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // PRIVATE PROPERTIES
  addMemberModalOpened = false;
  mapCheckSubscription: Subscription | undefined;
  map: google.maps.Map | undefined;
  members: Member[] = [];
  infoWindow: google.maps.InfoWindow | undefined;

  constructor(private membersService: MembersService) {}

  // LIFECYCLE METHODS
  ngOnInit() {
    // get google maps
    this.addGoogleMapsScript();
    
    // get members
    this.members = this.membersService.getMembers();

    // init map
    this.mapCheckSubscription = MapChecker().subscribe(
      this.initMap,
      (error: any) => {
        console.error(error);
      }
    );
  }
  ngOnDestroy() {
    this.mapCheckSubscription.unsubscribe();
  }

  // PUBLIC METHODS
  addMember = async (position: google.maps.LatLng) => {
    await AddMarker(this.map, position);
  }


  // PRIVATE METHODS
  addGoogleMapsScript = () => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + [' ', ' ', ' ', 'o', 'z', 'j', 'K', 'Y', 'Y', 'c', 'a', 'u', 'R', 'N', 'b', 'g', 'K', 'v', 'M', 'O', 'u', 'G', '-', 'C', 'o', 'y', 'g', 'J', 'M', '9', '0', 'w', 'm', '4', '3', 'A', 'y', 'S', 'a', 'z', 'I', 'A', ' ', ' ', ' '].reverse().join('').trim();
    googleMapsScript.type = 'text/javascript';
    document.body.appendChild(googleMapsScript);
  }
  initMap = () => {
    this.map = InitMap('main-map', 'a9b42ab050a9812e', 2, 21.287950, -23);

    // add info window
    this.infoWindow = new google.maps.InfoWindow();

    // add event listener for info window
    this.infoWindow.addListener('domready', () => {
      const editButton = document.querySelector('button[data-id^="marker-"]');
      if (editButton) {
        editButton.addEventListener('click', () => {
          const id = +editButton.getAttribute('data-id').split('-')[1];
          console.log(this.membersService.getMember(id));
        });
      }
    });

    // add markers
    this.members.forEach((member, index) => {
      member.marker = AddMarker(this.map, new google.maps.LatLng(member.latitude, member.longitude));

      // add info window content
      member.marker?.addListener('click', () => {
        this.infoWindow?.setContent(`
          <h3>${member.firstName} ${member.lastName}</h3>
          <p>${member.address}</p>
          <button data-id="marker-${index}">Edit</button>
        `);
        this.infoWindow?.open(this.map, member.marker);
      });
    });
  }
}
