import { BrowserModule } from '@angular/platform-browser';
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
import { GmapLocationComponent } from './gmap-location/gmap-location.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './httpInterceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AddrecordComponent,
    HeaderComponent,
    FooterComponent,
    ListingsComponent,
    RegistrationComponent,
    CovidStatusPageComponent,
    GmapLocationComponent,
    LoginComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // RouterModule.forRoot([
    //   { path: '', component: ListingsComponent },
    //   {path: 'login', component: LoginComponent},
    //   { path: 'manage', component: AddrecordComponent },
    //   { path: 'covidstatus', component: CovidStatusPageComponent },
    //   { path: 'register', component: RegistrationComponent },
    //   { path: 'location', component: GmapLocationComponent },
    // ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
