import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {utils} from "ng2-cordova-oauth/utility";
import {UtilsProvider} from "../../providers/utils/utils";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ForgotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
})
export class ForgotPassPage {
  pwd: string;
  email: string;
  type: string;
  tempPwd: string;
  newPwd: string;
  resultText: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    this.type = navParams.get('type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassPage');
  }

  submitEmail(){
    if(this.email){
      let dataToSend = {
        // type: this.type
        email: this.email
      };

      let fpPromise = this.utils.forgotPass(dataToSend);

      fpPromise.then((result) =>{
        if(result){
          this.resultText = "Please check your Email and login with temp password. ";
        }else {
          this.resultText = "Something went wrong!";
        }
      });

    }
  }
  changePass(){
    if(this.tempPwd && this.newPwd){
      let dataToSend = {
          "email": this.email,
          "temp_password": this.tempPwd,
          "password":this.newPwd
        }
      ;
      let changePassPromise = this.utils.changePass(dataToSend);
      changePassPromise.then((result) =>{
        if(result){
          this.navCtrl.push(LoginPage);
        }else {

        }
      });
    }
  }
}
