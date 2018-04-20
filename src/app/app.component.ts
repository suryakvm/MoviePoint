import { ShowsPage } from './../pages/shows/shows';
import { MoviesPage } from './../pages/movies/movies';
import { Component, ViewChild, ElementRef, EventEmitter , Output } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MovieServiceProvider } from '../providers/movie-service/movie-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('closeMenu') closeMenu:any;
  rootPage:any = HomePage;
  @Output() myEvent = new EventEmitter();


  //Event for updating collection in homePage
  @Output() movieCollectionChange = new EventEmitter<any>();

  constructor(private events:Events,private movieService: MovieServiceProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  topRatedMovies(){
    console.log("Top Rated");
    this.closeMenu.getNativeElement().click();
    this.movieService.selected = "Top Rated";
    this.movieService.collectionType = "top_rated";  
    this.events.publish("movieCollection");
  }
    upComingMovies(){
    console.log("Upcoming Movies");
    this.closeMenu.getNativeElement().click();
    this.movieService.selected = "Upcoming";
    this.movieService.collectionType = "upcoming";  
    this.events.publish("movieCollection");
  }
    nowPlayingMovies(){
    console.log("Now Playing Movies");
    this.closeMenu.getNativeElement().click();
    this.movieService.selected = "Now Playing";
    this.movieService.collectionType = "now_playing";  
    this.events.publish("movieCollection");
  }
    popularMovies(){
    console.log("Now Playing Movies");
    this.closeMenu.getNativeElement().click();
    this.movieService.selected = "Popular";
    this.movieService.collectionType = "popular"; 
    this.events.publish("movieCollection");
    
  }
  openMoviesPage(){
    console.log("Calling Movies");
    this.closeMenu.getNativeElement().click();
    this.events.publish("movies");
  }
  openShowsPage(){
    console.log("Calling Tv Shows");
    this.closeMenu.getNativeElement().click();
    this.events.publish("shows");
  }

}

