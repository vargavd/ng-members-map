import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Bs5ModalComponent } from './modals/bs5-modal/bs5-modal.component';
import { AddMemberModalComponent } from './modals/add-member-modal/add-member-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    Bs5ModalComponent,
    AddMemberModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
