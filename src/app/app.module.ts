import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {GetstartedPage} from "../pages/getstarted/getstarted";
import {SidemenuPage} from "../pages/sidemenu/sidemenu";
import {ResultsPage} from "../pages/results/results";
import {ProfilePage} from "../pages/profile/profile";
import { UtilsProvider } from '../providers/utils/utils';
import {CalendarPage} from "../pages/calendar/calendar";
import {SelectionHomePage} from "../pages/selection-home/selection-home";
import {MyBookingPage} from "../pages/my-booking/my-booking";
import {MyBooking2Page} from "../pages/my-booking2/my-booking2";
import {MyBooking3Page} from "../pages/my-booking3/my-booking3";
import {ClientSettingsPage} from "../pages/client-settings/client-settings";
import {VendorHomePage} from "../pages/vendor-home/vendor-home";
import {VendorSidemenuPage} from "../pages/vendor-sidemenu/vendor-sidemenu";
import {ActivityPage} from "../pages/activity/activity";
import { BookingDetailsPage } from '../pages/booking-details/booking-details';
import { FullmapPage } from '../pages/fullmap/fullmap';
import {VendorBookingsPage} from "../pages/vendor-bookings/vendor-bookings";
import {VendorCalendarPage} from "../pages/vendor-calendar/vendor-calendar";
import { ChartPage } from '../pages/chart/chart';
import {VendorSettingsPage} from "../pages/vendor-settings/vendor-settings";
import {ClientBookingsPage} from "../pages/client-bookings/client-bookings";
import {ClientProfilePage} from "../pages/client-profile/client-profile";
import {Ionic2RatingModule} from "ionic2-rating";
import {Camera} from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import {ProfilePicModalPage} from "../pages/profile-pic-modal/profile-pic-modal";
import {Crop} from "@ionic-native/crop";
import {VendorProfilePage} from "../pages/vendor-profile/vendor-profile";
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {ReviewModalPage} from "../pages/review-modal/review-modal";
import { IonicStorageModule } from '@ionic/storage';
import {TermsAndConditionsPage} from "../pages/terms-and-conditions/terms-and-conditions";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SidemenuPage,
    GetstartedPage,
    ResultsPage,
    ProfilePage,
    CalendarPage,
    SelectionHomePage,
    MyBookingPage,
    MyBooking2Page,
    MyBooking3Page,
    ClientSettingsPage,
    VendorHomePage,
    VendorSidemenuPage,
    ActivityPage,
    BookingDetailsPage,
    FullmapPage,
    VendorBookingsPage,
    VendorCalendarPage,
    ChartPage,
    VendorSettingsPage,
    ClientBookingsPage,
    ClientProfilePage,
    ProfilePicModalPage,
    VendorProfilePage,
    ReviewModalPage,
    TermsAndConditionsPage

  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SidemenuPage,
    GetstartedPage,
    ResultsPage,
    ProfilePage,
    CalendarPage,
    SelectionHomePage,
    MyBookingPage,
    MyBooking2Page,
    MyBooking3Page,
    ClientSettingsPage,
    VendorHomePage,
    VendorSidemenuPage,
    ActivityPage,
    BookingDetailsPage,
    FullmapPage,
    VendorBookingsPage,
    VendorCalendarPage,
    ChartPage,
    VendorSettingsPage,
    ClientBookingsPage,
    ClientProfilePage,
    ProfilePicModalPage,
    VendorProfilePage,
    ReviewModalPage,
    TermsAndConditionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    Base64,
    Crop,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsProvider
  ]
})
export class AppModule {}
