import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Http, Headers} from '@angular/http';

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
  public notifyOther(data: any) {
    debugger;
    if (data) {
      this.notify.next(data);
    }
  }

  constructor(public http: Http) {
    console.log('Hello UtilsProvider Provider');
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

  loginService(email, pwd){
   // let ref = this;
   console.log(email);
   console.log(pwd);
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'loginCheck';
      let body = JSON.stringify({
        user_email: email,
        password: pwd
      });
      this.http.post(url, body, {headers: headers}).map(res => res.json()).subscribe(data => {
        console.log("login rep");
        console.log(data);
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        resolve(false);
      });
    });
  }
  signUpService(dataToSend){
   // let ref = this;
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'signup';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        resolve(false);
      });
    });
  }

  vendorListService(){
   // let ref = this;
    let dataToSend = {
      "service": this.getServiceSelection()
    };
    return new Promise((resolve, reject) => {
     // let location = this.utils.getMapCenter();
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      let url = this.serverUrl + 'getVendorList';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: headers}).map(res => res.json()).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        resolve(data.result);
        // ref.applyHaversine(data, 'hp');
        // this.setDataToShow(data.outlets);
        resolve(data);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        resolve(false);
      });
    });
  }

}
