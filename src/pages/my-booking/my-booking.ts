import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from "moment";
import {MyBooking2Page} from "../my-booking2/my-booking2";
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the MyBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-booking',
  templateUrl: 'my-booking.html',
})
export class MyBookingPage {

  selectedDate: any;
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;
  initialDate: any;

  schedule = {
    sch: []
  }; //string[];
  gsDayNames: string[];
  slots: any;
  profileData:any = {};
  bookedServices = 0;
  timeObj = {
    _0900: {
      selected : false
    },
    _1000: {
      selected : false
    },
    _1100: {
      selected : false
    },
    _1200: {
      selected : false
    },
    _1300: {
      selected : false
    },
    _1400: {
      selected : false
    },
    _1500: {
      selected : false
    },
    _1600: {
      selected : false
    },
    _1700: {
      selected : false
    },
    _1800: {
      selected : false
    },
    _1900: {
      selected : false
    },
    _2000: {
      selected : false
    },
    _2100: {
      selected : false
    }
  };
  totalCost = 0;
  vendorSettings:any;
  clientSettings:any;
  bookingLocation = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider, private alertCtrl: AlertController) {
    this.profileData = navParams.get('profile');
    this.getSlots();
    this.getFreelancerSettings();
    this.getClientSettings();
    this.profileData.services.forEach(s => {
        s.list.forEach(d => {
          if(d.booked){
            this.bookedServices++;
             this.totalCost = this.totalCost + parseInt(d.cost);
          }
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingPage');
  }

  getFreelancerSettings(){
    let ref = this;
    let dts = {
      "username": this.profileData.username,
      "email": this.profileData.email,
      "type": "vendor"
    };
    let getSettings = this.utilsProvider.getSettings(dts);

    getSettings.then(function (data:any) {
      ref.vendorSettings = data;
    });
  }

  getClientSettings(){
    let ref = this;
    let dts = {
      "username": this.utilsProvider.getUserEmail(),
      "email": this.utilsProvider.getUserEmail(),
      "type": "client"
    };
    let getSettings = this.utilsProvider.getSettings(dts);

    getSettings.then(function (data:any) {
      if(data){
        ref.clientSettings = data;
      }
    });
  }

  showAddressAlert(){
    let msg = "";
    if (this.vendorSettings.travel == "False" && this.clientSettings.travel == "True"){
      msg = "Booking will take place at Freelancer's location!!";
      this.bookingLocation = "vendor";
    }
    else {
      msg = "Booking will take place at Your location!!";
      this.bookingLocation = "client";
    }
    let alert = this.alertCtrl.create({
      title: "Confirm Location",
      message: msg,
      buttons: [
        {
          text: 'Disagree',
          role: 'disagree',
          handler: () => {
            console.log("Location denied.");
            this.utilsProvider.presentAlert("Uh oh! Booking failed", "Location denied!");
          }
        },
        {
          text: 'Agree',
          role: 'agree',
          handler: () => {
            console.log("Location accepted.");
            this.navigate();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.initialDate = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
    this.loadEventThisMonth();

    let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDay();
    this.selectedDate = moment(thisDate1, 'YYYY-MM-DD').format('DD MMMM YYYY');
    this.gsDayNames = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      let dayObj = {
        num: ("0" + (j+1)).slice(-2),
        date: new Date(this.date.getFullYear(), this.date.getMonth(), j+1)
      };
      this.daysInThisMonth.push(dayObj);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
  }

  checkEvent(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }

  selectDate(day) {
    this.deSelectTime();
    let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day.num;
    this.selectedDate = moment(thisDate1, 'YYYY-MM-DD').format('DD MMMM YYYY');
    if(moment(thisDate1, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day') ){
      //  this.calendar.currentDate = moment(thisDate1, 'YYYY-MM-DD').toDate();
      // this.isSelected = false;
      if(day.isSelected){
        day.isSelected = false;
      }else {
        this.deSelectOther();
        day.isSelected = true;
      }

      let weekDay  = this.gsDayNames[day.date.getDay()];
      let data = {
        "username": this.profileData.username,
        "date": moment(thisDate1, 'YYYY-MM-DD').format('MM/DD/YYYY'),
        "week_day":weekDay
      };
      let ref = this;
      ref.schedule.sch = [];
      let slotsbyday = this.utilsProvider.getSlotsByDay(data);
      slotsbyday.then((result:any)=>{
          if(result)
          ref.schedule.sch = result;
          let index=0;
          for (let timeobj of ref.schedule.sch){
            if (timeobj.time.split(':')[0] > 12){
              ref.schedule.sch[index].time = `${timeobj.time.split(':')[0] - 12}:${timeobj.time.split(':')[1]} PM`;
            }
            else if(timeobj.time.split(':')[0] == 12){
              ref.schedule.sch[index].time = `${ref.schedule.sch[index].time} PM`;
            }
            else{
              ref.schedule.sch[index].time = `${ref.schedule.sch[index].time} AM`;
            }
            index++;
          }
      });
    }
  }
  getSlotsByDay(data){

  }
  deSelectOther(){
    this.daysInThisMonth.forEach(function (day) {
      day.isSelected = false;
    });
  }

  navigate(){
    // this.navCtrl.push(MyBooking2Page);
    let sSlots = this.getSelectedSlots();
    if(sSlots.length > 0) {
      this.navCtrl.push(MyBooking2Page, {
        profile: this.profileData,
        schedule: this.schedule,
        selectedDate: this.selectedDate,
        bookingLocation: this.bookingLocation
      });
    }else {
      this.utilsProvider.presentAlert("Uh oh! Booking failed", "Please select Time!");
    }
  }
  getSlots(){
    let slotsPromise  = this.utilsProvider.getSlots(this.profileData.username);
    let ref = this;
    slotsPromise.then(function (result: any) {
      ref.slots = result;
    });
  }

  getSelectedSlots(){
    let sSlots = [];
    this.schedule.sch.forEach(d=>{
      if(d.selected){
        sSlots.push(d);
      }
    });
    return sSlots;
  }

  swipeEvent(e){
    console.log(e);
  }

  timeSelect(s){
    this.deSelectTime();
    this.schedule.sch.forEach((d, i) =>{
        if(d.time == s.time){
          for(let j = 0; j < this.bookedServices; j++){
            if((j + i) < this.schedule.sch.length){
              this.schedule.sch[j + i].selected = true;
            }
          }
        }
    });
    // s.selected ? (s.selected = false) : (s.selected = true);

  }

  deSelectTime(){
    this.schedule.sch.forEach((d, i) =>{
      d.selected = false;
    });
  }

}
