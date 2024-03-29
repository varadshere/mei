import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import {VendorSettingsPage} from "../vendor-settings/vendor-settings";
import {ProfileEditPage} from "../profile-edit/profile-edit";

@Component({
  selector: 'page-vendor-profile',
  templateUrl: 'vendor-profile.html',
})
export class VendorProfilePage {
  profile: string = "ABOUT";
  gallery_imgs: any;
  profileEditPage = ProfileEditPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: UtilsProvider, public alertCtrl: AlertController) {
    this.gallery_imgs = [];
    this.getGalleryFiles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorProfilePage');
  }
  openVendorSettings(){
    console.log("Vendor Settings");
    this.utils.setPage(VendorSettingsPage);
    this.utils.notifyOther('data');
  }

  uploadGalleryPhoto(){
    this.utils.getImgFromDevice().then((data)=>{
      if(data){
        this.utils.uploadImageToServer(data,"gallery");
        this.gallery_imgs.push(data);
      }
    });
  }

  getGalleryFiles(){
    this.utils.getImageGallery().then((data) => {
      this.gallery_imgs = data;
      for(let img in data){
        this.utils.getMediaImage(data[img]);
      }
    });
  }

  delMedia(file: string){
    let fileobj = {
      "filename":this.utils.profile.user_id+"//"+file
    };
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete image?',
      buttons: [
        {
          text: 'No',
          handler: ()=>{console.log("Clicked No");}
        },
        {
          text: 'Yes',
          handler: ()=>{
            console.log("Clicked Yes");
            this.utils.delMediaFile(fileobj).then((result) => {
              if (result){
                alert("Image Deleted.");
                let ar1 = this.gallery_imgs.slice(0,this.gallery_imgs.indexOf(file));
                let ar2 = this.gallery_imgs.slice(this.gallery_imgs.indexOf(file)+1);
                this.gallery_imgs = [...ar1,...ar2];
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
