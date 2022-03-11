import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BigNumber from 'bignumber.js';
import JwtEncode from 'jwt-encode';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import { IfConfigMeService } from 'src/app/services/ifconfig.me/ifconfig.me.service';
import { Coordinates, DegreesMinutesSeconds } from './coordinates';

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
export class SignUpComponent implements OnInit {
  public coordinates: Coordinates;

  public username: string;
  public password: string;
  public networkip: string;
  public approved: boolean;

  constructor(
    private readonly router: Router,
    private readonly ifConfigMeService: IfConfigMeService,
    private readonly aluraPicService: AluraPicService
  ) {
    this.coordinates = this.GenerateCoordinates();

    this.username = '';
    this.password = '';
    this.networkip = '';
    this.approved = false;
  }

  public ngOnInit(): void {
    this.ifConfigMeService
      .AllJson()
      .then(async (response) => {
        if (!response.ok) {
          Alert.Danger("Fail recovery you'r network ip :)");
          return;
        }

        const data = await response.json();

        this.networkip = data['ip_addr'];
      })
      .catch((error) => Alert.Danger(error.message));
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

    console.clear();
    console.info(JwtEncode(JSON.stringify(instructions), 'joker'));
  }

  public CheckPassword(): void {
    if (!this.password) {
      Alert.Warning('Enter with a password');
      return;
    }

    const text = this.coordinates.DegreesMinutesSeconds.Full;

    const binary = this._textToBinary(text);
    const hex = this._binaryToHex(binary);

    if (this.password === hex) {
      this.approved = true;
      return;
    }

    this.aluraPicService.Blocked.Post({
      networkip: this.networkip,
    });

    this.router.navigate(['/login/blocked']);
  }

  public RegisterUser(): void {
    if (!this.username) {
      Alert.Warning('Enter with a username');
      return;
    }

    this.aluraPicService.User.GetByUserName(this.username)
      .then((exist) => {
        if (!exist.IsSuccess) {
          Alert.Warning(exist.Message);
          return;
        }

        if (exist.Content && exist.Content.length) {
          Alert.Warning('Already exists account with this username');
          return;
        }

        this.aluraPicService.User.Post({
          username: this.username,
          password: this.password,
        })
          .then((response) => {
            this.router.navigate(['/login']);
            Alert.Success('Account created!! Please login in the site...');
          })
          .catch((error) => Alert.Danger(error.Message));
      })
      .catch((err) => Alert.Danger(err.message));
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
