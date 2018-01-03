import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-edit-movie',
  templateUrl: 'edit-movie.html',
})
export class EditMoviePage {

  movie: any;
  title: string;
  description: string;
  category: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.movie = this.navParams.data;
    console.log(this.movie);
  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Movie was edited successfully !',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  editMovie(){
    this.database.editMovie(this.title, this.description, this.category, this.movie.id).then( (data) => {
       console.log(data);
       this.showToast();
    }, (error) => {
      console.log(error);
    })
    this.navCtrl.push(HomePage);
  }
  
}
