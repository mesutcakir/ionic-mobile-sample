import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Pro } from '@ionic/pro';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sampleResult: string;
  config: AdMobFreeBannerConfig;
  constructor(public admobFree: AdMobFree,private ga: GoogleAnalytics) {
    this.config = {
      isTesting: false,
      autoShow: false,
      id: "ca-app-pub-7691889669897119/7510818119"
    };


      this.ga.startTrackerWithId('UA-117874259-1')
        .then(() => {
     		this.ga.trackView('started');
		this.sample();
        })
        .catch(e => Pro.monitoring.exception(e)); 
  }
  sample() {
    this.admobFree.banner.config(this.config);
    this.sampleResult = "Reklam Yükleniyor..";
    this.admobFree.banner.prepare().then(() => {
      setTimeout(() => {
        this.sampleResult = "banner showing";
        this.admobFree.banner.show();
        this.ga.trackView('banner_show');
      }, 1000);
    }).catch(e => {
      Pro.monitoring.exception(e);
      this.sampleResult = JSON.stringify(e);
    });
  }
}
