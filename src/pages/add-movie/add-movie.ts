import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { HomePage } from '../home/home';
import { ToastOptions } from 'ionic-angular/components/toast/toast-options';


@IonicPage()
@Component({
  selector: 'page-add-movie',
  templateUrl: 'add-movie.html',
})
export class AddMoviePage {

  title: string;
  description: string;
  category: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoviePage');
  }

  returnHome(){
    this.navCtrl.push(HomePage);
  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Movie was added successfully !',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  addMovie(){
    this.database.addMovie(this.title, this.description, this.category).then( (data) => {
       console.log(data);
       this.showToast();
    }, (error) => {
      console.log(error);
    })
    this.navCtrl.push(HomePage);
  }

  // public saveMovie() {
  //   console.log('Movie name -> ' + this.title);
  //   console.log('Description -> ' + this.description);
  //   console.log('Categorie -> ' + this.category);
  // }



}
