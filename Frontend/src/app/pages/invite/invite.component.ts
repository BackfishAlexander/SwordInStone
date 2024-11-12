import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Input as RouteParam } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { endpointList } from 'src/environments/endpoint-list';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  id: string = '';
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id != null) {
        this.id = id;
      }
    });

    this.httpService.postRequest(this.httpService.buildURL(`${endpointList.campaigns}/${this.id}/join`),null,'json').then(
      (response => this.router.navigate(['/campaign/' + this.id]))
    ).catch(
      (error => this.notif.showNotification("Unable to join campaign", "error", true))
    );
  }
}
