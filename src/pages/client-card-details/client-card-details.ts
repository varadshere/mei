import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";

/**
 * Generated class for the ClientCardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-card-details',
  templateUrl: 'client-card-details.html',
})
export class ClientCardDetailsPage {

  savedCardFlag: boolean = false;
  savedCard: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
    this.getCard();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientCardDetailsPage');
  }

  getCard(){
    this.utils.getCard().then(result =>{
      if(result){
        this.savedCardFlag = true;
        this.savedCard = result;
      }else {
        this.savedCardFlag = false;
      }
    })
  }


}
