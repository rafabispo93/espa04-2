import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CervejaProvider} from '../../providers/cerveja/cerveja';
import leaflet from 'leaflet';

var marker;
/**
 * Generated class for the AddCerverjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cerverja',
  templateUrl: 'add-cerverja.html',
})
export class AddCerverjaPage {
  model: Cerveja;
  public marker: any;
  @ViewChild('map2') mapContainer: ElementRef;
  map: any;
  constructor(    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private cervejaProvider: CervejaProvider) {
  this.model = new Cerveja();
  this.marker = "";
  }

  ionViewDidLoad() {
    this.loadmap(this);
    console.log('ionViewDidLoad AddCerverjaPage');
  }

loadmap(e) {
   var map, new_event_marker;
   map = leaflet.map("map2").fitWorld();
   console.log("loadMap", e);
   leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
     maxZoom: 18
   }).addTo(map);
   let markerGroup = leaflet.featureGroup();
   map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      console.log('founded');
    })
    map.on('click', function (e) {
       if(typeof(new_event_marker)==='undefined')
       {
        new_event_marker = new leaflet.marker(e.latlng,{ draggable: true});
        marker = new_event_marker;
        new_event_marker.addTo(map);
       }
       else
       {
        new_event_marker.setLatLng(e.latlng);
        marker = new_event_marker;
       }
   });
 }
 save() {
   console.log(marker, "sjso");
   this.saveCerveja()
   .then((e) => {
     console.log(e, "Cerveja Saved");
     this.toast.create({ message: 'Cerveja salvo.', duration: 3000, position: 'botton' }).present();
     this.navCtrl.pop();
   })
   .catch((e) => {
     console.log(e)
     this.toast.create({ message: 'Erro ao salvar a Cerveja.', duration: 3000, position: 'botton' }).present();
   });
 }

 private saveCerveja() {
   var price_per_ml = this.model.price_per_ml;
   var volume = this.model.volume;
   var beer_name = this.model.beer_name;
   // marker.latlng.lat = this.model.seller_latitude;
  // marker.latlng.lng = this.model.seller_longitude;
   this.model.seller_latitude = marker._latlng.lat;
   this.model.seller_longitude = marker._latlng.lng;
   return this.cervejaProvider.insert(this.model);
 }

}

export class Cerveja {
  beer_name: string;
  volume: number;
  price_per_ml: number;
  seller_latitude: number;
  seller_longitude: number;
}
