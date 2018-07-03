import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  user:any;
  name;
  contact;
  loading;
  constructor(private storage:Storage, public alertCtrl: AlertController, public loadingCtrl:LoadingController, private api:ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.loading =  this.loadingCtrl.create();
   this.loading.present();
   this.storage.get('user').then((user)=>{
    this.api.getUserbyId(user._id).subscribe((res)=>{
      this.user = JSON.parse(res['_body'])[0];
      
      this.name = this.user.name;
      this.contact = this.user.contact;
      this.loading.dismiss();
    },
    err =>{
      this.loading.dismiss();

    });
   });

    
  }

  update(data){
    this.user.name = this.name;
    this.user.contact = this.contact;
    this.api.updateUserBasicInfo(this.user._id, this.user).subscribe((res)=>{
      let alert = this.alertCtrl.create({
        title: 'Updated',
        subTitle: 'Profile Updated',
        buttons: ['Dismiss']
      });
      alert.present();    
    });

  }

}
