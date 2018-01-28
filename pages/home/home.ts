import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, InfiniteScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { CervejaProvider} from '../../providers/cerveja/cerveja'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    cervejas: any[];
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

    constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private cervejaProvider: CervejaProvider) { }

    ionViewDidEnter() {
      this.cervejas = [];
      //this.infiniteScroll.enable(true);
      this.getAllCervejas();
    }

    getAllCervejas() {
      console.log("Aqui");
      this.cervejaProvider.getAll().then((result: any) => {
          for( var i=0; i < result.length; i++) {
            this.cervejas.push(result[i]);
          }
        });
    }

    deleteCerveja(cerveja: any) {
      this.cervejaProvider.remove(cerveja.id)
        .then((result: any) => {
          let index = this.cervejas.indexOf(cerveja);
          this.cervejas.splice(index, 1);

          this.toast.create({ message: 'Cerveja excluída com sucesso.', position: 'botton', duration: 3000 }).present();
        })
        .catch((error: any) => {
          this.toast.create({ message: 'Erro ao excluir cerveja. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        });
    }

    addCervejas() {
      this.navCtrl.push('AddCerverjaPage');
    }

    goMaps() {
      this.navCtrl.push('MapPage');
    }

}
