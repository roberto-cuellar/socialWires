import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CreateMessagesComponent } from './pages/create-messages/create-messages.component';
import { MyMessagesComponent } from './pages/my-messages/my-messages.component';
import { SeeAllMessagesComponent } from './pages/see-all-messages/see-all-messages.component';


@NgModule({
  declarations: [
    MainComponent,
    CreateMessagesComponent,
    MyMessagesComponent,
    SeeAllMessagesComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
