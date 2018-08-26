import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the VendorEditServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-edit-services',
  templateUrl: 'vendor-edit-services.html',
})
export class VendorEditServicesPage {
  services = [
    { title: "HAIR", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more', cost: "0"}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more', cost: "0"}, {name: 'Hairstyling', selected: false, desc: 'Test-run a hair look and style before your big event', cost: "0"}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening, waving, crimping and more', cost: "0"}] },
    { title: "MAKEUP", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more', cost: "0"}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more', cost: "0"}, {name: 'Hairstyling', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more', cost: "0"}, {name: 'Blow Wave', selected: false, desc: 'Test-run a hair look and style before your big event', cost: "0"}]  },
    { title: "BODY", list: [{name: 'Up-do', selected: false, desc: 'Sweep up', cost: "0"}, {name: 'Event Trial', selected: false, desc: 'braids and more', cost: "0"}, {name: 'Hairstyling', selected: false, desc: 'abcd', cost: "0"}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening', cost: "0"}] },
  ];
  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
    let vendorServices = this.utils.profile.services;
    vendorServices.forEach((s,sindex)=>{
      s.list.forEach((l,lindex)=>{
        if (l.selected) this.services[sindex]['list'][lindex].selected = l.selected;
        this.services[sindex]['list'][lindex].cost = l.cost;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorEditServicesPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  selectService(l){
    if(l.selected){
      l.selected = false;
    }else{
      l.selected = true;
    }
  }

  saveServices(){
    console.log("Services saved");
    this.navCtrl.pop();
  }

}
