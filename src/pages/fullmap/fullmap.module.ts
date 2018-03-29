import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullmapPage } from './fullmap';

@NgModule({
  declarations: [
    FullmapPage,
  ],
  imports: [
    IonicPageModule.forChild(FullmapPage),
  ],
})
export class FullmapPageModule {}
