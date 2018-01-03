import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { AddMoviePage } from '../add-movie/add-movie';
import { DetailMoviePage } from '../detail-movie/detail-movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  movies: any;

  constructor(public navCtrl: NavController, private database : DatabaseProvider) {
  }

  ionViewWillEnter() {
    this.database.getAllMovies().then((data) => {
      this.movies = data;
    },(error) => {
      console.log(error);
    })
  }
    
  // getAllMovies(){
  //   this.database.getAllMovies().then((data) => {
  //     console.log(data);
  //   }, (error) => {
  //   console.log(error);
  //   })
  // }

  addMovie() {
    this.navCtrl.push(AddMoviePage);
  }

  detailMovie(movie) {
    this.navCtrl.push(DetailMoviePage,movie);
  }

 
}
