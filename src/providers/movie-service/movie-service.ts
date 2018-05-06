import { ImageData } from './../../models/imagedata.interface';
import { Data } from './../../models/data.interface';
import { Movie } from './../../models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieServiceProvider {

  apiBaseURL :string =  'http://api.themoviedb.org/3/';
  api_key: string = "db239d75a07903d0fc366c81218f3cef";
  collectionType:string = "now_playing";
  selected:string= "Now Playing";
  movieUrl: string;
  showUrl: string;
  genreId: number;
  page: number =1;
  imageUrl: string;
  castUrl: string;
  

  constructor(public http: HttpClient) {
    console.log('Hello MovieServiceProvider Provider');
  }

  //to get toprated,
  getMovieCollection(): Observable<Data> {
    debugger;
    this.movieUrl = this.apiBaseURL+'movie/'+this.collectionType+'?api_key='+this.api_key;
    // this.url = "https://api.themoviedb.org/3/discover/movie?api_key=db239d75a07903d0fc366c81218f3cef&with_original_language=te";
     return this.http.get<Data>(this.movieUrl);
    
  }

  //to get one movie data to display in details screen
  getMovieData(genreId: number): Observable<Data>{
       this.movieUrl = this.apiBaseURL + 'genre/' + genreId + '/movies?api_key='+this.api_key+'&language=en-US&include_adult=false&sort_by=created_at.asc'; 
      return this.http.get<Data>(this.movieUrl);
  }
  
  //infinite scroll 
  getNextPage(): Observable<Data>{
    this.page += 1;
    console.log(this.page);
     this.movieUrl = this.movieUrl + "&page="+this.page;
     return this.http.get<Data>(this.movieUrl);
  }
  
  //Backdrops and poster images for a Movie
  getImagesForMovie(movieId: number): Observable<any>{
    debugger;
    this.imageUrl = this.apiBaseURL+"movie/"+movieId+"/images?api_key="+this.api_key;
    console.log("Images Url:: "+this.imageUrl);
    return this.http.get(this.imageUrl);
  }

  //to get casting of a movie 
  getCastForMovie(movieId: number): Observable<any>{
    debugger;
    this.castUrl = this.apiBaseURL+"movie/"+movieId+"/casts?api_key="+this.api_key;
    console.log("Cast URL:: "+this.castUrl);
    return this.http.get(this.castUrl);
  }

  //Search Movies
  getSearchedMovies(searchString:string): Observable<Data> {
      this.movieUrl = this.apiBaseURL+'search/movie/?api_key='+this.api_key+'&query='+searchString;
      console.log(this.movieUrl);
     return this.http.get<Data>(this.movieUrl);

  }


}
