import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {HTTP} from "@ionic-native/http";
import {PaymentCodes} from "../../providers/models";

declare var Stripe;
/**
 * Generated class for the VendorBankDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-bank-details',
  templateUrl: 'vendor-bank-details.html',
})
export class VendorBankDetailsPage {
  bankDetails: any = {
    'country':'',
    'currency':'',
    'routing_number':'',
    'account_number':'',
    'account_holder_name':'',
    'account_holder_type':'individual',
    'dob':''
  };
  bankID: string = null;
  editable: boolean = true;
  bankDataSend: any = {
    'username':'',
    'user_id':'',
    'bank_account':{}
  };
  stripeAccData: any = {
    "country" :"AU",
    "email" : "",
    "day": null,
    "month": null,
    "year": null,
    "first_name": "",
    "last_name": "",
    "ip": "",
    "vendor_id" : null,
    "btok_id" : ""
  };
  stripe: any;
  vendorData = {
    "vendor_id":this.utils.profile.user_id
  };
  payCodes = JSON.parse(JSON.stringify(PaymentCodes));
  payIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider, private http: HTTP) {
    this.stripe = Stripe(utils.stripeKey);
    this.bankDataSend.username = navParams.get("username");
    this.bankDataSend.user_id = navParams.get("user_id");

    this.stripeAccData.email = this.utils.profile.email;
    this.stripeAccData.first_name = this.utils.profile.first_name;
    this.stripeAccData.last_name = this.utils.profile.last_name;
    this.stripeAccData.vendor_id = this.utils.profile.user_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorBankDetailsPage');

    //Check if freelancer's bank details already exist
    this.utils.checkVendorStripeAccount(this.vendorData).then((data) => {
      if (data){
        this.editable = false;
      }
    });

    //Call api to get IP address
    this.http.get("http://www.ip-api.com/json",{},{})
      .then(data => {
        let res_data = JSON.parse(data.data);
        console.log('Network data',res_data); // data received by server
        console.log('IP Address:',res_data.query);
        this.stripeAccData.ip = res_data.query;
      })
      .catch(error => {
        console.log(error.error); // error message as string
      });
  }

  ionViewWillEnter(){

  }

  payCodeChange(value: any){
    this.bankDetails.currency = this.payCodes[this.payIndex]['currency'];
  }

  saveBank(){
    let ref = this;
    let s_dob = this.bankDetails.dob.split('-');
    this.stripeAccData.year = s_dob[0];
    this.stripeAccData.month = s_dob[1];
    this.stripeAccData.day = s_dob[2];

    this.utils.addVendorBankAccount(this.bankDetails).then((result) => {
      ref.stripeAccData.btok_id = result['bank_token'];
      // console.log(ref.stripeAccData);
    })
    .then(() => {
      ref.utils.createVendorStripeAccount(ref.stripeAccData).then((result)=>{
        if (result){
          alert("Bank Account added successfully.");
        }
        ref.navCtrl.pop();
      },
      (error) => {
          console.log(error);
          alert("Error while saving bank account details! Please try again.");
      });
    },
    (error) => {
      console.log(error);
      alert("Error while saving bank account details! Please try again.");
    });
  }

  ionViewWillLeave(){
    this.navCtrl.getPrevious().data.bankID = this.bankID;
  }

}
