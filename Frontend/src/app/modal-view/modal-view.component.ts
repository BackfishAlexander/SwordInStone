import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})
export class ModalViewComponent implements OnInit {
    @Input() data: any;

    constructor() {
    }

    ngOnInit() {
    }

    constructItem(item: any) {
      
    }

    closeModal() {

    }
}