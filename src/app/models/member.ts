export class BaseMember {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public latitude: number,
    public longitude: number,
  ) { }
}


export class Member extends BaseMember {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public latitude: number,
    public longitude: number,
    public marker: google.maps.Marker | undefined = undefined,
    public selected: boolean = false
  ) {
    super(firstName, lastName, address, latitude, longitude);
  }
}

export interface Coord {
  latitude: string,
  longitude: string
}