import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetstartedPage} from "../getstarted/getstarted";
import {SidemenuPage} from "../sidemenu/sidemenu";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilsProvider} from "../../providers/utils/utils";
import {SelectionHomePage} from "../selection-home/selection-home";
import {VendorHomePage} from "../vendor-home/vendor-home";
import {VendorSidemenuPage} from "../vendor-sidemenu/vendor-sidemenu";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    signup: string = "CLIENT";
    public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = '';
    pwd = '';
    cnfpwd = '';
    fname = '';
    lname = '';
    exp = '';
    addr = '';
    lic = '';
    day = {
      mon: {
        selected : false
      },
      tue: {
        selected : false
      },
      wed: {
        selected : false
      },
      thu: {
        selected : false
      },
      fri: {
        selected : false
      },
      sat: {
        selected : false
      },
      sun: {
        selected : false
      }
    };
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    submitAttempt = false;
    submitTwoAttempt = false;

    services = [
      { title: "HAIR", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Test-run a hair look and style before your big event'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening, waving, crimping and more'}] },
      { title: "MAKEUP", list: [{name: 'Up-do', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Event Trial', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Hairstyling', selected: false, desc: 'Sweep up your hair in a range of ways including an assortment of ponytails, braids and more'}, {name: 'Blow Wave', selected: false, desc: 'Test-run a hair look and style before your big event'}]  },
      { title: "NAILS", list: [{name: 'Up-do', selected: false, desc: 'Sweep up'}, {name: 'Event Trial', selected: false, desc: 'braids and more'}, {name: 'Hairstyling', selected: false, desc: 'abcd'}, {name: 'Blow Wave', selected: false, desc: 'Hair straightening'}] },
    ];

    // s = [
    //   {
    //     "title":"hair",
    //     "list":[
    //       {
    //         "name":"Up-do",
    //         "selected":"true"
    //       },
    //       {
    //         "name":"Event Trial",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Hairstyling",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Blow Wave",
    //         "selected":"false"
    //       }
    //     ]
    //   },
    //   {
    //     "title":"makeup",
    //     "list":[
    //       {
    //         "name":"Up-do",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Event Trial",
    //         "selected":"true"
    //       },
    //       {
    //         "name":"Hairstyling",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Blow Wave",
    //         "selected":"false"
    //       }
    //     ]
    //   },
    //   {
    //     "title":"nails",
    //     "list":[
    //       {
    //         "name":"Up-do",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Event Trial",
    //         "selected":"false"
    //       },
    //       {
    //         "name":"Hairstyling",
    //         "selected":"true"
    //       },
    //       {
    //         "name":"Blow Wave",
    //         "selected":"true"
    //       }
    //     ]
    //   }
    // ];
    shownGroup = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private utils: UtilsProvider) {
      this.slideOneForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(SignupPage.EMAIL_REGEX), Validators.required])],
        fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        exp: ['', SignupPage.isValid],
        pwd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
        addr: ['', Validators.required],
        lic: ['', Validators.required],
        cnfPwd: ['', Validators.required]
      },{validator: this.matchingPasswords('pwd', 'cnfPwd')});

      this.slideTwoForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(SignupPage.EMAIL_REGEX), Validators.required])],
        fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        pwd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
        cnfPwd: ['', Validators.required]
      },{validator: this.matchingPasswords('pwd', 'cnfPwd')});
    }

    toggleGroup(group) {
      if (this.isGroupShown(group)) {
        this.shownGroup = null;
      } else {
        this.shownGroup = group;
      }
    };
    isGroupShown(group) {
      return this.shownGroup === group;
    };

    selectService(l){
      if(l.selected){
        l.selected = false;
      }else{
        l.selected = true;
      }
    }


    static isValid(control: FormControl): any {

      if(isNaN(control.value)){
        return {
          "not a number": true
        };
      }

      if (control.value > 70){
        return {
          "not realistic": true
        };
      }

      return null;
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
    }

    navigateToGst(){

      this.navCtrl.push(SidemenuPage);
    }

    tabChanged(event){
        // console.log(event);
        this.email = '';
        this.pwd = '';
        this.cnfpwd = '';
        this.fname = '';
        this.lname = '';
        this.exp = '';
        this.addr = '';
        this.lic = '';
    }

    signUpVendor(){

      this.submitAttempt = true;

      if(!this.slideOneForm.valid){
          //this.signupSlider.slideTo(0);
        console.log("FAIL!")
      }
      else {
          console.log("success!");
          console.log(this.slideOneForm.value);
          // console.log(this.slideTwoForm.value);
        // let serviceObj = {};
        // this.services.forEach(function (service) {
        //   if(service.title == 'HAIR'){
        //     serviceObj.HAIR = service.list;
        //   }
        //   service.list.forEach(function (l) {
        //
        //   });
        // });

        let dataToSend = {
          "username":this.slideOneForm.value.email,
          "email": this.slideOneForm.value.email,
          "password": this.slideOneForm.value.pwd,
          "first_name": this.slideOneForm.value.fname,
          "last_name": this.slideOneForm.value.lname,
          "experience": this.slideOneForm.value.exp,
          "address": this.slideOneForm.value.addr,
          "licenses": this.slideOneForm.value.lic,
          "available": this.getDaysArr(),
          "services": this.services,
          "type": "vendor"
        };

        let signupPromise  = this.utils.signUpService(dataToSend);

        let ref = this;
        signupPromise.then(function (result: any) {
          if(result){
            console.log("Signup Success!!");
            console.log(result);
            // ref.navCtrl.push(SidemenuPage);
            ref.utils.setUserEmail(ref.slideOneForm.value.email);
            ref.utils.setPage(VendorHomePage);
            ref.navCtrl.push(VendorSidemenuPage);
          }else{
            console.log(result);
            console.log("Signup Failed!!");
          }
        });
      }
  }

  getDaysArr(){
    let daysArr = '';
    if(this.day.mon.selected){
      daysArr = daysArr + 'mon,';
    }
    if(this.day.tue.selected){
      daysArr = daysArr + 'tue,';
    }
    if(this.day.wed.selected){
      daysArr = daysArr + 'wed,';
    }
    if(this.day.thu.selected){
      daysArr = daysArr + 'thu,';
    }
    if(this.day.fri.selected){
      daysArr = daysArr + 'fri,';
    }
    if(this.day.sat.selected){
      daysArr = daysArr + 'sat,';
    }
    if(this.day.sun.selected){
      daysArr = daysArr + 'sun,';
    }

    return daysArr;
  }

  signUpClient(){
    this.submitTwoAttempt = true;

    if(!this.slideTwoForm.valid){
      //this.signupSlider.slideTo(0);
      console.log("FAIL!")
    }else {
      let dataToSend = {
        "username":this.slideTwoForm.value.email,
        "email": this.slideTwoForm.value.email,
        "password": this.slideTwoForm.value.pwd,
        "first_name": this.slideTwoForm.value.fname,
        "last_name": this.slideTwoForm.value.lname,
        "type": "client"
      };
      let dataToSendEditClient = {
        "username":this.slideTwoForm.value.email,
        "email": this.slideTwoForm.value.email,
        "notification" : true,
        "travel": false,
        "distance": 10,
        "first_name": this.slideTwoForm.value.fname,
        "last_name": this.slideTwoForm.value.lname,
        "phone": "",
        "address": "",
        "bankName": "",
        "cardNumber": ""
      };
      let signupPromise  = this.utils.signUpService(dataToSend);

      let ref = this;
      signupPromise.then(function (result: any) {
        if(result){
          console.log("Signup Success!!");
          console.log(result);
          // ref.navCtrl.push(SidemenuPage);
          let saveSettings = ref.utils.editClientSettings(dataToSendEditClient);
          saveSettings.then(function (resp) {
            if(resp){
              console.log("Settings Saved !!");
              console.log(resp);
              ref.utils.setUserEmail(ref.slideTwoForm.value.email);
              ref.utils.setPage(SelectionHomePage);
              // this.navCtrl.push(SelectionHomePage);
              ref.navCtrl.push(SidemenuPage);
            }
          });
        }else{
          console.log(result);
          console.log("Signup Failed!!");
        }
      });
    }
  }
}
