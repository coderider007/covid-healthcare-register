import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';


import {Observable, of} from 'rxjs';
import {HospitalRecord} from '../models/hospital_record';
import {HospitalRecordService} from '../services/hospital_record.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  providers: [HospitalRecordService, DecimalPipe]
})
export class ListingsComponent implements OnInit {

  hospitalRecords: Observable<HospitalRecord[]>;
  selectedRecords: HospitalRecord[];

  subscribersEmail: string;

  constructor(private service: HospitalRecordService, private http: HttpClient) {
  }

  subscribeAddRemove(value: any, rec: HospitalRecord): void {
    if (value.currentTarget.checked){
      this.selectedRecords.push(rec);
    } else {
      const objIndex = this.selectedRecords.findIndex(obj => obj.id === rec.id);
      if (objIndex > -1) {
        this.selectedRecords.splice(objIndex, 1);
      }
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit()');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('chruser:chrpassword')
      })
    };
    const response = this.http.get<HospitalRecord[]>('http://localhost:8080/chr/hospital/records', httpOptions);
    response.subscribe((resp) => {
      console.log(resp);
      this.hospitalRecords = of(resp);
    });
  }

  subscribe(): void {
    console.log('subscribe()');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('chruser:chrpassword')
      })
    };
    const response = this.http.post('http://localhost:8080/chr/hospital/subscribe',
        { email: this.subscribersEmail, items: this.selectedRecords}, httpOptions);
    response.subscribe((resp) => {
      console.log(resp);
    });
  }

}
