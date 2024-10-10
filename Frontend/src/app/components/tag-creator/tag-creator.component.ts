import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/dtos/campaigns';
import { HttpService } from 'src/app/services/http.service';
import { TooltipService } from 'src/app/services/tooltip-service.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-tag-creator',
  templateUrl: './tag-creator.component.html',
  styleUrls: ['./tag-creator.component.css']
})
export class TagCreatorComponent implements OnInit {
  constructor(private httpService: HttpService, private tooltip: TooltipService) {

  }
  formData = {
    name: 'tag',
    description: 'description',
    color: '#000000' // Default color value
  };

  tagList: Tag[] = [];

  ngOnInit(): void {
      this.getTags();
  }

  deleteTag(id: number) {
    this.httpService.deleteRequest(
      this.httpService.buildURL(endpointList.getTag + "/" + id),
      'json'
    ).then(
      response => {
        this.getTags();
        this.tooltip.hideTooltip();
      },
      error => {
        console.log(error);
      }
    )
  }

  getTags() {
    this.httpService.getRequest<Tag[]>(this.httpService.buildURL(endpointList.getTag), 'json').then(
      response => {
        console.log(response);
        this.tagList = response;
      },
      error => {
        console.error(error);
      }
    )
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.addTag),
      {name: this.formData.name, description: this.formData.description, color: this.formData.color}, 'json').then(
      response => {
        console.log(response);
        this.getTags();
      },
      error => {
        console.log(error);
      }
    );
  }
}
