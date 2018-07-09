import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {stringSplice} from "@ionic/app-scripts";
import {UtilsProvider} from "../../providers/utils/utils";
import {ResultsPage} from "../results/results";
import {SidemenuPage} from "../sidemenu/sidemenu";
import * as moment from "moment";
import {ReviewModalPage} from "../review-modal/review-modal";

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private utilsProvider: UtilsProvider,
              private modalCtrl: ModalController) {
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
  getSlots(sch){

  }
  book(){
    let slots= [];
    this.schedule.sch.forEach(d =>{
      if(d.selected){
        slots.push(d.time);
      }
    });
    let dataToSend = {
      "username": this.utilsProvider.getUserEmail(),
      "vendor_username": this.profileData.username,
      "date": moment(this.selectedDate, 'DD MMMM YYYY').format('MM/DD/YYYY'),
      "time": slots,
      "services": this.profileData.services
    };
    let bookVendorPromise  = this.utilsProvider.boookVendor(dataToSend);
    bookVendorPromise.then((result: any) =>{
      let notificationData = {
        vendor_id: this.profileData.user_id,
        user_id: this.utilsProvider.profile.user_id,
        text: 'Tell us how ' + this.profileData.first_name + ' ' + this.profileData.last_name + ' did with your booking on '+ moment(this.selectedDate, 'DD MMMM YYYY').format('MM/DD/YYYY')
      };
      let confirmNotificationData = {
        vendor_id: this.profileData.user_id,
        client_id: this.utilsProvider.profile.user_id,
        date: moment(this.selectedDate, 'DD MMMM YYYY').format('MM/DD/YYYY'),
        text: 'Would you like to confirm ' + this.profileData.first_name + ' ' + this.profileData.last_name +
              ' on '+ moment(this.selectedDate, 'DD MMMM YYYY').format('MM/DD/YYYY') + ' ' + slots
      };
      this.utilsProvider.sendNotification('review', notificationData, 'Submit your Review', this.utilsProvider.device_token);
      if(this.profileData.device_token){
        this.utilsProvider.sendNotification('confirm', confirmNotificationData, 'You Have a new booking', this.profileData.device_token);
      }
      this.utilsProvider.presentAlert("Booking Confirmed", "Thank You!");
      this.utilsProvider.setPage(ResultsPage);
      this.utilsProvider.notifyOther('data');
      this.navCtrl.push(SidemenuPage);
    });
  }
}
