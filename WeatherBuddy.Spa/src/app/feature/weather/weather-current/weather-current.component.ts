import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrentWeather } from 'src/app/models/currentWeather.model';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.scss']
})
export class WeatherCurrentComponent implements OnChanges {

  @Input() currentWeather!: CurrentWeather;
  imageSource!: string;

  ngOnChanges(changes: SimpleChanges): void {
    var weather = changes['currentWeather'].currentValue.weather[0];
    switch (weather.main) {
      case "Clouds":
        switch(weather.id) {
          case 801:
          case 802:
            this.imageSource = "assets/img/Part_Cloudy.png";
            break;
          case 803:
          case 804:
            this.imageSource = "assets/img/Cloudy.png";
            break;
        }
        break;
      case "Snow":
        this.imageSource = "assets/img/Snow.png"
        break;
      case "Rain":
      case "Drizzle":
      case "Mist":
        this.imageSource = "assets/img/Rain.png"
        break;
      case "Thunderstorm":
        this.imageSource = "assets/img/Storm.png"
        break;
      case "Clear":
        this.imageSource = "assets/img/Sun.png"
        break;
    }
  }
}
