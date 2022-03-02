import { Component, OnInit } from '@angular/core';
import Cidade from 'src/app/services/provacandidato/cidade/dtos/cidade';
import { ProvaCandidatoService } from 'src/app/services/provacandidato/provacandidato.service';

@Component({
  selector: 'app-city-component',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less'],
})
export class CityComponent implements OnInit {
  public cities: Cidade[] = [];

  constructor(private apiProvaCandidatoService: ProvaCandidatoService) {}

  ngOnInit(): void {
    this.apiProvaCandidatoService.Cidade.GetAll()
      .then((data) => {
        if (!data.IsSuccess) {
          console.log(data);
        }

        if (data.Content) this.cities = data.Content;
      })
      .catch((err) => console.error(err));
  }
}
