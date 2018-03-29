import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyBookingPage} from "../my-booking/my-booking";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: string = "SERVICES";
  shownGroup = null;
  profileData  = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profileData = navParams.get('profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.toggleGroup(0);
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
    if(l.booked){
      l.booked = false;
    }else{
      l.booked = true;
    }
  }

  navigate(){
    this.navCtrl.push(MyBookingPage);
  }



  services = [
    { title: "HAIR", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Test-run a hair look and style before your big event'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening, waving, crimping and more'}] },
    { title: "MAKEUP", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Blow Wave', selected: false, desc: 'Test-run a hair look and style before your big event'}]  },
    { title: "NAILS", list: [{name: 'Up-do', selected: false, desc: 'Sweep up'}, {name: 'Event Trial', selected: false, desc: 'braids and more'}, {name: 'Hairstyling', selected: false, desc: 'abcd'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening'}] },
  ];
}
