import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {GetstartedPage} from "../getstarted/getstarted";
import {LoginPage} from "../login/login";
import {ResultsPage} from "../results/results";
import {ProfilePage} from "../profile/profile";
import {Subscription} from "rxjs";
import {UtilsProvider} from "../../providers/utils/utils";
import {SelectionHomePage} from "../selection-home/selection-home";
import {ClientSettingsPage} from "../client-settings/client-settings";
import { BookingDetailsPage } from '../booking-details/booking-details';
import {ClientBookingsPage} from "../client-bookings/client-bookings";
import {ClientProfilePage} from "../client-profile/client-profile";

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
  private selectedItem: number = 0;
  private menuItems = [
    {name:'HOME'},
    {name:'BOOKINGS'},
    {name:'SETTINGS'}
    // {name:'SETTINGS', active:false},
  ];
  // profile = this.utilsProvider.profile;
  ionViewDidLoad() {
    console.log('ionViewDidLoad SidemenuPage ');
    this.menuCtrl.enable(true,"clientMenu");
    this.rootPage = this.utilsProvider.getPage();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider, public menuCtrl: MenuController) {
    let ref = this;
    this.subscription = ref.utilsProvider.notifyObservable$.subscribe((res) => {
      console.log(res);
      ref.rootPage = ref.utilsProvider.getPage();
    });
  }

  openPage(param, i){
    this.selectedItem = i;
    if(param == 'HOME'){
      this.rootPage = SelectionHomePage;
    }else if(param == 'BOOKINGS'){
      this.rootPage = ClientBookingsPage;
    }else if(param == 'PROFILE'){
      this.rootPage = ClientProfilePage;
    }else if(param == 'SETTINGS'){
      this.rootPage = ClientSettingsPage;
    }else if(param == 'MAP'){
      this.rootPage = BookingDetailsPage;
    }
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

  getImg(){
    if(this.utilsProvider.profile.profile_pic){
      if(this.utilsProvider.profile.profile_pic.includes('http') || this.utilsProvider.profile.profile_pic.includes('file')){
        return this.utilsProvider.profile.profile_pic
      }else {
        return this.utilsProvider.photoUrl + this.utilsProvider.profile.profile_pic;
      }
    }else {
      return 'assets/imgs/user.png'
    }
    // this.utilsProvider.profile.profile_pic ? ((this.utilsProvider.profile.profile_pic.includes('http') || this.utilsProvider.profile.profile_pic.includes('ftp')) ? this.utilsProvider.profile.profile_pic : this.utilsProvider.photoUrl + this.utilsProvider.profile.profile_pic) : 'assets/imgs/user.png'
  }

}
