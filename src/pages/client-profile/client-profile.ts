import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {SelectionHomePage} from "../selection-home/selection-home";
import {ClientSettingsPage} from "../client-settings/client-settings";

@Component({
  selector: 'page-client-profile',
  templateUrl: 'client-profile.html',
})
export class ClientProfilePage {
  rate= 3.5;
  profile: string = "ABOUT";
  editMode: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfilePage');
  }

  onModelChange(data){

  }
  openSettings(){
    this.utils.setPage(ClientSettingsPage);
    this.utils.notifyOther('data');
  }

  editToggle(){
    this.editMode = true;
  }

  saveProfile(){
    let ref = this;
    this.utils.profile.fav = this.utils.profile.fav.replace(/,/g," . ");
    // this.utils.editClientSettings(this.utils.profile).then(function (data) {
    //   console.log(data);
    //   ref.editMode = false;
    // });
    ref.editMode = false;
  }
}
