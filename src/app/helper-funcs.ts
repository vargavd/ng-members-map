import { async } from "@angular/core/testing";
import { Observable } from "rxjs";

export const MapChecker = () => {
  return Observable.create(observer => {
    let elapsedMiliseconds = 0;

    const intervalId = setInterval(() => {
      console.log(`[${elapsedMiliseconds}ms] waiting for google.maps...`);

      if (google.maps) {
        observer.next(true);
        observer.complete();
      }

      elapsedMiliseconds += 100;

      if (elapsedMiliseconds > 10000) {
        observer.error('google.maps not loaded');
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    }
  });
}

export const InitMap = async (
  id: string, 
  mapId: string,
  zoom = 1,
  lat = 21.287950, 
  lng = -23.579779,
) => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const map = new Map(document.getElementById(id) as HTMLElement, {
    center: { lat, lng },
    zoom: zoom,
    mapId
  });

  return map;
}

export const AddMarker = async (
  map: google.maps.Map,
  position: google.maps.LatLng
) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // add marker
  return new AdvancedMarkerElement({
    position,
    map
  });
}