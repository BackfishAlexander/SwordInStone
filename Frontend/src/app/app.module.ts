import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { CampaignViewComponent } from './campaign-view/campaign-view.component';
import { CreateCharacterModalComponent } from './create-character-modal/create-character-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterListComponent } from './character-list/character-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalViewComponent } from './modal-view/modal-view.component';
import { LogoutComponent } from './logout/logout.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { NotificationComponent } from './notification/notification.component';
import { CampaignJoinComponent } from './campaign-join/campaign-join.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CampaignViewComponent,
    CreateCharacterModalComponent,
    CharacterListComponent,
    NavbarComponent,
    ModalViewComponent,
    LogoutComponent,
    ShopViewComponent,
    NotificationComponent,
    CampaignJoinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
