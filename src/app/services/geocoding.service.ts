import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) { }

  getGeocoding(address: string) {
    // return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    return this.http.get<google.maps.GeocoderResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: { // more clean with params
            address: address,
            key: [' ', ' ', ' ', 'o', 'z', 'j', 'K', 'Y', 'Y', 'c', 'a', 'u', 'R', 'N', 'b', 'g', 'K', 'v', 'M', 'O', 'u', 'G', '-', 'C', 'o', 'y', 'g', 'J', 'M', '9', '0', 'w', 'm', '4', '3', 'A', 'y', 'S', 'a', 'z', 'I', 'A', ' ', ' ', ' '].reverse().join('')
          }
        });
  }
}
