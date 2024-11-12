import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Item } from 'src/app/interfaces/Item';
import { HttpService } from 'src/app/services/http.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  searchControl = new FormControl();
  results: Item[] = [];

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    // Subscribe to value changes in the input and debounce for 1 second
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500)  // 1 second debounce
      )
      .subscribe(value => {
        this.search(value);  // Call your search function after debounce
      });

      this.search("");
  }

  search(query: string) {
    console.log("Searching for " + query);
    this.http.postRequest<Item[]>(
      this.http.buildURL(endpointList.getGlobalItems),
      { query },
      'json'
    ).then(
      response => {
        let replacement: Item[] = [];
        for (let item of response) {
          replacement.push(item);
        }
        this.results = replacement;
      }
    )
  }
}
