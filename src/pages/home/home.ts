import { Component } from '@angular/core';
import { AdMobFree } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleResult:string;
  id:string;
  constructor(public admobFree: AdMobFree) {
    this.id = "ca-app-pub-7691889669897119/7510818119";
    this.sample();
  }
  sample() {
    this.admobFree.banner.config({
      isTesting: true,
      autoShow: true,
      bannerAtTop: true,
      id: this.id
    });
    this.sampleResult = "Reklam Yükleniyor..";
    this.admobFree.banner.prepare().then(() => {
      this.sampleResult = "banner showing";
      this.admobFree.banner.show();
    }).catch(e => {
      Pro.monitoring.exception(e);
      this.sampleResult = JSON.stringify(e);
    });
  }
  ionViewDidLoad() {
    this.sample();
  }
}
