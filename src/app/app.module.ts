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
 
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
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

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsProvider
  ]
})
export class AppModule {}
