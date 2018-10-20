import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Http, Headers, Response} from '@angular/http';
import {AlertController, LoadingController, Platform} from 'ionic-angular';
import {ImagePicker} from "@ionic-native/image-picker";
import {Base64} from "@ionic-native/base64";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Crop} from "@ionic-native/crop";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {UserData} from "../models";
import {Storage} from "@ionic/storage";
declare var FirebasePlugin;

@Injectable()
export class UtilsProvider {

  private notify = new Subject<any>();
  notifyObservable$: any =  this.notify.asObservable();
  serverUrl  =  'http://18.216.123.109:5000/api/'; //'http://372460c3.ngrok.io/api/';
  photoUrl  =  'http://18.216.123.109:5000/api/getProfileImage/'; //'http://372460c3.ngrok.io/api/';
  galleryImgUrl = 'http://18.216.123.109:5000/api/getUserGallery/';
  mapSearchUrl = 'https://www.google.com/maps/search/?api=1';
  page = '';
  private _serviceSelected = '';
  private _subServiceSelected = '';
  email = '';
  headers = new Headers();
  private _type: string;
  private _profile: any = {};
  private _user_id;
  private _device_token;
  private _filterRating;
  private _filterTravelFlag: boolean;
  private _filterKey: string;
  private _filterDistance: any = 20;
  private _filterDays: any = '';
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  private _stripeKey: string = 'pk_test_x1LxYvNr0ewGsaPHNzX0V7Ey';

  constructor(public http: Http,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private imagePicker: ImagePicker,
              private base64: Base64,
              private camera: Camera,
              private crop: Crop,
              private transfer: FileTransfer,
              private file: File,
              private storage: Storage,
              private platform: Platform) {
    console.log('Hello UtilsProvider Provider');
    this.headers.append('Content-Type','application/json');
    // this.headers.append('Access-Control-Allow-Origin' , '*');
    // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  }


  get filterRating() {
    if(this._filterRating){
      return this._filterRating;
    }else {
      return '';
    }
  }

  get filterDistance(): number {
    if(this._filterDistance){
      return this._filterDistance;
    }else {
      return 5;
    }
  }

  set filterDistance(value: number) {
    this._filterDistance = value;
  }

  set filterRating(value) {
    this._filterRating = value;
  }

  get filterTravelFlag() {
    if(this._filterTravelFlag){
      return this._filterTravelFlag;
    }else {
      return false;
    }
  }

  set filterTravelFlag(value) {
    this._filterTravelFlag = value;
  }

  get filterKey() {
    if(this._filterKey){
      return this._filterKey;
    }else {
      return '';
    }
  }

  set filterKey(value) {
    this._filterKey = value;
  }
  get device_token() {
    return this._device_token;
  }

  set device_token(value) {
    this._device_token = value;
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

  get serviceSelected(): string {
    return this._serviceSelected;
  }

  set serviceSelected(value: string) {
    this._serviceSelected = value;
  }

  get subServiceSelected(): string {
    return this._subServiceSelected;
  }

  set subServiceSelected(value: string) {
    this._subServiceSelected = value;
  }

  get filterDays(): any {
    return this._filterDays;
  }

  set filterDays(value: any) {
    this._filterDays = value;
  }

  get stripeKey(): string{
    return this._stripeKey;
  }

  // getServiceSelection(){
  //   return this.serviceSelected;
  // }
  //
  // setServiceSelection(s){
  //   this.serviceSelected = s;
  // }

  setUserEmail(email){
    this.email = email;
  }
  getUserEmail(){
    return this.email
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      if (typeof FirebasePlugin != 'undefined'){
        FirebasePlugin.getToken((token) =>{
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
      spinner:'hide',
      // content: 'Loading, Please Wait...'
      content: '<div class="lds-hourglass"></div>'
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
        device_token: this.device_token,
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
    dataToSend.device_token = this.device_token || "";
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
        loading.dismissAll();
        reject(error);
      });
    });
  }

  vendorListService(){
   // let ref = this;
    let dataToSend = {
      "filters":{
        "type": this.serviceSelected,
        "rating": this.filterRating,
        "client_willing_to_travel":this.filterTravelFlag,
        "client_distance": this.filterDistance.toString(),
        "vendor_services": this.subServiceSelected,
        "available_days": this.filterDays
      },
      "email": this.getUserEmail(),
      "username": this.profile.username
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getVendorList';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(10000).subscribe(data => {
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

  getProfile(dataSend?: any){
    let ref = this;
    let dataToSend = {};
    if(dataSend) {
      dataToSend = dataSend;
    }
    else {
      dataToSend = {
        "username": this.getUserEmail(),
        "email": this.getUserEmail(),
        "type": this.type
      };
    }
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getProfile';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("Got Profile");
        console.log(data);
        if(!dataSend){
          ref.profile = (this.sanitizeData(data));
        }
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
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getBookingsSummery';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(10000).subscribe(data => {
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

  /**
    uploadType = "profile / gallery"
  **/
  uploadImageToServer(fileUrl, uploadType){
    let loading = this.getloadingAlert();
    loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let url = null;
    let options: FileUploadOptions = null;
    if (uploadType == "profile"){
      url =  this.serverUrl + 'uploader';
      options = {
        fileKey: 'file',
        fileName: this.profile.user_id + '_profile-picture.jpg',
        headers: {}
      };
    }
    if (uploadType == "gallery"){
      url = this.serverUrl + 'mediaUploader';
      options = {
        fileKey: 'file',
        fileName: this.profile.user_id + `_${this.randomString()}.jpg`,
        headers: {}
      }
    }
    fileTransfer.upload(fileUrl, url, options)
      .then((data) => {
        // success
        console.log(data);
        loading.dismissAll();
      }, (err) => {
        // error
        console.log("ERROR");
        console.log(err);
        loading.dismissAll();
      });
  }

  getImageGallery(userId?){
    let loading = this.getloadingAlert();
    let url = "";
    loading.present();
    return new Promise((resolve, reject) => {
      if(userId){
        url = this.serverUrl + 'getUserGalleryFiles/' + userId;
      }
      else {
        url = this.serverUrl + 'getUserGalleryFiles/' + this.profile.user_id;
      }
      this.http.get(url,{headers: this.headers}).map((res) => res.json()).timeout(3000).subscribe(data => {
        console.log("Gallery files");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("Gallery ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  getMediaImage(fileName){
    let url = this.serverUrl + "getUserGallery/" + fileName;
    this.http.get(url,{headers: this.headers}).timeout(3000).subscribe(data => {
      console.log("Media image received");
    }, error => {
      console.log("Media image fetch ERROR");
      console.log(error);
    });
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

  saveBank(bankDataSend){
    let loading = this.getloadingAlert();
    loading.present();

    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'saveBank';
      let body = JSON.stringify(bankDataSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("bank details saved");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("saving bank details ERROR");
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

  sendNotification(action, data, msg, token){
    let dataToSend = {
      "message": msg,
      "sendername": "mei",
      "device_token": token,
      "action": action,
      "data": JSON.stringify(data)
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'sendNotification';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("send Notification resp");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("Send notification ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  postReviews(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'postReviews';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("postReview resp");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("Post review ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  forgotPass(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'forgotPass';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("forgot pass resp");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("forgot pass ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  changePass(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'conformPassword';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("forgot pass resp");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("forgot pass ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }
  confirmBooking(dataToSend){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'conformBooking';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("confirmBooking resp");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("confirmBooking ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  setUtilsData(val: UserData){
    this.setUserEmail(val.email);
    this.profile = val.profile;
    this.type = val.type;
    this.device_token = val.device_token;
  }
  setUserData(val: UserData){
    this.setUtilsData(val);
    this.storage.set('userData', val);
  }

  logOut(){
    let loading = this.getloadingAlert();
    loading.present();
    this.storage.clear().then(() => {
      console.log('all keys cleared');
      loading.dismissAll();
      this.platform.exitApp();
    });
  }

  randomString(length: number=32){
    let text = "";
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }

  walletTransactions(){
    let dataToSend = {
      username: this.profile.username,
      email: this.profile.email,
      filter_date: "desc"
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'getTransactions';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(3000).subscribe(data => {
        console.log("got transactions");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("get transactions error");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  editVendorServices(serviceList){
    let dataToSend = {
      username: this.profile.username,
      services: serviceList
    };
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'updateServices';
      let body = JSON.stringify(dataToSend);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(5000).subscribe(data => {
        console.log("Services updated");
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      },error => {
        console.log("error updating services");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  addVendorBankAccount(bankData){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'addVendorBankAccount';
      let body = JSON.stringify(bankData);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(5000).subscribe(data => {
        console.log("Bank Account saved");
        console.log(data);
        loading.dismissAll();
        resolve(data);
      }, error => {
        console.log("adding bank account ERROR");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  createVendorStripeAccount(stripeAccData){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'createVendorAccount';
      let body = JSON.stringify(stripeAccData);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).subscribe(data => {
       console.log("Vendor stripe account created");
       console.log(data);
       loading.dismissAll();
       resolve(this.sanitizeData(data));
      }, error => {
        console.log("Error when creating stripe account for vendor");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  checkVendorStripeAccount(vendorData){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'createVendorAccountExist';
      let body = JSON.stringify(vendorData);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(5000).subscribe(data => {
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("Error when creating stripe account for vendor");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

  delMediaFile(fileobj){
    let loading = this.getloadingAlert();
    loading.present();
    return new Promise((resolve, reject) => {
      let url = this.serverUrl + 'deleteMedia';
      let body = JSON.stringify(fileobj);
      this.http.post(url, body, {headers: this.headers}).map(res => res.json()).timeout(5000).subscribe(data => {
        console.log(data);
        loading.dismissAll();
        resolve(this.sanitizeData(data));
      }, error => {
        console.log("Error when creating stripe account for vendor");
        console.log(error);
        loading.dismissAll();
        resolve(false);
      });
    });
  }

}
