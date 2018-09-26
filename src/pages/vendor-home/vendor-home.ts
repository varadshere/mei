import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the VendorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-vendor-home',
  templateUrl: 'vendor-home.html',
})
export class VendorHomePage {

  filterValue: any;
  filter= 'today';
  summeryData = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider) {
    this.getSummery(this.filter);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorHomePage');
    this.toggleGroup(0);
  }

  shownGroup = null;
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

  tabChanged(e){
    this.filterValue = e._value;
    console.log(this.filterValue);
    this.getSummery(this.filterValue);
  }

  getSummery(filter){
    let dataToSend = {
      "filter": filter,
      "vendor_username": this.utilsProvider.getUserEmail()
    };
    let summeryPromise = this.utilsProvider.getSummery(dataToSend);
    let ref = this;
    summeryPromise.then(function (result: any) {
      if(result){
        ref.summeryData = result;
      }
    })
  }

  services = [
    { title: "HAIR", list: [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}] },
    { title: "MAKEUP", list: [{name: 'Cecelia Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}] },
    { title: "NAILS", list: [] },
  ];

}
