import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { FullmapPage } from '../fullmap/fullmap';

declare var google;
/**
 * Generated class for the BookingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  latLng:any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.bookingData = navParams.get('bookingData');
  }

  ionViewDidLoad(){
    this.loadLatLng();
  }

loadLatLng(){
  this.getlatlng(this.data.clientAddress).then((result:any)=>{
    this.latLng=new google.maps.LatLng(result.lat,result.lng);
    this.loadMap(this.latLng);
    this.createmodalobj();
  // console.log("LATLNGGGGGG",JSON.stringify(this.latLng))
 })

}

  getlatlng(address){

    var promise=new Promise((resolve,reject)=>{
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status){

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
       // console.log(JSON.stringify(results[0].geometry.location))
       resolve({lat:latitude,lng:longitude});

      }
    });
  })
    return promise;
  }



  createmodalobj(){
  this.modalObj={latlong:this.latLng, clientName:this.data.clientName, clientAddress:this.data.clientAddress};
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

}
