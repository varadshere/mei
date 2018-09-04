import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsProvider} from "../../providers/utils/utils";
import {services} from "../../providers/models";

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
  shownGroup = null;
  editServices: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
    this.editServices = Array.from(services);
    let vendorServices = this.utils.profile.services;
    vendorServices.forEach((s,sindex)=>{
      s.list.forEach((l,lindex)=>{
        if (l.selected) this.editServices[sindex]['list'][lindex].selected = l.selected;
        this.editServices[sindex]['list'][lindex].cost = l.cost;
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
    this.utils.editVendorServices(this.editServices).then(data => {
      console.log("Services saved");
      this.navCtrl.pop();
    });
  }
}
