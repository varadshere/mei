import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetstartedPage} from "../getstarted/getstarted";
import {LoginPage} from "../login/login";
import {ResultsPage} from "../results/results";
import {ProfilePage} from "../profile/profile";
import {Subscription} from "rxjs";
import {UtilsProvider} from "../../providers/utils/utils";
import {SelectionHomePage} from "../selection-home/selection-home";
import {ClientSettingsPage} from "../client-settings/client-settings";
import { BookingDetailsPage } from '../booking-details/booking-details';

/**
 * Generated class for the SidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-sidemenu',
  templateUrl: 'sidemenu.html',
})
export class SidemenuPage {

  public rootPage: any = SelectionHomePage;
  private subscription: Subscription;
  // profile = this.utilsProvider.profile;
  ionViewDidLoad() {
    let ref = this;

    console.log('ionViewDidLoad SidemenuPage ');
    // console.log(this.profile);

    this.subscription = ref.utilsProvider.notifyObservable$.subscribe((res) => {
      console.log(res);

      ref.rootPage = ref.utilsProvider.getPage();

    });

      this.rootPage = this.utilsProvider.getPage();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
  }

  openPage(param){
    if(param == 'home'){
      this.rootPage = SelectionHomePage;
    }else if(param == 'booking'){
      //rootPage = LoginPage;
      this.rootPage = ResultsPage;
    }else if(param == 'profile'){
      //rootPage = LoginPage;
      this.rootPage = ProfilePage;
    }else if(param == 'settings'){
      //rootPage = Login Page;
      this.rootPage = ClientSettingsPage;
    }else if(param == 'map'){
      this.rootPage = BookingDetailsPage;
    }
  }

}
