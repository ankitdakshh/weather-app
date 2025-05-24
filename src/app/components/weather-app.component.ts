// import { Component, OnInit } from '@angular/core';
// import { WeatherService } from '../service/weather-app.service';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

// @Component({
//   selector: 'app-weather',
//   templateUrl: './weather-app.component.html',
//   imports: [BrowserModule, FormsModule],
//   styleUrls: ['./weather-app.component.css'],
// })
// export class WeatherComponent implements OnInit {
//   city = '';
//   weather: any;
//   history: string[] = [];
//   error = '';

//   constructor(private weatherService: WeatherService) {}

//   ngOnInit() {
//     this.loadHistory();
//   }

//   search() {
//     if (!this.city.trim()) {
//       this.error = 'City name is required';
//       return;
//     }

//     this.weatherService.getWeather(this.city).subscribe({
//       next: (data) => {
//         this.weather = data;
//         this.error = '';
//         this.saveToHistory(this.city);
//       },
//       error: (err) => {
//         this.error = 'City not found';
//         this.weather = null;
//       },
//     });
//   }

//   saveToHistory(city: string) {
//     let history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
//     if (!history.includes(city)) {
//       history.push(city);
//       localStorage.setItem('weatherHistory', JSON.stringify(history));
//     }
//     this.loadHistory();
//   }

//   loadHistory() {
//     this.history = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
//   }
// }
