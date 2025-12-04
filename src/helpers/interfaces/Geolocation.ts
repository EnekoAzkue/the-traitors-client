
export interface GeolacationCoords {
  latitude          : number;
  longitude         : number;
  altitude          : number | null;
  accuracy          : number;
  altitudeAccuracy  : number | null;
  heading           : number | null;
  speed             : number | null;
};

export interface UserCoords {
  email   : string;
  coords  : GeolacationCoords;
};
