import { Component, OnInit } from '@angular/core';

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  hello = "Hello from search";
  constructor() { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    console.log(data.value)
    fetch(SEARCH_API + data.value)
      .then(response => response.json())
    
    data.reset();
  }
}
