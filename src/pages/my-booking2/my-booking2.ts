import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MyBooking3Page} from "../my-booking3/my-booking3";
import {UtilsProvider} from "../../providers/utils/utils";
declare var Stripe;
@Component({
  selector: 'page-my-booking2',
  templateUrl: 'my-booking2.html',
})
export class MyBooking2Page {

  profileData: any = {};
  schedule: any = {};
  selectedDate:any;
  bookingLocation = "";
  stripe1:any;
  elements:any;
  card:any;
  style:any;
  addCardFlag: boolean = true;
  savedCardFlag: boolean = false;
  savedCard:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider){
    this.profileData = navParams.get('profile');
    this.schedule = navParams.get('schedule');
    this.selectedDate = navParams.get('selectedDate');
    this.bookingLocation = navParams.get('bookingLocation');
    this.getCard();
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

  getCard(){
    this.utilsProvider.getCard().then(result =>{
        if(result){
          this.savedCardFlag = true;
          this.savedCardFlag = true;
          this.savedCard = result;
        }else {
          this.savedCardFlag = false;
        }
    })
  }

  paymentButton2() {
    let ref = this;
    var form = document.getElementById('payment-form');
    var ownerInfo = {
      owner: {
        name: this.utilsProvider.profile.first_name + ' ' +  this.utilsProvider.profile.last_name,
        address: {
          line1: this.utilsProvider.profile.address
        },
        email: this.utilsProvider.getUserEmail()
      }
    };
    let loading = this.utilsProvider.getloadingAlert();
    loading.present();
    ref.stripe1.createSource(ref.card, ownerInfo).then(function(result) {
      var errorElement = document.getElementById('card-errors');
      loading.dismissAll();
      if (result.error) {
        // Inform the user if there was an error
        errorElement.textContent = result.error.message;
        ref.addCardFlag = true;
      } else {
        // Send the source to your server
        ref.addCardFlag = false;
        errorElement.textContent = '';
        let dataToSend  = {
          email: ref.utilsProvider.getUserEmail(),
          id: ref.utilsProvider.profile.user_id,
          source: result.source
        };
        ref.utilsProvider.saveCard(dataToSend).then(result =>{

        });
      }
    });
  }
  navigate(){
    // this.navCtrl.push(MyBooking3Page);
    this.navCtrl.push(MyBooking3Page, {
      profile: this.profileData,
      slots: this.schedule,
      selectedDate: this.selectedDate,
      schedule:  this.schedule,
      bookingLocation: this.bookingLocation
    });
  }
}
