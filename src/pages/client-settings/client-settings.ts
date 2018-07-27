import {Component, ViewChild, ViewChildren} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {Subscription} from "rxjs/Subscription";
import {DomSanitizer} from '@angular/platform-browser';
import {TermsAndConditionsPage} from "../terms-and-conditions/terms-and-conditions";
declare var google;

/**
 * Generated class for the ClientSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-settings',
  templateUrl: 'client-settings.html',
})
export class ClientSettingsPage {
  @ViewChildren('placesParent') placesParentEl;
  editMode: boolean = false;
  place:any;
  placeSubscription: Subscription;
  termsPage: any = TermsAndConditionsPage;
  settings: any = {
    "email": this.utilsProvider.getUserEmail(),
    "username": this.utilsProvider.getUserEmail(),
    "address": "",
    "bankName": "",
    "cardNumber": "",
    "distance": 10,
    "first_name": "",
    "last_name": "",
    "notification": false,
    "phone": "",
    "travel": false
  };


  email: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utilsProvider: UtilsProvider,
              public _DomSanitizer: DomSanitizer) {
    this.email = utilsProvider.getUserEmail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientSettingsPage');
    this.getSettings();
    this.placeSubscription = this.placesParentEl.changes.subscribe((r) =>{
      this.initMapClient()
      // console.log(document.getElementById('places').getElementsByTagName('input')[0])
    });
  }

  initMapClient(){
        let elem = document.getElementById('places');
        if(elem !== null){
          let nativePlacesInputBox = elem.getElementsByTagName('input')[0];
          nativePlacesInputBox.value = this.settings.address ? this.settings.address : '';
          let autocomplete = new google.maps.places.Autocomplete(nativePlacesInputBox);
          google.maps.event.addListener(autocomplete, 'place_changed', () => {
            this.place = autocomplete.getPlace();
            console.log(this.place);
            console.log("Client place");
          });
        }
  }

  placeInputFocus(){
    this.place = undefined;
  }

  editToggle(){
    this.editMode = true;
    // let mapclient = this.initMapClient();
    // mapclient();
  }
  saveProfile(){
    if(!this.place){
      return;
    }
    let ref = this;
    this.settings.address = this.place.formatted_address;
    this.settings.lat = this.place.geometry.location.lat();
    this.settings.lng = this.place.geometry.location.lng();
    this.utilsProvider.editClientSettings(this.settings).then(function (data) {
      console.log(data);
      ref.editMode = false;
    });
  }

  getSettings(){
    let ref = this;
    let dts = {
      "username": this.utilsProvider.getUserEmail(),
      "email": this.utilsProvider.getUserEmail(),
      "type": "client"
    };
    let getSettings = this.utilsProvider.getSettings(dts);

    getSettings.then(function (data:any) {
      if(data)
      ref.settings = data;
    });
  }

  uploadPhoto(){
    // let url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    // fetch(url)
    //   .then(res => res.blob())
    //   .then(blob => {
    //       console.log(blob);
    //       this.utilsProvider.uploadmageToServer(blob).map(res => res.json()).subscribe(data => {
    //         console.log('resp uploadImg');
    //         console.log(data);
    //       });
    //   });
    this.utilsProvider.getImgFromDevice().then((data)=>{
      if(data){
        console.log(data);
        this.utilsProvider.uploadmageToServer(data);
        this.utilsProvider.profile.profile_pic = data;
      }
    });
  }

  ionViewDidLeave(){
    this.placeSubscription.unsubscribe();
  }

  getImg(){
    if(this.utilsProvider.profile.profile_pic){
      if(this.utilsProvider.profile.profile_pic.includes('http') || this.utilsProvider.profile.profile_pic.includes('file')){
        return this.utilsProvider.profile.profile_pic
      }else {
        return this.utilsProvider.photoUrl + this.utilsProvider.profile.profile_pic;
      }
    }else {
      return 'assets/imgs/user.png'
    }
    // this.utilsProvider.profile.profile_pic ? ((this.utilsProvider.profile.profile_pic.includes('http') || this.utilsProvider.profile.profile_pic.includes('ftp')) ? this.utilsProvider.profile.profile_pic : this.utilsProvider.photoUrl + this.utilsProvider.profile.profile_pic) : 'assets/imgs/user.png'
  }

}
