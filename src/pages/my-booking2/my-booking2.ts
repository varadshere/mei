import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyBooking3Page} from "../my-booking3/my-booking3";
import {UtilsProvider} from "../../providers/utils/utils";
declare var Stripe;
/**
 * Generated class for the MyBooking2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-booking2',
  templateUrl: 'my-booking2.html',
})
export class MyBooking2Page {

  profileData: any = {};
  schedule: any = {};
  selectedDate:any;
  stripe1:any;
  elements:any;
  card:any;
  style:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider){
    this.profileData = navParams.get('profile');
    this.schedule = navParams.get('schedule');
    this.selectedDate = navParams.get('selectedDate');

    this.stripe1 = Stripe('pk_test_x1LxYvNr0ewGsaPHNzX0V7Ey');
    this.elements = this.stripe1.elements();
    this.style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
      }
    };

// Create an instance of the card Element.
    this.card = this.elements.create('card', {style: this.style});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBooking2Page');
    this.card.mount('#card-element');

  }

  paymentButton2() {
    let ref = this;
    var form = document.getElementById('payment-form');
    var ownerInfo = {
      owner: {
        name: 'Jenny Rosen',
        address: {
          line1: 'Nollendorfstraße 27',
          city: 'Berlin',
          postal_code: '10777',
          country: 'DE'
        },
        email: 'jenny.rosen@example.com'
      },
    };
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      ref.stripe1.createSource(ref.card, ownerInfo).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the source to your server
          console.log(JSON.stringify(result.source));
        }
      });
    });
  }

  navigate(){
    // this.navCtrl.push(MyBooking3Page);
    this.navCtrl.push(MyBooking3Page, {
      profile: this.profileData,
      slots: this.schedule,
      selectedDate: this.selectedDate,
      schedule:  this.schedule
    });
  }
}
