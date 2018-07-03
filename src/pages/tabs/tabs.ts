import { Component } from '@angular/core';
import { Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';
import { LocationPage } from '../location/location';
import { VerifyPage } from '../verify/verify';
import { NewCoursePage } from '../new-course/new-course';
import { ViewCoursesPage } from '../view-courses/view-courses';
import { SearchPage } from '../search/search';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { MenuController, NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewCoursePage;
  tab2Root = ViewCoursesPage;
  tab3Root = SearchPage;
  tab4Root = UpdateProfilePage;

  constructor(private storage:Storage, public navCtrl: NavController, public menuCtrl: MenuController) {
    
    
  }
  openMenu() {
    this.menuCtrl.open(); 
  }

  logOut(){
  
    this.storage.remove('user').then(() =>{
        this.navCtrl.push(SignUpPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      
    });
  }

}
