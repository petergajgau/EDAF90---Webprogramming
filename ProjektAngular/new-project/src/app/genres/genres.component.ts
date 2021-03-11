import { Component, OnInit, Input } from '@angular/core';
import { MovieServerClient } from "../services/movie.service.client";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  IMG_API = 'https://image.tmdb.org/t/p/w1280/';
  movies = [];
  
  constructor(private movieService: MovieServerClient) { }

  loadGenre(){
    this.movieService.getMessage()
      .then(res => this.movies = res.results);
  }

  ngOnInit(): void {
    this.loadGenre();//Initial
    this.movieService.customObservable.subscribe((res) => {//This runs all the time and when something changes it loads new data
      this.loadGenre();
    }
    );
  }
}
