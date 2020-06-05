import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {} from 'googlemaps';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gmap-location',
  templateUrl: './gmap-location.component.html',
  styleUrls: ['./gmap-location.component.css']
})
export class GmapLocationComponent implements OnInit {

  @ViewChild('mapElement', {static: true}) mapElement: any;
  google: any;
  map: google.maps.Map;

  @Input()
  latitude: number;
  @Input()
  longitude: number;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('latitude=' + this.latitude);
    console.log('longitude=' + this.longitude);
    this.activatedRoute.queryParams.subscribe(params => {
      this.latitude = params['latitude'];
      this.longitude = params['longitude'];
      console.log('latitude=' + this.latitude);
      console.log('longitude=' + this.longitude);
    });
    console.log('latitude=' + this.latitude);
    console.log('longitude=' + this.longitude);
    const mapProperties = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

}
