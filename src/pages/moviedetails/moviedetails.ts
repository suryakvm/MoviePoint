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
  crew: any = [];
  cast: any = [];
  

  
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
    this.movieService.getCastForMovie(this.movie.id).subscribe((data)=>{
      this.cast = data.cast;
      console.log(this.cast);
      this.crew = data.crew;
    })
  }
  
  getGenres(genreIds: number[]): string{
    debugger;
    let genreNames: any;
    let genreNameString: string = "";
    genreNames = GENRES.filter((genre) => {
        return genreIds.indexOf(genre.id) > -1;
    });
    for(var i=0;i<genreNames.length;i++){
      genreNameString = genreNameString + genreNames[i].name+", ";
    }
    return genreNameString;
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

  goBack(): void{
    console.log("Back");
    this.navCtrl.pop();
  }


}
