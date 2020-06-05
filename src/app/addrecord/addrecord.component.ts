import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HospitalRecord } from '../models/hospital_record';
import { HospitalRegistration } from '../models/hospital_registration';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../login/auth.service';

@Component({
  selector: 'app-addrecord',
  templateUrl: './addrecord.component.html',
  styleUrls: ['./addrecord.component.css']
})
export class AddrecordComponent implements OnInit {

  isLoggedIn: boolean;
  chrbaseuri = environment.chrbaseuri;
  hospitalRecord: HospitalRecord;
  isSaved: boolean;
  isError: boolean;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isError = false;
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);

    if (this.isLoggedIn){

      if (history.state.data) {
        this.hospitalRecord = history.state.data;
      }
      // this.hospitalRecord = new HospitalRecord();
      // this.hospitalRecord.hospitalRegistration = new HospitalRegistration();
      // this.activatedRoute.queryParams.subscribe(params => {
      //  this.hospitalRecord = params['hospitalRecord'];
        // this.latitude = params['latitude'];
        // this.longitude = params['longitude'];
        // console.log('latitude=' + this.latitude);
        // console.log('longitude=' + this.longitude);
      // });

      if (this.hospitalRecord === undefined) {
        this.hospitalRecord = new HospitalRecord();
        this.hospitalRecord.hospitalRegistration = new HospitalRegistration();
      }
    }
  }

  updateId() {
    if (this.hospitalRecord.hospitalRegistration.name !== undefined && this.hospitalRecord.hospitalRegistration.zipCode !== undefined){
      this.hospitalRecord.hospitalRegistration.hospitalId = this.hospitalRecord.hospitalRegistration.name
                                    + this.hospitalRecord.hospitalRegistration.zipCode;
    }
    this.isSaved = false;
  }

  addUpdate(): boolean {
    if (this.isLoggedIn){
      console.log('addUpdate()' + JSON.stringify(this.hospitalRecord));
      this.isSaved = false;
      // const response = this.http.post(this.chrbaseuri + '/record', this.hospitalRecord, this.httpOptions);
      const response = this.http.post(this.chrbaseuri + '/record', this.hospitalRecord);
      response.subscribe((resp) => {
        console.log(resp);
        this.isSaved = true;
        this.isError = false;
      },
      (error) => {
        this.isSaved = false;
        this.isError = true;
        console.log(error);
      }
      );
    }

    return false;
  }

}
