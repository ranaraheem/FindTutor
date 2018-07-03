import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private storgae:Storage, public navCtrl: NavController) {
    console.log(this.storgae.get('user'));
  }

}
