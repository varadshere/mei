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
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfilePage');
  }

  ngOnInit(){
    this.utils.getProfile().then(data => console.log("Profile fetched."));
  }

  onModelChange(data){

  }
  openSettings(){
    this.utils.setPage(ClientSettingsPage);
    this.utils.notifyOther('data');
  }
}
