import { Component } from '@angular/core';
import { MovieServerClient } from "./services/movie.service.client";
import { GenresComponent } from './genres/genres.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new-project';
  private genreComponent: GenresComponent;

  message = "";

  constructor(private movieService: MovieServerClient) { }

  ngOnInit() {
  }

  onClick(genre: string){
    this.movieService.setMessage(genre);
  }
}
