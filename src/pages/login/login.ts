import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {ProfilePage} from "../profile/profile";
import {UtilsProvider} from "../../providers/utils/utils";
import {GetstartedPage} from "../getstarted/getstarted";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {SelectionHomePage} from "../selection-home/selection-home";
import {VendorSidemenuPage} from "../vendor-sidemenu/vendor-sidemenu";
import {VendorHomePage} from "../vendor-home/vendor-home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
    console.log('ionViewDidLoad LoginPage');
  }

  navigateToSignup(){
    this.navCtrl.push(SignupPage);
  }

  clientLogin(){
    // this.utilsProvider.notifyOther("Profile");

    let loginPromise  = this.utilsProvider.loginService(this.client.email, this.client.pwd);

    let ref = this;
    loginPromise.then(function (result: any) {
      if(result){
        // ref.navCtrl.push(SidemenuPage);
      }else{
        console.log("Wrong Creds");
      }
    });


    this.utilsProvider.setPage(SelectionHomePage);
    // this.navCtrl.push(SelectionHomePage);
    this.navCtrl.push(SidemenuPage);
  }

  vendorLogin(){
    // this.utilsProvider.notifyOther("profile");
    let loginPromise  = this.utilsProvider.loginService(this.vendor.email, this.vendor.pwd);

    let ref = this;
    loginPromise.then(function (result: any) {
      if(result){
        // ref.navCtrl.push(SidemenuPage);
      }else{
        console.log("Wrong Creds");
      }
    });
    this.utilsProvider.setPage(VendorHomePage);
    ref.navCtrl.push(VendorSidemenuPage);
  }

}
