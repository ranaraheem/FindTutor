    import { Component, ViewChild, ElementRef } from '@angular/core';
    import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
    import {
      GoogleMaps,
      GoogleMap,
      GoogleMapsEvent,
      LatLng,
      MarkerOptions,
      Marker
    } from '@ionic-native/google-maps';
    import { Platform} from 'ionic-angular';
    import { Geolocation } from '@ionic-native/geolocation';
    import { BasicInformationPage } from '../basic-information/basic-information';
    import { ApiProvider } from '../../providers/api/api';
    import { Storage} from '@ionic/storage';

    /**
     * Generated class for the LocationPage page.
     *
     * See https://ionicframework.com/docs/components/#navigation for more info on
     * Ionic pages and navigation.
     */
    
    declare var google:any;
    @IonicPage()
    @Component({
      selector: 'page-location',
      templateUrl: 'location.html',
    })
    export class LocationPage {
      @ViewChild('map') element;
      lat;
      lon;
      map: GoogleMap;
      nextButton;
      constructor(private storage:Storage,private api:ApiProvider, private toastctrl:ToastController, private geolocation: Geolocation,private alertCtrl:AlertController, public googleMaps: GoogleMaps, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
      this.nextButton = true;
      
     
      }
      ngAfterViewInit() {
        this.plt.ready().then(() => {
          this.initMap();
        });
      
      }
      ionViewDidLoad() {
      //  this.showmap();
      }
      next(){
        this.navCtrl.push(BasicInformationPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
      findme(){
        let options = {
          timeout:10000,
          enableHighAccuracy:true,
          
        };
        this.geolocation.getCurrentPosition(options).then((resp) => {
          this.lat = resp.coords.latitude;
          this.lon = resp.coords.longitude;

          this.storage.get('user').then(user=>{
            this.api.location(this.lat, this.lon,user._id ).subscribe((res)=>{
            user.location.push(this.lat);
            user.location.push(this.lon);
            this.nextButton = false;
            this.storage.set('user', user);
          });
        });
       
        let coordinates: LatLng = new LatLng(this.lat, this.lon);

        let position = {
          target: coordinates,
          zoom: 17
        };

        this.map.animateCamera(position);

        let markerOptions: MarkerOptions = {
          position: coordinates,
          icon: "assets/images/icons8-Marker-64.png",
          title: 'Your Location'
        };

        const marker = this.map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
        });
      
        }).catch((error) => {
        this.toastctrl.create({
          message: "Turn On Location",
          duration: 3000,
          position: 'bottom'
        }).present();  
          
        });
        
      }
      initMap() {
        
        this.map = this.googleMaps.create(this.element.nativeElement);
        
        this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
          
          let coordinates: LatLng = new LatLng(31.5204, 74.3587);
        
          let position = {
            target: coordinates,
            zoom: 10,
          };

          this.map.animateCamera(position);

        
        })
      }

    }
