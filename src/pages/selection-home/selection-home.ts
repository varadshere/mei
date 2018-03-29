import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {GetstartedPage} from "../getstarted/getstarted";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {ResultsPage} from "../results/results";

/**
 * Generated class for the SelectionHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-selection-home',
  templateUrl: 'selection-home.html',
})
export class SelectionHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionHomePage');
  }

  navigate(selection){
    this.utilsProvider.setServiceSelection(selection);
    this.utilsProvider.setPage(ResultsPage);
    // this.navCtrl.push(SidemenuPage);
    this.utilsProvider.notifyOther('data');
  }

}
