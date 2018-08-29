import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";
import {UtilsProvider} from "../../providers/utils/utils";
import {BookingDetailsPage} from "../booking-details/booking-details";
import {event} from "d3-selection";

@Component({
  selector: 'page-vendor-calendar',
  templateUrl: 'vendor-calendar.html',
})
export class VendorCalendarPage {

  //////
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'day',
    currentDate: new Date()
  };

  event: any = { startTime: moment(new Date().toISOString()).locale('es').format(), endTime: moment(new Date().toISOString()).locale('es').format(), allDay: false };
  minDate = new Date().toISOString();

  obs(){
    console.log(this.event.startTime);
  }

  // addEvent() {
  //   let eventData = {
  //     startTime: new Date(),
  //     endTime: new Date(),
  //     title:'Test Title'
  //   };
  //   eventData.startTime = new Date(this.event.startTime);
  //   eventData.endTime = new Date(this.event.endTime);
  //
  //   let events = this.eventSource;
  //
  //   events.push(eventData);
  //   this.eventSource = [];
  //   setTimeout(() => {
  //     this.eventSource = events;
  //   });
  //   //this.eventSource = events;
  // }

  addEvent(startTime, endTime, service_name, client_address, date, name) {
    let eventData = {
      startTime: startTime,
      endTime: endTime,
      title: name + ' | ' +service_name + ' | ' + client_address
    };
    eventData.startTime = moment((date + ' ' + startTime), 'YYYY-MM-DD HH:mm').toDate();//new Date(this.event.startTime);
    eventData.endTime = moment((date + ' ' + endTime), 'YYYY-MM-DD HH:mm').toDate();//new Date(this.event.endTime);
    //
    // let events = this.eventSource;
    //
    // events.push(eventData);

    return eventData;
    //this.eventSource = events;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    var sTime = new Date(event.startTime);
    var sTimeHrs = sTime.getHours();
    var sTimeMins = sTime.getMinutes();
    var eTime = new Date(event.endTime);
    var eTimeHrs = eTime.getHours();
    var eTimeMins = eTime.getMinutes();

    let data = {
      confirm:"true",
      date: sTime.toDateString(),
      startTime: `${(sTimeHrs < 10)?'0'+sTimeHrs : sTimeHrs}:${(sTimeMins < 10)?'0'+sTimeMins : sTimeMins}`,
      endTime: `${(eTimeHrs < 10)?'0'+eTimeHrs : eTimeHrs}:${(eTimeMins < 10)?'0'+eTimeMins : eTimeMins}`,
      name: event.title.split("|")[0],
      address: event.title.split("|")[2],
      services:[{
        quantity:1,
        serviceName:event.title.split("|")[1]
      }]
    };

    this.navCtrl.push(BookingDetailsPage, {
      bookingData: data
    });

    // let alert = this.alertCtrl.create({
    //   title: '' + event.title,
    //   subTitle: 'From: ' + start + '<br>To: ' + end,
    //   buttons: ['OK']
    // })
    // alert.present();
  }

  onTimeSelected(ev) {
    // this.selectedDay = ev.selectedTime;
  }

  //////


  //event = { title: "", location: "", message: "", startDate: "", endDate: "" };
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
    this.loadEventThisMonth();
    // let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDay();
    this.selectedDate = moment().format('DD MMMM YYYY');
    this.selectDate(this.daysInThisMonth[this.currentDate-1]);
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
      let dayObj = {num: ("0" + (j+1)).slice(-2)};
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
    let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day.num;
    this.selectedDate = moment(thisDate1, 'YYYY-MM-DD').format('DD MMMM YYYY');
    this.calendar.currentDate = moment(thisDate1, 'YYYY-MM-DD').toDate();
    console.log(thisDate1);
    console.log("date");
    // this.isSelected = false;
    if(day.isSelected){
      day.isSelected = false;
    }else {
      this.deSelectOther();
      day.isSelected = true;
    }
    this.getEvents(thisDate1);
  }

  deSelectOther(){
    this.daysInThisMonth.forEach(function (day) {
      day.isSelected = false;
    });
  }

  swipeEvent($e){
    if($e.offsetDirection == 4){
      // Swiped right, for example:
      // this.week.prevWeek();
      this.goToLastMonth();
    } else if($e.offsetDirection == 2){
      // Swiped left, for example:
      // this.week.nextWeek();
      this.goToNextMonth();
    }
  }
  getEvents(date){
    let dataToSend = {
      "filter": moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY'),//"04/28/2018",
      "vendor_username": this.utilsProvider.getUserEmail()
    };
    let ref = this;
    let eventsPromise = this.utilsProvider.getSummery(dataToSend);
    eventsPromise.then((results:any)=>{
      if(results.bookings){
        let events = [];
        results.bookings.forEach(bookings =>{
          bookings.list.forEach(d =>{
            let ev = this.addEvent(d.startTime, d.endTime, d.service_name, d.client_address, date, d.name);
            events.push(ev);
          });
        });

        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
}
