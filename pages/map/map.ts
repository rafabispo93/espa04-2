import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CervejaProvider} from '../../providers/cerveja/cerveja'
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  cervejas: any[];
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private cervejaProvider: CervejaProvider) {

  }

  ionViewDidEnter() {
    this.cervejas = [];
    this.getAllCervejas();

  }

  getAllCervejas() {

      this.cervejaProvider.getAll().then((result: any) => {
          for( var i=0; i < result.length; i++) {
            this.cervejas.push(result[i]);
          }
          this.loadmap();
        });

    }



loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    let markerGroup = leaflet.featureGroup();
    console.log(this.cervejas.length, "Length");
    for(var count=0; count < this.cervejas.length; count++) {
        let marker: any = leaflet.marker([this.cervejas[count].seller_latitude, this.cervejas[count].seller_longitude]);
        marker.bindPopup("Cerveja: " + this.cervejas[count].beer_name + "</br>" + "Preço/ml: " + this.cervejas[count].price_per_ml + "</br>" + "Volume: " + this.cervejas[count].volume);
        markerGroup.addLayer(marker);

      }
    console.log(markerGroup);
    this.map.addLayer(markerGroup);

  }
}
