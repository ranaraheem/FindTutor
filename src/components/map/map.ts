import {
  GoogleMaps,
  GoogleMap,
  LatLng,
  GoogleMapsEvent,
} from '@ionic-native/google-maps';
 import { Component,ViewChild, ElementRef } from "@angular/core/";
 import {NavController, Platform} from 'ionic-angular';

 @Component({
   selector: 'map',
   templateUrl: 'map.html'
 })
 export class MapComponent {
  
  @ViewChild('mapui') mapElement: ElementRef;
  private map:GoogleMap;
  private location:LatLng;
 
  constructor(
              private platform: Platform,
              private googleMaps: GoogleMaps) {
    this.location = new LatLng(42.346903, -71.135101);
 }
 ionViewDidLoad() {
  this.platform.ready().then(() => {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);
 
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let options = {
        target: this.location,
        zoom: 8
      };
 
      this.map.moveCamera(options);
    });
  });
}
 }