import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams,ModalController, AlertController } from 'ionic-angular';
import { FullmapPage } from '../fullmap/fullmap';
import {UtilsProvider} from "../../providers/utils/utils";
import {ProfilePage} from "../profile/profile";

declare var google;
/**
 * Generated class for the BookingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  latLng:any;
  jlatLng: any;
  modalObj:any;
    marker='./assets/imgs/marker.png';

  data:any={

    clientName: "Mia Anderson",
    clientAddress:"15 Old Mill Street, Ridgehaven SA 5097",
    appoinmentDate:"Friday, September 16",
    appoinmentStartime:"12:30 PM",
    appoinmentEndTime:"2:00 PM",
    serviceTotal:"$155",

    services:[{serviceName:"Hairstyling",quantity:1,price:70},
    {serviceName:"Blow Wave",quantity:1,price:20},
    {serviceName:"Full Face Application",quantity:1,price:65}
    ],
    commision:{percentage:15, percent_amt:23.25, commisionWaive:true}
  };

  bookingData: any;
  bookingIndex: any;
  client: boolean;
  mapAddress: string;
  vendorProfile: any;
  vendorData = {};
  clientProfile: any;
  clientData = {};
  todayDate = new Date();
  date_diff;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public utils: UtilsProvider, private alertCtrl: AlertController) {
    this.bookingData = navParams.get('bookingData');
    this.bookingIndex = this.navParams.get('bookingIndex');
    this.date_diff = Math.round((this.todayDate.getTime() - new Date(this.bookingData.date).getTime())/(60*60*1000));
    this.utils.getProfile().then(data => {
      this.client = !(data["type"] == "client");
    }).catch((error) => {
      console.log(error);
    });


    if (this.utils.profile.type == "client"){
      this.vendorData = {
          "username": this.bookingData.username,
          "email": this.bookingData.email,
          "type": "vendor"
        };
      this.utils.getProfile(this.vendorData).then(data => {
        this.vendorProfile = data;
        this.setAddress();
      }).catch((error) => {
        console.log(error);
      });
    }
    if (this.utils.profile.type == "vendor"){
      this.clientData = {
        "username": this.bookingData.username,
        "email": this.bookingData.email,
        "type": "client"
      };
      this.utils.getProfile(this.clientData).then(data => {
        this.clientProfile = data;
        this.setAddress();
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  ionViewDidLoad(){
    // this.loadLatLng();
  }

  setAddress(){
    if (this.bookingData.booking_location == 'vendor'){
      if (this.utils.profile.type == "vendor")
        this.bookingData.address = this.utils.profile.address;
      else
        this.bookingData.address = this.vendorProfile.address;
    }
    else {
      if (this.utils.profile.type == "client")
        this.bookingData.address = this.utils.profile.address;
      else
        this.bookingData.address = this.clientProfile.address;
    }
    this.mapAddress = this.bookingData.address;
    this.loadLatLng();
  }

loadLatLng(){
  this.getlatlng(this.mapAddress).then((result:any)=>{
    this.latLng=new google.maps.LatLng(result.lat,result.lng);
    this.jlatLng = JSON.parse(JSON.stringify(this.latLng));
    this.loadMap(this.latLng);
    this.createmodalobj();
 })

}

  getlatlng(address){

    var promise=new Promise((resolve,reject)=>{
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status){

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
       resolve({lat:latitude,lng:longitude});

      }
    });
  })
    return promise;
  }



  createmodalobj(){
  this.modalObj={latlong:this.latLng, clientName:this.bookingData.name, clientAddress:this.bookingData.address, jlatLng: this.jlatLng, date: this.bookingData.date, time: `${this.bookingData.startTime}-${this.bookingData.endTime}`};
  };

openMap(){
  let Modal = this.modalCtrl.create(FullmapPage, this.modalObj);
  Modal.present();
}
  loadMap(latLng){

    console.log("THIS>LATLANG",JSON.stringify(this.latLng))
    let mapOptions = {
      center: latLng,
      zoom: 12,
      disableDefaultUI: true,
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    let marker2 = new google.maps.Marker({
      map: this.map,
      position: latLng,
      icon:this.marker
    });


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    marker2.setMap(this.map);



  }

  confirmBooking(flag: String){
    let ref = this;
    let datatoSend = {
      "client_id": (this.utils.profile.type == 'client')?this.utils.profile.user_id:this.bookingData.user_id,
      "vendor_id": (this.utils.profile.type == 'client')?this.bookingData.user_id:this.utils.profile.user_id,
      "flag": flag,
      "date": this.bookingData.date
    };
    let cb = this.utils.confirmBooking(datatoSend).then((result) => {
      if (result) {
        console.log(`Booking confirmed: ${result}`);
        this.navCtrl.getPrevious().data.bookingIndex = ref.bookingIndex;
        this.navCtrl.getPrevious().data.bookingStatus = flag;
        this.navCtrl.pop();
      }
    });
  }

  raiseAlert(){
    let alert = this.alertCtrl.create({
      title:"Raise a Dispute",
      message:"Email us at <a href='mailto:hello@meiapp.com'>hello@meiapp.com</a>",
      buttons:["Dismiss"]
    });
    alert.present();
  }

  openProfile(profile) {
    this.navCtrl.push(ProfilePage, {
      profile: profile
    });
  }

}
