import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CreateMessagesComponent } from './pages/create-messages/create-messages.component';
import { MyMessagesComponent } from './pages/my-messages/my-messages.component';
import { SeeAllMessagesComponent } from './pages/see-all-messages/see-all-messages.component';

const routes: Routes = [
  {
    path: '', component: MainComponent ,
    children: [
      { path: 'create-messages', component: CreateMessagesComponent },
      { path: 'messages', component: MyMessagesComponent },
      { path: 'all-messages', component: SeeAllMessagesComponent },
      { path: '**', redirectTo: 'create-messages' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
