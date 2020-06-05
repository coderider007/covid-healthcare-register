import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './login/login.component';
import { AddrecordComponent } from './addrecord/addrecord.component';
import { CovidStatusPageComponent } from './covid-status-page/covid-status-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { GmapLocationComponent } from './gmap-location/gmap-location.component';


const routes: Routes = [
      { path: '', component: ListingsComponent },
      { path: 'login', component: LoginComponent},
      { path: 'manage', component: AddrecordComponent },
      { path: 'covidstatus', component: CovidStatusPageComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'location', component: GmapLocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
