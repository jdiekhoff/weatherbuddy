import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { CurrentWeather } from 'src/app/models/currentWeather.model';

import { WeatherCurrentComponent } from './weather-current.component';

describe('WeatherCurrentComponent', () => {
  let component: WeatherCurrentComponent;
  let fixture: ComponentFixture<WeatherCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherCurrentComponent ],
      imports: [
        MatCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherCurrentComponent);
    component = fixture.componentInstance;

    component.currentWeather = {
      name: "test",
      coord: {
        lat: 0,
        lon: 0
      },
      dt: 0,
      main: {
        feels_like: 1,
        humidity: 2,
        pressure: 3,
        temp: 4
      },
      sys: {
        country: "US",
        sunrise: 0,
        sunset: 0
      },
      timezone: 0,
      weather: [
        {
          description: "test",
          id: 0,
          main: "test"
        }
      ]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
