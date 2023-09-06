import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Bs5ModalComponent } from './modals/bs5-modal/bs5-modal.component';
import { MemberModalComponent } from './modals/member-modal/member-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListSidePanelComponent } from './list-side-panel/list-side-panel.component';
import { DeleteMemberComponent } from './modals/delete-member/delete-member.component';
import { MainMapComponent } from './main-map/main-map.component';

@NgModule({
  declarations: [
    AppComponent,
    Bs5ModalComponent,
    MemberModalComponent,
    ListSidePanelComponent,
    DeleteMemberComponent,
    MainMapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
