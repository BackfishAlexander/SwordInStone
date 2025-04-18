import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { LogoComponent } from './components/logo/logo.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { CharacterPillComponent } from './components/character-pill/character-pill.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthInterceptorService } from './Interceptors/auth-interceptor.service';
import { CampaignBoxComponent } from './components/campaign-box/campaign-box.component';
import { InviteComponent } from './pages/invite/invite.component';
import { CreateImportCharComponent } from './components/create-import-char/create-import-char.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillComponent } from './components/skill/skill.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';
import { TermsofserviceComponent } from './pages/termsofservice/termsofservice.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { InventorySheetComponent } from './components/inventory-sheet/inventory-sheet.component';
import { ItemLineComponent } from './components/item-line/item-line.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { TagCreatorComponent } from './components/tag-creator/tag-creator.component';
import { TagComponent } from './components/tag/tag.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip-directive.directive';
import { ItemCreatorComponent } from './components/item-creator/item-creator.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogoComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotificationComponent,
    NavbarComponent,
    CampaignComponent,
    CharacterPillComponent,
    PlayerListComponent,
    LogoutComponent,
    CampaignBoxComponent,
    InviteComponent,
    CreateImportCharComponent,
    CharacterSheetComponent,
    FooterComponent,
    SkillComponent,
    DiceRollerComponent,
    TermsofserviceComponent,
    PrivacypolicyComponent,
    InventorySheetComponent,
    ItemLineComponent,
    MyAccountComponent,
    TagCreatorComponent,
    TagComponent,
    TooltipComponent,
    TooltipDirective,
    ItemCreatorComponent,
    ItemSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }