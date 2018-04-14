import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 0;
  lng: number = 0;
  test: any = [];
  add(typ: string, str: string) {
    let dt = new Date();
    this.test.push(dt.toISOString() + " | " + typ + ':' + str);
    this.storage.set('test', JSON.stringify(this.test));
  };
  constructor(public navCtrl: NavController, private geolocation: Geolocation
   , private storage: Storage) {
		this.cation.getCurrentPosition().then((resp) => {
		 this.add('current', resp.coords.longitude + ' ' + resp.coords.latitude);
				this.lat=resp.coords.latitude;
				this.lng=resp.coords.longitude;
		}).catch((error) => {
		  console.log('Error getting location', error);
		})

    let watch = this.geolocation.watchPosition();
    watch.subscribe((position) => {
      if (position) {
      	this.lat=position.coords.latitude;
		this.lng=position.coords.longitude;
        this.add('watch', position.coords.longitude + ' ' + position.coords.latitude);
          //.then(
            //success => console.log('Launched navigator'),
            //error => console.log('Error launching navigator', error)
          //);
      } else {
        this.add("info", "Konum Servisi Kapalı olabilir.");
      }
    });
  }
}
