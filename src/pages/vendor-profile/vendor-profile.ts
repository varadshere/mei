import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {VendorSettingsPage} from "../vendor-settings/vendor-settings";

@Component({
  selector: 'page-vendor-profile',
  templateUrl: 'vendor-profile.html',
})
export class VendorProfilePage {
  profile: string = "ABOUT";
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorProfilePage');
  }
  openVendorSettings(){
    console.log("Vendor Settings");
    this.utils.setPage(VendorSettingsPage);
    this.utils.notifyOther('data');
  }
}
