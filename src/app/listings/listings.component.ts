import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { environment } from '../../environments/environment';

import {Observable, of} from 'rxjs';
import {HospitalRecord} from '../models/hospital_record';
import {HospitalRecordService} from '../services/hospital_record.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../login/auth.service';

class SubscribeRequest {
  hospitalRecords: HospitalRecord[];
  email: string;
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  providers: [HospitalRecordService, DecimalPipe]
})
export class ListingsComponent implements OnInit {

  hospitalRecords: Observable<HospitalRecord[]>;
  selectedRecords: HospitalRecord[] = [];
  chrbaseuri: string = environment.chrbaseuri;

  subscribersEmail: string;
  isLoggedIn = false;
  isSubscribed: boolean;
  isErrorSubscribing: boolean;

  constructor(private service: HospitalRecordService,
              private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  subscribeAddRemove(value: any, rec: HospitalRecord): void {
    console.log('subscribeAddRemove()');
    if (value.currentTarget.checked){
      console.log('checked()');
      this.selectedRecords.push(rec);
    } else {
      console.log('unchecked()');
      const objIndex = this.selectedRecords.findIndex(obj => obj.id === rec.id);
      if (objIndex > -1) {
        this.selectedRecords.splice(objIndex, 1);
      }
    }
    console.log('final list = ' + JSON.stringify(this.selectedRecords));
  }

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.isSubscribed = false;
    this.isErrorSubscribing = false;
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    // const response = this.http.get<HospitalRecord[]>(this.chrbaseuri + '/records', this.httpOptions);
    const response = this.http.get<HospitalRecord[]>(this.chrbaseuri + '/records');
    response.subscribe((resp) => {
      console.log(resp);
      this.hospitalRecords = of(resp);
    });
  }

  subscribe(): void {
    console.log('subscribe()');
    this.isSubscribed = false;
    this.isErrorSubscribing = false;
    if (this.subscribersEmail === undefined || this.subscribersEmail == null || this.subscribersEmail === '') {
      this.isErrorSubscribing = true;
    } else {
      const req: SubscribeRequest = { email : this.subscribersEmail, hospitalRecords: this.selectedRecords};

      console.log('subscribersEmail' + this.subscribersEmail);
      console.log('req = ' + JSON.stringify(req));
      // const response = this.http.post(this.chrbaseuri + '/subscribe',
      //     { email: this.subscribersEmail, hospitalRecords: this.selectedRecords}, this.httpOptions);
      const response = this.http.post(this.chrbaseuri + '/subscribe', req);
      response.subscribe((resp) => {
        console.log(resp);
        this.isSubscribed = true;
        this.subscribersEmail = '';
      },
      (error) => {
        console.log(error);
        this.isErrorSubscribing = true;
      });
    }
  }

}
