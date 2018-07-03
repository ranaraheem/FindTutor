import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BasicInformationPage } from '../basic-information/basic-information';
import { Storage} from '@ionic/storage';

import { ApiProvider } from '../../providers/api/api';
import { LocationPage } from '../location/location';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {

  constructor(private storage:Storage, private api:ApiProvider, private alertController:AlertController, public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    
  }
  VerifyUser(data){
    this.storage.get('user').then(user=>{
    if(user.temp_code == data.code)
    {
      this.api.verifyUser(user._id).subscribe((res)=>{
        user.isverified = true;

        this.storage.set('user', user);
        this.navCtrl.push(LocationPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
        });
  
    }
    else{
      let erroralert = this.alertController.create({
        title: 'Error',
        subTitle: 'Invalid Verification Code',
        buttons: [{
          text: 'OK'
        }]
      });
      erroralert.present();
    }
    
  });
}

}
