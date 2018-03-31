import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vendor-calendar',
  templateUrl: 'vendor-calendar.html',
})
export class VendorCalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorCalendarPage');
  }

}
