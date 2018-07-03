  import { Component } from '@angular/core';
  import { NavController } from 'ionic-angular';
  import { AlertController, MenuController } from 'ionic-angular';
  import { ToastController } from 'ionic-angular';
  import {SignUpPage} from '../sign-up/sign-up';
  import { HttpModule } from '@angular/http';
  import { ApiProvider } from '../../providers/api/api';
  import { Profile } from '../../models/profile';
  import { Storage} from '@ionic/storage';
  import {HomePage} from '../home/home';
  import { TabsPage } from '../tabs/tabs';

  @Component({
    selector: 'page-login',
    templateUrl: 'login.html'
  })
  export class LoginPage {
    
    constructor(public menuCtrl: MenuController, private storage: Storage, private api:ApiProvider, public http: HttpModule,  public navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
      this.storage.get('user_id').then(data=>{
        if(data)
        {
          this.navCtrl.push(HomePage);
        }
        
      })
    }
    ionViewDidLoad(){
      
    }
    openMenu() {
      this.menuCtrl.open();
    }
    
    emailPrompt() {
      let prompt = this.alertCtrl.create({
        title: 'Forgot Email',
        message: "Enter an Email address",
        inputs: [
          {
            name: 'Email',
            placeholder: 'abc@xyz.com'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send me Verification code',
            handler: data => {
              console.log('Saved clicked');
              this.presentToast("Email has been sent.");
            }
          }
        ]
      });
      prompt.present();
    }
    presentToast( msg:string) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: "middle"
      });
      toast.present();
    }
    goToSignUp(params){
      if (!params) params = {};
      this.navCtrl.push(SignUpPage);
    }
    loginUser(userData){
      
    // console.log(this.usr.name + this.usr.password);
      this.api.loginUser(userData).subscribe(res=>{
      this.storage.set('user', JSON.parse(res['_body']));
      this.navCtrl.push(TabsPage);

    }, err => this.responseHandler(err))
    }
    responseHandler(response){
      switch(response.status){
        case 200:{
          

          break;
        }
        case 401:{
          this.presentToast("Invalid Password");
          console.log("Invalid Password");
          break;
        }
        case 404:{
          this.presentToast("Invalid Email address");
          console.log("Invalid Email address");
          break;
        }

      }

  
    }
  }

