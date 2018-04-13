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
this.test="ctor içine girdi";
}

this.geolocation.getCurrentPosition().then((position) => {
this.test="Konum:"+position.coords.longitude + ' ' + position.coords.latitude
}).catch((error) => {
console.log('Error getting location', error);
});


let watch = this.geolocation.watchPosition();
watch.subscribe((position) => {
this.test="Konum:"+position.coords.longitude + ' ' + position.coords.latitude
});
}
