import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {CalendarPage} from "../calendar/calendar";
import {MyBookingPage} from "../my-booking/my-booking";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  vendorList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    let vendorListPromise  = this.utils.vendorListService();
    let ref = this;
    vendorListPromise.then(function (result: any) {
      if(result){
        console.log("getProfile Success!!")
        console.log(result);
        ref.vendorList = result;
      }
    });
  }


  ionViewDidLoad() {
    // this.vendorList
    console.log('ionViewDidLoad ResultsPage');
  }

  openProfile(profile){
    this.navCtrl.push(ProfilePage, {
      profile: profile
    });
  }

  navigate(){
    this.navCtrl.push(MyBookingPage);
  }
}
