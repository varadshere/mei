import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {services} from "../../providers/models";

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  // searchInput: any;
  // serviceType: any;
  // travelFlag: boolean;
  // rating: any;
  public freelancerServ = services;
  public days = ['mon', 'tue', 'wed', 'thurs', 'sat', 'sun'];
  serviceIndex = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  dismiss() {
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }

}
