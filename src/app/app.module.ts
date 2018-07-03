import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {BasicInformationPage} from '../pages/basic-information/basic-information';
import {EducationalInformationPage} from '../pages/educational-information/educational-information';
import { LocationPage } from '../pages/location/location';
import {MapComponent} from '../components/map/map'
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import {Profile} from '../models/profile';
import {VerifyPage}  from '../pages/verify/verify';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { TabsPage } from '../pages/tabs/tabs';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { NewCoursePage } from '../pages/new-course/new-course';
import { ViewCoursesPage } from '../pages/view-courses/view-courses';
import { SearchPage } from '../pages/search/search';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    BasicInformationPage,
    EducationalInformationPage,
    LocationPage,
    MapComponent,
    HomePage,
    VerifyPage,
    TabsPage,
    NewCoursePage,
    ViewCoursesPage,
    SearchPage,
    UpdateProfilePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule,
    SelectSearchableModule,
    IonicStorageModule.forRoot({
      name: '__hireTutor',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    SignUpPage,
    LocationPage,
    BasicInformationPage,
    VerifyPage,
    HomePage,
    TabsPage,
    NewCoursePage,
    ViewCoursesPage,
    SearchPage,
    UpdateProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    Camera,
    File,
    FileTransfer,
  //  FileTransferObject,
  ]
})
export class AppModule {}