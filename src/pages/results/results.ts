import { Component } from "@angular/core";
import {ModalController, NavController, NavParams} from "ionic-angular";
import { UtilsProvider } from "../../providers/utils/utils";
import { MyBookingPage } from "../my-booking/my-booking";
import { ProfilePage } from "../profile/profile";
import {FilterModalPage} from "../filter-modal/filter-modal";

@Component({
  selector: "page-results",
  templateUrl: "results.html"
})
export class ResultsPage {
  vendorList = [];
  today = new Date();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private utils: UtilsProvider,
    private modalCtrl: ModalController
  ) {
    this.getVendorList()
  }

  getVendorList(){
    let vendorListPromise = this.utils.vendorListService();
    let ref = this;
    vendorListPromise.then(function(result: any) {
      if (result) {
        console.log("getProfile Success!!");
        console.log(result);
        ref.vendorList = result;
      }
    });
  }

  ionViewDidLoad() {
    // this.vendorList
    console.log("ionViewDidLoad ResultsPage");
  }

  openProfile(profile) {
    this.navCtrl.push(ProfilePage, {
      profile: profile
    });
  }

  openModal(){
    const modal = this.modalCtrl.create('FilterModalPage');
    modal.onDidDismiss(data => {
      console.log(data);
      this.getVendorList();
    });
    modal.present();
  }

  navigate() {
    this.navCtrl.push(MyBookingPage);
  }
}
