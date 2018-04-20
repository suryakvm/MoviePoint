import { Data } from './../../models/data.interface';
import { HttpClient } from '@angular/common/http';

import { Movie } from './../../models/movie.interface';
import { MovieServiceProvider } from './../../providers/movie-service/movie-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MoviedetailsPage } from '../moviedetails/moviedetails';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  
  modData: any;
  nowPlayingMovies: Movie[];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w300';
  selected: string = this.movieService.selected;
  genreSelection: boolean = false;
  genreId: number = 28;
  movie: Movie;
  scrollContent: Movie[];    
 

  constructor(private events:Events,public http: HttpClient,public movieService: MovieServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.events.subscribe("movieCollection",()=>{
      console.log("Event Catched");
      this.selected = this.movieService.selected;
      this.genreSelection = false;
      this.getMovieCollections();
    });

    this.events.subscribe("movies",()=>{
      debugger;
      console.log("Movies Event Catched");
      this.genreSelection = true;
      this.getMovieData(this.genreId);
      
    });
 }
  selectionChanged(genreId: any){
    this.genreId = genreId;
    this.getMovieData(this.genreId);
  }
  getMovieCollections(){
    this.movieService.getMovieCollection().subscribe((data)=>{
      this.nowPlayingMovies = data.results;      
    });
  }

  getMovieData(genreId: number){
    this.movieService.getMovieData(genreId).subscribe((data)=>{
      this.nowPlayingMovies = data.results;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getMovieCollections();
    
  }

  openDetails(movie: Movie){
    this.navCtrl.push(MoviedetailsPage,{
      movie: movie,
    });
  }

  //Infinite Scroll
  doInfinite(infiniteScroll){

    setTimeout(() => {
      this.movieService.getNextPage().subscribe((data)=>{
        this.scrollContent = data.results;
        for(let i=0;i<this.scrollContent.length;i++){
          this.nowPlayingMovies.push(this.scrollContent[i]);
        } 
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
      
      console.log(this.scrollContent);
  }

  fiveRating(tenRating: number): Number[]{
    let ratingArr: number[] = [0,0,0,0,0];
    let rating = tenRating/2;
     let floorVal = Math.floor(rating);
    for(let j=0;j<floorVal;j++){
      ratingArr[j] = 1;
    }
    if(rating-floorVal == 0)
    ratingArr[floorVal] = 0;
    else if(rating-floorVal > 0.6)
    ratingArr[floorVal] = 1;
    else
    ratingArr[floorVal] = 0.5;
    return ratingArr;
  }
}
