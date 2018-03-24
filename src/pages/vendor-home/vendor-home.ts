import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorHomePage');
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

  services = [
    { title: "HAIR", list: [{name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}, {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}] },
    { title: "MAKEUP", list: [{name: 'Cecelia Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'}] },
    { title: "NAILS", list: [] },
  ];

}
