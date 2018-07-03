import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage} from '@ionic/storage';

/**
 * Generated class for the ViewCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-courses',
  templateUrl: 'view-courses.html',
})
export class ViewCoursesPage {
  courses:any;

  id:any;
  constructor(private storage:Storage, public toastCtrl: ToastController, public api: ApiProvider, public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() { 
    let loading = this.loadingCtrl.create();
    loading.present();
  
    this.storage.get('user').then(user=>{
      this.id = user._id;
     // this.id = "5aeff8a3d1c30c0014fb93a0";
      this.api.getTutorCoursesById(this.id).subscribe((res)=>{
      console.log(res['_body']);
      // var temp = JSON.stringify(res['_body']);
       this.courses = JSON.parse(res['_body']);
        console.log(this.courses);
      }, err =>{
        console.log(err);
      });
    });
    loading.dismiss();

 
  }
  deleteCourse(id){
    this.api.deleteTutorCourses(id).subscribe((res)=>{
      this.toastCtrl.create({message:"Course Deleted", duration: 3000}).present();
      this.api.getTutorCoursesById(this.id).subscribe((res)=>{
      
        this.courses = JSON.parse(res['_body']);
        console.log(this.courses);
      }, err =>{
        
      });
    },
  err=>{
    this.toastCtrl.create({message:"Error Occured While Deleting Course"}).present();
  });
  }


  doRefresh(refresher) {

    this.api.getTutorCoursesById(this.id).subscribe((res)=>{
      
      this.courses = JSON.parse(res['_body']);
      refresher.complete();
    }, err =>{
      refresher.complete();
    });
  }
      
  
}
