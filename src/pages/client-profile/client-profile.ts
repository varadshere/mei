import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the ClientProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-client-profile',
  templateUrl: 'client-profile.html',
})
export class ClientProfilePage {
  rate= 3.5;
  profile: string = "ABOUT";
  profileData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    this.profileData = utils.profile;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfilePage');
  }

  onModelChange(data){

  }
}
