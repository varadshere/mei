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
    'account_holder_name':'',
    'account_holder_type':'individual'
  };
  bankID: string = null;
  bankDataSend: any = {
    'username':'',
    'user_id':'',
    'bank_account':{}
  };
  stripe: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    this.stripe = Stripe(utils.stripeKey);
    this.bankDataSend.username = navParams.get("username");
    this.bankDataSend.user_id = navParams.get("user_id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorBankDetailsPage');
  }

  saveBank(){
    let ref = this;
    this.stripe.createToken('bank_account',this.bankDetails).then(function (result) {
      if (result.error){
        console.log(result.error.message);
      }
      if (result.token){
        ref.bankDataSend = {...ref.bankDataSend, ...result.token};
        if(!ref.bankDataSend.bank_account.fingerprint){
          ref.bankDataSend.bank_account.fingerprint = '';
        }
        ref.utils.saveBank(ref.bankDataSend).then((data) => {
          console.log(data);
          if (data){
            ref.bankID = ref.bankDataSend.id;
          }
          ref.navCtrl.pop();
        })
      }
    });
  }

  ionViewWillLeave(){
    this.navCtrl.getPrevious().data.bankID = this.bankID;
  }

}
