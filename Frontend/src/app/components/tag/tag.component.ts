import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'property-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit{
  @Input() name!: string;
  @Input() description!: string;
  @Input() color!: string;
  @Input() rainbow!: boolean;

  ngOnInit(): void {
      
  }


}
