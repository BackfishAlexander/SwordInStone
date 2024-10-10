import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() backgroundColor: string = '#000000';  // Default background color in hex
  visible: boolean = false;
  position = { x: 0, y: 0 };

  show(x: number, y: number, title: string, description: string, backgroundColor: string) {
    this.position = { x, y };
    this.title = title;
    this.description = description;
    this.backgroundColor = backgroundColor;
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
