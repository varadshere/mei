import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

/**
 * Generated class for the ReviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-review-modal',
  templateUrl: 'review-modal.html',
})
export class ReviewModalPage {
  rating: any;
  data: any;
  text: string;
  reviewText: string = '';
  type: string;

  constructor(public navParams: NavParams, private utils: UtilsProvider, private viewCtrl: ViewController) {
    this.data = navParams.get('data');
    this.text = this.data.packDat.text;
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewModalPage');
  }

  postReview(){
    if(!this.rating){
      return;
    }
    let dataToSend = {
      "review": this.reviewText,
      "rating": this.rating,
      "vendor_id": this.data.packDat.vendor_id,
      "user_id": this.data.packDat.user_id
    };
    let reviewsPromise = this.utils.postReviews(dataToSend);
    reviewsPromise.then((result: any) => {
      this.utils.presentAlert("Review Posted", "Thank You!");
      this.viewCtrl.dismiss();
    });

  }
}
