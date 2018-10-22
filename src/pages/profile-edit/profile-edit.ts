import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
declare var google;

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  place: any;
  profileType = this.utils.profile.type;
  settings: any = {
    "email": this.utils.getUserEmail(),
    "username": this.utils.getUserEmail(),
    "address": "",
    "bankName": "",
    "cardNumber": "",
    "distance": 10,
    "first_name": "",
    "last_name": "",
    "notification": false,
    "phone": "",
    "travel": false,
    "bio": "",
    "fav": "",
    "available_days":[]
  };
  day = {
    mon: {
      selected : false
    },
    tue: {
      selected : false
    },
    wed: {
      selected : false
    },
    thu: {
      selected : false
    },
    fri: {
      selected : false
    },
    sat: {
      selected : false
    },
    sun: {
      selected : false
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
  }

  placeInputFocus(){
    this.place = undefined;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
    this.getSettings();
    this.initMap();
  }

  initMap(){
    let elem = document.getElementById('places');
    if(elem !== null){
      let nativePlacesInputBox = elem.getElementsByTagName('input')[0];
      nativePlacesInputBox.value = this.settings.address ? this.settings.address : '';
      let autocomplete = new google.maps.places.Autocomplete(nativePlacesInputBox);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.place = autocomplete.getPlace();
        console.log(this.place);
        console.log("Address");
      });
    }
  }

  saveProfile(){
    // if(!this.place){
    //   return;
    // }

  if(this.settings.phone.length !=10){
      return;
  } else{
    let ref = this;
    //For saving address
    if (this.place){
      this.settings.address = this.place.formatted_address;
      this.settings.lat = this.place.geometry.location.lat();
      this.settings.lng = this.place.geometry.location.lng();
    }
    this.settings.fav = this.settings.fav.replace(/,/g," . ");
    this.settings.available_days = this.getDaysArr();
    this.utils.editClientSettings(this.settings).then(function (data) {
      console.log(data);
      ref.utils.profile.first_name = ref.settings.first_name;
      ref.utils.profile.last_name = ref.settings.last_name;
      ref.utils.profile.address = ref.settings.address;
      ref.utils.profile.bio = ref.settings.bio;
      ref.utils.profile.fav = ref.settings.fav;
      ref.utils.profile.available = "["+ref.settings.available_days+"]";
      ref.navCtrl.pop();
    });
  }
  }

  getSettings(){
    let ref = this;
    let dts = {
      "username": this.utils.getUserEmail(),
      "email": this.utils.getUserEmail(),
      "type": this.profileType
    };
    let getSettings = this.utils.getSettings(dts);

    getSettings.then(function (data:any) {
      if(typeof data !== 'string'){
        ref.settings = data;
        ref.settings.bio = ref.utils.profile.bio;
        ref.settings.fav = ref.utils.profile.fav;
        if (ref.profileType == "vendor"){
          ref.setAvailableDays();
        }
      }
    });
  }

  setAvailableDays(){
    this.settings.available_days = this.utils.profile.available.toString()
      .replace(/u'/g,"")
      .replace(/[\[\]' ]+/g,"")
      .split(",");
    console.log(this.settings);
    for (let index in this.settings.available_days){
      switch (this.settings.available_days[index]) {
        case "mon":
          this.day.mon.selected = true;
          break;
        case "tue":
          this.day.tue.selected = true;
          break;
        case "wed":
          this.day.wed.selected = true;
          break;
        case "thurs":
          this.day.thu.selected = true;
          break;
        case "fri":
          this.day.fri.selected = true;
          break;
        case "sat":
          this.day.sat.selected = true;
          break;
        case "sun":
          this.day.sun.selected = true;
          break;
      }
    }
  }

  getDaysArr(){
    let daysArr = [];
    if(this.day.mon.selected){
      daysArr.push('mon');
    }
    if(this.day.tue.selected){
      daysArr.push('tue');
    }
    if(this.day.wed.selected){
      daysArr.push('wed');
    }
    if(this.day.thu.selected){
      daysArr.push('thurs');
    }
    if(this.day.fri.selected){
      daysArr.push('fri');
    }
    if(this.day.sat.selected){
      daysArr.push('sat');
    }
    if(this.day.sun.selected){
      daysArr.push('sun');
    }

    return daysArr;
  }

}
