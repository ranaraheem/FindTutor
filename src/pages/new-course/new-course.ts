import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import { ApiProvider } from '../../providers/api/api';
import { FormControl } from '@angular/forms';
import { Storage} from '@ionic/storage';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {ViewCoursesPage} from '../view-courses/view-courses';

/**
 * Generated class for the NewCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Port {
  public _id: string;
  public name: string;

}
@IonicPage()
@Component({
  selector: 'page-new-course',
  templateUrl: 'new-course.html',
})
export class NewCoursePage {
  ports: Port[];
  port: Port;
  toggle:Boolean;
  constructor(private toastCtrl:ToastController, private storage:Storage, public alertCtrl:AlertController, public loadingCtrl: LoadingController, private api:ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.toggle = false;
    this.ports = [];
  
  

  }
  ngAfterViewInit(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.api.courseAll().subscribe((res)=>{
      let crs = JSON.parse(res['_body']);
      this.ports = crs;
      
    loading.dismiss();
    }, err=>{console.log(err)});

  }
  
  portChange(event: { component: SelectSearchable, value: any }) {
    console.log('port:', event.value);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCoursePage');
  }

  createCourse(data){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.storage.get('user').then(user=>{
      data['id'] = user._id;
      console.log(data);
      this.api.createOfferedCourse(data).subscribe((res)=>{
        console.log(res);
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Course Created',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();  
      }, err=> {
        loading.dismiss();
      })
    }, err=>{
      console.log(err.message);
    });

  }
  
  newCourse(){
    let alert = this.alertCtrl.create({
      title: 'New Course',
      inputs: [
        {
          name: 'CourseName',
          placeholder: 'Matric'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.CourseName == "") {
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Course Name is Required',
                buttons: ['Dismiss']
              });
              alert.present();
              
            } else {
                if(this.ports.find( obj => obj.name.toLowerCase() == data.CourseName.toLowerCase()) == undefined){
                  let loading = this.loadingCtrl.create();
                  loading.present();
                  this.api.createCourse(data.CourseName).subscribe((res)=>{
                    this.api.courseAll().subscribe((res)=>{
                      let crs = JSON.parse(res['_body']);
                      this.ports = crs;
                    }, err=>{console.log(err)});
                   
                    loading.dismiss();
                  }, err=>{
                    console.log(err);
                  });
                }
                else{
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Course already exist',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
            }
          }
        }
      ]
    });
    alert.present();
  }
}
