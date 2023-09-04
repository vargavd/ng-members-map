import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Bs5ModalComponent } from './modals/bs5-modal/bs5-modal.component';
import { MemberModalComponent } from './modals/member-modal/member-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListSidePanelComponent } from './list-side-panel/list-side-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    Bs5ModalComponent,
    MemberModalComponent,
    ListSidePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
