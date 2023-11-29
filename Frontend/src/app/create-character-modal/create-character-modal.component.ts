import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../services/character.service'; // Adjust the import path as needed
import { CookieService } from 'ngx-cookie-service'; // Import CookieService
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-character-modal',
  templateUrl: './create-character-modal.component.html',
  styleUrls: ['./create-character-modal.component.css']
})
export class CreateCharacterModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  campaignId: any;
  // The isModalOpen property should be public to be accessible from the template


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campaignId = params['id']; // Assign the campaignId once when the component initializes
    });}

  closeModal(): void {
    this.close.emit(); // This will emit an event that the parent listens for to close the modal
  }
  
  characterForm = new FormGroup({
    characterName: new FormControl('', Validators.required),
    characterDescription: new FormControl('', Validators.required),
    characterImageURL: new FormControl('', Validators.required)
  });

  // Make sure to import and inject the CharacterService correctly
  constructor(private characterService: CharacterService, 
    private cookieService: CookieService, 
    private route: ActivatedRoute,
    private location: Location) {}

  // The onSubmit method
  onSubmit(): void {

      const formData = {
        ...this.characterForm.value,
        username: this.cookieService.get('username'),
        campaignId: this.campaignId
      };

    if (this.characterForm.valid) {
      this.characterService.createCharacter(formData).subscribe(
        response => {
          console.log('Character created:', response);
          //window.location.reload();
        },
        error => {
          console.error("backend error.");
          //window.location.reload();
          //TODO: Make this show a visible error.
        }
      );
    }
  }
}
