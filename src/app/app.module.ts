import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Bs5ModalComponent } from './modals/bs5-modal/bs5-modal.component';
import { MemberModalComponent } from './modals/member-modal/member-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListSidePanelComponent } from './list-side-panel/list-side-panel.component';
import { DeleteMemberComponent } from './modals/delete-member/delete-member.component';
import { MainMapComponent } from './main-map/main-map.component';
import { geocodingReducer } from './store/geocoding/geocoding.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GeocodingEffects } from './store/geocoding/geocoding.effects';

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
    HttpClientModule,
    StoreModule.forRoot({
      geocodingData: geocodingReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    EffectsModule.forRoot([GeocodingEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
