import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CreateMessagesComponent, ModalConfirmacionComponent } from './pages/create-messages/create-messages.component';
import { MyMessagesComponent } from './pages/my-messages/my-messages.component';
import { SeeAllMessagesComponent } from './pages/see-all-messages/see-all-messages.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './material-components/material-components.module';

@NgModule({
  declarations: [
    MainComponent,
    CreateMessagesComponent,
    MyMessagesComponent,
    SeeAllMessagesComponent,
    ModalConfirmacionComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    MatButtonModule
  ],
  
})
export class ProtectedModule { }
