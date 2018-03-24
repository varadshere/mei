import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {ProfilePage} from "../profile/profile";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {UtilsProvider} from "../../providers/utils/utils";
import {ResultsPage} from "../results/results";

/**
 * Generated class for the GetstartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-getstarted',
  templateUrl: 'getstarted.html',
})
export class GetstartedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetstartedPage');
    //this.navCtrl.push(ProfilePage);
  }

  open(){
    console.log("Open Profile");
    // this.com1ref.openPage("profile");
    this.utilsProvider.notifyOther("Profile");
  }

  navigate(){
    console.log('ionViewDidLoad GetstartedPage');
    this.utilsProvider.notifyOther("Results");
    // this.utilsProvider.notifyOther("Profile");
  }

}
