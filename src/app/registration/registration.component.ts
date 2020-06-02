import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalRegistration } from '../models/hospital_registration';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hospital: HospitalRegistration = new HospitalRegistration();

  isSaved: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.hospital.hospitalId = ''; // read from logged in user's session
    const response = this.http.get<HospitalRegistration>('http://localhost:8080/chr/hospital/registrations/' + this.hospital.hospitalId);
    response.subscribe((resp) => {
      console.log(resp);
      this.hospital = resp;
    });
  }

  addUpdate(): boolean {
    console.log('addUpdate()');
    this.isSaved = null;
    const response = this.http.post('http://localhost:8080/chr/hospital/registration', this.hospital);
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
