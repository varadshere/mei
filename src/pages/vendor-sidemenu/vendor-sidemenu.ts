import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetstartedPage} from "../getstarted/getstarted";
import {UtilsProvider} from "../../providers/utils/utils";
import {VendorHomePage} from "../vendor-home/vendor-home";

/**
 * Generated class for the VendorSidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-sidemenu',
  templateUrl: 'vendor-sidemenu.html',
})
export class VendorSidemenuPage {

  public rootPage: any = VendorHomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    this.rootPage = this.utilsProvider.getPage();
    console.log('ionViewDidLoad VendorSidemenuPage');
  }

  openPage(page){

  }

}
