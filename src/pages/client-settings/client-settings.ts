import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the ClientSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-settings',
  templateUrl: 'client-settings.html',
})
export class ClientSettingsPage {
  editMode: boolean = false;
  settings: any = {
    "email": this.utilsProvider.getUserEmail(),
    "username": this.utilsProvider.getUserEmail(),
    "address": "",
    "bankName": "",
    "cardNumber": "",
    "distance": 10,
    "first_name": "",
    "last_name": "",
    "notification": false,
    "phone": "",
    "travel": false
  };


email: string
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
    this.email = utilsProvider.getUserEmail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientSettingsPage');
    this.getClientSettings();

  }

  editToggle(){
    this.editMode = true;
  }
  saveProfile(){
    let ref = this;
    this.utilsProvider.editClientSettings(this.settings).then(function (data) {
      console.log(data);
      ref.editMode = false;
    });
  }

  getClientSettings(){
    let ref = this;
    let dts = {
      "username": this.utilsProvider.getUserEmail(),
      "email": this.utilsProvider.getUserEmail()
    };
    let getSettings = this.utilsProvider.getClientSettings(dts);

    getSettings.then(function (data:any) {
      if(data)
      ref.settings = data;
    });
  }

}
