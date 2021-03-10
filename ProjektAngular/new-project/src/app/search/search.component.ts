import { Component, OnInit } from '@angular/core';
import {MovieServerClient} from "../services/movie.service.client"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies = [];

  constructor(private movieService: MovieServerClient) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    this.movieService.findMoviesByTitle(data)
      .then(res => this.movies = res.results)
    data.reset();
  }
}
