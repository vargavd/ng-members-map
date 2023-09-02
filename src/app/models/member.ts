export class Member {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public latitude: number,
    public longitude: number,
    public marker: google.maps.Marker | undefined = undefined
  ) {}
}