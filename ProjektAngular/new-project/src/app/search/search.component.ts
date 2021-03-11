import { Component, OnInit } from '@angular/core';
import {MovieServerClient} from "../services/movie.service.client"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  IMG_API = 'https://image.tmdb.org/t/p/w1280/';
  movies = [];

  constructor(private movieService: MovieServerClient) { }

  ngOnInit(): void {
  }

  onClickSubmit(data) {
    this.movieService.findMoviesByTitle(data)
      .then(res => this.movies = res.results)
    data.reset();
  }

  voteColor(vote) {
    if(vote >= 8) {
      return "green";
    } else if(vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  }
}
