import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
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
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((position) => {
      if (position) {
        this.add('watch', position.coords.longitude + ' ' + position.coords.latitude);
        this.map.setCenter({lat:position.coords.latitude, lng:position.coords.longitude});
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
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){

 
this.geolocation.getCurrentPosition().then((resp) => {


 this.add('watch', resp.coords.longitude + ' ' + resp.coords.latitude);
 let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
}).catch((error) => {
  console.log('Error getting location', error);
})
    
  }


}
