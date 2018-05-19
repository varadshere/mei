import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Http, Headers, Response} from '@angular/http';
import {AlertController, LoadingController} from 'ionic-angular';
declare var FCMPlugin;
/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  private notify = new Subject<any>();
  notifyObservable$: any =  this.notify.asObservable();
  serverUrl  = 'http://18.216.123.109:5000/api/';
  page = '';
  serviceSelected = '';
  email = '';
  private _profile: any = {};
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  constructor(public http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log('Hello UtilsProvider Provider');
  }

  get profile(): any {
    return this._profile;
  }

  set profile(value: any) {
    this._profile = value;
  }

  getPage(){
    return this.page;
  }

  setPage(p){
    this.page = p;
  }

  getServiceSelection(){
    return this.serviceSelected;
  }

  setServiceSelection(s){
    this.serviceSelected = s;
  }

  setUserEmail(email){
    this.email = email;
  }
  getUserEmail(){
    return this.email
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
    resolve(token);
      }, (err) => {
        reject(err);
  });
    })
    return promise;
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.setMode("ios");
    alert.present();
  }
  getloadingAlert() {
    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    // loading.setMode("ios");
    return loading;
  }

  getInstagramUserInfo(response) {
    //GET USER PHOTOS
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + response.access_token + '&count=12')
      .map((res:Response) => res.json());
  }

  createInstaImgs(data, username){
    let dataToSend = {
      "method": "create",
      "username": username,
      "response": data
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getInsta';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("insta create");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  getInstaImgs(username){
    let dataToSend = {
      "method": "read",
      "username": username
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getInsta';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("insta create");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  loginService(email, pwd, type){
   // let ref = this;
   console.log(email);
   console.log(pwd);
   let loading = this.getloadingAlert();
   loading.present();
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'loginCheck';
      let body = JSON.stringify({
        user_email: email,
        password: pwd,
        type: type
      });
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("login rep");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  signUpService(dataToSend){
   // let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'signup';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  vendorListService(){
   // let ref = this;
    let dataToSend = {
      "service": this.getServiceSelection()
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getVendorList';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  editClientSettings(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'editClientSettings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Save Settings");
        console.log(data);
        resolve(data.result);
        loading.dismissAll();
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getSettings(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getSettings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Settings");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getProfile(){
    let ref = this;
    let dataToSend = {
      "username":this.getUserEmail(),
      "email": this.getUserEmail()
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getProfile';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Profile");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);

        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getSlots(vendor){
    let ref = this;
    let dataToSend = {
      "username": vendor
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getSlots';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Slots");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);

        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getSlotsByDay(dataToSend){
    let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getSlotsByDay';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got SlotsByDay");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);

        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  boookVendor(dataToSend){
    let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'bookVendor';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Booked Vendor");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);

        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  getSummery(dataToSend){
    let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getBookingsSummery';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got BookingsSummery");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);

        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        resolve(false);
      });
    });
  }

  getBookings(dataToSend){
    let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getBookings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got Bookings");
        console.log(data);
        ref.profile = (data.result);
        loading.dismissAll();
        resolve(data.result);
        // resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        resolve(false);
      });
    });
  }

}
