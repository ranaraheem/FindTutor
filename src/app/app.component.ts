import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import{LocationPage} from '../pages/location/location';
import{BasicInformationPage} from '../pages/basic-information/basic-information'
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
    //rootPage:any = TabsPage;
    rootPage:any = SignUpPage;
    
   
  constructor(menu: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    
    });
  }
  
}
