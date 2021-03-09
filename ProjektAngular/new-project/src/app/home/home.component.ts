import { Component, OnInit } from '@angular/core';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";
const IMG_API = 'https://image.tmdb.org/t/p/w1280/';
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = [];

  constructor() { }

  ngOnInit(): void {
    fetch(FEATURED_API)
      .then(response => response.json())
      .then(res => this.movies = res.results);
  }

}
