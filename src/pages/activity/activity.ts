import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  clients = [
    {name: 'Samantha Pollock', desc: 'MAKEUP | 22 Hallet St, Adelaide', startTime: '10:00 AM', endTime: '11:00 AM'},
    {name: 'Laila Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '11:00 AM', endTime: '12:00 AM'},
    {name: 'Cecelia Lou', desc: 'HAIR &* MAKEUP | 17 Carbon St, Adelaide', startTime: '13:00 AM', endTime: '14:00 AM'}
  ];

}
