import { GeocodingState } from "./geocoding.reducer"

export const isItLoadingAddressSelector = (appState: {
  geocodingData: GeocodingState
}) => appState.geocodingData.status === 'loading';