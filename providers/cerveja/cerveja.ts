import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
/*
  Generated class for the CervejaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CervejaProvider {
  private API_URL = 'http://agora-server.herokuapp.com/beersales'
  constructor(public http: Http) { }

  getAll() {
    return new Promise((resolve, reject) => {

      let url = "https://agora-server.herokuapp.com/beersales";
      let url1 = 'https://randomuser.me/api/?results=10';

      this.http.get(url).map(res => res.json()).subscribe(result => {
          resolve(result);
      });
    });
  }

  insert(data: any) {
    return new Promise((resolve, reject) => {
      let url = "http://agora-server.herokuapp.com/beersale";
      $.post(url, data, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
        resolve(data);
      });
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      let url = "http://agora-server.herokuapp.com/beersale" + "/" + id;
      this.http.delete(url).map(res => res.json()).subscribe(result => {
          resolve(result);
      });

    });
  }
}
