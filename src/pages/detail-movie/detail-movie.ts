import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditMoviePage } from '../edit-movie/edit-movie';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-detail-movie',
  templateUrl: 'detail-movie.html',
})
export class DetailMoviePage {

  movie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.movie = this.navParams.data;
    console.log(this.movie);
  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Movie was deleted successfully !',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  editMovie(movie){
    this.navCtrl.push(EditMoviePage,movie);
  }

  deleteMovie(movie){
    this.database.deleteMovie(this.movie.id).then( (data) => {
      console.log(data);
      this.showToast();
   }, (error) => {
     console.log(error);
   })
   this.navCtrl.push(HomePage);
  }


}
