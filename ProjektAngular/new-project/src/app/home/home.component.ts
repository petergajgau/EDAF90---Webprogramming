import { Component, OnInit } from '@angular/core';
import {MovieServerClient} from "../services/movie.service.client"

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  IMG_API = 'https://image.tmdb.org/t/p/w1280/';
  movies = [];

  constructor(private movieService: MovieServerClient) { }

  ngOnInit(): void {
    this.movieService.findFeaturedMovies()
      .then(res => this.movies = res.results);
  }

}
