import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 51.678418;
  lng: number = 7.809007;
  test: any = [];
  add(typ: string, str: string) {
    let dt = new Date();
    this.test.push(dt.toISOString() + " | " + typ + ':' + str);
    this.storage.set('test', JSON.stringify(this.test));
  };
  constructor(public navCtrl: NavController, private geolocation: Geolocation
  //, private launchNavigator: LaunchNavigator
  , private storage: Storage) {
    //let options: LaunchNavigatorOptions = {
      //start: 'İstanbul, ON',
      //app: launchNavigator.APP.GOOGLE_MAPS
    //};
    //this.launchNavigator.navigate("İstanbul,ON", options)
      //.then(
        //success => console.log('Launched navigator'),
        //error => console.log('Error launching navigator', error)
    //);
    
this.geolocation.getCurrentPosition().then((resp) => {


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
        //this.launchNavigator.navigate(position.coords.longitude + ',' + position.coords.latitude, options)
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
