import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { ZipCode } from 'src/app/models/zipCode.model';
import { CurrentWeather } from '../models/currentWeather.model';
import { NamedLatLong } from '../models/namedLatLong.model';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapApiService {
  private openWeatherBaseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.openWeatherBaseUrl = environment.openWeatherMap.url;
  }

  getCurrentWeather(latitude: number, longitude: number, units="imperial") : Observable<CurrentWeather> {
    var url = `${this.openWeatherBaseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`
    return this.httpClient.get<CurrentWeather>(url);
  }

  directGeocodeByName(cityName: string) : Observable<Location[]> {
    var url = `${this.openWeatherBaseUrl}/geo/1.0/direct?q=${cityName}&limit=5`
    return this.httpClient.get<Location[]>(url);
  }

  directGeocodeByZipCode(zipCode: string, country="US") : Observable<ZipCode> {
    var url = `${this.openWeatherBaseUrl}/geo/1.0/zip?zip=${zipCode},${country}`
    return this.httpClient.get<ZipCode>(url);
  }

  reverseGeocodeByLatLong(latitude: number, longitude: number) : Observable<NamedLatLong[]> {
    var url = `${this.openWeatherBaseUrl}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5`
    return this.httpClient.get<NamedLatLong[]>(url);
  }
}
