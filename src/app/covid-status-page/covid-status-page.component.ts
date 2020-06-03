import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-covid-status-page',
  templateUrl: './covid-status-page.component.html',
  styleUrls: ['./covid-status-page.component.css']
})
export class CovidStatusPageComponent implements OnInit {

  myTemplate: any = '';
    constructor(private http: HttpClient) {
       this.http.get('https://www.mohfw.gov.in', {responseType: 'text'}).subscribe(
        (html) => this.myTemplate = html
       );
    }

  ngOnInit(): void {
  }

}
