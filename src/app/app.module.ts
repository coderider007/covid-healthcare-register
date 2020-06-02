import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddrecordComponent } from './addrecord/addrecord.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListingsComponent } from './listings/listings.component';
import { RegistrationComponent } from './registration/registration.component';
import { CovidStatusPageComponent } from './covid-status-page/covid-status-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddrecordComponent,
    HeaderComponent,
    FooterComponent,
    ListingsComponent,
    RegistrationComponent,
    CovidStatusPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot([
      { path: '', component: ListingsComponent },
      { path: 'manage', component: AddrecordComponent },
      { path: 'covidstatus', component: CovidStatusPageComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
