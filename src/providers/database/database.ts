import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: HttpClient,
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, category TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  addMovie(title:string, description:string, category: string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO movie (title, description, category) VALUES (?, ?, ?)";
      this.db.executeSql(sql, [title, description, category]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllMovies(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM movie ORDER BY title", []).then((data) => {
        let movies = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            movies.push({
              id: data.rows.item(i).id,
              title: data.rows.item(i).title,
              description: data.rows.item(i).description,
              category: data.rows.item(i).category
            });            
          }          
        }
        resolve(movies);
      }, (error) => {
        reject(error);
      })
    })
  }

  deleteMovie(id:number){
    return new Promise ((resolve, reject) => {
      let sql = "DELETE FROM movie WHERE id=?";
      this.db.executeSql(sql, [id]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  editMovie(title:string, description:string, category: string,id: number){
    return new Promise ((resolve, reject) => {
      let sql = "UPDATE movie SET title=?, description=?, category=? WHERE id=?";
      this.db.executeSql(sql, [title, description, category, id]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

}
