import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addressConverted, geocodeAddress } from "./geocoding.actions";
import { HttpClient } from "@angular/common/http";
import { exhaustMap, from, map, switchMap } from "rxjs";

@Injectable()
export class GeocodingEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  callGeocodingAPI$ = createEffect(() => this.actions$.pipe(
    ofType(geocodeAddress),
    switchMap(({ address }) => {
      return this.http.get<google.maps.GeocoderResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: [' ', ' ', ' ', 'o', 'z', 'j', 'K', 'Y', 'Y', 'c', 'a', 'u', 'R', 'N', 'b', 'g', 'K', 'v', 'M', 'O', 'u', 'G', '-', 'C', 'o', 'y', 'g', 'J', 'M', '9', '0', 'w', 'm', '4', '3', 'A', 'y', 'S', 'a', 'z', 'I', 'A', ' ', ' ', ' '].reverse().join('')
          }
        }
      ).pipe(
        map((responseData: google.maps.GeocoderResponse) =>
          addressConverted({
            latitude: responseData.results[0].geometry.location.lat.toString(),
            longitude: responseData.results[0].geometry.location.lng.toString()
          })
        )
      );
    })
  ));
}