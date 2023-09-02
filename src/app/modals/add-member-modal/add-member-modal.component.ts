/// <reference types="google.maps" />

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { AddMarker, InitMap, MapChecker } from 'src/app/helper-funcs';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  // PUBLIC PROPERTIES
  @Input() opened = false;


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
    private geocodingService: GeocodingService
  ) { }


  // LIFECYCLE METHODS
  ngOnInit(): void {
    // wait for google maps to load - it could be simpler but I wanted to practise
    this.mapCheckSubscription = MapChecker().subscribe(
      (isLoaded: boolean) => {
        if (isLoaded) {
          this.map = InitMap('add-member-modal-map', 'af51a629d115862');

          // for testing
          // setTimeout(() => {
          //   this.showOnMapClicked();
          // }, 500);
        } 
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
    console.log(event);

    event.preventDefault();
    event.stopPropagation();
  }

  // PRIVATE METHODS
  showAddress = (position: google.maps.LatLng) => {
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
    this.addMemberForm.patchValue({
      latitude: position.lat,
      longitude: position.lng
    });
  }
  addressChanged(): void {
    this.mapErrorMessage = '';

    this.addMemberForm.patchValue({
      latitude: '',
      longitude: ''
    });
  }

  


  
}
