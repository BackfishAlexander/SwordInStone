import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-create-import-char',
  templateUrl: './create-import-char.component.html',
  styleUrls: ['./create-import-char.component.css']
})
export class CreateImportCharComponent {
  @Input() campaignId: string = '';
  importCharacterURL: string = '';
  importLoading = false;

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {}

  importCharacter() {
    this.importLoading = true;
    this.httpService.postRequest(
      `${this.httpService.buildURL(endpointList.campaigns)}/${this.campaignId}/import-character?url=${encodeURIComponent(this.importCharacterURL)}`,
      {}, 'json').then(
      response => {
        console.log(response);
        this.importLoading = false;
        window.location.reload();
      },
      error => {
        console.log(error);
        this.notificationService.showNotification("Error fetching DNDBeyond character. Make sure your character's visibility is set to 'public'", "error");
        this.importLoading = false;
      }
    );
  }

}
