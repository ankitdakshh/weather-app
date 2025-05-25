import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './service/weather-app.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    const weatherSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);

    // LocalStorage mocks
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );

    TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule, CommonModule], // ✅ Note: AppComponent goes in `imports`, not `declarations`
      providers: [{ provide: WeatherService, useValue: weatherSpy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    weatherServiceSpy = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if city is empty on search', () => {
    component.city = '';
    component.search();
    expect(component.error).toBe('City name is required');
  });

  it('should call weather service and update weather on valid city', () => {
    const mockWeatherData = {
      name: 'London',
      main: { temp: 25 },
      weather: [{ description: 'Sunny', icon: '01d' }],
    };
    component.city = 'London';
    weatherServiceSpy.getWeather.and.returnValue(of(mockWeatherData));

    component.search();

    expect(component.weather).toEqual(mockWeatherData);
    expect(component.error).toBe('');
  });

  it('should show error if weather service returns error', () => {
    component.city = 'FakeCity';
    weatherServiceSpy.getWeather.and.returnValue(
      throwError(() => new Error('City not found'))
    );

    component.search();

    expect(component.weather).toBeNull();
    expect(component.error).toBe('City not found');
  });

  it('should save city to history and call localStorage', () => {
    component.city = 'Berlin';
    weatherServiceSpy.getWeather.and.returnValue(of({}));

    component.search();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'weatherHistory',
      jasmine.stringMatching(/Berlin/)
    );
  });

  it('should load history from localStorage on init', () => {
    localStorageMock['history'] = JSON.stringify(['Tokyo', 'Paris']);

    component.ngOnInit();

    expect(component.history).toEqual(['Tokyo', 'Paris']);
  });
});
