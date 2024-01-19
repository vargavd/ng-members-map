import { createAction, props } from "@ngrx/store";

export const geocodeAddress = createAction(
  '[Member Modal] Geocode Address',
  props<{ address: string }>()
);

export const addressConverted = createAction(
  '[Geocode API] Adress Converted',
  props<{ latitude: number, longitude: number }>()
);
