import { createReducer, on } from "@ngrx/store";
import { addressConverted, geocodeAddress } from "./geocoding.actions";

export interface GeocodingState {
  address: string;
  coords: { latitude: string, longitude: string };
  status: 'initial' | 'loading' | 'converted';
};

export const initialGeocodingState: GeocodingState = {
  address: '',
  coords: { latitude: '', longitude: '' },
  status: 'initial'
};

export const geocodingReducer = createReducer(
  initialGeocodingState,
  on(geocodeAddress, (state: GeocodingState, payload: { address: string }) => {
    const newGeocodingState: GeocodingState = { ...state };

    if (newGeocodingState.status === 'loading') {
      newGeocodingState.address = "";
      newGeocodingState.status = "initial";
    } else {
      newGeocodingState.address = payload.address;
      newGeocodingState.status = "loading";
    }

    return newGeocodingState;
  }),
  on(addressConverted, (state: GeocodingState, { latitude, longitude }) => {
    const newState: GeocodingState = {
      address: state.address,
      coords: { latitude, longitude },
      status: 'converted'
    };

    return newState;
  })
);