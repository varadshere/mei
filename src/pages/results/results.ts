import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UtilsProvider } from "../../providers/utils/utils";
import { MyBookingPage } from "../my-booking/my-booking";
import { ProfilePage } from "../profile/profile";

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
    private utils: UtilsProvider
  ) {
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

  navigate() {
    this.navCtrl.push(MyBookingPage);
  }
}
