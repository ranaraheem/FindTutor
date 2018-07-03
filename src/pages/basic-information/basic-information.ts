  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
  import {EducationalInformationPage} from '../educational-information/educational-information';
  import { Camera, CameraOptions } from '@ionic-native/camera';
  import { ApiProvider } from '../../providers/api/api';
  import {LocationPage} from '../location/location';
  import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
  import { File } from '@ionic-native/file';


  import { Storage} from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
  /**
   * Generated class for the BasicInformationPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-basic-information',
    templateUrl: 'basic-information.html',
  })
  export class BasicInformationPage {
    imgs:string;
    edu_lvl:any[];
    ckh;
    constructor(private alertCtrl:AlertController, public loadCtrl:LoadingController ,private file:File, private storage: Storage,private transfer: FileTransfer, public camera: Camera, private api:ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.ckh = true;
    this.edu_lvl = [];
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BasicInformationPage');
    }
    submit(info){
      info['edu_lvl'] = this.edu_lvl;
      console.log(info.edu_lvl);
      this.storage.get('user').then((user)=>{
        console.log(user);
        this.api.updateUserBasicInfo(user._id, info).subscribe((res)=>{
        info['profileId'] = user._id;
        this.navCtrl.push(TabsPage);
       
        this.api.education(info).subscribe((res)=>{
         
        
          },
          err =>{"err while creating education"});
    
        },
        err =>{"err while updating user"});

        this.upload(user._id);
       
      });
      
      
    }
    takePicture(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true,
        sourceType:0,
      
      }
      
      this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
        this.imgs = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
      console.log(err);
      });
    }

    upload(id) {
            this.api.uploadPic(this.imgs, id);
      
    }


    educationlevel(){
      
      let alert = this.alertCtrl.create();
    alert.setTitle('Select all those which you have passed');

    this.api.educationlLevelAll().subscribe((res)=>{
      let level = JSON.parse(res['_body']);


      level.forEach(element => {
        alert.addInput({
          type: 'checkbox',
          label: element.level,
          value: element._id,
          checked: false,
        });    
      });
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {
          this.edu_lvl = [];
          data.forEach((element) => {
            this.edu_lvl.push(element);

          });
          if(data.length > 0){
            this.ckh = false;

          }
          else{
            let alert = this.alertCtrl.create({
              title: 'Required',
              subTitle: 'Education Level is Required',
              buttons: ['Ok']
            });
            alert.present();
          }
        }
      });
      alert.present();
    })
    
   
  }
      

  }
