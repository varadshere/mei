import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {stringSplice} from "@ionic/app-scripts";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
