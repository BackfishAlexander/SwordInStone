import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  @Input() campaignData: any; // Define an input property for campaign data


  ngOnInit(): void {
    
  }


}
