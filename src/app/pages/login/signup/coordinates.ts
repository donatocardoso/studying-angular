export type DecimalDegrees = {
  Latitude: number;
  Longitude: number;
};

export type DegreesMinutesSeconds = {
  Full: string;
  Latitude: string;
  Longitude: string;  
};

export type Coordinates = {
  DecimalDegrees: DecimalDegrees;
  DegreesMinutesSeconds: DegreesMinutesSeconds;
};
