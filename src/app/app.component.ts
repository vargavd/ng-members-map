/// <reference types="google.maps" />

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddMarker, InitMap, MapChecker } from './helper-funcs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // PRIVATE PROPERTIES
  addMemberModalOpened = true;
  mapCheckSubscription: Subscription | undefined;
  map: google.maps.Map | undefined;

  // LIFECYCLE METHODS
  ngOnInit() {
    this.mapCheckSubscription = MapChecker().subscribe(
      (isLoaded: boolean) => {
        if (isLoaded) {
          InitMap('main-map', 'a9b42ab050a9812e', 2, 21.287950, -23).then(map => {
            this.map = map
          });
        } 
      },
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

}
