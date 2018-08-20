import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SidemenuPage} from "../sidemenu/sidemenu";
import {BookingDetailsPage} from "../booking-details/booking-details";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-vendor-bookings',
  templateUrl: 'vendor-bookings.html',
})
export class VendorBookingsPage {

  option = 'current';
  // list: [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}];
  list2 = [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', date: '15 Sept'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', date: '11 Apr'}];
  bookingsData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider) {
    this.getBookings(this.option);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorBookingsPage');
  }

  getBookings(filter){
    let dataToSend = {
      "filter": filter,
      "vendor_email": this.utilsProvider.getUserEmail(),
      "type": "vendor"
    };
    let bookings = this.utilsProvider.getBookings(dataToSend);
    bookings.then((result:any)=>{
      if(result){
        this.bookingsData = result;
      }
    });
  }

  tabChanged(e){
    this.bookingsData = [];
    this.getBookings(this.option);
  }

  navigate(data,index){
    this.navCtrl.push(BookingDetailsPage, {
      bookingData: data,
      bookingIndex: index
    });
  }

  ionViewWillEnter(){
    var bookingIndex = this.navParams.get('bookingIndex') || null;
    var bookingStatus = this.navParams.get('bookingStatus') || null;
    // console.log(bookingIndex , bookingStatus);
    if (bookingIndex != null && bookingStatus != null){
      this.bookingsData[bookingIndex]['confirm'] = bookingStatus;
    }
    // console.log(this.bookingsData);
  }
}
