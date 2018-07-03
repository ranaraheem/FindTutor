  import { Component,ViewChild, ElementRef  } from '@angular/core';
  import {AlertController,ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
  import { ApiProvider } from '../../providers/api/api';
  import { Storage} from '@ionic/storage';

  import {VerifyPage} from '../verify/verify';
  import{TabsPage} from '../tabs/tabs';
  import { LocationPage } from '../location/location';
import { LoginPage } from '../login/login';

  /**
   * Generated class for the SignUpPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
  })
  export class SignUpPage {
    @ViewChild('repassword') rePasswd;
    constructor(private storage:Storage, private toastController:ToastController, public alertController:AlertController, private api:ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.storage.get('user').then(user=>{
        if  (user)
        {
          if(!user.isverified)
          {
            this.navCtrl.push(VerifyPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });
          }

          else if(user.location.length < 2){
            this.navCtrl.push(LocationPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });
          }
          else {
            this.navCtrl.push(TabsPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });
          }
          
        }
      });
      

    
  
    }

    ionViewDidLoad() {
    }

    login(){
      this.navCtrl.push(LoginPage);
    }

    CreateUser(usr){
      if(usr.password != usr.reenterPassword){
        this.alertController.create({
          title: 'Passwords MisMatched',
          subTitle: 'Passwords don\'t Match',
          buttons: ['Ok']
          }).present(); 
          
          this.rePasswd.value= "";

        
      }
      else{
        
        
        this.api.signUpUser(usr).subscribe((res) => {
        
          this.storage.set('user', JSON.parse(res['_body']));
      
          this.navCtrl.push(VerifyPage).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0, index);
          }); 
      
        }
          , err => this.responseHandler(err))
      }
    }
    responseHandler(response){
      switch(response.status){
        case 500:{
          break;
        }
        
      }

      }
      checkEmailAvailability(email){
        if(email != ""){
          
          this.api.checkEmailAvailability(email).subscribe((res)=>{
            this.alertController.create({
              title:'Email Already Exist',
              subTitle: 'Try Another Email',
              buttons: ['OK']
            }).present();
          },
          err=>function(err){
              if(err.status == 400){
            }
            
            
            
          });
      }
      }
    
  }
