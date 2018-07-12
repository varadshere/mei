import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {BookingDetailsPage} from "../booking-details/booking-details";
import {MyBooking2Page} from "../my-booking2/my-booking2";

/**
 * Generated class for the ClientBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-client-bookings',
  templateUrl: 'client-bookings.html',
})
export class ClientBookingsPage {

  option = 'current';
  bookingsData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider) {
    this.getBookings(this.option);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientBookingsPage');
  }

  getBookings(filter){
    let dataToSend = {
      "filter": filter,
      "vendor_email": this.utilsProvider.getUserEmail(),
      "type": "client"
    };
    let ref = this;
    let bookings = this.utilsProvider.getBookings(dataToSend);
    bookings.then((result:any)=>{
      if(result){
        ref.bookingsData = result
        console.log('bookings', result);
      }
    });
  }

  tabChanged(e){
    this.bookingsData = [];
    this.getBookings(this.option);
  }

  navigate(data){
    this.navCtrl.push(BookingDetailsPage, {
      bookingData: data
    });
  }

}
