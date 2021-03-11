import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { GenresComponent } from './genres/genres.component'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'genres', component: GenresComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'search', component: SearchComponent},
  {path: 'home', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
