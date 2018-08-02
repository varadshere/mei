import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
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
    'country':'AU',
    'currency':'AUD',
    'routing_number':'',
    'account_number':'',
    'account_holder_name':''
  };
  stripe: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    this.stripe = Stripe(utils.stripeKey);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorBankDetailsPage');
  }

  saveBank(){
    let ref = this;
    // this.stripe.createToken('bank_account',this.bankDetails).then(function (result) {
    //   console.log(result);
    // });
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.navCtrl.getPrevious().data.bankDetails = this.bankDetails;
  }

}
