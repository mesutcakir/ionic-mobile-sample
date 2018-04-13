import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  test:string="veri yok";
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
	this.test="Started";
 		console.log(this.test)
  this.geolocation.getCurrentPosition().then((x) => {
		this.test=JSON.stringify(x.coords);
 		console.log(this.test)
}).catch((error) => {
  console.log('Error getting location', error);
});

  }


}
