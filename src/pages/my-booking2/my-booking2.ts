import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyBooking3Page} from "../my-booking3/my-booking3";

/**
 * Generated class for the MyBooking2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-booking2',
  templateUrl: 'my-booking2.html',
})
export class MyBooking2Page {

  profileData: any = {};
  schedule: any = {};
  selectedDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileData = navParams.get('profile');
    this.schedule = navParams.get('schedule');
    this.selectedDate = navParams.get('selectedDate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBooking2Page');
  }

  navigate(){
    // this.navCtrl.push(MyBooking3Page);
    this.navCtrl.push(MyBooking3Page, {
      profile: this.profileData,
      slots: this.schedule,
      selectedDate: this.selectedDate,
      schedule:  this.schedule
    });
  }
}
