import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

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

  addEvent(startTime, endTime, service_name, client_address, date) {
    let eventData = {
      startTime: startTime,
      endTime: endTime,
      title: service_name + ' | ' + client_address
    };
    eventData.startTime = moment((date + ' ' + startTime), 'YYYY-MM-DD HH:mm');//new Date(this.event.startTime);
    eventData.endTime = moment((date + ' ' + endTime), 'YYYY-MM-DD HH:mm');//new Date(this.event.endTime);

    let events = this.eventSource;

    events.push(eventData);
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
    //this.eventSource = events;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

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

    let thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDay();
    this.selectedDate = moment(thisDate1, 'YYYY-MM-DD').format('DD MMMM YYYY');
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
      let dayObj = {num: j+1};
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
    // this.isSelected = false;
    if(day.isSelected){
      day.isSelected = false;
    }else {
      this.deSelectOther();
      day.isSelected = true;
    }
  }

  deSelectOther(){
        this.daysInThisMonth.forEach(function (day) {
            day.isSelected = false;
        });
  }

}
