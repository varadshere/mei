import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SidemenuPage} from "../sidemenu/sidemenu";
import {BookingDetailsPage} from "../booking-details/booking-details";

@Component({
  selector: 'page-vendor-bookings',
  templateUrl: 'vendor-bookings.html',
})
export class VendorBookingsPage {

  option = 'CURRENT';
  // list: [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}];
  list2 = [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', date: '15 Sept'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', date: '11 Apr'}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorBookingsPage');
  }

  navigate(){
    this.navCtrl.push(BookingDetailsPage);
  }
}
