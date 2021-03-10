const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";

export class MovieServerClient {

    findFeaturedMovies(){
        return fetch(FEATURED_API)
            .then(response => response.json());
    }

    findMoviesByTitle(data) {
        return fetch(SEARCH_API + data.value.value + '&page=1')
            .then(response => response.json());
    }

}