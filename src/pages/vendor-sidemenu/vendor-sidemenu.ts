import {ChangeDetectorRef, Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetstartedPage} from "../getstarted/getstarted";
import {UtilsProvider} from "../../providers/utils/utils";
import {VendorHomePage} from "../vendor-home/vendor-home";
import {VendorBookingsPage} from "../vendor-bookings/vendor-bookings";
import {VendorCalendarPage} from "../vendor-calendar/vendor-calendar";
import {VendorSettingsPage} from "../vendor-settings/vendor-settings";
import {ChartPage} from "../chart/chart";
import {ClientProfilePage} from "../client-profile/client-profile";
import {VendorProfilePage} from "../vendor-profile/vendor-profile";
import {Subscription} from "rxjs/Rx";

/**
 * Generated class for the VendorSidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-sidemenu',
  templateUrl: 'vendor-sidemenu.html',
})
export class VendorSidemenuPage {
  public rootPage: any = VendorHomePage;
  private subscription: Subscription;
  private selectedItem: number = 0;
  private menuItems = [
    {name:'HOME'},
    {name:'CALENDAR'},
    {name:'ACTIVITY'},
    {name:'DIGITAL WALLET'},
    {name:'SETTINGS'}
    // {name:'SETTINGS', active:false},
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilsProvider: UtilsProvider) {
    this.subscription = this.utilsProvider.notifyObservable$.subscribe((res) => {
      console.log(res);
      this.rootPage = this.utilsProvider.getPage();
    });
  }

  ionViewDidLoad() {
    this.rootPage = this.utilsProvider.getPage();
    console.log('ionViewDidLoad VendorSidemenuPage');
  }

  openPage(page, i){
    this.selectedItem = i;
    if(page == 'HOME'){
      this.rootPage = VendorHomePage;
    }else if(page == 'ACTIVITY'){
      this.rootPage = VendorBookingsPage;
    }else if(page == 'CALENDAR'){
      this.rootPage = VendorCalendarPage;
    }else if(page == 'SETTINGS'){
      this.rootPage = VendorSettingsPage;
    }else if(page == 'DIGITAL WALLET'){
      this.rootPage = ChartPage;
    }if(page == 'PROFILE'){
      this.rootPage = VendorProfilePage;
    }
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

}
