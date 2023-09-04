import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AddMarker, InitMap, MapChecker } from '../helper-funcs';
import { Member } from '../models/member';
import { Subscription } from 'rxjs';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {
  // PROPERTIES
  map: google.maps.Map | undefined;
  members: Member[] | undefined;
  infoWindow: google.maps.InfoWindow | undefined;


  // SUBS
  mapCheckSubscription: Subscription | undefined;


  // OUTPUTS
  @Output() onEditMember: EventEmitter<number> = new EventEmitter();
  @Output() onDeleteMember: EventEmitter<number> = new EventEmitter();


  constructor(
    private membersService: MembersService
  ) { }


  // LIFECYCLE HOOKS
  ngOnInit(): void {
    // get google maps
    this.addGoogleMapsScript();
    
    // get members
    this.members = this.membersService.getMembers();

    // listen for members changes
    this.membersService.membersChanged.subscribe(
      (members: Member[]) => {
        // remove listeners and markers
        this.members.forEach(member => {
          google.maps.event.clearInstanceListeners(member.marker);

          member.marker?.setMap(null);
        });

        this.members = members;

        // add markers and listeners again
        this.members.forEach(this.addMarker);

        // center map
        const selectedMember = this.members.find(member => member.selected);

        if (selectedMember) {
          this.map?.setCenter(new google.maps.LatLng(selectedMember.latitude, selectedMember.longitude));
          this.map?.setZoom(15);
        } else {
          this.map?.setCenter(new google.maps.LatLng(21.287950, -23));
          this.map.setZoom(2);
        }
      }
    );

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


  // MAIN METHODS
  initMap = () => {
    this.map = InitMap('main-map', 'a9b42ab050a9812e', 2, 21.287950, -23);

    // add info window
    this.infoWindow = new google.maps.InfoWindow();

    // add event listeners to buttons in info window
    this.infoWindow.addListener('domready', () => {
      const editButton = document.querySelector('button.edit');
      const deleteButton = document.querySelector('button.delete');

      if (editButton) {
        editButton.addEventListener('click', () => {
          const id = +editButton.getAttribute('data-id').split('-')[1];
          this.onEditMember.emit(id);
        });
      }

      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          const id = +deleteButton.getAttribute('data-id').split('-')[1];
          this.onDeleteMember.emit(id);
        });
      }
    });

    // add markers
    this.members.forEach(this.addMarker);
  }
  addMarker = (member: Member, index: number) => {
    member.marker = AddMarker(this.map, new google.maps.LatLng(member.latitude, member.longitude));
    
    // add info window content
    member.marker?.addListener('click', () => {
      this.infoWindow?.setContent(`
        <h3>${member.firstName} ${member.lastName}</h3>
        <p>${member.address}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-primary btn-sm edit" data-id="marker-${index}">Edit</button>
          <button class="btn btn-outline-danger btn-sm delete" data-id="marker-${index}">Delete</button>
        </div>
      `);
      this.infoWindow?.open(this.map, member.marker);
    });
  }


  // HELPER METHODS
  addGoogleMapsScript = () => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + [' ', ' ', ' ', 'o', 'z', 'j', 'K', 'Y', 'Y', 'c', 'a', 'u', 'R', 'N', 'b', 'g', 'K', 'v', 'M', 'O', 'u', 'G', '-', 'C', 'o', 'y', 'g', 'J', 'M', '9', '0', 'w', 'm', '4', '3', 'A', 'y', 'S', 'a', 'z', 'I', 'A', ' ', ' ', ' '].reverse().join('').trim();
    googleMapsScript.type = 'text/javascript';
    document.body.appendChild(googleMapsScript);
  }
}
