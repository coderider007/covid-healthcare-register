import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CovidSummary, Global, Country } from '../models/covid_summary';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-covid-status-page',
  templateUrl: './covid-status-page.component.html',
  styleUrls: ['./covid-status-page.component.css']
})
export class CovidStatusPageComponent implements OnInit {

  global: Observable<Global>;
  countries: Observable<Country[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<CovidSummary>('https://api.covid19api.com/summary').subscribe(
      (res) => {
        this.global = of(res.Global);
        this.countries = of(res.Countries);
      },
      (error) => console.log('Error loading Covid Summary')
    );
  }

}
