import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {MyBooking2Page} from "../my-booking2/my-booking2";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileData = navParams.get('profile');
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

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
    this.loadEventThisMonth();

    let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDay();
    this.selectedDate = moment(thisDate1, 'YYYY-MM-DD').format('DD MMMM YYYY');
    this.gsDayNames = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
    this.slots =  {
      "mon": [
        {"time": "09:00"},
        {"time": "10:00"},
        {"time": "11:00"},
        {"time": "12:00"},
        {"time": "15:00"}
      ],
        "thur": [
          {"time": "09:00"},
          {"time": "13:00"},
          {"time": "14:00"},
          {"time": "15:00"}
      ],
        "tue": [
          {"time": "09:00"},
          {"time": "10:00"},
          {"time": "11:00"},
          {"time": "12:00"}
      ],
        "wed": [
          {"time": "13:00"},
          {"time": "16:00"},
          {"time": "17:00"}
      ]
    };
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
    // this.calendar.listEventsInRange(startDate, endDate).then(
    //   (msg) => {
    //     msg.forEach(item => {
    //       this.eventList.push(item);
    //     });
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
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
    if(moment(thisDate1, 'YYYY-MM-DD') >= moment() ){
      //  this.calendar.currentDate = moment(thisDate1, 'YYYY-MM-DD').toDate();
      console.log(thisDate1);
      console.log("date");
      // this.isSelected = false;
      if(day.isSelected){
        day.isSelected = false;
      }else {
        this.deSelectOther();
        day.isSelected = true;
      }

      let weekDay  = this.gsDayNames[day.date.getDay()];
      if(this.slots[weekDay]){
        let schedule = this.slots[weekDay];
        day.schedule = schedule;
        this.schedule.sch = schedule;
      }else {
        this.schedule.sch = [];
      }
    }

    //this.selectedDay = day;
    // this.selectedEvent = new Array();
    // var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    // var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    // this.eventList.forEach(event => {
    //   if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
    //     this.isSelected = true;
    //     day.isSelected = true;
    //     this.selectedEvent.push(event);
    //   }
    // });
  }

  deSelectOther(){
    this.daysInThisMonth.forEach(function (day) {
      day.isSelected = false;
    });
  }

  navigate(){
    // this.navCtrl.push(MyBooking2Page);
    this.navCtrl.push(MyBooking2Page, {
      profile: this.profileData,
      schedule: this.schedule,
      selectedDate: this.selectedDate
    });
  }
  getSlots(){

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
