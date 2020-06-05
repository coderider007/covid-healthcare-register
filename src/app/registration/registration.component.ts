import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HospitalRegistration } from '../models/hospital_registration';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hospital: HospitalRegistration = new HospitalRegistration();

  chrbaseuri: string = environment.chrbaseuri;
  isSaved: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('ngOnInit()');
    // this.hospital.hospitalId = ''; // read from logged in user's session
    // const response = this.http.get<HospitalRegistration>(this.chrbaseuri + '/registrations/' + this.hospital.hospitalId,
    //                             this.httpOptions);
    // response.subscribe((resp) => {
    //   console.log(resp);
    //   this.hospital = resp[0];
    // });
  }

  updateId(): void {
    if (this.hospital.name !== undefined && this.hospital.zipCode !== undefined){
      this.hospital.hospitalId = this.hospital.name + this.hospital.zipCode;
    }
  }

  addUpdate(): boolean {
    console.log('addUpdate()' + JSON.stringify(this.hospital));
    if (this.hospital.hospitalId !== undefined || this.hospital.hospitalId !== null || this.hospital.hospitalId == ''){
      this.hospital.hospitalId = this.hospital.name + this.hospital.zipCode;
      this.hospital.hospitalId = this.hospital.hospitalId.toLocaleUpperCase().replace('/\s+/g', '');
    }
    this.isSaved = null;
    const response = this.http.post(this.chrbaseuri + '/registration', this.hospital);
    response.subscribe((resp) => {
        console.log(resp);
        this.isSaved = true;
      },
      (error) => {
        this.isSaved = false;
        console.log(error);
      }
    );

    return false;
  }

  doNothing(){
    console.log('doNothing()');
  }

}
