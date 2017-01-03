import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { EditHorsePage } from '../pages/edit-horse-page/edit-horse-page';
import { PlanningPage } from '../pages/planning-page/planning-page';
import { ConfigPage } from '../pages/config-page/config-page';

import { HorseItemComponent } from '../components/horse-item/horse.component';

import { CapitalizePipe } from '../pipes/capitalizePipe';

import { Data } from '../providers/data';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlanningPage,
    ConfigPage,
    EditHorsePage,
    HorseItemComponent,
    CapitalizePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage,
    PlanningPage,
    EditHorsePage
  ],
  providers: [Storage, Data]
})
export class AppModule {}
