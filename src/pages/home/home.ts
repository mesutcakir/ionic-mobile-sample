import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
test:any=[];
constructor(public navCtrl: NavController,private geolocation: Geolocation,private launchNavigator: LaunchNavigator) {
this.geolocation.getCurrentPosition().then((position) => {
this.test.push("Konum:"+position.coords.longitude + ' ' + position.coords.latitude)
}).catch((error) => {
this.test.push("error:"+error)
});


let watch = this.geolocation.watchPosition();
watch.subscribe((position) => {
if (position){
	this.test.push("Konum:"+position.coords.longitude + ' ' + position.coords.latitude)
}
else{
	this.test.push("Konum Servisi Kapalı olabilir.")
}

});



this.launchNavigator.navigate('Toronto, ON', {})
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );

}


}
