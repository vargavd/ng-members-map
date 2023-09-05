/// <reference types="google.maps" />

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { AddMarker, InitMap, MapChecker } from 'src/app/helper-funcs';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit, OnChanges {
  // PUBLIC PROPERTIES
  @Input() opened = false;
  @Input() editedMemberIndex: number | undefined;


  // PUBLIC EVENTS
  @Output() onCloseModal = new EventEmitter();


  // PRIVATE PROPS
  addMemberForm: FormGroup;
  map: google.maps.Map | undefined;
  mapErrorMessage: string = '';
  marker: google.maps.Marker | undefined;


  // SUBSCRIPTIONS
  mapCheckSubscription: Subscription;

  
  constructor(
    private geocodingService: GeocodingService,
    private membersService: MembersService
  ) { }


  // LIFECYCLE METHODS
  ngOnInit(): void {
    // wait for google maps to load - it could be simpler but I wanted to practise
    this.mapCheckSubscription = MapChecker().subscribe(
      () => {
        this.map = InitMap('add-member-modal-map', 'af51a629d115862');

        // for testing
        // setTimeout(() => {
        //   this.showOnMapClicked();
        // }, 500);
      },
      (error: any) => {
        console.error(error);
      }
    );

    // init form
    this.addMemberForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'latitude': new FormControl('', [Validators.required]),
      'longitude': new FormControl('', [Validators.required]),
    });

    // for clearing errors
    this.addMemberForm.get('address').valueChanges.subscribe(this.addressChanged.bind(this));    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editedMemberIndex) {
      if (changes.editedMemberIndex.currentValue !== undefined) {
        // get member
        const member = this.membersService.getMember(changes.editedMemberIndex.currentValue);

        // set form values
        this.addMemberForm.patchValue({
          firstName: member.firstName,
          lastName: member.lastName,
          address: member.address,
          latitude: member.latitude,
          longitude: member.longitude
        });

        // show address on map
        this.showAddress(new google.maps.LatLng(member.latitude, member.longitude), false);
      } else {
        this.resetFormAndMap();
      }
    }
  }
  ngOnDestroy(): void {
    this.mapCheckSubscription.unsubscribe();
  }


  // EVENTS
  keydownAddressInput = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();

      if ((<HTMLInputElement>event.target).value.length > 0) {
        this.showOnMapClicked();
      }
    }
  };
  showOnMapClicked = async () => {
    this.geocodingService.getGeocoding(this.addMemberForm.value.address)
      .pipe(map((responseData: google.maps.GeocoderResponse) => {
        if (responseData.results.length === 0) {
          throw new Error('No results found');
        }

        return responseData.results[0].geometry.location;
      }))
      .subscribe(
        position => this.showAddress(position),
        error => {
          console.error(error);
          this.mapErrorMessage = error?.message ? (error.message) : 'Couldn\'t find the address';
        }
    );
  }
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.addMemberForm.valid) {
      throw new Error('Form is not valid - shouldn\'t be possible');
    }

    if (this.editedMemberIndex !== undefined) {
      this.membersService.updateMember(
        this.editedMemberIndex,
        this.addMemberForm.value.firstName,
        this.addMemberForm.value.lastName,
        this.addMemberForm.value.address,
        this.addMemberForm.value.latitude,
        this.addMemberForm.value.longitude
      );
    } else {
      this.membersService.addMember(
        this.addMemberForm.value.firstName,
        this.addMemberForm.value.lastName,
        this.addMemberForm.value.address,
        this.addMemberForm.value.latitude,
        this.addMemberForm.value.longitude
      );
    }

    this.onCloseModal.emit();

    setTimeout(() => {
      this.resetFormAndMap();
    }, 300)
  }

  // PRIVATE METHODS
  showAddress = (position: google.maps.LatLng, updateInputs = true) => {
    // remove marker
    if (this.marker) {
      this.marker.setMap(null);
    }

    // add marker
    this.marker = AddMarker(this.map, position);

    // set map
    this.map.setCenter(position);
    this.map.setZoom(15);

    // set form values
    if (updateInputs) {
      this.addMemberForm.patchValue({
        latitude: position.lat,
        longitude: position.lng
      });
    }
  }
  addressChanged(): void {
    this.mapErrorMessage = '';

    this.addMemberForm.patchValue({
      latitude: '',
      longitude: ''
    });
  }
  resetFormAndMap() {
    if (this.addMemberForm) {
      this.addMemberForm.reset();
    }

    this.mapErrorMessage = '';
    if (this.marker) {
      this.marker.setMap(null);
      this.map.setCenter(new google.maps.LatLng(21.287950,  23.579779));
      this.map.setZoom(1);
    }
  }
}
