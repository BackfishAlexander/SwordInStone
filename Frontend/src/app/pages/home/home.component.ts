import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { campaign } from 'src/app/dtos/campaigns';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void <=> *', [
        animate('0.1s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  campaignList: campaign[] | null = null;
  loading = true;
  campaignName: string = '';
  campaignDescription: string = '';
  createLoading = false;

  ngOnInit(): void {
    this.httpService.getRequest<typeof this.campaignList>(this.httpService.buildURL(endpointList.campaigns), "json").then(
      (response => {
        this.campaignList = response
        this.loading = false;
    }));
  }

  constructor(
    private notification: NotificationService,
    private httpService: HttpService,
    private router: Router
  ) {

  }

  callNotification() {
    this.notification.showNotification("Error! You messed something up!", "error");
  }

  createCampaign() {
    this.createLoading = true;
    this.httpService.postRequest(this.httpService.buildURL(endpointList.campaigns), {name: this.campaignName, description: this.campaignDescription}, 'json').then(
      response => {
        console.log(response);
        this.createLoading = false;
        window.location.reload();
      },
      error => {
        console.log(error);
        this.createLoading = false;
      }
    );
  }
}
