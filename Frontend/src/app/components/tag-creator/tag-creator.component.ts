import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-creator',
  templateUrl: './tag-creator.component.html',
  styleUrls: ['./tag-creator.component.css']
})
export class TagCreatorComponent {
  formData = {
    name: 'tag',
    description: 'description',
    color: '#000000' // Default color value
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
  }
}
