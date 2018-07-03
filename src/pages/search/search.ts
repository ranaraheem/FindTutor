import { Component, ViewChild, ElementRef } from '@angular/core';
import {LoadingController, IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  GoogleMapsAnimation,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BasicInformationPage } from '../basic-information/basic-information';
import { ApiProvider } from '../../providers/api/api';
import { Storage} from '@ionic/storage';
import { JsonpModule } from '@angular/http';

declare var plugin: any;
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {
  
  @ViewChild('map') element;
  lat;
  lon;
  map: GoogleMap;
  nextButton;
  loading;
  list;
  name;
  contact;
  gender;
  crsName;
  isHome;
  constructor(public loadingCtrl:LoadingController, private storage:Storage,private api:ApiProvider, private toastctrl:ToastController, private geolocation: Geolocation,private alertCtrl:AlertController, public googleMaps: GoogleMaps, public plt: Platform, public navCtrl: NavController, public navParams: NavParams) {
  this.nextButton = true;
  
 
  }
  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.api.getTutorCourses().subscribe((res)=>{
        this.list = JSON.parse(res['_body']);
        this.loading.dismiss();
        console.log(this.list);
        this.initMap();
      },err=>{
        this.loading.dismiss();
        this.toastctrl.create({
          message: 'Error in Retriving Data',
          duration: 3000,
          position: 'Bottom'
        }).present();
      })
      
    });
  
  }
  ionViewDidLoad() {
  //  this.showmap();
  }
  /*
  next(){
    this.navCtrl.push(BasicInformationPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }*/
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
   var marker;
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

    
    marker = this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
    });

    /*  let htmlInfoWindow = new HtmlInfoWindow();
      let frame: HTMLElement = document.createElement('div');
      frame.innerHTML = [
        '<h3>'+ +'</h3>',
        '<h3>'+element.tutorId.contact +'</h3>',
        '<h3>'+element.tutorId.gender +'</h3>',
        '<h3>'+element.tutorId.isHomeTution+'</h3>',
        '<h3>'+element.tutorId.course.name+'</h3>',
        
        
        
        '<img src="">'
      ].join("");
      frame.getElementsByTagName("img")[0].addEventListener("click", () => {
        htmlInfoWindow.setBackgroundColor('red');
      });
      htmlInfoWindow.setContent(frame, {width: "280px", height: "330px"});*/
      this.map.setClickable(true);
    this.list.forEach(element => {
      
     
      
      let markerOptions: MarkerOptions = {
        position: new LatLng(element.tutorId.location[0], element.tutorId.location[1]),
        icon: "assets/images/icons8-Marker-64.png",
        title: 'tutor',
        animation: GoogleMapsAnimation.BOUNCE,
      
        
      }
      marker = this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe((e) => {
          //var marker = e[1];
          //var place = marker.get("place");
          this.alertCtrl.create({
            title: 'Tutor Contact Information',
            subTitle: element.tutorId.contact 
            ,
            buttons: [
              {
                
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
  
                      // Enable the map again
                      this.map.setClickable(true); 
  
                  }
              }
          ]
          }).present();
        
      });
      });
    });

  
    }).catch((error) => {
    this.toastctrl.create({
      message: "Turn On Location",
      duration: 3000,
      position: 'bottom'
    }).present();  
      
    });
    
  }


  /* for (var i = 0; i < markers.length; i++) {
            map.addMarker({
                'marker': markers[i],
                'position': markers[i].position
            }, function(marker) {

                // Defining event for each marker
                marker.on("click", function() {
                    alert(marker.get('marker').title);
                });

            });
        }  from api official */
  openInfoWindow(){

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
