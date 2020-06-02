import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';


import {Observable, of} from 'rxjs';
import {HospitalRecord} from '../models/hospital_record';
import {HospitalRecordService} from '../services/hospital_record.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  providers: [HospitalRecordService, DecimalPipe]
})
export class ListingsComponent implements OnInit {

  hospitalRecords: Observable<HospitalRecord[]>;

  constructor(private service: HospitalRecordService, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log('ngOnInit()');
    const response = this.http.get<HospitalRecord[]>('http://localhost:8080/chr/hospital/records');
    response.subscribe((resp) => {
      console.log(resp);
      this.hospitalRecords = of(resp);
    });
  }
}
