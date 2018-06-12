import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyBookingPage} from "../my-booking/my-booking";
import {UtilsProvider} from "../../providers/utils/utils";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: string = "SERVICES";
  shownGroup = null;
  profileData:any  = {};
  instaImgs: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
    this.profileData = navParams.get('profile');
    this.getInstaImgs(this.profileData.username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.toggleGroup(0);
  }

  getInstaImgs(username){
    this.utils.getInstaImgs(username).then((d:any)=>{
      console.log("GetInsta Imgs in Profile");
      if(d && typeof d !=='string' && d.length){
        this.instaImgs = d;
      }
    });
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
    this.getBookedServices();
  }

  navigate(){
    // this.navCtrl.push(MyBookingPage);
    let bServices = this.getBookedServices();
    if(bServices.length > 0){
      this.navCtrl.push(MyBookingPage, {
        profile: this.profileData
      });
    }else {
      this.utils.presentAlert("Uh oh! Booking failed", "Please select at least One Service!");
    }

  }

  bServices = [];
  getBookedServices(){
    this.bServices = [];
    this.profileData.services.forEach(d=>{
      d.list.forEach(l=>{
        if(l.booked){
          this.bServices.push(l);
        }
      });
    });

    return this.bServices;
  }



  services = [
    { title: "HAIR", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Test-run a hair look and style before your big event'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening, waving, crimping and more'}] },
    { title: "MAKEUP", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Blow Wave', selected: false, desc: 'Test-run a hair look and style before your big event'}]  },
    { title: "NAILS", list: [{name: 'Up-do', selected: false, desc: 'Sweep up'}, {name: 'Event Trial', selected: false, desc: 'braids and more'}, {name: 'Hairstyling', selected: false, desc: 'abcd'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening'}] },
  ];
}
