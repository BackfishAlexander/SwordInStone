import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/dtos/campaigns';
import { HttpService } from 'src/app/services/http.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent {
  constructor(private httpService: HttpService) {

  }

  itemTypes = [
    "HELMET",
    "MASK",
    "CHESTPIECE",
    "GAUNTLET",
    "GLOVE",
    "PANTS",
    "BOOTS",
    "ACCESSORY",
    "JEWELRY",
    "WEAPON",
    "ARTIFACT"
  ];

  formData = {
    name: 'name',
    description: 'description',
    gold: 0,
    silver: 0,
    copper: 0,
    imageURL: 'www.image.com/image.jpg',
    type: ''
  };

  tagList: Tag[] = [];

  onImageSelected(e: any) {
    console.log(e);
  }

  onSubmit() {
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.createGlobalItem),
      {
        name: this.formData.name,
        description: this.formData.description,
        goldValue: this.formData.gold,
        silverValue: this.formData.silver,
        copperValue: this.formData.copper,
        type: this.formData.type,
        url: this.formData.imageURL
      },
      'json'
    ).then(
      response => {
        console.log(response);
      }
    )
  }


}
