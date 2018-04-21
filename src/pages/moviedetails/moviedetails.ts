import { GENRES } from './../../constants/genres';
import { ImageData } from './../../models/imagedata.interface';
import { Poster } from './../../models/poster.interface';
import { MovieServiceProvider } from './../../providers/movie-service/movie-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movie } from '../../models/movie.interface';

/**
 * Generated class for the MoviedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moviedetails',
  templateUrl: 'moviedetails.html',
})
export class MoviedetailsPage {
  
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w300';
  movie: Movie = this.navParams.get("movie");
  posters : any = [];
  backdrops  : any= [];
  

  
  constructor(public movieService: MovieServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    debugger;
    console.log('ionViewDidLoad MoviedetailsPage');
    this.movieService.getImagesForMovie(this.movie.id).subscribe((data)=>{
      debugger;
      this.posters = data.posters;
      this.backdrops = data.backdrops;
    });
  }
  
  getGenres(genreIds: number[]): any{
    debugger;
    let genreNames: any;
    genreNames = GENRES.filter((genre) => {
        return genreIds.indexOf(genre.id) > -1;
    });
    return genreNames;
  }



}
