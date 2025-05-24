import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private https = inject(HttpClient);
  private apiKey = '3f76f9d34d1d4d5807573ed8a36537b4';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<any> {
    console.log(city, this.apiKey, 'city');
    return this.https.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`);
  }
}
