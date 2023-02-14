import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { CurrentWeather } from 'src/app/models/currentWeather.model';
import { NamedLatLong } from 'src/app/models/namedLatLong.model';
import { OpenWeatherMapApiService } from 'src/app/services/openWeatherMapApi.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string | NamedLatLong>('');

  componentDestroyed$: Subject<boolean> = new Subject();
  filteredOptions$!: Observable<NamedLatLong[]>;
  weatherData$!: Observable<CurrentWeather>;

  private zipRegex = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$', 'g');
  private latLongRegex = new RegExp('^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$');
  private minSearchLength = 3;

  constructor(private owmApi: OpenWeatherMapApiService) {

  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
      debounceTime(400),
      distinctUntilChanged()).subscribe(value => {
        if(typeof value !== "string") {
          //We have selected an option, now retrieve weather data
          this.filteredOptions$ = new Observable<NamedLatLong[]>;
          if(value) {
            this.weatherData$ = this.owmApi.getCurrentWeather(value.lat, value.lon);
          }

          return;
        }

        if(value.length < this.minSearchLength){
          this.filteredOptions$ = new Observable<NamedLatLong[]>;
          return;
        }

        if(this.zipRegex.test(value)) {
          this.filteredOptions$ = this.owmApi.directGeocodeByZipCode(value).pipe(
            map(response => [response])
          );
        } else if (this.latLongRegex.test(value)) {
          var result = (this.latLongRegex.exec(value) || ['0, 0'])[0].split(',');
          var lat = Number(result[0].trim());
          var long = Number(result[1].trim());

          this.filteredOptions$ = this.owmApi.reverseGeocodeByLatLong(lat, long);
        } else {
          this.filteredOptions$ = this.owmApi.directGeocodeByName(value);
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  displayFn(namedLatLong: any): string {
    if(!namedLatLong) {
      return "";
    }

    if (namedLatLong.zip) {
      return `${namedLatLong.zip}, ${namedLatLong.name}, ${namedLatLong.country}`
    } else if (namedLatLong.state) {
      return `${namedLatLong.name}, ${namedLatLong.state}, ${namedLatLong.country}`;
    } else {
      return `${namedLatLong.name}, ${namedLatLong.country}`;
    }
  }
}
