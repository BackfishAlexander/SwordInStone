import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { HomeComponent } from './pages/home/home.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { InviteComponent } from './pages/invite/invite.component';
import { TermsofserviceComponent } from './pages/termsofservice/termsofservice.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, pathMatch: 'full'},
  { path: 'campaign/:id', component: CampaignComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardServiceService], pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'termsofservice', component: TermsofserviceComponent, pathMatch: 'full'},
  { path: 'privacypolicy', component: PrivacypolicyComponent, pathMatch: 'full'},
  { path: 'invite/:id', component: InviteComponent},
  { path: '**', component: ErrorComponent} // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
