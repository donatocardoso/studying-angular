import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import BigNumber from 'bignumber.js';
import JwtEncode from 'jwt-encode';
import { Coordinates, DegreesMinutesSeconds } from './coordinates';

type PaneType = 'test' | 'register';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('TestFlyOut', [
      transition('* => void', [
        animate(
          800,
          style({
            transform: 'translateX(-100%)',
            transition: 'all 2s ease-in-out',
          })
        ),
      ]),
    ]),
    trigger('RegisterFlyIn', [
      transition('* => *', [
        animate(
          800,
          style({
            transform: 'translateX(-100%)',
            transition: 'all 2s ease-in-out',
          })
        ),
      ]),
    ]),
  ],
})
export class SignUpComponent {
  @Input() activePane: PaneType = 'test';

  public username: string;
  public password: string;
  public approved: boolean;

  public coordinates: Coordinates;

  constructor() {
    this.username = '';
    this.password = '';
    this.approved = false;

    this.coordinates = this.GenerateCoordinates();
  }

  public GenerateCoordinates(): Coordinates {
    const latAbs = this._getRandomDegrees(90);
    const lonAbs = this._getRandomDegrees(180);

    const coordinates = this._getCoordinates(
      latAbs * 1000000,
      lonAbs * 1000000
    );

    return {
      DecimalDegrees: {
        Latitude: latAbs,
        Longitude: lonAbs,
      },
      DegreesMinutesSeconds: coordinates,
    };
  }

  public Instructions(): void {
    const instructions = [
      new Date().toISOString(),
      '1-DecimalDegrees',
      '2-DegreesMinutesSeconds',
      '3-UnicodeBinary',
      '4-Hexadecimal',
    ];

    console.log(JwtEncode(JSON.stringify(instructions), 'joker'));
  }

  public CheckPassword(): void {
    const text = this.coordinates.DegreesMinutesSeconds.Full;

    const binary = this._textToBinary(text);
    const hex = this._binaryToHex(binary);

    if (this.password === hex) {
      this.activePane = 'register';
      this.approved = true;
    }
  }

  public RegisterUser(): void {
    console.log(this.username);
  }

  private _getRandomDegrees(range: number): number {
    const totalDegress = Math.random() * range;
    const minusDegress = Math.random() * -range;

    return parseFloat((totalDegress + minusDegress).toFixed(6));
  }

  private _getCoordinates(
    latAbs: number,
    lonAbs: number
  ): DegreesMinutesSeconds {
    // Latitude
    const signlat = latAbs > 0 ? 1 : -1;
    latAbs *= signlat;

    const deglat = this._getCoordinate(latAbs, signlat);

    // Longitude
    const signlon = lonAbs > 0 ? 1 : -1;
    lonAbs *= signlon;

    const deglon = this._getCoordinate(lonAbs, signlon);

    return {
      Full: `${deglat} ${deglon}`,

      Latitude: deglat,
      Longitude: deglon,
    };
  }

  private _getCoordinate(coord: number, sign: number): string {
    return (
      Math.floor(coord / 1000000) * sign +
      '°' +
      Math.floor((coord / 1000000 - Math.floor(coord / 1000000)) * 60) +
      "'" +
      (Math.floor(
        ((coord / 1000000 - Math.floor(coord / 1000000)) * 60 -
          Math.floor((coord / 1000000 - Math.floor(coord / 1000000)) * 60)) *
          100000
      ) *
        60) /
        100000 +
      '"'
    );
  }

  private _textToBinary(text: string): string {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }

  private _binaryToHex(binary: string): string {
    const bignumber = new BigNumber(binary, 2);

    return bignumber.toString(16).toUpperCase();
  }
}
