import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {VendorSettingsPage} from "../vendor-settings/vendor-settings";

@Component({
  selector: 'page-vendor-profile',
  templateUrl: 'vendor-profile.html',
})
export class VendorProfilePage {
  profile: string = "ABOUT";
  gallery_imgs: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorProfilePage');
    this.getGalleryFiles();
  }
  openVendorSettings(){
    console.log("Vendor Settings");
    this.utils.setPage(VendorSettingsPage);
    this.utils.notifyOther('data');
  }

  uploadGalleryPhoto(){
    this.utils.getImgFromDevice().then((data)=>{
      if(data){
        console.log(data);
        this.utils.uploadImageToServer(data,"gallery");
        this.gallery_imgs.push(data);
      }
    });
  }

  getGalleryFiles(){
    let imgFiles: any = null;
    this.utils.getImageGallery().then((data) => {
      console.log(data);
      this.gallery_imgs = data;
    });
  }
}
