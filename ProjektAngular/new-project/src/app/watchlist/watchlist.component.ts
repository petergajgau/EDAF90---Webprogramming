import { Component, OnInit } from '@angular/core';
import { MovieServerClient } from '../services/movie.service.client';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  IMG_API = 'https://image.tmdb.org/t/p/w1280/';

  constructor(private movieService: MovieServerClient) { }

  data: any;
  myset;
  formattedSet;

  setMyWatchList(){
    this.myset = this.movieService.getLikes();
    this.formattedSet = [...this.myset].map((item) => {
      if (typeof item === 'string') return JSON.parse(item);
      else if (typeof item === 'object') return item;
    });
    console.log(this.formattedSet)
  }

  ngOnInit(): void {
    this.setMyWatchList();
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
