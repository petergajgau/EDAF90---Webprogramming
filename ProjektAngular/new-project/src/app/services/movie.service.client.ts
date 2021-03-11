import { BehaviorSubject, Subject } from 'rxjs';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&query=";
const GENRE_API = "https://api.themoviedb.org/3/discover/movie?api_key=a2bacc0f7314337a9b607251ca77c2d1&sort_by=popularity.desc&include_adult=false&page=1&with_genres="

export class MovieServerClient {
    

    message:string
    id:number
    
    private customSubject = new Subject<any>();
    customObservable = this.customSubject.asObservable();


    setMessage(data){
        this.message = data;
        
        //Bases on genre give it the specific id
        switch (this.message) {
            case 'action' : {
                this.id = 28;
                break;
            }
            case 'adventure' : {
                this.id = 12;
                break;
            }
            case 'comedy' : {
                this.id = 35;
                break;
            }
            case 'crime' : {
                this.id = 80;
                break;
            }
            case 'documentary' : {
                this.id = 99;
                break;
            }
            case 'drama' : {
                this.id = 18;
                break;
            }
            case 'family' : {
                this.id = 10751;
                break;
            }
            case 'fantasy' : {
                this.id = 14;
                break;
            }
            case 'history' : {
                this.id = 36;
                break;
            }
            case 'horror' : {
                this.id = 27;
                break;
            }
            case 'romance' : {
                this.id = 10749;
                break;
            }
            case 'science fiction' : {
                this.id = 878;
                break;
            }
            case 'thriller' : {
                this.id = 53;
                break;
            }
        }
        console.log(this.id)
        this.customSubject.next();
    }

    getMessage(){
        return fetch(GENRE_API + this.id)
            .then(response => response.json());;
    }

    findFeaturedMovies(){
        return fetch(FEATURED_API)
            .then(response => response.json());
    }

    findMoviesByTitle(data) {
        return fetch(SEARCH_API + data.value.value + '&page=1')
            .then(response => response.json());
    }
}