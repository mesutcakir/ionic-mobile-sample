import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleResult: string;
  config: AdMobFreeBannerConfig;
  constructor(public admobFree: AdMobFree) {
    this.config = {
      isTesting: false,
      autoShow: true,
      id: "ca-app-pub-7691889669897119/7510818119"
    };
    this.sample();
  }
  sample() {
    this.admobFree.banner.config(this.config);
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
