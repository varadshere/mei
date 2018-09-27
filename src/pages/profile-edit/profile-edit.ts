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
    "fav": ""
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
    let ref = this;
    //For saving address
    if (this.place){
      this.settings.address = this.place.formatted_address;
      this.settings.lat = this.place.geometry.location.lat();
      this.settings.lng = this.place.geometry.location.lng();
    }
    this.settings.fav = this.settings.fav.replace(/,/g," . ");
    this.utils.editClientSettings(this.settings).then(function (data) {
      console.log(data);
      ref.utils.profile.bio = ref.settings.bio;
      ref.utils.profile.fav = ref.settings.fav;
      ref.navCtrl.pop();
    });
  }

  getSettings(){
    let ref = this;
    let dts = {
      "username": this.utils.getUserEmail(),
      "email": this.utils.getUserEmail(),
      "type": this.utils.profile.type
    };
    let getSettings = this.utils.getSettings(dts);

    getSettings.then(function (data:any) {
      if(typeof data !== 'string'){
        ref.settings = data;
        ref.settings.bio = ref.utils.profile.bio;
        ref.settings.fav = ref.utils.profile.fav;
      }
    });
  }

}
