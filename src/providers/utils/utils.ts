import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Http, Headers, Response} from '@angular/http';
import {AlertController, LoadingController} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import {Base64} from "@ionic-native/base64";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Observable} from "rxjs/Observable";
import {Crop} from "@ionic-native/crop";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
declare var FCMPlugin;

@Injectable()
export class UtilsProvider {
  private notify = new Subject<any>();
  notifyObservable$: any =  this.notify.asObservable();
  serverUrl  =  'http://18.216.123.109:5000/api/'; //'http://372460c3.ngrok.io/api/';
  page = '';
  serviceSelected = '';
  email = '';
  headers = new Headers();
  private _type: string;
  private _profile: any = {};
  private _user_id;
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private imagePicker: ImagePicker,
              private base64: Base64,
              private camera: Camera,
              private crop: Crop,
              private transfer: FileTransfer,
              private file: File) {
    console.log('Hello UtilsProvider Provider');
    this.headers.append('Content-Type','application/json');
    // this.headers.append('Access-Control-Allow-Origin' , '*');
    // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(value) {
    this._user_id = value;
  }

  get profile(): any {
    return this._profile;
  }

  set profile(value: any) {
    this._profile = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
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
      if (typeof FCMPlugin != 'undefined'){
        FCMPlugin.getToken(function(token){
          resolve(token);
        }, (err) => {
          reject(err);
        });
      }

    });
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

  sanitizeData(data){
    if(data.result && typeof data.result !== 'string'){
      return data.result;
    }else {
      return false;
    }
  }
  getInstagramUserInfo(response) {
    //GET USER PHOTOS
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + response.access_token + '&count=12')
      .map((res:Response) => res.json());
  }

  getImgFromDevice(){
    return new Promise((resolve, reject) => {
      let options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
      };

      this.camera.getPicture(options).then((imagePath) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.cropImg(imagePath).then(
          //this.base64.encodeFile(filePath).then((base64File: string) => {
          newImage => {
            console.log('new image path is: ' + newImage);
            resolve(newImage);
            // this.base64.encodeFile(newImage).then((base64File: string) => {
            //     resolve(base64File);
            // });
          },
          error => console.error('Error cropping image', error)
        );
        // resolve(base64Image);
      }, (err) => {
        // Handle error
        resolve(false);
      });
    });
  }

  cropImg(path){
    return this.crop.crop(path, {quality: 75});
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
      let url = this.serverUrl + 'getInsta';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("insta create");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
      }, error => {
        console.log("ERROR");
        console.log(error);
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

      let url = this.serverUrl + 'getInsta';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("insta create");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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

  getPicturesFromGallery(): Subject<any>{
    let loading = this.getloadingAlert();
    loading.present();
    let img$ = new Subject<any>();

    // let images$: any =  imgsSub.asObservable();
    let imgBase64Arr = [];
    let options =
      {
        maximumImagesCount: 3,
        quality: 90,
        outputType: 0
      };
    this.imagePicker.getPictures(options).then((results) =>
    {
      for (var i = 0; i < results.length; i++){
        let filePath = results[i];
        this.base64.encodeFile(filePath).then((base64File: string) => {
          console.log(base64File);
          imgBase64Arr.push(base64File);
          img$.next(base64File);
          if(imgBase64Arr.length == options.maximumImagesCount){
            loading.dismissAll();
            img$.complete();
          }
        }, (err) => {
          loading.dismissAll();
          console.log(err);
          console.log("errir in file path");
        });
        // this.photos.push(this.base64Image);
      }
    }, (err) => {
      loading.dismissAll();
      console.log(err);
    });
    return img$;
  }

  loginService(email, pwd, type){
   // let ref = this;
    this.type = type;
   console.log(email);
   console.log(pwd);
   let loading = this.getloadingAlert();
   loading.present();
    return new Promise((resolve, reject) => {

      let url = this.serverUrl + 'loginCheck';
      let body = JSON.stringify({
        user_email: email,
        password: pwd,
        type: type
      });
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("login rep");
        console.log(data);
        loading.dismissAll();
        resolve(data.result);
      }, error => {
        console.log("ERROR");
        console.log(error);
        //reject("false");
        loading.dismissAll();
        this.presentAlert('Login Failed', 'Invalid username or password');
        resolve(false);
      });
    });
  }
  signUpService(dataToSend){
   // let ref = this;
    this.type = dataToSend.type;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'signup';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      "service": this.getServiceSelection(),
      "email": this.getUserEmail()
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getVendorList';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("signUp rep");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      let url = this.serverUrl + 'editClientSettings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Save Settings");
        console.log(data);
        resolve(this.sanitizeData(data));
        loading.dismissAll();
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
      let url = this.serverUrl + 'getSettings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Settings");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      "email": this.getUserEmail(),
      "type": this.type
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getProfile';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Profile");
        console.log(data);
        ref.profile = (this.sanitizeData(data));
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      let url = this.serverUrl + 'getSlots';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Slots");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      let url = this.serverUrl + 'getSlotsByDay';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got SlotsByDay");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      let url = this.serverUrl + 'bookVendor';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Booked Vendor");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
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
      let url = this.serverUrl + 'getBookingsSummery';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got BookingsSummery");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getBookings(dataToSend){
    let ref = this;
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getBookings';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got Bookings");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  uploadmageToServer(fileUrl){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let url =  this.serverUrl + 'uploader';
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.profile._user_id + '_profile-picture.jpg',
      headers: {}
    };

    fileTransfer.upload(fileUrl, url, options)
      .then((data) => {
        // success
        console.log(data);
      }, (err) => {
        // error
      })
  }
  saveCard(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'saveCard';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("card saved");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("card save ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getCard(){
    let dataToSend = {
      user_id: this.profile.user_id
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getCard';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got card");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("card save ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }
}
