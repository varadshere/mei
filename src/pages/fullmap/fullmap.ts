import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

declare var google;
/**
 * Generated class for the FullmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fullmap',
  templateUrl: 'fullmap.html',
})
export class FullmapPage {
  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
    marker='./assets/imgs/marker.png';
latLng:any=this.navParams.get('latlong');
jlatLng = this.navParams.get('jlatLng');
clientName:any=this.navParams.get('clientName');
clientAddress:any=this.navParams.get('clientAddress');
bookingDate: any = this.navParams.get('date');
bookingTime: any = this.navParams.get('time');
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public utils: UtilsProvider) {
  }

  ionViewDidLoad(){
    this.loadMap(this.latLng);
  }
close(){
  this.viewCtrl.dismiss();
}

  loadMap(latLng){
 
    
 
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
