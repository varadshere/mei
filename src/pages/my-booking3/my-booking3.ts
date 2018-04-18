import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {stringSplice} from "@ionic/app-scripts";
import {UtilsProvider} from "../../providers/utils/utils";
import {ResultsPage} from "../results/results";
import {SidemenuPage} from "../sidemenu/sidemenu";

/**
 * Generated class for the MyBooking3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-booking3',
  templateUrl: 'my-booking3.html',
})
export class MyBooking3Page {

  profileData: any = {};
  schedule: any = {};
  selectedDate:any;
  startTime:any;
  endTime:any;
  totalCost = 0;
  selectedServicesNames:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private utilsProvider: UtilsProvider) {
    this.profileData = navParams.get('profile');
    this.schedule = navParams.get('schedule');
    this.selectedDate = navParams.get('selectedDate');

    let selectedSlots = [];
    this.schedule.sch.forEach(d=>{
      if(d.selected){
        selectedSlots.push(d);
      }
    });
    this.startTime = selectedSlots[0].time;
    if(selectedSlots.length > 1){
      this.endTime = selectedSlots[selectedSlots.length -1].time;
    }
    this.selectedServicesNames = [];
    this.profileData.services.forEach(s => {
      s.list.forEach(d => {
        if(d.booked){
          this.selectedServicesNames.push(d.name);
          this.totalCost = this.totalCost + parseInt(d.cost);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBooking3Page');
  }

  book(){
    let dataToSend = {
      "username": this.utilsProvider.getUserEmail(),
      "vendorname": this.profileData.username,
      "date": "03/19/2018",
      "time": "22:00",
      "services": this.profileData.services
    };
    let bookVendorPromise  = this.utilsProvider.boookVendor(dataToSend);
    let ref = this;
    bookVendorPromise.then(function (result: any) {
      ref.utilsProvider.presentAlert("Booking Confirmed", "Thank You!");
      ref.utilsProvider.setPage(ResultsPage);
      ref.utilsProvider.notifyOther('data');
      ref.navCtrl.push(SidemenuPage); 
    });
  }
}
