import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CreateMessagesComponent } from './pages/create-messages/create-messages.component';
import { MyMessagesComponent } from './pages/my-messages/my-messages.component';
import { SeeAllMessagesComponent } from './pages/see-all-messages/see-all-messages.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    CreateMessagesComponent,
    MyMessagesComponent,
    SeeAllMessagesComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
