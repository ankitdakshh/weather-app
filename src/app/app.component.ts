import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from './service/weather-app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./app.component.css'],
  providers: [HttpClient],
})
export class AppComponent implements OnInit {
  city = '';
  weather: any;
  history: string[] = [];
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadHistory();
  }

  search() {
    if (!this.city.trim()) {
      this.error = 'City name is required';
      return;
    }

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        console.log(data);
        this.weather = data;
        this.error = '';
        this.saveToHistory(this.city);
      },
      error: (err) => {
        this.error = 'City not found';
        this.weather = null;
      },
    });
  }

  saveToHistory(city: string) {
    let history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    if (!history.includes(city)) {
      history.push(city);
      localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
    this.loadHistory();
  }

  loadHistory() {
    this.history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
  }
}
