import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterModalPage } from './filter-modal';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    FilterModalPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(FilterModalPage),
  ],
})
export class FilterModalPageModule {}
