import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {ProfilePage} from "../profile/profile";
import {UtilsProvider} from "../../providers/utils/utils";
import {GetstartedPage} from "../getstarted/getstarted";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {SelectionHomePage} from "../selection-home/selection-home";
import {VendorSidemenuPage} from "../vendor-sidemenu/vendor-sidemenu";
import {VendorHomePage} from "../vendor-home/vendor-home";
import {ForgotPassPage} from "../forgot-pass/forgot-pass";
import {UserData} from "../../providers/models";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: string = "CLIENT";
  isAndroid: boolean = true;
  client = {
    email: '',
    pwd: ''
  };
  vendor = {
    email: '',
    pwd: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,  private utilsProvider: UtilsProvider) {
  }

  ionViewDidLoad() {
    this.utilsProvider.tokensetup().then((token)=>{
      console.log('token');
      console.log(token);
    });
    console.log('ionViewDidLoad LoginPage');
  }

  navigateToSignup(){
    this.navCtrl.push(SignupPage);
  }

  clientLogin(){
    // this.utilsProvider.notifyOther("Profile");

    let loginPromise  = this.utilsProvider.loginService(this.client.email, this.client.pwd, 'client');

    let ref = this;
    loginPromise.then(function (result: any) {
      if(result){
        ref.utilsProvider.setUserEmail(ref.client.email);
        ref.utilsProvider.getProfile().then(function (d) {
          let userData: UserData = {
            email: ref.client.email,
            profile: d,
            type: 'client',
            device_token: ref.utilsProvider.device_token
          };
          ref.utilsProvider.setUserData(userData);
          ref.utilsProvider.setPage(SelectionHomePage);
          ref.navCtrl.push(SidemenuPage);
        });
      }else{
        console.log("Wrong Creds");
      }
    });
  }

  vendorLogin(){
    // this.utilsProvider.notifyOther("profile");
    let loginPromise  = this.utilsProvider.loginService(this.vendor.email, this.vendor.pwd, 'vendor');

    let ref = this;
    loginPromise.then(function (result: any) {
      if(result){
        ref.utilsProvider.setUserEmail(ref.vendor.email);
        ref.utilsProvider.getProfile().then(function (d) {
          let userData: UserData = {
            email: ref.vendor.email,
            profile: d,
            type: 'vendor',
            device_token: ref.utilsProvider.device_token
          };
          ref.utilsProvider.setUserData(userData);
          ref.utilsProvider.setPage(VendorHomePage);
          ref.navCtrl.push(VendorSidemenuPage);
        });
      }else{
        console.log("Wrong Creds");
      }
    });
  }

  forgotPass(type){
    this.navCtrl.push('ForgotPassPage', {type: type});
  }
}
